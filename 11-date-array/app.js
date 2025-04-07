"use strict"

/*
Задача

Цель: Создание функции для обработки массива строк, содержащих потенциальные даты.

Контекст задания:

Вы работаете с парсером или API, который предоставляет строки, потенциально содержащие даты.
Некоторые строки действительно являются датами, другие нет.
Примеры входных данных:

Верные даты: "10.02.22", "11.12.23"
Неверные данные: "0.13.22", "41.12"
Задание:

Разработайте функцию, принимающую массив строк.
Функция должна анализировать каждую строку:
Отфильтровать невалидные даты.
Преобразовать валидные даты к единому формату.
Условия валидации дат:

Форматы дат: DD.MM.YY или MM/DD/YY.
День не может быть больше 31.
Месяц не может быть больше 12.
Учитывать високосные года для февраля (опционально).
Результат:

Отфильтрованный и преобразованный массив содержащий только даты в едином формате.
*/ 

let dateArray = ['10-02-2022', '10.14.2022', 'test', 'rest', '11/12/2023', '00/13/2022', '41/12/2023', '12.03.2025', '3456789102', '14-g7-2024'];

function filterMapDateArray (arr, divisor){//фильтр массива дат
   return arr.filter(elem => elem.length == 10)
             .filter(elem => elem.includes(divisor))
             .map(elem => elem.split(divisor))
             .filter(elem => elem[0] > 0 && elem[0] < 31)
             .filter(elem => elem[1] > 0 && elem[1] < 13)
             .map(elem => elem.join('-'));                
}

const slash = filterMapDateArray(dateArray, '/');
const slashDateArray = slash.map(elem => elem.split('-'))
                            .map(elem => [elem[0], elem[1]] = [elem[1], elem[0], elem[2]])//не смог данную строчку кода, вставить между 38ой и 39ой строками.Пытался через условие if else.
                            .map(elem => elem.join('-'));//поэтому пришлось повторяться
console.log(slashDateArray);

const pointDateArray = filterMapDateArray(dateArray, '.');
console.log(pointDateArray);

const dashDateArray = filterMapDateArray(dateArray, '-');
console.log(dashDateArray);




































