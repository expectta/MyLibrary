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
