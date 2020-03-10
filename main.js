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
}

let testBinaryTree = new BinarySearchTree();

testBinaryTree.insert(10, 10);
testBinaryTree.insert(15, 20);
testBinaryTree.insert(5, 2);
testBinaryTree.insert(9, 2);
testBinaryTree.insert(20, 2);

console.log(testBinaryTree);
