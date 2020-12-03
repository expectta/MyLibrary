
class Queue {
  constructor() {
		//queue 저장될 요소들
		this.storage = {};
    this.front = 0;
    this.rear = 0;
  }
	//storage의 길이
  size() {
		return this.rear - this.front;
	}
	//요소를 큐의 뒤에 추가합니다
  enqueue(element) {
		this.storage[this.rear]= element;
		this.rear++;
	}
	//요소를 큐의 앞에서 제거하고 반환합니다
  dequeue() {
		let temp = this.storage[this.front];
		if(this.rear === 0){
			return '해당 storage가 비어있습니다.'
		}
		delete this.storage[this.front];
		//객체가 가지는 요소의 수 보다 dequeue의 횟수가 많으면 size()의 값이 음수값으로 되는것을 방지함.
		if(this.rear - this.front  <= 0){
			return 0;
		}
		this.front++;
		return temp;
	}
}