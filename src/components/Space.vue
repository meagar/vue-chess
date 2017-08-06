<template>
  <td class="space" :class="classes" @mouseover="mouseover" @mouseleave="mouseleave" @dragover="dragover" @dragleave="dragout" @drop="drop">
    <piece v-if="piece" :piece="piece" :interaction="interaction" @drag="drag"/>
    <span v-else>{{label}}</span>
  </td>
</template>

<script>
  import Piece from './Piece';

  export default {
    props: ['space'],
    data() {
      return {
        selected: false,
        label: this.space.label,
        draggingOver: false,
      };
    },
    computed: {
      piece() {
        return this.space.piece;
      },
      interaction() {
        return this.space.interaction;
      },
      pieceColor() {
        if (this.space.piece) {
          return this.space.piece.toLowerCase() === this.space.piece ? 'black' : 'white';
        }
        return null;
      },
      classes() {
        const classes = [this.space.color]; // white|black
        if (this.space.selected) {
          if (this.space.selected === 'hover') {
            // The piece under the mouse cursor
            classes.push('hover');
          } else if (this.space.piece) {
            // A move that captures a piece
            classes.push('capture');
          } else {
            // A move that doesn't capture a piece
            classes.push('move');
          }
        }

        if (this.draggingOver) {
          classes.push('dragover');
        }

        return classes;
      },
    },
    components: {
      Piece,
    },
    methods: {
      mouseover() {
        if (this.interaction) {
          this.space.selected = 'hover';
          this.$emit('hover', this.space.label);
        }
      },
      mouseleave() {
        if (this.interaction) {
          this.space.selected = false;
          this.$emit('leave', this.space.label);
        }
      },
      drag(event) {
        if (this.interaction) {
          event.dataTransfer.setData('label', this.space.label);
          this.$emit('drag', this.space.label);
        }
      },
      drop(event) {
        event.preventDefault();
        const from = event.dataTransfer.getData('label');
        this.draggingOver = false;
        this.$emit('drop', from, this.space.label, (event.shiftKey || event.metaKey));
      },
      dragover(event) {
        event.preventDefault();
        this.draggingOver = true;
      },
      dragout(event) {
        event.preventDefault();
        this.draggingOver = false;
      },
    },
  };
</script>

<style lang="sass" scoped>
  td
    cursor: pointer
    border: 1px solid #000
    position: relative
    text-align: center
    vertical-align: middle
    width: 60px
    height: 60px

    &.white
      background-color: #ddd
    &.black
      background-color: #aaa
    &.hover
      background: #8eff98
    &.move
      background: #e5b275
      &.dragover
        background: darken(#e5b275, 25%)
    &.capture
      background: #ff8484
      &.dragover
        background: darken(#ff8484, 25%)
</style>
