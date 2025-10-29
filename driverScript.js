import { Tree } from "./binarySearchTree.js";

let testArray = [];

for (let i = 0; i < 17; i++) {
    testArray.push(Math.floor(Math.random() * 100));
}

const tree = Tree(testArray);

console.log(tree.isBalanced());

// function printData(x) {
//     console.log(x.data);
// }

tree.prettyPrint(tree.root);

// console.log("level");
// tree.levelOrderForEach(printData);
// console.log("pre");
// tree.preOrderForEach(printData);
// console.log("post");
// tree.postOrderForEach(printData);
// console.log("in");
// tree.inOrderForEach(printData);

for (let i = 0; i < 10; i++) {
    tree.insert(Math.floor(Math.random() * 100) + 100);
}

console.log(tree.isBalanced());
tree.prettyPrint(tree.root);

tree.rebalance();

console.log(tree.isBalanced());
tree.prettyPrint(tree.root);

// console.log("level");
// tree.levelOrderForEach(printData);
// console.log("pre");
// tree.preOrderForEach(printData);
// console.log("post");
// tree.postOrderForEach(printData);
// console.log("in");
// tree.inOrderForEach(printData);
