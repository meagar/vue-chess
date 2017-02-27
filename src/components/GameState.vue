<template>
  <aside>
    Current turn: {{currentTurn}}
    <h4>Game History:</h4>
    <table>
      <tr>
        <th></th><th>Move</th>
      </tr>
      <tr v-for="item,index in history">
        <td>{{history.length - index}}</td>
        <td><a :title="item" @click.prevent="restoreGame(item)" href="#">{{item}}</a></td>
      </tr>
    </table>
  </aside>
</template>

<script>
  export default {
    props: ['game', 'history'],
    computed: {
      currentTurn() {
        return this.game.getCurrentTurn();
      },
    },
  };
</script>

<style lang="sass" scoped>
  aside
    &, *
      box-sizing: border-box
    position: absolute
    text-align: left
    padding: 10px
    width: 500px
    background: #fff
    border: 1px solid #bbb
    border-radius: 3px
    top: 30px
    left: 30px
    height: calc(100vh - 60px)
  
  table
    margin: 0
    th, td
      font-size: 10pt
      a
        display: inline-block
        border: 1px solid #f00
        overflow: hidden
        white-space: pre
        text-overflow: ellipsis
</style>
