class Node {
	//해당 클래스는 생성자에 명시된 propertys를 기본적으로 가지는
	//인스턴트를 만들어낸다.
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this._size = 0;
	}
	
	//node를 추가
  addToTail(value) {
		//해당 함수가 실행 될 때마다 value값을 가지는 Node의 인스턴스를 생성.
		let node = new Node(value);
		//현재의 node가 무엇인지 확인하기 위함.
		let currentNode;
		//Node에 저장된 값이 없을때
		if(this.head === null){
			//첫번째 Node를 추가 할 경우 head(시작) 과 tail(끝) 데이터를 동시에 
			//만들어 해당 데이터의 처음과 끝의 영역을 지정한다.
			this.head = node;
			this.tail = node;
		}else{
			//기존 데이터가 1개이상 존재 할 경우
			//!!!!! 데이터를 추가적으로 삽입 할 경우 이전의 head의 next값으로 
			//!!!!! 지정하기 위해서는 현재의 값 즉, this키워드를 사용해야한다.
			currentNode = this.tail;
			currentNode.next = node;
			this.tail = node;
		}
		this._size ++;
	}
	//value값의 노드를 삭제
  remove(value) {
		let currentNode = this.head;
		while(currentNode){
			//삭제 해야할 객체가 this.head일때 this.head를 next node로 이주한다.
			if(currentNode.value === value && currentNode === this.head){
				this.head = currentNode.next;
				delete currentNode.value;
				delete currentNode.next;
			}else if(currentNode.value === value){
				
			}
			currentNode = currentNode.next;
		}
	}

  getNodeAt(index) {}

  contains(value) {}

	//linkedlist 내 value와 값이 같은 node의 index를 리턴
  indexOf(value) {
		let count = 0;
		//현재 인스턴스의 head
		let currentNode = this.head;
		//현재 인스턴스 부터 next 에 저장되어 있는 node를
		//모두 순회하면서 각 node의 value값이 파라미터와
		//같은지 확인한다.
		while(currentNode){
			if(currentNode.value === value){
				return count;
			}
			count ++;
			currentNode = currentNode.next;
		}
		return -1;
	}
  size() {}
}