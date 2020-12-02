//this는 함수 실행시 호출(invocation) 방법에 의해 결정되는 특별한 객체입니다. 
//함수 실행시 결정되므로, 실행되는 맥락(execution context)에 따라 this는 다르게 결정됩니다.

//webBrowser에서 실행 시 this	바인딩 패턴
//1. global : 전역의 this를 참조하게 된다.
console.log(this);
// 결과 Window {0: global, 1: global, window: Window, self: Window, document: document, name: "", location: Location, …}

//2. function 	호출
function foo(){
	return console.log(this);
}
foo();
// 결과 Window {0: global, 1: global, window: Window, self: Window, document: document, name: "", location: Location, …}

//3. Method호출
let obj = {
	value : 0,
	checkValue : function(){
		console.log(this.value ++);
	}
}
obj.checkValue();
//객체 내 vlaue값에 ++를 한다. 즉 객체의 변수에 접근한다.

//4. new 키워드를 이용한 생성자 호출
class Counter{
	constructor(){
		this.value =0;
	}
	increase(){
		this.value ++;
	}
}
let counter = new Counter();
counter.increase();
console.log(counter.value)
//new 생성자로 인스턴스화 시키면 해당 클래스가 가지고있는 vlaue 변수가 this값이 된다.
