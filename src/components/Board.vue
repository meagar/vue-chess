<template>
  <div>
    <game-state :game="game" :history="history" />
    <table class="board">
      <tr v-for="row in rowLabels">
        <th class="row">{{row}}</th>
        <space v-for="col in colLabels" :space="spaces[`${row}${col}`]" @hover="hover" @leave="leave" @drop="drop"/>
      </tr>
      <tr>
        <th>&nbsp;</th>
        <th class="col" v-for="col in colLabels">{{col}}</th>
      </tr>
    </table>
    <div class="fenString">
      {{fenString}}
    </div>
  </div>
</template>

<script>
  import Space from './Space';
  import GameState from './GameState';
  import Chess from '../chess';

  const game = new Chess();
  game.newGame();

  export default {
    data() {
      // Mapping of space labels to names
      const spaces = {};
      game.getBoard().eachSpace((space, label) => {
        spaces[label] = {
          selected: false,
          piece: space.getPiece() && space.getPiece().getLabel(),
          color: space.getColor(),
          label: space.getLabel(),
          interaction: false,
        };
      });

      return {
        rowLabels: game.ROW_LABELS,
        colLabels: game.COL_LABELS,
        currentTurn: game.currentTurn,
        history: [],
        fenString: game.persistGame(),
        spaces,
        game,
      };
    },
    created() {
      this.updateGameState();
      this.history.unshift(game.persistGame());
    },
    components: {
      Space, GameState,
    },
    methods: {
      restoreGame(fen) {
        game.restoreGame(fen);
        this.updateGameState();
      },
      updateGameState() {
        game.getBoard().eachSpace((space, label) => {
          this.spaces[label].selected = false;

          const piece = space.getPiece();
          if (piece) {
            this.spaces[label].piece = piece.getLabel();
            this.spaces[label].interaction = piece.getColor() === game.getCurrentTurn();
          } else {
            this.spaces[label].piece = null;
            this.spaces[label].interaction = false;
          }
        });

        this.fenString = game.persistGame();
        this.currentTurn = game.getCurrentTurn();
      },
      hover(label) {
        const state = this.spaces[label];
        const space = game.getBoard().getSpace(label);
        const piece = space.getPiece();

        if (piece) {
          // Record the moves so we can blank them out on mouse-leave
          piece.getMoves(space, game.getBoard()).forEach((move) => {
            this.spaces[move].selected = piece.getLabel();
          });
        }
      },
      leave(spaceLabel) {
        Object.keys(this.spaces).forEach((label) => { this.spaces[label].selected = false; });
      },
      drop(event, to, suspendRules) {
        const from = event.dataTransfer.getData('label');
        if (game.move(from, to, suspendRules)) {
          this.updateGameState();
          this.history.unshift(game.persistGame());
        }
      },
    },
  };
</script>

<style lang="sass" scoped>
  table.board
    user-select: none
    border-collapse: collapse
    margin: 0 auto
    th
      position: relative
      text-align: center
      vertical-align: middle
      padding: 7px 15px
    td
      font-family: courier

  .fenString
    text-align: center
</style>
