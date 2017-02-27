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
  .piece
    font-size: 40px
    &.white
      color: #fff
      text-shadow: 0px 0px 2px #555
    &.black
      color: #000
</style>
