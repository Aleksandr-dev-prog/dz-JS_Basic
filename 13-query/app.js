"use strict"

/*
Задача

Цель:
Научиться создавать функцию, которая преобразует объект query-параметров в строку для URL.
Объяснение задачи
Создание функции для преобразования объекта параметров в строку query-параметров.
Определение query-параметров
Дополнительные параметры, передаваемые в URL для уточнения запроса. Пример: ?a=1&b=2, где a, b – ключи, а 1, 2 – значения.
Практическая необходимость
Создание строки с параметрами вручную – трудоемкий процесс.
Важность создания функции для автоматического создания строки параметров для бэкенд и фронтенд разработчиков.
Задание функции
Функция должна принимать объект с параметрами (например, {search: "Вася", take: 10}).
Возвращать строку с query-параметрами (например, "search=Вася&take=10").

*/

const queryObj = {search: "Вася", take: 10};

function query(obj){
   return `${Object.keys(obj)[0]}=${Object.values(obj)[0]}&${Object.keys(obj)[1]}=${Object.values(obj)[1]}`
}

console.log(query(queryObj));


// код от наставника

const queryFn = (params) => Object.entries(params).map(x => x.join('=')).join('&')
console.log(queryFn(queryObj));


const queryFunc = (url, params) => `${url}/?${Object.entries(params).map(x => x.join('=')).join('&')}`
console.log(queryFn(queryObj));

























































