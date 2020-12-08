class Stack {
  constructor() {
		//stack으로 관리 될 요소들의 집함을 객체로 담는다.
		this.storage = {};
		//	항상 가장 최근의 요소의 위치를 가리켜야한다.
    this.top = -1;
  }
	//storage가 가지는 키의 수
  size() {
		return this.top + 1;
	}
	//storage에 마지막에 삽입할 요소
  push(element) {
		this.top ++;
		this.storage[this.top]= element;
	}
	//storage 마지막 요소를 삭제
  pop() {
		
		if(this.top === -1){
			return '해당 storage가 비어있습니다.'
		}
		delete this.storage[this.top];
		this.top--;
		//마지막 요소를 삭제
		return temp;
	}
}