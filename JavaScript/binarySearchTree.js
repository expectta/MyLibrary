class BinarySearchTreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
	//Node 추가
	insert(value) {
		let newNode;
		if(this.value === undefined){
			this.value = value;			 
		}else{
			newNode = new BinarySearchTreeNode(value);
			recursion(this);	
		}
		//저장위치에 값이 이미 있을경우 재귀적으로 재 탐색.
		function recursion(currentNode){
			if(currentNode.value >= value){
				if(currentNode.left === null){
					currentNode.left = newNode;
				}else{
					recursion(currentNode.left)
				}				
			}else if(currentNode.value < value){
				if(currentNode.right === null){
					currentNode.right = newNode;
				}else{
					recursion(currentNode.right)
				}
			}
		}
	}
	//Node에 vlaue 존재 여부
	contains(value) {
		let result = false;
		 recursion(this);
	function recursion(currentNode){
		if(currentNode.value >= value){
			if(currentNode.value === value){
				result = true;
				return;
			}else{
				recursion(currentNode.left)
			}		
		}else if(currentNode.value < value){
			if(currentNode.value === value){
				result = true;
				return;
			}else{
				recursion(currentNode.right)
			}
		}
	}
	return result;
	}
	//중위순회
  inorder(callback) {}
}