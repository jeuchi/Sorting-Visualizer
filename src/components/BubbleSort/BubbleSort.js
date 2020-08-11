export function bubbleSortAnimated(array) {
    let animations  = [];
    let auxillaryArray = array.slice();
    bubbleSort(auxillaryArray, animations);
    return [animations];
}


let bubbleSort = (auxillaryArray, animations) => {
    let len = auxillaryArray.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < len; i++) {
        	animations.push(["compare", i, i + 1]);
            if (auxillaryArray[i] > auxillaryArray[i + 1]) {
                let tmp = auxillaryArray[i];
                auxillaryArray[i] = auxillaryArray[i + 1];
                auxillaryArray[i + 1] = tmp;
                swapped = true;
                animations.push(["swap", i, auxillaryArray[i + 1]]);
            }
        }
    } while (swapped);
    animations.push(["sorted", 0, 0]);
    return auxillaryArray;
};

