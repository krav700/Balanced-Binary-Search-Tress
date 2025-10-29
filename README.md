# Balanced-Binary-Search-Tress

## Tree function factory representing a balanced binary search tree containing the following methods:
- `buildTree(array)`: takes an array of data and turns it into a balanced binary tree full of Node objects appropriately placed. The buildTree function returns the level-0 root node.

- `insert(value)`: inserts the given value into the Tree (without balancing it and without allowing duplicates).

- `deleteItem(value)`: deletes the given value from the Tree (without balancing it and doing nothing if the value is not in the Tree).

- `find(value)`: returns the node with the given value or null if the value is not found.

- `levelOrderForEach(callback)`: forEach type of function that executes the callback on each node in the Tree traversing in an breadth-first level order.

- `inOrderForEach(callback)`: forEach type of function that executes the callback on each node in the Tree traversing in an Depth-first In-order.

- `inOrderForEach(callback)`: forEach type of function that executes the callback on each node in the Tree traversing in an Depth-first In-order.

- `postOrderForEach(callback)`: forEach type of function that executes the callback on each node in the Tree traversing in an Depth-first Post-order.

- `preOrderForEach(callback)`: forEach type of function that executes the callback on each node in the Tree traversing in an Depth-first Pre-order.

- `height(value)`: returns the heigh of the node containing the given value.

- `depth(value)`: returns the depth of the node containing the given value.

- `isBalanced()`: returns true/false based on if the tree is balanced.

- `rebalance()`: rebalances an unbalanced tree.

- `root`: the current root of the Tree.