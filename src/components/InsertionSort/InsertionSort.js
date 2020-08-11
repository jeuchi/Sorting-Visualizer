export function insertionSortAnimated(array) {
    let animations  = [];
    let auxillaryArray = array.slice();
    insertionSort(auxillaryArray, animations);
    return [animations];
}

let insertionSort = (inputArr, animations) => {
    let length = inputArr.length;
    for (let i = 1; i < length; i++) {
        animations.push(["target", i]);
        let key = inputArr[i];
        let j = i - 1;
        while (j >= 0 && inputArr[j] > key) {
            inputArr[j + 1] = inputArr[j];
            animations.push(["swap", i, j]);
            j = j - 1;
            animations.push(["target", j+1]);
        }
        inputArr[j + 1] = key;
    }
    animations.push(["sorted", -1, -1]);
    return inputArr;
};