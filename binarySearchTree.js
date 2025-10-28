function bNode(data, left, right) {
    return { data, left, right };
}

function Tree(nodeArray) {
    root = buildTree(nodeArray);

    function buildTree(nodeArray) {
        mergeSort(nodeArray);
        removeDup(nodeArray);

        return traverse(nodeArray, 0, nodeArray.length - 1);

        /*
            1 2 3 4 5 6 7
    
                4
            2       6
          1   3   5   7
        
        */
    }

    function traverse(array, start, end) {
        if (start > end) return null;

        let mid = start + Math.floor((end - start) / 2);
        let left = traverse(array, start, mid - 1);
        let right = traverse(array, mid + 1, end);

        return (array[mid] = bNode(array[mid], left, right));
    }

    function insert(value) {
        if (root == undefined || root == null) {
            throw new Error("Root is null");
        }

        let currentNode = root;
        let prevNode = currentNode;

        while (true) {
            if (value < currentNode.data) {
                prevNode = currentNode;

                currentNode = currentNode.left;
                if (currentNode == null) {
                    prevNode.left = bNode(value, null, null);
                    break;
                }
            } else if (value > currentNode.data) {
                prevNode = currentNode;

                currentNode = currentNode.right;
                if (currentNode == null) {
                    prevNode.right = bNode(value, null, null);
                    break;
                }
            }
        }
    }

    function deleteItem(value) {
        if (root == undefined || root == null) {
            throw new Error("Root is null");
        }

        let currentNode = root;
        let prevNode = currentNode;

        while (currentNode != null) {
            if (value < currentNode.data) {
                prevNode = currentNode;
                currentNode = currentNode.left;
            } else if (value > currentNode.data) {
                prevNode = currentNode;
                currentNode = currentNode.right;
            } else if (value == currentNode.data) {
                break;
            }
        }

        if (!currentNode) return null;

        let leftNode = currentNode.left;
        let rightNode = currentNode.right;

        if (!leftNode && !rightNode) {
            if (prevNode.left === currentNode) prevNode.left = null;
            else if (prevNode.right === currentNode) prevNode.right = null;
        } else if (!leftNode && rightNode) {
            if (prevNode.left === currentNode) {
                prevNode.left = rightNode;
                currentNode = null;
            } else if (prevNode.right === currentNode) {
                prevNode.right = rightNode;
                currentNode = null;
            }
        } else if (leftNode && !rightNode) {
            if (prevNode.left === currentNode) {
                prevNode.left = leftNode;
                currentNode = null;
            } else if (prevNode.right === currentNode) {
                prevNode.right = leftNode;
                currentNode = null;
            }
        } else if (leftNode && rightNode) {
            // tempNode - used for finding the leftest node on the right branch
            // nextNode - the node after current
            let tempNode = currentNode;
            let nextTempNode;
            let nextNextTempNode;
            tempNode = tempNode.right;
            while (tempNode != null) {
                nextNextTempNode = tempNode;
                tempNode = tempNode.left;
                if (tempNode) {
                    nextTempNode = nextNextTempNode;
                }
            }
            currentNode.data = nextNextTempNode.data;
            if (nextTempNode) {
                if (nextTempNode.left === nextNextTempNode) {
                    let doesRightExist = nextNextTempNode.right;
                    if (doesRightExist) {
                        nextTempNode.left = doesRightExist;
                        return;
                    }
                    nextTempNode.left = null;
                } else if (nextTempNode.right === nextNextTempNode)
                    nextTempNode.right = null;
            } else {
                if (currentNode.right === nextNextTempNode) {
                    let doesRightExist = nextNextTempNode.right;
                    if (doesRightExist) {
                        currentNode.right = doesRightExist;
                        return;
                    }
                    currentNode.right = null;
                } else if (currentNode.left === nextNextTempNode)
                    currentNode.left = null;
            }
        }
    }

    function find(value) {
        let currentNode = root;

        while (currentNode != null) {
            if (value < currentNode.data) {
                currentNode = currentNode.left;
            } else if (value > currentNode.data) {
                currentNode = currentNode.right;
            } else {
                return currentNode;
            }
        }
        return null;
    }

    function levelOrderForEach(callback) {
        let queue = [root];
        if (root == undefined || root == null) {
            throw new Error("Root is null");
        }

        let directionNode = queue[0];
        while (queue.length != 0) {
            directionNode = queue[0];
            if (directionNode == null) {
                queue.splice(0, 1);
                continue;
            }
            queue.push(directionNode.left);
            queue.push(directionNode.right);
            callback(directionNode);
            queue.splice(0, 1);
        }
    }

    function inOrderForEach(callback) {
        let queue = [root];
        if (root == undefined || root == null) {
            throw new Error("Root is null");
        }

        function inOrderTraversal(callback, directionNode) {
            if (directionNode == null) {
                queue.splice(0, 1);
                return;
            }
            queue.push(inOrderTraversal(callback, directionNode.left));
            callback(directionNode);
            queue.push(inOrderTraversal(callback, directionNode.right));
            queue.splice(0, 1);
        }

        inOrderTraversal(callback, queue[0]);
    }

    function preOrderForEach(callback) {
        let queue = [root];
        if (root == undefined || root == null) {
            throw new Error("Root is null");
        }

        function preOrderTraversal(callback, directionNode) {
            if (directionNode == null) {
                queue.splice(0, 1);
                return;
            }
            callback(directionNode);
            queue.push(preOrderTraversal(callback, directionNode.left));
            queue.push(preOrderTraversal(callback, directionNode.right));
            queue.splice(0, 1);
        }

        preOrderTraversal(callback, queue[0]);
    }

    function postOrderForEach(callback) {
        let queue = [root];
        if (root == undefined || root == null) {
            throw new Error("Root is null");
        }

        function postOrderTraversal(callback, directionNode) {
            if (directionNode == null) {
                queue.splice(0, 1);
                return;
            }
            queue.push(postOrderTraversal(callback, directionNode.left));
            queue.push(postOrderTraversal(callback, directionNode.right));
            callback(directionNode);
            queue.splice(0, 1);
        }

        postOrderTraversal(callback, queue[0]);
    }

    const prettyPrint = (node, prefix = "", isLeft = true) => {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            prettyPrint(
                node.right,
                `${prefix}${isLeft ? "│   " : "    "}`,
                false
            );
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            prettyPrint(
                node.left,
                `${prefix}${isLeft ? "    " : "│   "}`,
                true
            );
        }
    };

    function height(value) {

        let currentNode = root;

        while (currentNode != null) {
            if (value < currentNode.data) {
                currentNode = currentNode.left;
            } else if (value > currentNode.data) {
                currentNode = currentNode.right;
            } else {
                let height = 0;

                while (currentNode != null) {

                }

                break;
            }
        }

        return null;
    }

    function depth(value) {
        let depth = 0;

        let currentNode = root;

        while (currentNode != null) {
            if (value < currentNode.data) {
                currentNode = currentNode.left;
                depth++;
            } else if (value > currentNode.data) {
                currentNode = currentNode.right;
                depth++;
            } else {
                return depth;
            }
        }

        return null;
    }

    return {
        root,
        buildTree,
        insert,
        prettyPrint,
        deleteItem,
        find,
        levelOrderForEach,
        inOrderForEach,
        preOrderForEach,
        postOrderForEach,
        height,
        depth
    };
}
// const tree = Tree([1, 2, 3, 4, 5, 6, 9, 10, 11, 12, 13, 15, 16, 17, 20 , 23, 24, 25, 26, 27, 28, 30, 31]);
const tree = Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
// const tree = Tree([1, 2, 3, 4, 5, 6, 7]);
tree.insert(0);

tree.prettyPrint(tree.root);

function removeDup(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = i; j < array.length; j++) {
            if (i != j) {
                if (array[i] == array[j]) {
                    array.splice(j, 1);
                }
            }
        }
    }
}

function mergeSort(array) {
    sort(0, array.length - 1);

    function sort(start, end) {
        if (start < end) {
            let mid = Math.floor((start + end) / 2);
            sort(start, mid);
            sort(mid + 1, end);
            merge(start, mid, end, array);
        }
    }
}

function merge(start, mid, end, array) {
    let A = [];
    let B = [];

    if (end - start != 1) {
        A = array.slice(start, mid + 1);
        B = array.slice(mid + 1, end + 1);
    } else {
        A = [array[start]];
        B = [array[end]];
    }

    let i = 0;
    let j = 0;
    let k = start;

    while (i <= A.length - 1 && j <= B.length - 1) {
        if (A[i] < B[j]) {
            array[k++] = A[i++];
        } else {
            array[k++] = B[j++];
        }
    }

    for (let ii = i; ii < A.length; ii++) {
        array[k++] = A[ii];
    }

    for (let jj = j; jj < B.length; jj++) {
        array[k++] = B[jj];
    }
}
