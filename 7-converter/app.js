"use strict"

function convert(sum, initialCurrency) {

    let convertCurrency;
// 1 способ

    /*
    if (initialCurrency === 'RUB'){
       convertCurrency = sum/90;//USD
       console.log(`${convertCurrency} USD`);
    } else if (initialCurrency === 'USD'){
        convertCurrency = sum * 90;//RUB   
        console.log(`${convertCurrency} RUB`); 
    } else {
        console.log(null);
    }
    */

// 2 способ

    switch (initialCurrency) {
        case 'RUB':
            convertCurrency = sum/90;//USD
            console.log(`${convertCurrency} USD`);
            break;
        case 'USD':
            convertCurrency = sum * 90;//RUB
            console.log(`${convertCurrency} RUB`);
            break;
        default:
            console.log(null);
            break;
    }
}

convert (9000, 'RUB');// 100 USD

// 3 спопсоб

let RUB = 1;
let CNY = 12;
let USD = 90;


let EUR = 100;

// функция написана с учетом незнания массивов и объектов)))
// как реализовать конструкцию else if через switch case, я не знаю.

function convert2(sum,initialCurrency,convertCurrency){
    if (initialCurrency == RUB && convertCurrency == USD) {
        console.log(`${sum/USD} USD`);
    } else if (initialCurrency == RUB && convertCurrency == EUR){
        console.log(`${sum/EUR} EUR`); 
    } else if (initialCurrency == USD && convertCurrency == RUB){
        console.log(`${sum * USD} RUB`); 
    } else if (initialCurrency == EUR && convertCurrency == RUB){
        console.log(`${sum * EUR} RUB`); 
    } else if (initialCurrency == USD && convertCurrency == EUR){
        console.log(`${sum * (USD/EUR)} EUR`); 
    } else if (initialCurrency == EUR && convertCurrency == USD){
        console.log(`${sum * (EUR/USD)} USD`); 
    } else {
        console.log(null);
    }
}

convert2 (900, RUB, USD);// 10 USD
convert2 (900, RUB, EUR);// 9 EUR
convert2 (900, USD, RUB);// 81000 RUB
convert2 (900, EUR, RUB);// 90000 RUB
convert2 (900, USD, EUR);// 810 EUR
convert2 (900, EUR, USD);// 1000 USD
convert2 (900, RUB, CNY);// null






