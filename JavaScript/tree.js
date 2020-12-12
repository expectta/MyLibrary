//자료구조 Tree
class TreeNode {
	//Tree의 node
  constructor(value) {
    this.value = value;
    this.children = [];
  }
	//입력된 value 값으로 Tree 생성
  insertNode(value) {
		let treeNode = new TreeNode(value);
		this.children.push(treeNode);
	}
	//Tree에 value가 포함되어 있는지 리턴값으로 확인
  contains(value) {
		let result = false;
		let currentNode = this;
		if(this.value === value){
			result =  true;
			return;
		}
		//recursion 함수를 통해서 node가 있는지 판단.
		function recursion(node, value){
			let result = false;
			if(node.value === value){
				result = true;
				return result;
			}
			for(let i = 0 ; i < node.children.length; i++){
				result = this.recursion(node.children[i],value);
				if(result === true){
					return result;
				}
			}
			return result;
		}
		result = recursion(currentNode, value);
		return result;
	}

	
}