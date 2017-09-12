<template>
  <div>
    <pawn-promotion v-if="showPawnPromotion" @promote="promote" :color="pawnPromotionColor"></pawn-promotion>
    <game-state :game="game" :history="history" :restoreGame="restoreGame" />
    <table class="board">
      <tr v-for="row in rowLabels">
        <th class="row">{{row}}</th>
        <space v-for="col in colLabels" :key="spaces[`${col}${row}`].label" :space="spaces[`${col}${row}`]" @hover="hover" @leave="leave" @drop="drop"/>
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
  import PawnPromotion from './PawnPromotion';

  const Chess = window.Chess;
  const game = new Chess();
  game.newGame();

  export default {
    data() {
      // Mapping of space labels to names
      const spaces = {};
      game.eachSpace((label, piece) => {
        spaces[label] = {
          selected: false,
          piece,
          color: Chess.getSpaceColor(label),
          label,
          interaction: false,
          moved: false,
        };
      });

      return {
        rowLabels: game.ROW_LABELS,
        colLabels: game.COL_LABELS,
        currentTurn: game.getCurrentTurn(),
        history: [],
        pawnPromotionColor: null,
        fenString: game.persistGame(),
        spaces,
        game,
      };
    },
    created() {
      if (this.$route.params.fen) {
        game.restoreGame(this.$route.params.fen);
      }

      this.updateGameState();
      this.history.unshift(game.persistGame());
    },
    components: {
      Space, GameState, PawnPromotion,
    },
    computed: {
      showPawnPromotion() {
        return !!this.pawnPromotionColor;
      },
    },
    methods: {
      restoreGame(fen) {
        game.restoreGame(fen);
        this.updateGameState();
      },
      updateGameState() {
        game.eachSpace((label, piece) => {
          this.spaces[label].selected = false;
          this.spaces[label].moved = false;

          if (piece) {
            this.spaces[label].piece = piece;
            this.spaces[label].interaction = (Chess.getPieceColor(piece) === game.getCurrentTurn());
          } else {
            this.spaces[label].piece = null;
            this.spaces[label].interaction = false;
          }
        });

        // Hilight the last move
        if (this.from) {
          this.spaces[this.from].moved = true;
          this.spaces[this.to].moved = true;
        }

        this.fenString = game.persistGame();
        this.currentTurn = game.getCurrentTurn();
      },
      hover(label) {
        const state = this.spaces[label];
        const piece = game.getPiece(label);

        if (piece) {
          // Record the moves so we can blank them out on mouse-leave
          game.getMoves(label).forEach((move) => {
            this.spaces[move.to].selected = true;
          });
        }
      },
      leave(spaceLabel) {
        Object.keys(this.spaces).forEach((label) => { this.spaces[label].selected = false; });
      },
      drop(from, to, suspendRules = false) {
        if (suspendRules) {
          // TODO: Suspend rules logic
        } else {
          const move = game.getMoves(from).find((m) => {
            return m.to === to;
          });
          if (move) {
            this.move(move, suspendRules);
          }
        }
      },
      move(move, suspendRules) {
        const promote = (space) => {
          this.pawnPromotionColor = space.getPiece().getColor();
          return new Promise((resolve, reject) => {
            this.resolvePromotion = resolve;
            this.rejectPromotion = reject;
          });
        };

        this.from = move.from;
        this.to = move.to;

        game.move(move.from, move.to, { suspendRules, promote }).then(() => {
          // this.history.unshift(game.persistGame());
          this.updateGameState();
        }, () => { });
      },

      promote(ch) {
        if (ch) {
          this.resolvePromotion(ch);
        } else {
          this.rejectPromotion(ch);
        }

        this.resolvePromotion = null;
        this.rejectPromotion = null;
        this.pawnPromotionColor = null;
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
