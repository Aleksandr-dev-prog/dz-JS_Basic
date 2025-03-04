"use strict"

let rise = [1, 40, -5, 10, 0];

function sort(arr){
    for (let i = 1; i < arr.length; i++)
        for (let j = 0; j < i; j++)
            if (arr[i] < arr[j]) {
                let num = arr[i];
                arr[i] = arr[j];
                arr[j] = num;
            }
    return arr;
}

sort(rise);












