class MinHeap {
    constructor() {
        this.heap = [];
    }

    // Function to add an element to the heap
    push(val) {
        this.heap.push(val);
        this._heapifyUp();
    }

    // Function to remove and return the smallest element (root) from the heap
    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        
        const root = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._heapifyDown();
        return root;
    }

    // Function to maintain heap property after inserting an element
    _heapifyUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex] <= this.heap[index]) break;
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    // Function to maintain heap property after removing the smallest element
    _heapifyDown() {
        let index = 0;
        const length = this.heap.length;
        while (index < length) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let smallest = index;

            if (leftChildIndex < length && this.heap[leftChildIndex] < this.heap[smallest]) {
                smallest = leftChildIndex;
            }

            if (rightChildIndex < length && this.heap[rightChildIndex] < this.heap[smallest]) {
                smallest = rightChildIndex;
            }

            if (smallest === index) break;

            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }

    // Function to get the size of the heap
    size() {
        return this.heap.length;
    }
}

function mincost(arr) {
    const heap = new MinHeap();

    // Insert all elements into the heap
    for (let length of arr) {
        heap.push(length);
    }

    let totalCost = 0;

    // Combine ropes until only one rope remains
    while (heap.size() > 1) {
        // Pop the two smallest ropes
        const first = heap.pop();
        const second = heap.pop();

        // Calculate the cost to combine them
        const cost = first + second;
        totalCost += cost;

        // Push the combined rope back into the heap
        heap.push(cost);
    }

    return totalCost;
}


