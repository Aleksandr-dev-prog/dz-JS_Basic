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

function elemRemoveNegative(num){
    if (num < 0) {
        return true;
    } else {
        return false;
    } 
};

function elemRemovePositive(num){
    if (num >= 0) {
        return true;
    } else {
        return false;
    } 
};

function arrFilter(arr, func) {
    let result = [];
    console.log(`${func.name} - название функции`);
    for (let elem of arr){
        let res = func(elem);
        if (res == false){
            result.push(elem);
        }
    }
    return result;
};

console.log(arrFilter(arrNum, elemRemoveNegative));
console.log(arrFilter(arrNum, elemRemovePositive));





























