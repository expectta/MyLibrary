/*
재귀함수
*/

//인자는 배열의 요소가 중첩인 상태일때 모든 배열의 중첩을 제거한다.
let arr = [[2, [[3]]], 4, [[[5]]]];
function recursion(arr) {
	//배로운 배열를 리턴하기위한 변수 선언 및 할당.
	let result = [];
	//배열의 길이가 0 일때는 빈 배열 리턴
  if(arr.length === 0){
    return [];
	}
	
	//배열의 각 요소를 검색하기 위한 for문
  for(let i = 0 ; i < arr.length; i ++){
		//배열의 요소를 순회하고, 배열일 경우 재귀함수를 실행한다.
		result = result.concat(Array.isArray(arr[i]) ? 
														//배열일 경우 해당 배열을 인자로하는 재귀함수 호출
														recursion(arr[i]) :
														//배열이 아닐경우 해당 요소를 result에 추가한다.
														[arr[i]]);
  }
  return result;
}
console.log(recursion(arr));
//[2,3,4,5]

//head와 tail을 분리하여 중첩배열을 flat하게 만드는 함수
let arr = [[2, [[3]]], 4, [[[5]]]];
function recursionTwo(arr) {
  // base case
  if (arr.length === 0) {
    return [];
  }

	// recursive case
	//재귀를 순회 할 수 있도록 head와 taril로 배열을 분리
	//head = [2, [[3]]]
	//tail = [4,[[[5]]]]
  const head = arr[0];
	const tail = arr.slice(1);
	//head가 배열인지 여부를 판단
	//head가 배열일 경우
		//spread syntax를 적용해서 head와  tail의 1차 배열을 flat하게 만들고 하나의 배열로만든다
		//[...head] = [2, [[3]]]
		//[...tail] = [4,[[[5]]]]
		// [...head , ...tail] => [2, [[3]], 4 , [[[5]]]]
		// 가장 첫번째 괄호를 하나씩 삭제한 셈이다.

		//다시 recursionTwo함수를 호출하여 head 와 tail로 나눈다.
		//head = 2
		//tail = [[[3]], 4 ,[[[5]]]
		//head는 배열이 아니기 때문에 [head].concat()으로 리턴하게 하고 tail을 인자로 recursion을 재실행하여 반복한다.
  if (Array.isArray(head)) {
    return recursionTwo([...head, ...tail]);
  } else {
    return [head].concat(recursionTwo(tail));
  }
}
//[2,3,4,5]

