<template>
  <div :draggable="interaction" class="piece" :class="classes" @dragstart="dragStart"></div>
</template>

<script>
  const PIECE_NAMES = {
    p: 'pawn',
    r: 'rook',
    n: 'knight',
    b: 'bishop',
    q: 'queen',
    k: 'king',
  };

  export default {
    props: ['piece', 'interaction'],
    computed: {
      pieceName() {
        return PIECE_NAMES[this.piece.toLowerCase()];
      },

      color() {
        return (this.piece.toLowerCase() === this.piece) ? 'black' : 'white';
      },

      classes() {
        return [this.color, this.pieceName];
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
    &:before
      width: 100%
      height: 100%
    &.white
      @include white-piece
    &.black
      @include black-piece
    &.pawn:before
      content: '♟',
    &.rook:before
      content: '♜',
    &.knight:before
      content: '♞',
    &.bishop:before
      content: '♝',
    &.queen:before
      content: '♛',
    &.king:before
      content: '♚'
</style>
