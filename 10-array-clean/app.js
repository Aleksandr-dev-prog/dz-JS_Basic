"use strict"

/*
Задача

Реализовать функцию, выполняющую обратную операцию фильтрации массива чисел.
Функция принимает в качестве аргументов другую функцию (функцию удаления) и массив чисел.
Функция удаления определяет, нужно ли удалять элемент массива (возвращает true) или оставить (возвращает false).
Шаги реализации
Определить функцию высшего порядка, принимающую массив чисел и функцию удаления.
Итерировать через каждый элемент массива, применяя функцию удаления для определения, оставлять элемент в массиве или удалить.
Возвращать отфильтрованный массив, где остаются только те элементы, которые не подлежат удалению.
*/ 

let arrNum = [-1, 4, 8, -5, 9, -3, 2];

const elemRemovePositive = (num) => num >= 0;
const elemRemoveNegative = (num) => num < 0;

function arrFilter(arr, fn) {
    const result = [];
    console.log(`${fn.name} - название функции`);
    for (const elem of arr){
        // let res = func(elem);
        // if (res == false){ аналогично тому, что написано ниже
        if (!fn(elem)) {
            result.push(elem);
        }
    }
    return result;
};

console.log(arrFilter(arrNum, elemRemoveNegative));
console.log(arrFilter(arrNum, elemRemovePositive));





























