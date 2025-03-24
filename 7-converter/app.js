"use strict"

// 1 способ

function converter(sum, currency, targetCurrency) {

    const USD = 90;
    const EUR = 100;
    
    currency = currency.toUpperCase();
    targetCurrency = targetCurrency.toUpperCase();

    switch (currency) {
        case 'USD':
            switch (targetCurrency) {
                case 'RUB':
                    return sum * USD;
                case 'EUR':
                    return (sum * USD) / EUR;
                default:
                    return null;
            }
        case 'EUR':
            switch (targetCurrency) {
                case 'RUB':
                    return sum * EUR;
                case 'USD':
                    return (sum * EUR) / USD;
                default:
                    return null;
            }
        case 'RUB':
            switch (targetCurrency) {
                case 'USD':
                    return sum / USD;
                case 'EUR':
                    return sum / EUR;
                default:
                    return null;
            }
        default:
            return null;
    }
}

console.log(converter(100,'USD','RUB'));

// 2 способ

function convertSum(sum, from, to) {
    return ((sum * from) / to).toFixed(2);
}

function getTargetCurrencyIcon(targetCurrency) {
        switch (targetCurrency) {
            case 'RUB':
                return 'руб';
            case 'EUR':
                return '€';
            case 'USD':
                return '$';
            default: return '';
        }
}

function messageTemplate(value, icon){//шаблон сообщения
    return `${value} ${icon}`;
}

function converter1(sum, currency, targetCurrency) {
    const ALLOW_CURRENCY_LIST = ['RUB', 'EUR', 'USD'];//разрешённый список валют
    const USD = 91.33;
    const RUB = 1;
    const EUR = 112.33;

    currency = currency.toUpperCase();//переводим в верхний регистр
    targetCurrency = targetCurrency.toUpperCase();//переводим в верхний регистр
    const icon = getTargetCurrencyIcon(targetCurrency);//добавляем иконку к валюте

    if (currency === targetCurrency) {
        return messageTemplate(sum, icon);//если конвертируемая валюта равна целевой валюте, то возвращаем сумму и иконку валюты
    }
    if (!ALLOW_CURRENCY_LIST.includes(currency)) {//если валюта отсутствует в списке валют
        console.log('Входящая валюта мне неизвестна');
        return null;
    }
    if (!ALLOW_CURRENCY_LIST.includes(targetCurrency)) {
        console.log('Исходящая валюта мне неизвестна');
        return null;
    }
    
    let value = null;

    switch (currency) {
        case 'USD':
            switch (targetCurrency) {
                case 'RUB': value = convertSum(sum, USD, RUB); break;
                case 'EUR': value = convertSum(sum, USD, EUR); break;
            }; break;
        case 'RUB':
            switch (targetCurrency) {
                case 'USD': value = convertSum(sum, RUB, USD); break;
                case 'EUR': value = convertSum(sum, RUB, EUR); break;
            }; break;
        case 'EUR':
            switch (targetCurrency) {
                case 'RUB': value = convertSum(sum, EUR, RUB); break;
                case 'USD': value = convertSum(sum, EUR, USD); break;
            }; break;
    }

    return messageTemplate(value, icon)
}

console.log(converter1(1000,'Rub','uSd'));



// 3 способ

function convertSum1(sum, from, to) {
    return ((sum * from) / to).toFixed(2);
}

function getTargetCurrencyIcon1(targetCurrency) {
        switch (targetCurrency) {
            case 'RUB':
                return 'руб';
            case 'EUR':
                return '€';
            case 'USD':
                return '$';
            default: return '';
        }
}

function messageTemplate1(value, icon){
    return `${value} ${icon}`;
}

function converter2(sum, currency, targetCurrency) {
    const ALLOW_CURRENCY_LIST = [['RUB', 1], ['EUR', 112.33], ['USD', 91.33]];
    const flatList = ALLOW_CURRENCY_LIST.flat();
    currency = currency.toUpperCase();
    targetCurrency = targetCurrency.toUpperCase();

    if (!flatList.includes(currency)) {
        console.log('Входящая валюта мне неизвестна');
        return null;
    }
    if (!flatList.includes(targetCurrency)) {
        console.log('Исходящая валюта мне неизвестна');
        return null;
    }
    const icon = getTargetCurrencyIcon1(targetCurrency);
    if (currency === targetCurrency) {
        return messageTemplate1(sum, icon);
    }

    const currentIndex = flatList.indexOf(currency) / 2;
    console.log(currentIndex);//0
    const targetIndex = flatList.indexOf(targetCurrency) / 2;
    console.log(targetIndex);//1
    const [, currentValue] = ALLOW_CURRENCY_LIST[currentIndex];
    const [, targetValue] = ALLOW_CURRENCY_LIST[targetIndex];
    const result = convertSum1(sum, currentValue, targetValue)
    return messageTemplate1(result, icon);
}

console.log(converter2(1000,'Rub','eUr'));



// 4 способ

const CURRENCY_LIST = {
    USD: { value: 90, marker: '$'},
    EUR: { value: 100, marker: '€' },
    RUB: { value: 1, marker: '₽' },
}

function isValidCurrency(currency){
    const isExists = Object.keys(CURRENCY_LIST).includes(currency);
    if(!isExists){
        console.log(`Валюта [${currency}] не поддерживается для обмена`);
    }
    return isExists;
}

function converter3(value, inCurrency, outCurrency) {
    inCurrency = inCurrency.toUpperCase();
    outCurrency = outCurrency.toUpperCase();

    if (inCurrency === outCurrency) {
        return `Входящая и исходящая валюта одинаковы. Конвертация невозможна`;
    }

    // Проверяем наличие входящей валюты для обмена
    if (!isValidCurrency(inCurrency)) {
        return null;
    }
    // Проверяем наличие исходящей валюты для обмена
    if (!isValidCurrency(outCurrency)) {
        return null;
    }


    const { value: a, marker: im } = CURRENCY_LIST[inCurrency]; // im = inMarker
    const { value: b, marker: om } = CURRENCY_LIST[outCurrency]; // im = outMarker

    return `В результате обмена ${value}${im} Вы получите ${(value * a / b).toFixed(2)}${om}`
}

console.log(converter3(1500, 'usd', 'usd'));
console.log(converter3(1500, 'rub', 'usd'));
console.log(converter3(1500, 'eur', 'usd'));





