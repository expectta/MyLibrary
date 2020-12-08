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

//하노이탑 재귀함수
function hanoi (num, from, to, other) {
  // num: 원반의 수
  // from: 원반들이 위치한 곳의 번호
  // to: 원반들을 옮길 목적지 번호
  // other: 나머지 한 곳(목적지가 아닌) 곳 번호
  // 모두 옮겼으면 종료
  if (num === 0) return;
  // 가장 아래 원반을 제외한 원반들을 재귀적으로 목적지가 아닌 곳으로 옮김
  hanoi(num - 1, from, other, to);
  // 가장 아래 원반을 목적지로 옮김
  console.log(`${from}번에서 ${to}로 옮긴다.`);
  // 목적지가 아닌 곳으로 옮겼던 원반들을 재귀적으로 목적지로 옮김
  hanoi(num - 1, other, to, from);
}
hanoi(3 ,'A' , 'B' ,"C");
/*
A번에서 B로 옮긴다.
A번에서 C로 옮긴다.
B번에서 C로 옮긴다.
A번에서 B로 옮긴다.
C번에서 A로 옮긴다.
C번에서 B로 옮긴다.
 */

// 1. 탈출조건
// 재귀는 탈출조건이 없다면 계속 자신을 호출하다가 call stack error를 만나게 될겁니다.
// 메모리는 한정적인데 계속 호출해서 사용했다는 이야기가 되겠네요.
// 따라서 탈출조건은 아주 중요합니다
// factorial을 구하는 재귀 함수에서 탈출조건을 if문으로 명시하고 있습니다.
// 재귀를 호출할때 number - 1 연산에서 점진적으로 number값을 줄여나가 탈출조건 if문을 만나면
// 더이상 재귀를 하지 않게 됩니다.

// 2. base case
// 탈출조건과 base case는 어떻게보면 같은 기능을 한다고 생각 할 수 있지만, 차이가 조금 있습니다. 탈출은 잘못된 값 또는 재귀를 멈춰야하는 필요한 상황에 대응하기 위함이고, base case는 원하는 결과물을 얻기위해 마지막 연산의 조건이라 생각하면 될것 같습니다.
// factorial(4)의 경우 4 x 3 x 2 x 1 순서라면 number가 0일때 1을 리턴하여 재귀를 멈추고 리턴 되는 값을 연산하게 됩니다.
function factorial(number){
  //탈출조건
  if(number < 0){
    return;
  }
  //base case
  if(number === 0){
	return 1;
  }
  
  //recursion
  return number * factorial( number -1 );
}
factorial(4);
//결과 24

//webbrowser에 동일한 화면을 출력 해야 할 경우 재귀함수를 쓸때
//설명 : createTreeView 함수가 menu라는 객체를 요소로가지고 있는 배열을 입력받아 
//해당 배열 내 요소의 property를 통해 화면에 배열의 길이만큼의 동일한 element를 만든다.
function createTreeView(menu, currentNode) {
	menu.forEach(function(element) {
		if(Array.isArray(element.children) ){

			const liElement = document.createElement('li');
			const inputElement = document.createElement('input');
			const ulElement = document.createElement('ul');
			const spanElement = document.createElement('span');
			inputElement.type = "checkbox";
			spanElement.textContent = element.name;
			liElement.append(inputElement , spanElement ,ulElement);
			
			createTreeView(element.children, ulElement);
			currentNode.append(liElement);
		
		}else if(element.children === undefined){
			const rawElement = document.createElement('li');
			rawElement.textContent = element.name;
			currentNode.append(rawElement);
		}
	});
}

createTreeView(menu, root);
