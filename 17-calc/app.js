"use strict"

/*
Задача

Цели задания:
   Практика использования объекта Document в JavaScript.
   Разработка базового взаимодействия с пользователем через HTML-формы.
   Задачи для выполнения:
      Создание интерфейса калькулятора:
         Разработайте простой пользовательский интерфейс с двумя полями ввода (input) для чисел.
         Добавьте четыре кнопки для выполнения основных арифметических операций: сложение, вычитание, деление и умножение.
      Логика калькулятора:
         При нажатии на любую из арифметических кнопок, программа должна читать значения из двух полей ввода, производить выбранную операцию и выводить результат.
         После вывода результата поля ввода должны быть очищены для возможности нового ввода.
      Вывод результата:
         Результат операции отобразите в предназначенном для этого элементе на странице.
      Дополнительно (по желанию):
         Вы можете стилизовать интерфейс калькулятора для улучшения визуального восприятия.

*/



function submitFild(){
   document.querySelector('#field_1').value = '';
   document.querySelector('#field_2').value = ''
}

function func(e) {
   const num1 = Number(document.querySelector('#field_1').value);
   const num2 = Number(document.querySelector('#field_2').value);
   const res = document.querySelector('.result');
   switch (event.target.innerText) {
      case '+':
         res.innerText = num1 + num2;
         submitFild();
         break;
      case '-':
         res.innerText = num1 - num2;
         submitFild();
         break;
      case 'x':
         res.innerText = num1 * num2;
         submitFild();
         break;
      case '/':
         res.innerText = num1 / num2;
         submitFild();
         break;
   }
}



























































