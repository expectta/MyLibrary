var Tree = function(value) {
  this.value = value;
  this.children = [];
};

Tree.prototype.addChild = function(child) {
  if (!child || !(child instanceof Tree)) {
    child = new Tree(child);
  }
  this.children.push(child);
  // return the tree for convenience
  return this;
};

Tree.prototype.map = function(callback) {
  return this.children.reduce(function(tree, child) {
    return tree.addChild(child.map(callback));
  }, new Tree(callback(this.value)));
};