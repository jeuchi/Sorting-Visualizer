export function selectionSortAnimated(array) {
    let animations  = [];
    let auxillaryArray = array.slice();
    selectionSort(auxillaryArray, animations);
    return [animations];
}

let selectionSort = (arr, animations) => {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
    	animations.push(['target', i]);
        let min = i;
        for (let j = i + 1; j < len; j++) {
        	animations.push(['compare', j]);
            if (arr[min] > arr[j]) {
                min = j;
                animations.push(['min', min]);
            }
        }
        if (min !== i) {
        	animations.push(['swap', min, i]);
            let tmp = arr[i];
            arr[i] = arr[min];
            arr[min] = tmp;
        }else{
        	animations.push(['keep', min]);
        }

    }
    animations.push(['sorted', -1, -1])
    return arr;
}