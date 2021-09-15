//Maximum of Sliding Window​: Given an array A and an integer K, 
// find the maximum element ineach sliding window of size K.
// if A = [4,6,5,2,4,7] and K = 3, windows are as follows: 

//[​4,6,5​,2,4,7] : Max = 6
//[4,​6,5,2​,4,7] : Max = 6
//[4,6,​5,2,4​,7] : Max = 5
//[4,6,5,​2,4,7​] : Max = 7
//Output: 6,6,5,7


class MaxQueue {
  constructor() {
    this.queue = [];
    this.max = [];
  }

  enqueue(item) {
    this.queue.unshift(item);
    while(this.max.length > 0 && this.getMax() < item){
      this.max.shift();
    }

    this.max.unshift(item);
  }

  dequeue() {
    const item = this.queue.pop();
    if(item === this.getMax()){
      this.max.pop();
    }
  }

  length() {
    return this.queue.length;
  }

  getMax() {
    return this.max[this.max.length - 1];
  }
  
}

function windowMax(numbers, windowSize) {
  const maxQueue = new MaxQueue();

  for (let index = 0; index < windowSize; index++) {
    maxQueue.enqueue(numbers[index]);
  }

  console.log(maxQueue.getMax());
  
  for (let index = windowSize; index < numbers.length; index++) {
    maxQueue.dequeue();
    maxQueue.enqueue(numbers[index]);
    console.log(maxQueue.getMax());
  }
}

windowMax([4,6,5,2,4,7], 3);