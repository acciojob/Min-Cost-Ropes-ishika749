function mincost(arr) {
    // Edge case: if the array has only one rope, no cost is needed
    if (arr.length <= 1) return 0;

    // Convert the array to a min-heap
    arr.sort((a, b) => a - b);

    let totalCost = 0;

    // While there are more than one rope to connect
    while (arr.length > 1) {
        // Pop the two smallest ropes
        const first = arr.shift(); // Remove the smallest element
        const second = arr.shift(); // Remove the second smallest element

        // Calculate the cost to connect them
        const cost = first + second;
        totalCost += cost;

        // Push the combined rope back into the array
        arr.push(cost);
        
        // Re-sort the array to maintain the min-heap property
        arr.sort((a, b) => a - b);
    }

    return totalCost;
}

// Test the function with examples
console.log(mincost([4, 3, 2, 6]));  // Output: 29
console.log(mincost([1, 2, 3, 4, 5]));  // Output: 33
