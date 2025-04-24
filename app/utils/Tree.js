import Queue from 'utils/Queue';

class Tree {
  constructor() {
    this.traverseDF = this.traverseDF.bind(this);
    this.traverseBF = this.traverseBF.bind(this);
    this.traverse = this.traverse.bind(this);
    this.contains = this.contains.bind(this);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
  }

  setData = data => {
    this.root = data;
    this.root.selected = true;
    this.root.open = true;
    this.root.parent = null;
  };

  getData = (openAll = false) => {
    this.traverse(openAll);
    // return this.root;
  };

  traverseDF = callback => {
    (function recurse(currentNode) {
      for (let i = 0, { length } = currentNode.nodos; i < length; i += 1) {
        recurse(currentNode.nodos[i]);
      }
      callback(currentNode);
    })(this.root);
  };

  traverse = openAll => {
    const queue = new Queue();

    queue.enqueue(this.root);

    let currentTree = queue.dequeue();

    while (currentTree) {
      for (let i = 0, { length } = currentTree.nodos; i < length; i += 1) {
        currentTree.nodos[i].parent = currentTree;
        currentTree.nodos[i].open = openAll;
        queue.enqueue(currentTree.nodos[i]);
      }

      currentTree = queue.dequeue();
    }
  };

  traverseAux = callback => {
    const queue = new Queue();

    queue.enqueue(this.nodeAux);

    let currentTree = queue.dequeue();

    while (currentTree) {
      for (let i = 0, { length } = currentTree.nodos; i < length; i += 1) {
        queue.enqueue(currentTree.nodos[i]);
      }

      callback(currentTree);
      currentTree = queue.dequeue();
    }
  };

  traverseBF = callback => {
    const queue = new Queue();
    queue.enqueue(this.root);
    let currentTree = queue.dequeue();
    while (currentTree) {
      for (let i = 0, { length } = currentTree.nodos; i < length; i += 1) {
        queue.enqueue(currentTree.nodos[i]);
      }
      callback(currentTree);
      currentTree = queue.dequeue();
    }
  };

  findNode = id => {
    let foundNode;
    this.traverseBF(node => {
      if (node.id === id) {
        foundNode = node;
      }
    });
    return foundNode;
  };

  setSelectedNode = id => {
    let foundNode;

    this.traverseBF(node => {
      foundNode = node;

      if (node.id === id) {
        foundNode.selected = true;
      } else {
        foundNode.selected = false;
      }
    });
  };

  setOpenNode = (id, toggle = false) => {
    let foundNode;
    this.traverseBF(node => {
      foundNode = node;
      if (node.id === id) {
        if (toggle) {
          foundNode.open = !foundNode.open;
        } else {
          foundNode.open = true;
        }
      }
    });
  };

  getParents = (id, open = false) => {
    const node = this.findNode(id);
    const parents = [];

    const getParentsAux = nodeAux => {
      if (nodeAux.parent) {
        if (open) this.setOpenNode(nodeAux.parent.id);
        parents.push(nodeAux.parent);
        getParentsAux(nodeAux.parent);
      }
    };
    parents.push(node);
    getParentsAux(node);

    return parents.reverse();
  };

  isSong = (from, to) => {
    this.nodeAux = this.findNode(from);
    let foundNode = false;
    if (this.nodeAux.nodos) {
      this.traverseAux(node => {
        if (node.id === to) {
          foundNode = true;
        }
      });
    }

    return foundNode;
  };

  moveNode = (from, to) => {
    if (from === to) return false;
    const isParent = this.isSong(from, to);
    if (isParent) return false;
    const fromNode = this.findNode(from);
    const toNode = this.findNode(to);
    this.remove(fromNode.id, fromNode.parent.id, this.traverseBF);
    this.add(fromNode, toNode.id, this.traverseBF);

    return true;
  };

  contains = (callback, traversal) => {
    traversal.call(this, callback);
  };

  add = (data, toData, traversal) => {
    const child = data;
    child.nodos = data.nodos ? data.nodos : [];

    let parent = null;

    const callback = node => {
      if (node.id === toData) {
        parent = node;
      }
    };

    this.contains(callback, traversal);

    if (parent) {
      parent.nodos.push(child);

      child.parent = parent;
    } else {
      // console.log('Cannot add node to a non-existent parent.');
    }
  };

  remove = (data, fromData, traversal) => {
    let parent = null;

    let childToRemove = null;

    let index;

    const callback = node => {
      if (node.id === fromData) {
        parent = node;
      }
    };

    this.contains(callback, traversal);

    if (parent) {
      index = this.findIndex(parent.nodos, data);

      if (index === undefined) {
        //  console.log('Node to remove does not exist.');
      } else {
        childToRemove = parent.nodos.splice(index, 1);
      }
    } else {
      // console.log('Parent does not exist.');
    }

    return childToRemove;
  };

  findIndex = (arr, data) => {
    let index;

    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i].id === data) {
        index = i;
      }
    }

    return index;
  };
}

export default Tree;
