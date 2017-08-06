<template>
  <div :draggable="interaction" class="piece" :class="color" @dragstart="dragStart">
    {{text}}
  </div>
</template>

<script>
  const PIECE_STRINGS = {
    P: '♙',
    R: '♖',
    N: '♘',
    B: '♗',
    Q: '♕',
    K: '♔',
    p: '♟',
    r: '♜',
    n: '♞',
    b: '♝',
    q: '♛',
    k: '♚',
  };

  export default {
    props: ['piece', 'interaction'],
    computed: {
      text() {
        return PIECE_STRINGS[this.piece.toLowerCase()];
      },

      color() {
        return (this.piece.toLowerCase() === this.piece) ? 'black' : 'white';
      },
    },
    methods: {
      dragStart(event) {
        this.$emit('drag', event);
      },
    },
  };
</script>

<style lang="sass" scoped>
  @import "../styles/chess.sass"

  .piece
    font-size: 40px
    &.white
      @include white-piece
    &.black
      @include black-piece
</style>
