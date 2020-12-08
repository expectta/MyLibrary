//한번만 실행되는 콜백함수
//리턴하는 함수를 여러 번 호출해도 callback 함수는 한 번 이상 호출되지 않는다.
//onlyOneCall 함수 내의 alreadyCalled  = false 로 할당되어 있지만,
//최초 1회를 호출해서 clllBack 함수를 호출하고 alreadyCalled = true로 재할당 하는 과정에서
//반복적으로 onlyOneCall함수를 호출하더라도 callFunction()을 여러번 호출하더라도 1회만 실행된다.
//callFunction은 함수를 선언한 선언식으로 callFunction에 onlyOneCall함수를 호출 후 변경된 사항을 저장하게된다.

let onlyOneCall = function(func){
	let result;
	let alreadyCalled = false;

	return function(...args){
		if(!alreadyCalled){
			alreadyCalled = true;
			result = func(...args);
		}
		return result;
	};
}
let count = 0;
const callFunction = onlyOneCall(function(){
	count ++;
});
callFunction();
console.log(count); // count = 1 
callFunction();
console.log(count); // count = 1 
callFunction();
console.log(count); // count = 1 

