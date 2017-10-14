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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__move__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pawn_move__ = __webpack_require__(3);



const ROW_LABELS = ['8', '7', '6', '5', '4', '3', '2', '1'];
const COL_LABELS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const BLANK_BOARD = new Array(64);

let moveCache;

class Board {
  constructor(spaces = BLANK_BOARD) {
    this._spaces = spaces.slice(0);

    Board.buildMoveCache();
  }

  static buildMoveCache() {
    if (moveCache) { return; }

    moveCache = {};

    // Pregenerate moves for each piece at each space
    for (let x = 0; x < 8; x += 1) {
      moveCache[x] = {};

      for (let y = 0; y < 8; y += 1) {
        const moves = {
          null: [],
          p: Board.generatePawnMoves(x, y, false),
          P: Board.generatePawnMoves(x, y, true),
          r: Board.generateRookMoves(x, y),
          n: Board.generateKnightMoves(x, y),
          b: Board.generateBishopMoves(x, y),
          q: Board.generateQueenMoves(x, y),
          k: Board.generateKingMoves(x, y),
        };

        moves.R = moves.r;
        moves.N = moves.n;
        moves.B = moves.b;
        moves.Q = moves.q;
        moves.K = moves.k;

        moveCache[x][y] = moves;
      }
    }
  }

  static labelToCoords(label) {
    return [COL_LABELS.indexOf(label[0]), ROW_LABELS.indexOf(label[1])];
  }

  static coordsToLabel(x, y) {
    return COL_LABELS[x] + ROW_LABELS[y];
  }

  static getSpaceColor(x, y) {
    return ((x + y) % 2) === 0 ? 'white' : 'black';
  }

  // Returns true if white, false if black
  static isWhite(ch) {
    if (ch === 'P' || ch === 'R' || ch === 'N' || ch === 'B' || ch === 'Q' || ch === 'K') {
      return true;
    }

    if (ch === 'p' || ch === 'r' || ch === 'n' || ch === 'b' || ch === 'q' || ch === 'k') {
      return false;
    }

    throw new Error(`Invalid piece in isWhite: ${ch}`);
  }

  static getCachedMoves(x, y, piece) {
    return moveCache[x][y][piece];
  }

  // Return a list of all possible moves for the given space, even those that are illegal because
  // they would put the player's own king in check
  _getPotentialMoves(x, y, piece) {
    const white = Board.isWhite(piece);

    // Potential moves are the cached list of possible moves for the given piece at the given location
    const potentialMoves = Board.getCachedMoves(x, y, piece);

    if (piece === 'p' || piece === 'P') {
      return this._getPawnMoves(x, y, potentialMoves, piece, white);
    }

    return this._getNonPawnMoves(x, y, potentialMoves, piece, white);
  }

  // Return a list of moves for the piece at (x, y)
  getMoves(x, y) {
    const piece = this.getSpace(x, y);
    const white = Board.isWhite(piece);

    const potentialMoves = this._getPotentialMoves(x, y, piece);

    // Only return moves that don't place the current player in check
    return potentialMoves.filter((m) => {
      const newBoard = this.move(x, y, m.x, m.y);
      return !newBoard.playerIsInCheck(white);
    });
  }

  _getPawnMoves(x, y, potentialMoves, piece, white) {
    const moves = [];

    // We need to filter them down to the moves that are valid in the given board state
    potentialMoves.forEach((move) => {
      if (move.capture === true) {
        // Pawn capture
        const dest = this.getSpace(move.x, move.y);
        if (dest) {
          if (Board.isWhite(dest) !== white) {
            // Destination is occupied by opposite color
            moves.push({ x: move.x, y: move.y, capture: true, promotion: move.promotion });
          }
        }
      } else {
        // Pawn move that cannot capture
        do {
          const dest = this.getSpace(move.x, move.y);
          if (!dest) {
            // The space is clear, we can advance here
            moves.push({ x: move.x, y: move.y, capture: false, promotion: move.promotion });
          } else {
            // The space was blocked, we can't advance, and we should stop checking
            break;
          }
          move = move.next;
        } while (move);
      }
    });

    return moves;
  }

  _getNonPawnMoves(x, y, potentialMoves, piece, white) {
    const moves = [];

    // We need to filter them down to the moves that are valid in the given board state
    potentialMoves.forEach((move) => {
      // Regular move (possibly a slide move)
      // Return moves until no more moves in this direction, *or* we encounter a blocked space
      do {
        const dest = this.getSpace(move.x, move.y);

        if (dest) {
          // Space is occupied...
          if (Board.isWhite(dest) !== white) {
            // by an enemy piece
            moves.push({ x: move.x, y: move.y, capture: true });
          }
          // Stop sliding
          move = null;
        } else {
          // Space is empty, we can freely move here...
          moves.push({ x: move.x, y: move.y, capture: false });
          // ... and continue sliding
          move = move.next;
        }
      } while (move);
    });

    return moves;
  }

