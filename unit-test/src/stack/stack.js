class Stack {
  constructor() {
    // this.array = [];
    this._size = 0;
    this.head = null;
  }

  size() {
    // return this.array.length;
    return this._size;
  }

  push(item) {
    //this.array.push(item);
    const node = { item, next: this.head };
    this.head = node;
    this._size++;
  }

  pop() {
    if (this.head === null) {
      throw new Error("Stack is empty");
    }
    // return this.array.pop();
    const node = this.head;
    this.head = node.next;
    this._size--;
    return node.item;
  }

  peek() {
    if (this.head === null) {
      throw new Error("Stack is empty");
    }
    // return this.array[this.size() - 1];
    return this.head.item;
  }
}

module.exports = Stack;
