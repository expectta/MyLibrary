class TreeNode {
  constructor(value) {
    this.value = value;
    this.children = [];
  }

  insertNode(value) {
		let treeNode = new TreeNode(value);
		// {value : 1 , childern :[{value : 2 , childern :[]}]}
		this.children.push(treeNode);
	}

  contains(value) {
		let result = false;
		let currentNode = this;
		if(this.value === value){
			result =  true;
			return;
		}
		function recursion(element, value){
			let result = false;
			if(element.value === value){
				result = true;
				return result;
			}
			for(let i = 0 ; i < element.children.length; i++){
				result = this.recursion(element.children[i],value);
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