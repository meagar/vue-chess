<template>
  <div class="aside">
    <p>Current turn: {{currentTurn}}</p>
    <p>Check: {{playerInCheck}}</p>
    <p v-if=winner>
      Winner: {{winner}}
    </p>
    <h4>Game History:</h4>
    <div class="container">
      <table>
        <thead>
          <tr>
            <th></th><th>Move</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item,index in history" :class="{selected: item == currentState}">
            <th>{{history.length - index}}</th>
            <td><a :title="item" @click.prevent="restoreGame(item)" href="#">{{item}}</a></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="game-buttons">
      <button class="btn btn-default">New Game</button>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['game', 'restoreGame'],
    computed: {
      currentTurn() {
        return this.game.getCurrentTurn();
      },
      playerInCheck() {
        return this.game.getPlayerInCheck();
      },
      winner() {
        return this.game.getWinner();
      },
      currentState() {
        return this.game.persistGame();
      },
      history() {
        return this.game.getStates();
      },
    },
  };
</script>

<style lang="sass" scoped>
  .aside
    position: absolute
    display: block
    text-align: left
    padding: 10px
    width: calc(50% - 330px)
    background: #fff
    border: 1px solid #bbb
    border-radius: 3px
    top: 30px
    left: 30px
    height: calc(100vh - 60px)
    overflow: hidden

  .container
    border: 1px solid #0f0
    width: 100%
    overflow: hidden

  table
    margin: 0
    border-collapse: collapse

  tbody
    tr.selected
      font-weight: bold
    th
      text-align: right
    th, td
      font-size: 10pt
      width: auto
      border: 1px solid #ddd
      padding: 3px
    a
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      text-decoration: none
</style>
