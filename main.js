// Create binary search tree class
class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  //Add a node to the tree
  insert(key, value) {
    //If tree is empty, the key being inserted will be the root
    if (this.key == null) {
      this.key = key;
      this.value = value;
    } else if (key < this.key) {
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    } else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  //Retrieve value from the tree
  find(key) {
    // Check the root
    if (this.key == key) {
      return this.value;
    }

    // If less than root follow left child, then check if there is a child and recursively check that child to determine which side to follow
    else if (key < this.key && this.left) {
      return this.left.find(key);
    }

    // If greater than the root follow right child then check if there is a child and recursively check that child to determine which side to follow
    else if (key > this.key && this.right) {
      return this.right.find(key);
    }

    // EDGE CASE -> The key is not found
    else {
      throw new Error("Key Error");
    }
  }

  // Remove a node from the tree
  remove(key) {
    if (this.key == key) {
      // If the node being replaced has a right and left child
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }

      // If the node being removed has one child on the left then use this child to replace the node
      else if (this.left) {
        this._replaceWith(this.left);
      }

      // If the node being removed has one right on the right then use this child to replace the node
      else if (this.right) {
        this._replaceWith(this.right);
      }

      // If the node is a leaf (no children) remove it and any reference to it
      else {
        this._replaceWith(null);
      }
    } else if (key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    }

    //EDGE CASE -> Key doesn't exist
    else {
      throw new Error("Key Error");
    }
  }

  // Helper function to replace node with new parent
  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      } else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    } else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  // Helper function to find minimum value of smallest node
  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }
}

let testBinaryTree = new BinarySearchTree();

testBinaryTree.insert(10, 10);
testBinaryTree.insert(15, 20);
testBinaryTree.insert(5, 2);
testBinaryTree.insert(9, 4);
testBinaryTree.insert(8, 200);
testBinaryTree.insert(7, 83);
testBinaryTree.insert(20, 2);
testBinaryTree.insert(17, 25);
testBinaryTree.insert(18, 25);
testBinaryTree.insert(25, 25);

console.log(testBinaryTree);

testBinaryTree.remove(20);

console.log(testBinaryTree);
