class Queue {
  constructor(data) {
    this.elements = data || [];
  }

  enqueue = e => {
    this.elements.push(e);
  };

  dequeue = () => this.elements.shift();

  isEmpty = () => this.elements.length === 0;

  peek = () => (!this.isEmpty() ? this.elements[0] : undefined);
}

export default Queue;
