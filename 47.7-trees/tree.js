/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    let toBeVisited = [this.root];
    let total = 0;
    while (toBeVisited.length) {
      let curr = toBeVisited.pop();
      if (curr) {
        total += curr.val;
        for (let child of curr.children) {
          toBeVisited.push(child);
        }
      }
    }
    return total;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    let toBeVisited = [this.root];
    let total = 0;
    while (toBeVisited.length) {
      let curr = toBeVisited.pop();
      if (curr) {
        if (curr.val % 2 === 0) {
          total += 1;
        }
        for (let child of curr.children) {
          toBeVisited.push(child);
        }
      }
    }
    return total;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    let toBeVisited = [this.root];
    let total = 0;
    while (toBeVisited.length) {
      let curr = toBeVisited.pop();
      if (curr) {
        if (curr.val > lowerBound) {
          total += 1;
        }
        for (let child of curr.children) {
          toBeVisited.push(child);
        }
      }
    }
    return total;
  }
}


module.exports = { Tree, TreeNode };
