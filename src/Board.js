// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)
 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // var row = this.get(rowIndex);
      // var count = 0;
      // //console.log(row);
      // for (var i = 0; i < row.length; i++) {
      //   if (row[i] === 1) {
      //     count++;
      //     //console.log(count);
      //   }
      // }
      // return count > 1;
      // //return false; // fixme

      var row = this.get(rowIndex);
      var count = 0;

      for ( var i = 0; i < row.length; i++ ) {
        count += row[i];
      }

      return count > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // //get the board
      // var board = this.rows();
      // //console.log(row);
      // //use for loop thru the board
      // //use hasRowConflictAt(currentRow)
      // for (var i = 0; i < board.length; i++) {
      //   if (this.hasRowConflictAt(i)) {
      //     return true;
      //   }
      // }
      // return false; // fixme

      var size = this.get('n');

      for ( var i = 0; i < size; i++ ) {
        if ( this.hasRowConflictAt(i) ) {
          return true;
        }
      }

      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // var board = this.rows();
      // var count = 0;
      // for (var i = 0; i < board.length; i++) {
      //   var row = this.get(i);
      //   if (row[colIndex] === 1) {
      //     count++;
      //   }
      // }
      // return count > 1; // fixme

      var size = this.get('n');
      var count = 0;

      for ( var i = 0; i < size; i++ ) {
        var row = this.get(i);
        count += row[colIndex];
      }

      return count > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // var board = this.rows();
      // for (var i = 0; i < board.length; i++) {
      //   if (this.hasColConflictAt(i)) {
      //     return true;
      //   }
      // }
      // return false; // fixme

      var size = this.get('n');

      for ( var i = 0; i < size; i++ ) {
        if ( this.hasColConflictAt(i) ) {
          return true;
        }
      }

      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //console.log(majorDiagonalColumnIndexAtFirstRow);
      // var board = this.rows();
      // var count = 0;
      // var columnIndex = majorDiagonalColumnIndexAtFirstRow;
      // for (var row = 0; row < board.length; row++) {
      //   for (var column = 0; column < board.length; column++) {
      //     if (board[row][column] === 1) {
      //       if (column - row === columnIndex) {
      //         count++;
      //         if (count > 1) {
      //           return true;
      //         }
      //       }
      //     }
      //   }
      // }
      // return false;

      //   var row = this.get(i);
      //   //console.log(row);
      //   //if (row[i][columnIndex])
      //   if (row[columnIndex] === 1) {
      //     count++;
      //   }
      //   columnIndex = columnIndex + 1;
      // }
      // //  check row at columns,
      // //  next time column = column + 1
      // return count > 1; // fixme

      var size = this.get('n');
      var count = 0;
      var rowIdx = 0;
      var colIdx = majorDiagonalColumnIndexAtFirstRow;

      for ( ; rowIdx < size && colIdx < size; rowIdx++, colIdx++ ) {
        if ( colIdx >= 0 ) {
          var row = this.get(rowIdx);
          count += row[colIdx];
        }
      }

      return count > 1;
    },

    /*
[
  [1, 1, 1],
  [1, 1, 0],
  [0, 0, 0]
]
*/

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // var board = this.rows();
      // var allColumns = 1 - board.length;
      // for (var i = allColumns; i < board.length; i++) {
      //   if (this.hasMajorDiagonalConflictAt(i)) {
      //     return true;
      //   }
      // }
      // return false; // fixme

      var size = this.get('n');

      for ( var i = 1 - size; i < size; i++ ) {
        if ( this.hasMajorDiagonalConflictAt(i) ) {
          return true;
        }
      }

      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // var board = this.rows();
      // var count = 0;
      // var columnIndex = minorDiagonalColumnIndexAtFirstRow;
      // for (var row = 0; row < board.length; row++) {
      //   for (var column = 0; column < board.length; column++) {
      //     if (board[row][column] === 1) {
      //       if (column + row === columnIndex) {
      //         count++;
      //       }
      //     }
      //   }
      // }
      // return count > 1; // fixme

      var size = this.get('n');
      var count = 0;
      var rowIdx = 0;
      var colIdx = minorDiagonalColumnIndexAtFirstRow;

      for ( ; rowIdx < size && colIdx >= 0; rowIdx++, colIdx-- ) {
        if ( colIdx < size ) {
          var row = this.get(rowIdx);
          count += row[colIdx];
        }
      }

      return count > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // var board = this.rows();
      // var extendedColumnLength = 2 * (board.length) - 1;
      // for (var i = 0; i < extendedColumnLength; i++) {
      //   if (this.hasMinorDiagonalConflictAt(i)) {
      //     return true;
      //   }
      // }
      // return false; // fixme

      var size = this.get('n');

      for ( var i = (size * 2) - 1; i >= 0; i-- ) {
        if ( this.hasMinorDiagonalConflictAt(i) ) {
          return true;
        }
      }

      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());