  // Return a new board with the given move applied
  move(x1, y1, x2, y2, promotion = null) {
    const newBoard = new Board(this._spaces);
    const piece = newBoard.getSpace(x1, y1);

    if (promotion) {
      if (Board.isWhite(promotion) !== Board.isWhite(piece)) {
        throw new Error(`Promotion piece is the wrong color: ${promotion}`);
      }
    }

    /* eslint-disable no-underscore-dangle */
    newBoard._setSpace(x2, y2, promotion || piece);
    newBoard._clearSpace(x1, y1);

    return newBoard;
  }

  // Return true if the given player is in check/
  // @param player bool white: true, black: false
  playerIsInCheck(white) {
    const king = white ? 'K' : 'k';

    const kingSpace = this.findSpace((x, y, p) => { return p === king; });

    if (!kingSpace) {
      throw new Error(`Error, cannot find ${white ? 'white' : 'black'} king`);
    }

    // See if any other piece is threatening the king
    const threat = this.findSpace((x, y, p) => {
      if (!p) { return false; }

      return !!this._getPotentialMoves(x, y, p).find((move) => {
        return move.x === kingSpace[0] && move.y === kingSpace[1];
      });
    });

    return !!threat;
  }

  playerIsInCheckMate(white) {
    if (this.playerIsInCheck(white)) {
      // Loop over each of our pieces, and see if it has any moves
      // If any piece has at least one move, we're not in checkmate
      return !this.findSpace((x, y, p) => {
        // skip empty spaces, or pieces of the opposite color
        if (!p || Board.isWhite(p) !== white) {
          return false;
        }

        return this.getMoves(x, y).length > 0;
      });
    }

    return false;
  }

  getSpaces() {
    return this._spaces;
  }

  findWinner() {
    if (this.playerIsInCheckMate(true)) {
      return true;
    } else if (this.playerIsInCheckMate(false)) {
      return false;
    }
    return undefined;
  }

  findSpace(callback) {
    for (let x = 0; x < 8; x += 1) {
      for (let y = 0; y < 8; y += 1) {
        const p = this.getSpace(x, y);
        if (callback(x, y, p)) {
          return [x, y, p];
        }
      }
    }

    return undefined;
  }

  eachSpace(callback) {
    for (let x = 0; x < 8; x += 1) {
      for (let y = 0; y < 8; y += 1) {
        callback(x, y, this.getSpace(x, y));
      }
    }
  }

  eachMove(callback) {
    for (let x = 0; x < 8; x += 1) {
      for (let y = 0; y < 8; y += 1) {
        const moves = this.getMoves(x, y);
        for (let i = 0; i < moves.length; i += 1) {
          if (callback(x, y, moves[i]) === false) {
            return undefined;
          }
        }
      }
    }
    return true;
  }

  getSpace(x, y) {
    return this._spaces[x + (y * 8)];
  }

  setSpace(x, y, ch) {
    const newBoard = new Board(this._spaces);
    newBoard._setSpace(x, y, ch);
    return newBoard;
  }

  _setSpace(x, y, ch) {
    this._spaces[x + (y * 8)] = ch;
  }

  _clearSpace(x, y) {
    this._spaces[x + (y * 8)] = null;
  }

