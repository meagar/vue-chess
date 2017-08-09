<template>
  <div class="promotion-modal">
    <div class="modal-backdrop"></div>
    <div class="modal-body">
      <h2>Pawn Promotion</h2>
      <h3>Select a piece to promote to</h3>
      <table>
        <tr>
          <td v-for="symbol,ch in pieces">
            <a :class="color" href="#" @click.prevent="(event) => selectPiece(ch)">{{symbol}}</a>
          </td>
        </tr>
      </table>
      <a class="cancel" href="#" @click.prevent="cancel">Cancel</a>
    </div>
  </div>
</template>

<script>
const PIECES = {
  r: '♜',
  n: '♞',
  b: '♝',
  q: '♛',
};

export default {
  props: ['color'],
  computed: {
    pieces() {
      return PIECES;
    },
  },
  methods: {
    selectPiece(ch) {
      ch = this.color === 'white' ? ch.toUpperCase() : ch.toLowerCase();
      this.$emit('promote', ch);
    },
    cancel() {
      this.$emit('promote', false);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  @import "../styles/chess.sass"

  .modal-backdrop
    width: 100%
    height: 100%
    position: fixed
    top: 0
    left: 0
    z-index: 99
    background: rgba(128, 128, 128, .5)

  .modal-body
    width: 50vw
    min-height: 300px
    position: fixed
    left: 50%
    top: 50%
    transform: translateX(-50%) translateY(-50%)
    background: #fff
    z-index: 100
    border: 1px solid #bbb
    box-shadow: 0px 0px 10px #333
    border-radius: 3px

  a.cancel
    display: block
    margin-top: 1em

  table
    margin: 0 auto

  td a
    color: #fff
    font-size: 50px
    padding: 0 10px
    text-decoration: none
    display: block
    &:hover
      background: #8eff99
    &.white
      @include white-piece
    &.black
      @include black-piece
</style>
