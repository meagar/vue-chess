/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Piece {
  constructor(ch) {
    this.ch = ch;
  }

  getColor() {
    return (this.ch.toUpperCase() === this.ch) ? 'white' : 'black';
  }

  black() { return this.getColor() === 'black'; }
  white() { return this.getColor() === 'white'; }

  getLabel() { return this.ch; }

  getMoves(space, board) {
    return this.getMovableSpaces(space, board).map(s => s.label);
  }

  // Return a list of all valid moves for the given piece, from the given space, on the given board
  getMovableSpaces(space, board) {
    alert('Cannot call `getMovableSpaces` fo ');
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Piece;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__rook__ = __webpack_require__(6);



class Bishop extends __WEBPACK_IMPORTED_MODULE_0__piece__["a" /* default */] {
  static deltas() { return [[1, 1], [1, -1], [-1, 1], [-1, -1]]; }

  getMovableSpaces(space, board) {
    return __WEBPACK_IMPORTED_MODULE_1__rook__["a" /* default */].prototype.getSlideMoves.call(this, space, board, Bishop.deltas());
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bishop;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__queen__ = __webpack_require__(5);



class King extends __WEBPACK_IMPORTED_MODULE_0__piece__["a" /* default */] {
  getMovableSpaces(space, board) {
    return __WEBPACK_IMPORTED_MODULE_1__queen__["a" /* default */].deltas().map((delta) => {
      return board.getRelativeSpace(space, this, ...delta, true);
    }).filter(n => n);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = King;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece__ = __webpack_require__(0);


class Knight extends __WEBPACK_IMPORTED_MODULE_0__piece__["a" /* default */] {
  getMovableSpaces(space, board) {
    const deltas = [[1, 2], [-1, 2], [1, -2], [-1, -2], [2, 1], [2, -1], [-2, 1], [-2, -1]];
    return deltas.map(delta => board.getRelativeSpace(space, this, ...delta, true)).filter(s => s);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Knight;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece__ = __webpack_require__(0);


class Pawn extends __WEBPACK_IMPORTED_MODULE_0__piece__["a" /* default */] {
  isStartingRow(space) {
    return (this.black() && space.row === '7') || (this.white() && space.row === '2');
  }

  getMovableSpaces(space, board) {
    // by default we can move forward one space
    const moves = [board.getRelativeSpace(space, this, 0, 1, true, false)];

    if (this.isStartingRow(space)) {
      moves.push(board.getRelativeSpace(space, this, 0, 2, true, false));
    }
    // We can move forward two spaces if we're on the "starting line" for pawns
    // debugger;
    const captures = [
      board.getRelativeSpace(space, this, 1, 1),
      board.getRelativeSpace(space, this, -1, 1),
    ];

    captures.forEach((c) => {
      if (c && c.piece && c.piece.getColor() !== this.getColor()) {
        moves.push(c);
      }
    });

    // TODO : en passant
    return moves.filter(m => m);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Pawn;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__rook__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bishop__ = __webpack_require__(1);




class Queen extends __WEBPACK_IMPORTED_MODULE_0__piece__["a" /* default */] {
  static deltas() {
    return __WEBPACK_IMPORTED_MODULE_2__bishop__["a" /* default */].deltas().concat(__WEBPACK_IMPORTED_MODULE_1__rook__["a" /* default */].deltas());
  }
  
  getMovableSpaces(space, board) {
    return __WEBPACK_IMPORTED_MODULE_1__rook__["a" /* default */].prototype.getSlideMoves.call(this, space, board, Queen.deltas());
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Queen;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece__ = __webpack_require__(0);


class Rook extends __WEBPACK_IMPORTED_MODULE_0__piece__["a" /* default */] {
  static deltas() { return [[0, 1], [0, -1], [1, 0], [-1, 0]]; }

  getMovableSpaces(space, board) {
    console.log('get moves', space, board);
    return this.getSlideMoves(space, board, Rook.deltas());
  }

  getSlideMoves(space, board, deltas) {
    // slide along each delta until we hit a piece
    const moves = [];

    deltas.forEach((delta) => {
      let newSpace = space;
      for (;;) {
        newSpace = board.getRelativeSpace(newSpace, this, ...delta, true);

        if (newSpace) {
          moves.push(newSpace);
        }

        // Stop when we hit the edge of the board or an occupied space
        if (!newSpace || newSpace.piece) {
          break;
        }
      }
    });

    return moves;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Rook;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pawn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rook__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__knight__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__bishop__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__queen__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__king__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__space__ = __webpack_require__(8);










function buildPiece(ch) {
  const classMap = {
    p: __WEBPACK_IMPORTED_MODULE_1__pawn__["a" /* default */], r: __WEBPACK_IMPORTED_MODULE_2__rook__["a" /* default */], n: __WEBPACK_IMPORTED_MODULE_3__knight__["a" /* default */], b: __WEBPACK_IMPORTED_MODULE_4__bishop__["a" /* default */], q: __WEBPACK_IMPORTED_MODULE_5__queen__["a" /* default */], k: __WEBPACK_IMPORTED_MODULE_6__king__["a" /* default */],
  };

  return new classMap[ch.toLowerCase()](ch);
};

const ROW_LABELS = ['8', '7', '6', '5', '4', '3', '2', '1'];
const COL_LABELS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

class Board {
  constructor() {
    this.spaces = {};

    this.rows = ROW_LABELS.map((row, rowIndex) => {
      return COL_LABELS.map((col, colIndex) => {
        const space = new __WEBPACK_IMPORTED_MODULE_7__space__["a" /* default */](row, col);
        this.spaces[space.label] = space;
        return space;
      });
    });
  }

  restoreState(fenString) {
    const nullArray = function (n) {
      const arr = [];
      for (let i = 0; i < n; i += 1) {
        arr.push(null);
      }
      return arr;
    };

    fenString.split('/').forEach((row, rowIndex) => {
      row = row.split('').reduce((arr, col) => {
        return arr.concat(col.match(/\d/) ? nullArray(col) : col);
      }, []);

      row.forEach((col, colIndex) => {
        if (col) {
          this.rows[rowIndex][colIndex].setPiece(buildPiece(col));
        } else {
          this.rows[rowIndex][colIndex].clearPiece();
        }
      });
    });
  }

  persistState() {
    return this.rows.map((row) => {
      return row.map((space) => {
        return space.getPiece() ? space.getPiece().getLabel() : 1;
      }).reduce((arr, ch) => {
        if (typeof ch === 'number' && typeof arr[arr.length - 1] === 'number') {
          arr[arr.length - 1] += ch;
        } else {
          arr.push(ch);
        }
        return arr;
      }, []).join('');
    }).join('/');
  }

  getSpace(...args) {
    if (args.length === 1) {
      // Space label (1a, 2b, etc)
      return this.spaces[args[0]];
    } else if (args.length === 2) {
      // x,y coord
      return this.rows[args[0]][args[1]];
    }

    throw new Error('getSpace expects 1 or 2 arguments');
  }

  getSpaces() {
    return this.rows;
  }

  eachSpace(callback) {
    Object.keys(this.spaces).forEach((label) => {
      callback(this.spaces[label], label);
    });
  }

  getRelativeSpace(space, piece, dx, dy, movable = false, capture = null) {
    if (capture === null) {
      capture = movable;
    }

    if (piece.white()) {
      dy = -dy;
    }

    const x = space.x + dx;
    const y = space.y + dy;
    const dest = (this.rows[y] && this.rows[y][x]);

    if (dest) {
      if (movable) {
        if (dest.isEmpty() || (capture && (dest.piece.getColor() !== piece.getColor()))) {
          return dest;
        }
      } else {
        return dest;
      }
    }

    return null;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Board;


Board.ROW_LABELS = ROW_LABELS;
Board.COL_LABELS = COL_LABELS;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Space {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.x = Chess.COL_LABELS.indexOf(col);
    this.y = Chess.ROW_LABELS.indexOf(row);

    this.label = `${col}${row}`;
    this.piece = null;

    this.color = ((this.x + (this.y % 2)) % 2) ? 'black' : 'white';
  }

  isEmpty() {
    return !this.piece;
  }

  setPiece(piece) {
    this.piece = piece;
  }

  clearPiece() {
    this.piece = null;
  }

  getPiece() { return this.piece; }
  getColor() { return this.color; }
  getLabel() { return this.label; }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Space;



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pawn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rook__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__knight__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__bishop__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__queen__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__king__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__board__ = __webpack_require__(7);










// const INITIAL_BOARD = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
const INITIAL_BOARD = 'rnbqkbnr/pppp1ppp/8/8/3pP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 1';

class Chess {
  constructor() {
    this.ROW_LABELS = __WEBPACK_IMPORTED_MODULE_7__board__["a" /* default */].ROW_LABELS;
    this.COL_LABELS = __WEBPACK_IMPORTED_MODULE_7__board__["a" /* default */].COL_LABELS;
  }

  newGame() {
    this.board = new __WEBPACK_IMPORTED_MODULE_7__board__["a" /* default */]();
    this.restoreGame(INITIAL_BOARD);
    this.gameStates = [];
  }

  restoreGame(fenString) {
    const parts = fenString.split(' ');
    this.board.restoreState(parts[0]);
    this.currentTurn = parts[1] === 'w' ? 'white' : 'black';
    this.restoreCastling(parts[2]);
    this.restoreEnPassant(parts[3]);
    this.halfMoveCount = parseInt(parts[4], 10);
    this.moveCount = parseInt(parts[5], 10);
  }

  persistGame() {
    const state = [this.board.persistState()];
    state.push(this.getCurrentTurn() === 'white' ? 'w' : 'b');
    state.push(this.persistCastling());
    state.push(this.persistEnPassant());
    state.push(this.halfMoveCount);
    state.push(this.moveCount);
    return state.join(' ');
  }

  persistCastling() {
    const castling = Object.keys(this.castling).filter(key => this.castling[key]).join('');
    return castling || '-';
  }

  restoreCastling(str) {
    this.castling = {};
    ['K', 'Q', 'k', 'q'].forEach((flag) => {
      this.castling[flag] = (str.indexOf(flag) > -1);
    });
  }

  persistEnPassant() {
    return '-';
  }

  restoreEnPassant(str) {
    // No-op
  }

  move(from, to, suspendRules = false) {
    const fromSpace = this.board.spaces[from];
    const toSpace = this.board.spaces[to];

    const piece = fromSpace.getPiece();
    if (suspendRules || (piece.getMoves(fromSpace, this.getBoard()).indexOf(to) !== -1)) {
      // Make sure we can legally move to the target space
      toSpace.setPiece(piece);
      fromSpace.clearPiece();
      this.currentTurn = this.currentTurn === 'black' ? 'white' : 'black';
      return true;
    }
    return false;
  }

  // Return which color is in check, if any (null otherwise)
  check(gameState) {
    if (this.getBoard().isInCheck('white')) {
      return 'white';
    }

    if (this.getBoard().isInCheck('black')) {
      return 'black';
    }

    return null;
  }

  getSpace(row, col) {
    return this.board.getSpace(row, col);
  }

  getBoard() {
    return this.board;
  }

  getCurrentTurn() {
    return this.currentTurn;
  }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Chess;


Chess.ROW_LABELS = __WEBPACK_IMPORTED_MODULE_7__board__["a" /* default */].ROW_LABELS;
Chess.COL_LABELS = __WEBPACK_IMPORTED_MODULE_7__board__["a" /* default */].COL_LABELS;

window.Chess = Chess;


/***/ })
/******/ ]);