  static restoreState(fenString) {
    const board = new Board();

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
          board._setSpace(colIndex, rowIndex, col);
        }
      });
    });

    return board;
  }

  persistState() {
    const fen = [];
    for (let y = 0; y < 8; y += 1) {
      const row = [];
      for (let x = 0; x < 8; x += 1) {
        const ch = this.getSpace(x, y);
        if (!ch) {
          if (typeof row[row.length - 1] === 'number') {
            row[row.length - 1] += 1;
          } else {
            row.push(1);
          }
        } else {
          row.push(ch);
        }
      }
      fen.push(row.join(''));
    }

    return fen.join('/');
  }

  static generatePawnMoves(x, y, white = true) {
    const black = !white;
    const moves = [];

    const dy = (white ? -1 : 1);

    if (y + dy >= 0 && y + dy <= 7) {
      moves.push(new __WEBPACK_IMPORTED_MODULE_1__pawn_move__["a" /* default */](x, y + dy, null, false));
    }

    if ((white && y === 6) || (black && y === 1)) {
      // We're on the home row, we can advance two spaces
      /* eslint-disable no-new */
      new __WEBPACK_IMPORTED_MODULE_1__pawn_move__["a" /* default */](x, y + (2 * dy), moves[moves.length - 1], false);
    }

    // Captures (side-to-side moves)
    if (x > 1) {
      moves.push(new __WEBPACK_IMPORTED_MODULE_1__pawn_move__["a" /* default */](x - 1, y + dy, null, true));
    }

    if (x < 7) {
      moves.push(new __WEBPACK_IMPORTED_MODULE_1__pawn_move__["a" /* default */](x + 1, y + dy, null, true));
    }

    return moves;
  }

  static generateKnightMoves(x, y) {
    const deltas = [[1, 2], [-1, 2], [1, -2], [-1, -2], [2, 1], [2, -1], [-2, 1], [-2, -1]];
    return this.deltasToMoves(x, y, deltas, { slide: false });
  }

  static generateRookMoves(x, y) {
    const deltas = [[-1, 0], [0, -1], [1, 0], [0, 1]];
    return this.deltasToMoves(x, y, deltas, { slide: true });
  }

  static generateBishopMoves(x, y) {
    const deltas = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
    return this.deltasToMoves(x, y, deltas, { slide: true });
  }

  static generateQueenMoves(x, y) {
    const deltas = [[-1, 0], [0, -1], [1, 0], [0, 1], [-1, -1], [1, -1], [1, 1], [-1, 1]];
    return this.deltasToMoves(x, y, deltas, { slide: true });
  }

  static generateKingMoves(x, y) {
    const deltas = [[-1, 0], [0, -1], [1, 0], [0, 1], [-1, -1], [1, -1], [1, 1], [-1, 1]];
    return this.deltasToMoves(x, y, deltas, { slide: false });
  }

  // Turn a list of deltas into valid moves
  // options:
  //   class: The move class (Move or PawnMove)
  //   slide: Whether to return a list of moves for each delta, sliding in the given direction
  static deltasToMoves(x, y, deltas, options = {}) {
    let moves = null;

    if (options.slide) {
      moves = deltas.map(d => this.buildSlideMove(x, y, ...d));
    } else {
      moves = deltas.map(d => this.buildMove(x + d[0], y + d[1], options.class));
    }

    // Either method may return `null` for moves that leave the board, filter them out
    return moves.filter(m => m);
  }

  // Advance in the given direction until we run off the board
  // Used for queens, rooks, bishops
  static buildSlideMove(x1, y1, dx, dy) {
    let root = null;
    let prev = null;

    for (let x = x1 + dx, y = y1 + dy; x >= 0 && x < 8 && y >= 0 && y <= 7; x += dx, y += dy) {
      const move = new __WEBPACK_IMPORTED_MODULE_0__move__["a" /* default */](x, y, prev);
      if (!root) { root = move; }
      prev = move;
    }

    return root;
  }

  // Generate a single move to the given x,y coords
  // Used for Kings, Knights, Pawns
  static buildMove(x, y, MoveClass = __WEBPACK_IMPORTED_MODULE_0__move__["a" /* default */]) {
    return (x >= 0 && x < 8 && y > 0 && y < 8) && new MoveClass(x, y);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Board;


Board.ROW_LABELS = ROW_LABELS;
Board.COL_LABELS = COL_LABELS;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board__ = __webpack_require__(0);


class Move {
  constructor(x, y, prev) {
    this.x = x;
    this.y = y;

    this.label = __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */].coordsToLabel(x, y);

    if (prev) { this.setPrev(prev); }
  }

  setNext(next) {
    this.next = next;
    next.prev = this;
  }

  setPrev(prev) {
    prev.setNext(this);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Move;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board__ = __webpack_require__(0);


const INITIAL_BOARD = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

// Pawn capture test
// const INITIAL_BOARD = 'rnbqkbnr/pppppppp/8/2pp7/3P7/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

// A board where the black king can move into check
// const INITIAL_BOARD = 'rnbq1bnr/p1pp1ppp/1pk2P1/4P3/215/4P3/PPP2PPP/RNB1KBNR b KQkq - 0 1';

// A board where white can promote
// const INITIAL_BOARD = '8/1P6/8/8/k/8/K4p/8 w KQkq - 0 1';

class Chess {
  constructor(whiteFn, blackFn) {
    this.ROW_LABELS = __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */].ROW_LABELS;
    this.COL_LABELS = __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */].COL_LABELS;

    this._gameStates = [];
    this._board = new __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */]();

    this.whiteFn = whiteFn;
    this.blackFn = blackFn;

    this._currentTurnWhite = true; // white
  }

  // run() {
  //   for (;;) {
  //     const callback = (this._currentTurnWhite ? this.whiteFn : this.blackFn);
  //
  //     callback(this).then((move) => {
  //
  //     });
  //   }
  // }

  newGame() {
    this.restoreGame(INITIAL_BOARD);
    this.gameStates = [];
  }

  // Restore the game state from a FEN string
  restoreGame(fenString) {
    const parts = fenString.split(' ');
    this._board = __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */].restoreState(parts[0]);
    this._currentTurnWhite = parts[1] === 'w';

    this._restoreCastling(parts[2]);
    this._restoreEnPassant(parts[3]);
    this.halfMoveCount = parseInt(parts[4], 10);
    this.moveCount = parseInt(parts[5], 10);
  }

  // Produce a FEN string for the current game state
  persistGame() {
    const state = [this.getBoard().persistState()];
    state.push(this.getCurrentTurn() === 'white' ? 'w' : 'b');
    state.push(this._persistCastling());
    state.push(this._persistEnPassant());
    state.push(this.halfMoveCount);
    state.push(this.moveCount);
    return state.join(' ');
  }

  getPiece(label) {
    return this.getBoard().getSpace(...__WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */].labelToCoords(label));
  }

  setPiece(label, ch) {
    this._board = this.getBoard().setSpace(...__WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */].labelToCoords(label), ch);
  }

  getMoves(label) {
    const moves = this.getBoard().getMoves(...__WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */].labelToCoords(label));

    return moves.map((m) => {
      return {
        from: label,
        to: __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */].coordsToLabel(m.x, m.y),
        capture: m.capture === true,
        promotion: m.promotion === true,
      };
    });
  }

  getStates() {
    return this._gameStates;
  }

  // Returns a promise
  move(from, to, options = {}) {
    const [fromX, fromY] = __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */].labelToCoords(from);
    const [toX, toY] = __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */].labelToCoords(to);

    // Sanity check and error-raising
    const piece = this.getBoard().getSpace(fromX, fromY);

    if (__WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */].isWhite(piece) !== this._currentTurnWhite) {
      throw new Error('Invalid move: Wrong piece color');
    }

    const move = this.getMoves(from).find(m => m.to === to);

    if (!move) {
      throw new Error(`Invalid move: Can't move from ${from} to ${to}`);
    }

    return new Promise((resolve, reject) => {
      let movePromise = Promise.resolve();

      if (move.promotion) {
        if (!options.promotion) {
          throw new Error('This move requires a promotion but options.promotion was null');
        }
        movePromise = options.promotion(this, to, piece);
      }

      movePromise.then((promotion) => {
        const newBoard = this._board.move(fromX, fromY, toX, toY, promotion);
        this._gameStates.push(this.persistGame());
        this._board = newBoard;
        this._currentTurnWhite = !this._currentTurnWhite;
        resolve();
      });
    });
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
    // if it's white's turn, black just moved and white may be in mate
    if (this._currentTurnWhite === true && this._board.playerIsInCheckMate(true)) {
      return 'black';
    }

    // It's black's turn, white just moved and black may be in mate
    if (this._currentTurnWhite === false && this._board.playerIsInCheckMate(false)) {
      return 'white';
    }

    return undefined;
  }

  getPlayerInCheck() {
    return ['white', 'black'].find(color => this.playerIsInCheck(color));
  }

  playerIsInCheck(color) {
    if (color !== 'white' && color !== 'black') {
      throw new Error(`Invalid color given to #playerIsInCheck: ${color}`);
    }

    return this._board.playerIsInCheck(color === 'white');
  }

  getSpace(rank, file) {
    if (arguments.length === 2) {
      return this.getBoard().getSpace(rank, file);
    }
    return this.getBoard().getSpace(rank);
  }

  getBoard() {
    return this._board;
  }

  getCurrentTurn() {
    return this._currentTurnWhite ? 'white' : 'black';
  }

  eachSpace(callback) {
    this.getBoard().eachSpace((x, y, ch) => {
      callback(__WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */].coordsToLabel(x, y), ch);
    });
  }

  static getPieceColor(ch) {
    return __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */].isWhite(ch) ? 'white' : 'black';
  }

  static getSpaceColor(ch) {
    const [x, y] = __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */].labelToCoords(ch);
    return __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */].getSpaceColor(x, y);
  }

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
    if (toSpace.getPiece() && toSpace.getPiece().ch.toLowerCase() === 'k') {
      return false;
    }

    return true;
  }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Chess;


Chess.ROW_LABELS = __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */].ROW_LABELS;
Chess.COL_LABELS = __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */].COL_LABELS;

if (typeof window !== 'undefined') {
  window.Chess = Chess;
} else if (typeof exports !== 'undefined') {
  exports.Chess = Chess;
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__move__ = __webpack_require__(1);



class PawnMove extends __WEBPACK_IMPORTED_MODULE_1__move__["a" /* default */] {
  constructor(x, y, prev, capture) {
    super(x, y, prev);

    // When true, this move is a diagonal capture
    // When false, this move is an orthogonal advance of 1 or 2 spaces
    this.capture = capture;

    // When true, this move requires selection of a piece to promote to
    this.promotion = (y === 0 || y === 7);
  }

  setNext(next) {
    this.next = next;
    next.prev = this;
  }

  setPrev(prev) {
    prev.setNext(this);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PawnMove;



/***/ })
/******/ ]);