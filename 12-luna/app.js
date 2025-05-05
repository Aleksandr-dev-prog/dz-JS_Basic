"use strict"

/*
Задача

Цель:
Написать функцию для проверки корректности номера карты с использованием алгоритма Луна.
Входные данные:
В функцию передаётся номер карты в виде строки (например, "4561-1213-4367-2612"), а функция возвращает true, если карта проходит алгоритм и false, если нет.
Шаги Реализации:
Подготовка номера карты:
Очистка строки от лишних символов (например, -), оставить только числа.
Валидация полученной строки на корректность
Применение алгоритма Луна:
Работаем с отфильтрованной последовательностью чисел.
Для каждой цифры в нечетной позиции: умножаем на 2.
Цифры в четных позициях оставляем без изменений.
Если результат умножения больше 9, вычитаем из него 9.
Формируем новую последовательность чисел.
Проверка результата:
Суммируем полученные числа.
Проверяем, делится ли сумма на 10 без остатка (используем знак процента %).
Если делится, карта корректна (возвращаем true), иначе - нет (возвращаем false).

*/

let numCard1 = '4561-1213-4367-2612';
let numCard2 = '4561-1213-4367-2611';


function validNumCard (arr){

   arr = Array.from(arr.split('-').join('')).map(elem => Number(elem));

   const length = (arr.length == 16);
   if (!length){
      return false;
   }

   for (let i = 0; i < arr.length; i+=2){
      arr[i] *= 2;
      if (arr[i] > 9) {
         arr[i] -= 9; 
      }
   }

   const finalArr = arr.reduce((sum,elem) => {
      return sum + elem;
   }, 0);

   if (finalArr % 10 == 0){
      return true;
   } else {
      return false;
   }
}

console.log(validNumCard(numCard1)); 
console.log(validNumCard(numCard2));


//код от наставника

//Функции для генерации данных (номеров карт): 
function getRandomNumber(min = 0, max = 9){
   return Math.floor(Math.random() * (max - min)) + min
}

function generateArray(fn, count){
   return Array.from({ length: count }, () => fn())
}
function generateCardPart(fn, count){
   return generateArray(fn, count).join('')
}

function getRandomCardNumber() {
   const cardNumber = generateArray(() => generateCardPart(getRandomNumber, 4), 4)
   return cardNumber.join('-');
}

//Функция валидации номера карты:
function cardLunaValidate(card) {
   const cardNumber = card
       .replaceAll('-', '')
       .split('')
       .map((x) => Number(x));
   if (cardNumber.includes(NaN)) {
       return NaN;
   }
   const isEven = (cardNumber.length - 1) % 2 === 0;

   for (let i = Number(isEven); i < cardNumber.length; i = i + 2) {
       cardNumber[i] =
           cardNumber[i] * 2 > 9 ? cardNumber[i] * 2 - 9 : cardNumber[i] * 2;
   }
   const sum = cardNumber.reduce((total, el) => total + el);
   return sum % 10 === 0;
}

//Функция шаблона вывода и вывод:
function resultTemplate(card) {
   const startString = `Карта с номером: ${ card } `;
   const endString = `получила результат: ${ cardLunaValidate(card) }`;
   return `${ startString } ${ endString }`;
}

const cardArray = Array.from({ length: getRandomNumber(5, 30) }, () => getRandomCardNumber())
const resultArray = cardArray.map(resultTemplate)

for(const result of resultArray){
   console.log(result);
}



















































