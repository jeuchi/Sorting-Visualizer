export function bubbleSortAnimated(array) {
    let animations  = [];
    let auxillaryArray = array.slice();
    bubbleSort(auxillaryArray, animations);
    const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
    //console.log("sort works correctly? ",arraysAreEqual(javaScriptSortedArray, auxillaryArray));
    array = auxillaryArray;
    return [animations, array];
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


/*
function bubbleSort(auxillaryArray, animations) {
    const N = auxillaryArray.length;
    let iters = N - 1;
    while(iters > 0) {
        let swapped = false;
        for(let i = 0; i < iters; ++i) {
            animations.push(["compare", i, i + 1]);
            //animations.push(["comparision2", i, i + 1]);
            if(auxillaryArray[i] > auxillaryArray[i + 1]) {
                swapped = true;
                animations.push(["swap", i, auxillaryArray[i + 1]]);
                //animations.push(["swap", i + 1, auxillaryArray[i]]);
                swap(auxillaryArray, i, i + 1);
            }
        }
        if(swapped === false) break;
        iters--;
    }
}*/

function swap(auxillaryArray, firstIndex, secondIndex) {
    let temp = auxillaryArray[firstIndex];
    auxillaryArray[firstIndex] = auxillaryArray[secondIndex];
    auxillaryArray[secondIndex] = temp;
}

function arraysAreEqual(firstArray, secondArray) {
    if (firstArray.length !== secondArray.length) {
        return false;
    }
    for (let i = 0; i < firstArray.length; i++) {
      if (firstArray[i] !== secondArray[i]) {
        return false;
      }
    }
    return true;
}
