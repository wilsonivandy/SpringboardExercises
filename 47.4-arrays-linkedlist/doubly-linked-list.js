/** Node: node for a singly linked list. */

class Node {
    constructor(val) {
      this.val = val;
      this.next = null;
    }
  }
  
  /** LinkedList: chained together nodes. */
  
  class DoublyLinkedList {
    constructor(vals = []) {
      this.head = null;
      this.tail = null;
      this.prev = null;
      this.length = 0;
  
      for (let val of vals) this.push(val);
    }
  
  
    _get(idx) {
      let curr = this.head;
      let count = 0;
  
      while (curr !== null && count != idx) {
        count += 1;
        curr = curr.next;
      }
  
      return curr;
    }
  
    /** push(val): add new value to end of list. */
  
    push(val) {
      let newNode = new Node(val);
      if (this.head === null) this.head = newNode;
      if (this.tail !== null) this.tail.next = newNode;
      let prev = this.tail;
      this.tail = newNode;
      this.tail.prev = prev;

      this.length += 1;
    }
  
    /** unshift(val): add new value to start of list. */
  
    unshift(val) {
      let newNode = new Node(val);
      if (this.head === null) {
        this.head = newNode;
      } else {
        newNode.next = this.head
        this.head.prev = newNode;
        this.head = newNode;
        this.head.prev = null;
      }
        
      if (this.length === 0) this.tail = this.head;
  
      this.length += 1;
    }
  
    /** pop(): return & remove last item. */
  
    pop() {
      return this.removeAt(this.length - 1);
    }
  
    /** shift(): return & remove first item. */
  
    shift() {
      return this.removeAt(0);
    }
  
    /** getAt(idx): get val at idx. */
  
    getAt(idx) {
      if (idx >= this.length || idx < 0) {
        throw new Error("Invalid Index");
      }
      return this._get(idx).val;
    }
  
    /** setAt(idx, val): set val at idx to val */
  
    setAt(idx, val) {
      if (idx >= this.length || idx < 0) {
        throw new Error("Invalid Index");
      }
      this._get(idx).val = val;
    }
  
    /** insertAt(idx, val): add node w/val before idx. */
  
    insertAt(idx, val) {
      if (idx > this.length || idx < 0) {
        throw new Error("Invalid Index");
      }
  
      if (idx === 0) return this.unshift(val);
      if (idx === this.length) return this.push(val);
  
  
      let newNode = new Node(val);
      let prev = this._get(idx-1);
      let next = this._get(idx);
      
      prev.next = newNode;
      next.prev = newNode;
      newNode.next = next;
      newNode.prev = prev;
  
      this.length += 1;
    }
  
    /** removeAt(idx): return & remove item at idx, */
  
    removeAt(idx) {
      if (idx >= this.length || idx < 0) {
        throw new Error("Invalid Index");
      }
  
      if (idx === 0) {
        let val = this.head.val;
        this.head = this.head.next;
        this.head.prev = null
        this.length -= 1;
        if (this.length < 2) this.tail = this.head;
        return val;
      }
  
      let prev = this._get(idx-1);
  
      if (idx === this.length - 1) {
        let val = prev.next.val
        prev.next = null;
        this.tail = prev;
        this.tail.next = null;
        this.length -= 1;
        return val;
      }
      
      let val = prev.next.val;
      prev.next = prev.next.next;
      prev.next.next.prev = prev.next;
      this.length -= 1;
      return val;
    }
  
    /** average(): return an average of all values in the list */
  
    average() {
     if (this.length === 0) return 0;
     
     let total = 0;
     let curr = this.head
     while (curr) {
       total += curr.val;
       curr = curr.next
     }
  
     return total / this.length
    }
  }
  
  module.exports = DoublyLinkedList;
  