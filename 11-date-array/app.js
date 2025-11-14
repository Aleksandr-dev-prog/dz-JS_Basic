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

let dateArray = ['29-02-2024', '29-02-2025', '10.14.2022', 'test', 'rest', '11/12/2023', '00/13/2022', '41/12/2023', '32.03.2025', '3456789102', '14-g7-2024'];

//1 способ (нет проверки на високосный год)
function filterDateArray (arr){
   let dateArr = [];
   for (let elem of arr){
      if (elem.includes('/')){
         dateArr.push(elem);
      }
      if (elem.includes('.')){
         let [day, month, year] = elem.split('.');
         dateArr.push(`${month}.${day}.${year}`); 
      }
      if (elem.includes('-')){ 
         let [day, month, year] = elem.split('-');
         dateArr.push(`${month}-${day}-${year}`);  
      }
   }
   const validDate = [];
   for (let elem of dateArr){
      if (new Date (elem) != 'Invalid Date'){
         validDate.push(elem);
      }
   }
   const result = validDate.map(elem => new Date (elem));
   const res = result.map(elem => new Intl.DateTimeFormat('ru-RU').format(elem));
   return res;
}
console.log(filterDateArray(dateArray));

// 2 способ от наставника
function getDates(array, fn) {
   return array.map(stringToArray)
               .filter(fn) 
               .sort(sortDatePattern)
               .map(formatDate);
}

function formatDate(array) {
   return array.map((x, i) => (i === 2 ? x.padStart(4 ,'0') : x.padStart(2 ,'0'))).join('-');
}

function sortDatePattern(a, b) {
   let day, month, year;

   [day, month, year] = a;
   const dt1 = new Date(year, month - 1, day).getTime();

   [day, month, year] = b;
   const dt2 = new Date(year, month - 1, day).getTime();

   return dt1 - dt2;
}

function stringToArray(str) {
   let day, month, year;
   if (str.includes('/')) {
       [month, day, year] = str.split('/');
   } else if (str.includes('-')) {
       [day, month, year] = str.split('-');
   }
   if (!year || isNaN(day) || isNaN(month) || isNaN(year)) {
       return null;
   }
   return [day, month, year];
}                                                      

function checkCorrectDate(array) {
   if (array === null) {
       return false;
   }

   let [day, month, year] = array.map(Number);

   const LONG_MONTH_ARRAY = [1, 3, 5, 7, 8, 10, 12];

   const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

   // check month
   if (month < 1 || month > 12 || year <= 0) {
       return false;
   }

   // check day
   if (day < 1 || day > 31) {
       return false;
   }

   if (day === 31 && !LONG_MONTH_ARRAY.includes(month)) {
       return false;
   }

   // check February for correct day and leap year
   if (month === 2 && day === 29 && !isLeapYear) {
       return false;
   }
   return true;
}

const res = getDates(dateArray, checkCorrectDate);
console.log(res);




































