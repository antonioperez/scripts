 class Queue {
  constructor() {
    this.queue = [];
  }

  enqueue(item) {
    return this.queue.unshift(item);
  }

  dequeue() {
    return this.queue.pop();
  }

  peek() {
    return this.queue[this.length() - 1];
  }

  length() {
    return this.queue.length;
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}


const  queue = new Queue();
queue.enqueue('Sandra');
queue.enqueue('Rob');
queue.enqueue('Lisa');
queue.enqueue('Kai');
console.log(queue.length()); // 4
console.log(queue.peek()); // Sandra
queue.dequeue();
console.log(queue.peek()); //rob
queue.dequeue();
queue.dequeue();
console.log(queue.peek()); // Kai