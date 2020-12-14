/*
문제
가위바위보 게임은 2인 이상의 사람이 동시에 '가위, 바위, 보'를 외치고 
동시에 가위, 바위 또는 보 중에서 한 가지를 의미하는 
손 모양을 내밀어 승부를 결정짓는 게임이다. 세 판의 가위바위보 게임을 할 경우, 
한 사람은 세 번의 선택(예. 가위, 가위, 보)을 할 수 있습니다. 
세 번의 선택으로 가능한 모든 경우의 수를 구하는 함수를 작성합니다.

출력
2차원 배열(arr[i])을 리턴해야 합니다.
arr[i]는 전체 경우의 수 중 한 가지 경우(총 세 번의 선택)를 의미하는 배열입니다.
arr[i]는 'rock', 'paper', 'scissors' 중 한 가지 이상을 요소로 갖는 배열입니다.
arr[i].length는 3입니다.

주의사항
최종적으로 리턴되는 배열의 순서는 가중치 적용 정렬(Weighted Sort)을 따릅니다.
중요도는 'rock', 'paper', 'scissors' 순으로 높습니다.
쉽게 생각해 올림픽 순위 결정 방식을 참고하면 됩니다.
금메달('rock')이 은메달('paper')보다 우선하고, 은메달('paper')이 동메달('scissors')보다 우선합니다.

입출력 예시
let output = rockPaperScissors();

console.log(output);
/*
    [
      ["rock", "rock", "rock"],
      ["rock", "rock", "paper"],
      ["rock", "rock", "scissors"],
      ["rock", "paper", "rock"],
      // ...etc ...
		]
		
*/

const rockPaperScissors = function (rounds) {
  rounds = rounds || 2;
  const rps = ['rock', 'paper', 'scissors'];
	const outcomes = [];
//recursion function
  let permutate = function (roundsToGo, playedSoFar) {
		//basc case
    if (roundsToGo === 0) {
			outcomes.push(playedSoFar);
      return;
		}
		//recusrion
    for (let i = 0; i < rps.length; i++) {
      let currentPlay = rps[i];
			permutate(roundsToGo - 1, playedSoFar.concat(currentPlay));
			//첫번째 재귀 permutate( 2 , [] ) i = 0 
			//두번째 재귀 permutate( 1, ['rock'] ) i = 0 
			//세번째 재귀 permutate( 0, ['rock','rock'] ) i = 1  , return outcomes = ['rock','rock']
			//두번째 재귀 permutate( 0, ['rock','paper']) i =1 , return outcomes = ['rock','paper']
			//세번째 재귀 permutate( 0, ['rock','scssors']) i = 2 , return outcomes = ['rock','scissors']
    }
  };
  permutate(rounds, []);
  return outcomes;
};
console.log(rockPaperScissors())



