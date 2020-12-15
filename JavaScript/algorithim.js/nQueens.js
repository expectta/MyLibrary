// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function () {
	/* eslint-disable */
	//model은 데이터를 가지고 있고 수정할 수 있다.
  window.Board = Backbone.Model.extend({
    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log(
          'Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:'
        );
        console.log(
          '\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: const board = new Board({n:5})',
          'color: blue;',
          'color: black;',
          'color: blue;',
          'color: black;',
          'color: grey;'
        );
        console.log(
          '\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: const board = new Board([[1,0,0],[0,1,0],[0,0,1]])',
          'color: blue;',
          'color: black;',
          'color: blue;',
          'color: black;',
          'color: blue;',
          'color: black;',
          'color: blue;',
          'color: black;',
          'color: blue;',
          'color: black;',
          'color: blue;',
          'color: black;',
          'color: blue;',
          'color: black;',
          'color: blue;',
          'color: black;',
          'color: blue;',
          'color: black;',
          'color: blue;',
          'color: black;',
          'color: grey;'
        );
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    // 체스 판의 모든 행 배열을 반환합니다.
    // 결과적으로 2차원 배열 형태의 체스 판이 반환됩니다.
    // ex)
    // [
    //  [0,0,0,0],
    //  [0,0,0,0],
    //  [0,0,0,0],
    //  [0,0,0,0]
    // ]
    rows: function () {
      return _(_.range(this.get('n'))).map(function (rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    // 특정 좌표에 말이 없으면 올리고, 이미 있으면 내립니다.
    togglePiece: function (rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = +!this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    // 특정 좌표가 주어졌을 때, 해당 좌표를 지나는 슬래시 대각선(slash, /)의 첫 번째 행 컬럼을 반환합니다.
    // ex) rowIndex: 1, colIndex: 3이 주어졌을 때 4 반환
    //          -1 0 1 2 3 4
    // ----------------------
    //       0    [0,0,0,0]1
    //       1    [0,1,0,1]
    //       2    [0,0,1,0]
    //       3    [0,1,0,0]
    _getFirstRowColumnIndexForSlashOn: function (rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    // 특정 좌표가 주어졌을 때, 해당 좌표를 지나는 역 슬래시 대각선(backslash, \)의 첫 번째 행 컬럼을 반환합니다.
    // ex) rowIndex: 1, colIndex: 0이 주어졌을 때 -1 반환
    //          -1 0 1 2 3 4
    // ----------------------
    //       0   1[0,0,0,0]
    //       1    [1,0,0,0]
    //       2    [0,1,0,0]
    //       3    [0,0,1,0]
    _getFirstRowColumnIndexForBackSlashOn: function (rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    // 체스 판 위에 서로 공격할 수 있는 룩이 한 쌍이라도 있는지 검사합니다.
    hasAnyRooksConflicts: function () {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    // 체스 판 위 특정 좌표를 기준으로, 서로 공격할 수 있는 룩이 한 쌍이라도 있는지 검사합니다. (가로, 세로)
    hasAnyRooksConflictsOn: function (rowIndex, colIndex) {
      return this.hasRowConflictAt(rowIndex) || this.hasColConflictAt(colIndex);
    },

    // 체스 판 위에 서로 공격할 수 있는 퀸이 한 쌍이라도 있는지 검사합니다.
    hasAnyQueensConflicts: function () {
      return (
        this.hasAnyRooksConflicts() ||
        this.hasAnySlashConflicts() ||
        this.hasAnyBackSlashConflicts()
      );
    },

    // 체스 판 위 특정 좌표를 기준으로, 서로 공격할 수 있는 퀸이 한 쌍이라도 있는지 검사합니다. (가로, 세로, 슬래시(/), 역 슬래시(\))
    // 이 함수는 BorderView.js 파일에서 브라우저에 체스판을 그려주기 위해 사용합니다.
    hasAnyQueenConflictsOn: function (rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasSlashConflictAt(
          this._getFirstRowColumnIndexForSlashOn(rowIndex, colIndex)
        ) ||
        this.hasBackSlashConflictAt(
          this._getFirstRowColumnIndexForBackSlashOn(rowIndex, colIndex)
        )
      );
    },

    // 주어진 좌표가 체스 판에 포함되는 좌표인지 확인합니다.
    _isInBounds: function (rowIndex, colIndex) {
      return (
        rowIndex >= 0 &&
        rowIndex < this.get('n') &&
        colIndex >= 0 &&
        colIndex < this.get('n')
      );
    },
    /* eslint-enable */

    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /* =========================================================================
    =                 TODO: fill in these Helper Functions                    =
    ========================================================================= */

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
		// 주어진 행(rowIndex)에 충돌하는 말이 있는지 확인합니다.
		// 충돌이 발생했을때 true return
    hasRowConflictAt: function (rowIndex) {
			//rowIndex는 행의 배열을 가지는 파라미터
			//rowIndex의 배열에 piece가 1개 이상인지 순회를 하여 확인한다.
			//1개 이상일 경우 false
			//1개 이하일 경우 true
			let checkedArray = this.get(rowIndex).filter(function(element){
				return element === 1;
			});
			
			if(checkedArray.length > 1){
				return true;
			}
      return false; // fixme
    },

		// 체스 판 위에 행 충돌이 하나라도 있는지 검사합니다.
		// 충돌이 있을경우 true return
    hasAnyRowConflicts: function () {
			let result = false;
			//생성된 2차의 길이를 확인.
			//!!!!
			//2차 배열의 크기는 테스트마다 달라 질 수 있으므로
			//2차배열이 생성 완료 된 후 길이를 지정한다.
			let lengthForRow  = this.rows().length;
			//2차배열의 길이만큼 순회하여 각 row내 충돌되는 값이 있는지 확인
			for(let i = 0; i < lengthForRow; i++){
				result = this.hasRowConflictAt(i)
				//하나라도 충돌이 있으면 함수 탈출.
				if(result){
					result = true;
					return result;
				}
			}
      return false; // fixme
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
		// 주어진 열(colIndex)에 충돌하는 말이 있는지 확인합니다.
		// 충돌이 있을때 ture return
    hasColConflictAt: function (colIndex) {
			let rows = this.rows();
			let count = 0;
			//2차배열에서 각 행의배열 
			//     0  1  2  3   열
			/*  0  0  0  1  1 
					1  0  1  0  0 
					2  0  1  0  0
					3  0  0  0  0
			 		행
			*/     
			//입력받은 파라미터(colIndex)값을 기준으로 하는 세로 값에
			//piece가 중복으로 배치 되어 있는지를 확인
			for(let element of rows){
				if(element[colIndex] === 1 ){
					count ++;
				}
			}
			if(count > 1){
				return true;
			}
      return false; // fixme
    },

		// 체스 판 위에 열 충돌이 하나라도 있는지 검사합니다.
		// 충돌이 있을때 true return
    hasAnyColConflicts: function () {
			let lengthForCol  = this.rows().length;

			for(let i = 0; i < lengthForCol; i++){
				result = this.hasColConflictAt(i)
				//하나라도 충돌이 있으면 함수 탈출.
				if(result){
					result = true;
					return result;
				}
			}
      return false; // fixme
    },

    // Slash (/) - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
		// 주어진 슬래시 대각선(/)에 충돌하는 말이 있는지 확인합니다.
		//            0  1  2  3   열
			//-3 -2 -1  0  0  0  0 
			//   -2 -1  0  1  0  0 
			// 	  	-1  0  0  0  0
			// 	   	    1  0  0  0
			// 		행
			// */     
    hasSlashConflictAt: function (SlashColumnIndexAtFirstRow) {
			let rows = this.rows();
			//count는 충돌을 확인하기 위해 piece가 몇개 놓여있는지 확인하기 위함
			let count = 0;
			for(let i = 0 ; i < rows.length; i++){
				for(let j = 0 ; j < rows[i].length; j++){
					//colIndex를 순회하며 충돌 좌표값과 동일한지 확인
					if(i + j === SlashColumnIndexAtFirstRow){
						if(rows[i][j] === 1){
							count++;
						}
					}
				}
			}
			if(count > 1){
				return true;
			}
      return false; // fixme
    },

    // 체스 판 위에 슬래시 대각선(/)에 충돌이 하나라도 있는지 검사합니다.
    hasAnySlashConflicts: function () {
			let rows = this.rows();
			//slash 충돌 좌표  =  x + y 
			//board 4 x 4 의 slash 충돌 좌표가 최대 값이 6까지 있으므로 for문의 조건문설정
			for(let i = 0 ; i < rows.length * 2 - 1; i++){
				if(this.hasSlashConflictAt(i)){
					return true;
				}
			}
      return false; // fixme
    },

    // BackSlash (\) - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // 주어진 역 슬래시 대각선(\)에 충돌하는 말이 있는지 확인합니다.
    hasBackSlashConflictAt: function (BackSlashColumnIndexAtFirstRow) {
      let rows = this.rows();
			let count = 0;
			for(let i = 0 ; i < rows.length; i++){
				for(let j = 0 ; j < rows[i].length; j++){
					//colIndex를 순회하며 충돌 좌표값과 동일한지 확인
					if(j - i === BackSlashColumnIndexAtFirstRow){
						if(rows[i][j] === 1){
							count++;
						}
					}
				}
			}
			if(count > 1){
				return true;
			}
      return false;// fixme
    },

    // 체스 판 위에 역 슬래시 대각선(\) 충돌이 하나라도 있는지 검사합니다.
    hasAnyBackSlashConflicts: function () {
			let rows = this.rows();
			//backSlash 충돌 좌표 = y - x
			//board 4 x 4의 backSlash 충돌 좌표가 최소 -3부터 시작
			for(let i = -(rows.length) ; i < rows.length; i++){
				if(this.hasBackSlashConflictAt(i)){
					return true;
				}
			}
      return false; // fixme
    },

    /* --------------------  End of Helper Functions  --------------------- */
  });
  /* eslint-disable */
  const makeEmptyMatrix = function (n) {
    return _(_.range(n)).map(function () {
      return _(_.range(n)).map(function () {
        return 0;
      });
    });
  };
  /* eslint-enable */
})();
/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

// n이 주어졌을 때 n rooks 문제의 해답 한 개를 반환합니다.
// 반환 값은 체스 판을 나타내는 2차원 배열입니다.
window.findNRooksSolution = function (n) {
	//입력받은 n의 크기만큼의 2차배열을 생성.
	let board = new Board({n:n});
	// const solution = board.rows();// fixme
	// for(let  row= 0 ; row < n ; row++){
	// 	for(let col = 0 ;col < n ; col++){
	// 		//board에 토글하여 piece를 배치
	// 		board.togglePiece(row, col);
	// 		//hasAnyRooksConflicts함수에서 가로/세로의 충돌 여부를 판단하고 출동(반환값 true)이 있을경우
	// 		//해당 좌표의 piece를 제거한다.
	// 		if(board.hasAnyRooksConflicts(row, col)){
	// 			board.togglePiece(row, col);
	// 		}			
	// 		}
	// 	}
	// 	//재귀로 바꿀수 있다.
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
	// return solution;
	const solution = board.rows();
  // for (let row = 0; row < n; row++) {
  //   for (let column = 0; column < n; column++) {
  //     board.togglePiece(row, column);
  //     if (board.hasAnyRooksConflicts()) {
  //       board.togglePiece(row, column);
  //     }
  //   }
  // }
  const recursion = function (rowIdx) {
		//base case
		//체스판이 다 찰경우
    if (rowIdx === n) {
      return;
		}
		//recusrion
    for (let i = 0; i < n; i++) {
			board.togglePiece(rowIdx, i);
			//충돌이 발생하면
      if (board.hasAnyRooksConflictsOn(rowIdx, i)) {
        board.togglePiece(rowIdx, i);
			}
			//1,0으로 참 거짓을 확인
      if (solution[rowIdx][i]) {
        recursion(rowIdx + 1);
      }
    }
  };
  recursion(0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// n이 주어졌을 때 n rooks 문제의 전체 해답 개수를 반환합니다.
// 반환 값은 정수입니다.
window.countNRooksSolutions = function (n) {
		let solutionCount = 0; // fixme
		let board = new Board({ n: n });
		const recursion = function (rowIndex) {
			//base case
			if (rowIndex === n && !board.hasAnyRooksConflicts()) {
				solutionCount++;
				return;
			}
			//recusion
			// 좌표 (0 , 0) piece 배치 > 충돌없음 > recursion(1) 실행
				// [1 , 0 , 0 , 0]
				// 좌표 (1 , 0) piece 배치 > 충돌있음 (0 , 0) > piece 제거 > 다음 colIndex 이동
				// 좌표 (1 , 1) piece 배치 > 충돌없음 > recursion(2) 실행
				//[1 , 0 , 0 , 0]
				//[0 , 1 , 0 , 0]
				//좌표 (2 , 0) piece 배치 > 충돌있음 (0 , 0) > piece 제거 > 다음 colIndex 이동
				//좌표 (2 , 1) piece 배치 > 충돌있음 (1 , 1) > piece 제거 > 다음 colIndex 이동
				//좌표 (2 , 2) piece 배치 > 충돌없음 > recursion(3)실행.
				//[1 , 0 , 0 , 0]
				//[0 , 1 , 0 , 0]
				//[0 , 0 , 1 , 0]
				//좌표 (3 , 0) piece 배치 > 충돌있음 (0, 0) > piece 제거 > 다음 colIndex 이동
				//좌표 (3 , 1) piece 배치 > 충돌있음 (1, 1) > piece 제거 > 다음 colIndex 이동
				//좌표 (3 , 2) piece 배치 > 충돌있음 (2, 2) > piece 제거 > 다음 colIndex 이동
				//좌표 (3 , 3) piece 배치 > 충돌없음 > resucrion(4)실행.
				//[1 , 0 , 0 , 0]
				//[0 , 1 , 0 , 0]
				//[0 , 0 , 1 , 0]
				//[0 , 0 , 0 , 1]
				//base case 재귀 종료

			for (let i = 0; i < n; i++) {
				board.togglePiece(rowIndex, i);
				if (!board.hasAnyRooksConflicts()) {
					//가로/세로의 충돌이 발생하지 않을 경우 다음 rowIndex로 재귀실행.
					recursion(rowIndex + 1);
				}
				//충돌이 발생하면 해당 좌표의 piece를 제거.
				board.togglePiece(rowIndex, i);
			}
		};
		recursion(0);
		console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
		return solutionCount;
};

// n이 주어졌을 때 n queens 문제의 해답 한 개를 반환합니다.
// 반환 값은 체스 판을 나타내는 2차원 배열입니다.
window.findNQueensSolution = function (n) {
  let board = new Board({n:n});
	const solution = board.rows();
	let count = 0;

  const recursion = function (rowIdx) {
		//base case
    if (rowIdx === n) {
      return ;
		}
		//recusrion
    for (let i = 0; i < n; i++) {
				board.togglePiece(rowIdx, i);
				count++;
			//충돌이 없을때 재귀실행
      if (!board.hasAnyQueenConflictsOn(rowIdx, i)) {
				recursion(rowIdx + 1);
			}
      if (count === n && !board.hasAnyQueenConflictsOn(rowIdx, i)) return;
			board.togglePiece(rowIdx, i);
			count--;

    }
  };
  recursion(0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// n이 주어졌을 때 n queens 문제의 전체 해답 개수를 반환합니다.
// 반환 값은 정수입니다.
window.countNQueensSolutions = function (n) {
  const board = new Board({ n: n });
  let solutionCount = 0;
  const recursion = function (rowIdx) {
    if (rowIdx === n) {
      solutionCount++;
      return;
    }
    for (let i = 0; i < n; i++) {
      board.togglePiece(rowIdx, i);
      if (!board.hasAnyQueenConflictsOn(rowIdx, i)) {
        recursion(rowIdx + 1);
      }
      board.togglePiece(rowIdx, i);
    }
  };
  recursion(0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


















