function mincost(arr) {
    // If array has less than 2 elements, no cost is needed
    if (arr.length <= 1) return 0;

    // Helper functions for min-heap
    function parent(i) { return Math.floor((i - 1) / 2); }
    function leftChild(i) { return 2 * i + 1; }
    function rightChild(i) { return 2 * i + 2; }

    // Sift down to maintain heap property
    function siftDown(arr, i, size) {
        let minIndex = i;
        const left = leftChild(i);
        const right = rightChild(i);

        if (left < size && arr[left] < arr[minIndex]) {
            minIndex = left;
        }
        if (right < size && arr[right] < arr[minIndex]) {
            minIndex = right;
        }
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]; // Swap
            siftDown(arr, minIndex, size);
        }
    }

    // Build min-heap
    function buildMinHeap(arr) {
        for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
            siftDown(arr, i, arr.length);
        }
    }

    // Heap pop: Remove and return smallest element
    function heapPop(arr, size) {
        const result = arr[0];
        arr[0] = arr[size - 1];
        siftDown(arr, 0, size - 1);
        return result;
    }

    // Heap push: Add element and sift up
    function heapPush(arr, value, size) {
        arr[size] = value;
        let i = size;
        while (i > 0 && arr[parent(i)] > arr[i]) {
            [arr[i], arr[parent(i)]] = [arr[parent(i)], arr[i]]; // Swap
            i = parent(i);
        }
    }

    // Build min-heap from input array
    buildMinHeap(arr);
    let totalCost = 0;
    let size = arr.length;

    // Continue until only one rope remains
    while (size > 1) {
        // Extract two smallest lengths
        const first = heapPop(arr, size);
        size--;
        const second = heapPop(arr, size);
        size--;

        // Cost of connecting these ropes
        const currentCost = first + second;
        totalCost += currentCost;

        // Push combined rope length back to heap
        heapPush(arr, currentCost, size);
        size++;
    }

    return totalCost;
}
