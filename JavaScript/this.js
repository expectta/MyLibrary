//this는 함수 실행시 호출(invocation) 방법에 의해 결정되는 특별한 객체입니다. 
//함수 실행시 결정되므로, 실행되는 맥락(execution context)에 따라 this는 다르게 결정됩니다.

//webBrowser에서 실행 시
//1. global : 전역의 this를 참조하게 된다.
console.log(this);
// 결과 Window {0: global, 1: global, window: Window, self: Window, document: document, name: "", location: Location, …}

//function 	호출
function foo(){
	return console.log(this);
}
foo();
// 결과 Window {0: global, 1: global, window: Window, self: Window, document: document, name: "", location: Location, …}

//Method호출
let obj = {
	value : 0,
	checkValue : function(){
		console.log(this.value ++);
	}
}
obj.checkValue();