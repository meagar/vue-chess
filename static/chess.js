/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
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
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
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

  getOppositeColor() {
    return (this.ch.toUpperCase() === this.ch) ? 'black' : 'white';
  }

  black() { return this.getColor() === 'black'; }
  white() { return this.getColor() === 'white'; }

  getLabel() { return this.ch; }

  getMoves(space, board) {
    return this.getMovableSpaces(space, board).map(s => s.label);
  }

  // Return a list of all valid moves for the given piece, from the given space, on the given board
  getMovableSpaces(space, board) {
    throw "getMovableSpace called on Piece, override this in base class"
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Piece;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__rook__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bishop__ = __webpack_require__(3);




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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece__ = __webpack_require__(0);


class Rook extends __WEBPACK_IMPORTED_MODULE_0__piece__["a" /* default */] {
  static deltas() { return [[0, 1], [0, -1], [1, 0], [-1, 0]]; }

  getMovableSpaces(space, board) {
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__rook__ = __webpack_require__(2);



class Bishop extends __WEBPACK_IMPORTED_MODULE_0__piece__["a" /* default */] {
  static deltas() { return [[1, 1], [1, -1], [-1, 1], [-1, -1]]; }

  getMovableSpaces(space, board) {
    return __WEBPACK_IMPORTED_MODULE_1__rook__["a" /* default */].prototype.getSlideMoves.call(this, space, board, Bishop.deltas());
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bishop;



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

    // If we're not blocked, and we're still in the starting row...
    if (moves[0] && this.isStartingRow(space)) {
      // then we can advance two spaces
      moves.push(board.getRelativeSpace(space, this, 0, 2, true, false));
    }

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

  canPromote(space) {
    return this.white() && space.row == '8' || this.black() && space.row == '1';
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Pawn;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__queen__ = __webpack_require__(1);



class King extends __WEBPACK_IMPORTED_MODULE_0__piece__["a" /* default */] {
  getMovableSpaces(space, board) {
    return __WEBPACK_IMPORTED_MODULE_1__queen__["a" /* default */].deltas().map((delta) => {
      return board.getRelativeSpace(space, this, ...delta, true);
    }).filter(n => n);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = King;



/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pawn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rook__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__knight__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__bishop__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__queen__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__king__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__space__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__board__ = __webpack_require__(8);










const INITIAL_BOARD = 'k7/13P2K/8/8/8/8/PPPPPPPP/RNBQ1BNR w KQkq - 0 1';
//const INITIAL_BOARD = 'rnbqkbnr/pppp1ppp/8/8/3pP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 1';
// A board where the king is in check
//const INITIAL_BOARD = 'rnbq1bnr/p1pp1ppp/1pk2P1/4P3/215/4P3/PPP2PPP/RNB1KBNR b KQkq - 0 1'
//const INITIAL_BOARD = 'rnbqkbnr/2ppppp1/pp5p/8/2B1P3/5Q2/PPPP1PPP/RNB1K1NR w KQkq - 0 1';

class Chess {
  constructor(whiteFn, blackFn, state) {
    this.ROW_LABELS = __WEBPACK_IMPORTED_MODULE_8__board__["a" /* default */].ROW_LABELS;
    this.COL_LABELS = __WEBPACK_IMPORTED_MODULE_8__board__["a" /* default */].COL_LABELS;
    this.INITIAL_BOARD = INITIAL_BOARD;

    this.board = new __WEBPACK_IMPORTED_MODULE_8__board__["a" /* default */]();

    this.whiteFn = whiteFn;
    this.blackFn = blackFn;

    if (state) {
      this.restoreGame(state);
    }
  }

  run() {
    for (;;) {
      const callback = (this._currentTurn === 'white' ? this.whiteFn : this.blackFn);

      callback(this).then((move) => {

      });
    }
  }

  newGame() {
    this.restoreGame(INITIAL_BOARD);
    this.gameStates = [];
  }

  // Restore the game state from a FEN string
  restoreGame(fenString) {
    const parts = fenString.split(' ');
    this.board.restoreState(parts[0]);
    this._currentTurn = parts[1] === 'w' ? 'white' : 'black';

    this._restoreCastling(parts[2]);
    this._restoreEnPassant(parts[3]);
    this.halfMoveCount = parseInt(parts[4], 10);
    this.moveCount = parseInt(parts[5], 10);
  }

  // Produce a FEN string for the current game state
  persistGame() {
    const state = [this.board.persistState()];
    state.push(this.getCurrentTurn() === 'white' ? 'w' : 'b');
    state.push(this._persistCastling());
    state.push(this._persistEnPassant());
    state.push(this.halfMoveCount);
    state.push(this.moveCount);
    return state.join(' ');
  }

  // space - A Space object or coords in the form 'c1'
  // piece - The piece to get moves for; null to use piece occupying space
  getMoves(space, piece) {
    if (arguments.length == 1) {
      if (typeof space == 'string') {
        space = this.getSpace(space);
      }
      if (!piece && arguments.length === 1) {
        piece = space.getPiece();
      }
    }

    return piece.getMoves(space, this.getBoard());
  }

  // Returns a promise
  move(from, to, options = {}) {
    const fromSpace = this.board.getSpace(from);
    const toSpace = this.board.getSpace(to);
    const piece = fromSpace.getPiece();

    if (piece.getColor() !== this.getCurrentTurn()) {
      throw(`Player ${piece.getColor()} tried to move on ${this.getCurrentTurn()}'s turn`);
      return false;
    }

    if (this._canMove(fromSpace, toSpace, piece, options)) {
      // Make sure we can legally move to the target space
      const capture = toSpace.getPiece();
      toSpace.setPiece(piece);
      fromSpace.clearPiece();

      let moved;

      if (piece.canPromote && piece.canPromote(toSpace)) {
        moved = new Promise((resolve, reject) => {
          options.promote(toSpace).then((ch) => {
            // Promoted
            const piece = Chess.buildPiece(toSpace.getPiece().white() ? ch.toUpperCase() : ch.toLowerCase());
            toSpace.setPiece(piece);
            resolve();
          }, () => {
            // Promotion cancelled
            toSpace.setPiece(capture);
            fromSpace.setPiece(piece);
            reject('Move cancelled by user');
          });
        });
      } else {
        moved = Promise.resolve();
      }

      return moved.then(() => { this._currentTurn = this._currentTurn === 'black' ? 'white' : 'black'; })
    }

    return Promise.reject('Illegal move');
  }

  _canMove(fromSpace, toSpace, piece, options) {
    if (options.suspendRules) { return true; }

    if (this._validateMove(fromSpace, toSpace, piece)) {
      // Make sure we can legally move to the target space
      const capture = toSpace.getPiece();
      toSpace.setPiece(piece);
      fromSpace.clearPiece();

      // See if this move would expose the player's own king to check
      const canMove = !this.playerIsInCheck(piece.getColor());

      // Restore the old state of the board
      fromSpace.setPiece(piece);
      toSpace.setPiece(capture);

      return canMove;
    }
    return false;
  }

  getWinner() {
    const color = this.getPlayerInCheck()

    console.log(color, "is in check, checking for vicotry")
    // Figure out if either player is in check, and if that player can escape it
    this.board.eachPiece(color, (piece, space) => {
      this.getMoves(space, piece)
    })
  }

  // Return which color is in check, if any (null otherwise)
  getPlayerInCheck() {
    return ['white', 'black'].find((color) => {
      let kingSpace = this.getBoard().findKing(color)
      return kingSpace.isUnderThreat(this.getBoard());
    });
  }

  playerIsInCheck(color) {
    // TODO optimize
    return this.getPlayerInCheck() === color;
  }

  getSpace(rank, file) {
    if (arguments.length == 2) {
      return this.getBoard().getSpace(rank, file);
    } else {
      return this.getBoard().getSpace(rank);
    }
  }

  getBoard() {
    return this.board;
  }

  getCurrentTurn() {
    return this._currentTurn;
  }

  //
  // Private
  //

  _persistCastling() {
    const castling = Object.keys(this.castling).filter(key => this.castling[key]).join('');
    return castling || '-';
  }

  _restoreCastling(str) {
    this.castling = {};
    ['K', 'Q', 'k', 'q'].forEach((flag) => {
      this.castling[flag] = (str.indexOf(flag) > -1);
    });
  }

  _persistEnPassant() {
    return '-';
  }

  _restoreEnPassant(str) {
    // No-op
  }

  // Return true if the give piece can move to the given space (no checking of check/checkmate)
  _validateMove(fromSpace, toSpace, piece, options) {
    // First verify that the given space is reachable by this piece
    if (piece.getMoves(fromSpace, this.getBoard()).indexOf(toSpace.getLabel()) === -1) {
      return false;
    }

    // We can't capture kings
    if (toSpace.getPiece() && toSpace.getPiece().ch.toLowerCase() == 'k') {
      return false;
    }

    return true;
  }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Chess;


Chess.ROW_LABELS = __WEBPACK_IMPORTED_MODULE_8__board__["a" /* default */].ROW_LABELS;
Chess.COL_LABELS = __WEBPACK_IMPORTED_MODULE_8__board__["a" /* default */].COL_LABELS;

if (typeof window !== 'undefined') {
  window.Chess = Chess;
} else if (typeof exports !== 'undefined') {
  exports.Chess = Chess;
}

Chess.buildPiece = function (ch) {
  const klass = {
    p: __WEBPACK_IMPORTED_MODULE_1__pawn__["a" /* default */],
    n: __WEBPACK_IMPORTED_MODULE_3__knight__["a" /* default */],
    b: __WEBPACK_IMPORTED_MODULE_4__bishop__["a" /* default */],
    r: __WEBPACK_IMPORTED_MODULE_2__rook__["a" /* default */],
    q: __WEBPACK_IMPORTED_MODULE_5__queen__["a" /* default */],
    k: __WEBPACK_IMPORTED_MODULE_6__king__["a" /* default */]
  }[ch.toLowerCase()];

  return new klass(ch);
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pawn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rook__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__knight__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__bishop__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__queen__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__king__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__space__ = __webpack_require__(9);










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
    return Object.values(this.spaces);
  }

  findKing(color) {
    const search = (color == 'white' ? 'K' : 'k');

    return this.getSpaces().find((space) => {
      return space.getPiece() && space.getPiece().ch == search;
    })
  }

  eachSpace(callback) {
    Object.keys(this.spaces).forEach((label) => {
      callback(this.spaces[label], label);
    });
  }

  eachPiece(color, callback) {
    if (arguments.length == 1) {
      callback = color;
      color = false;
    }

    this.eachSpace((space) => {
      let piece = space.getPiece();
      if (piece) {
        if (!color || piece.getColor() == color) {
          callback(piece, space);
        }
      }
    })
  }

  // movable - If true, only return the space if it's empty
  // capture - If true, only return the space if it contains a piece of the opposite color
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
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__chess__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pawn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__queen__ = __webpack_require__(1);




class Space {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.x = __WEBPACK_IMPORTED_MODULE_0__chess__["default"].COL_LABELS.indexOf(col);
    this.y = __WEBPACK_IMPORTED_MODULE_0__chess__["default"].ROW_LABELS.indexOf(row);

    this.label = `${col}${row}`;
    this.piece = null;

    this.color = ((this.x + (this.y % 2)) % 2) ? 'black' : 'white';
  }

  isEmpty() {
    return !this.piece;
  }

  isUnderThreat(board) {
    const attackingSpace = board.getSpaces().find((space) => {
      let piece = space.getPiece();

      if (piece && piece.getMoves(space, board).indexOf(this.label) !== -1) {
        return true
      } else {
        return false
      }
    });

    return !!attackingSpace;
  }

  setPiece(piece, promotion) {
    return this.piece = piece;
  }

  clearPiece() {
    this.piece = null;
  }

  getPiece() { return this.piece; }
  getColor() { return this.color; }
  getLabel() { return this.label; }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Space;



/***/ })
/******/ ]);