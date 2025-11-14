"use strict"

function crypto (password) {
    let arr = password.split('');
    let averageIndex = Math.ceil(arr.length/2);//средний индекс
    let firstArr = arr.slice (0,averageIndex).reverse();
    let secondArr = arr.splice (averageIndex,arr.length - 1).reverse();
    [firstArr[0],firstArr[firstArr.length - 1],secondArr[0],secondArr[secondArr.length - 1]] = [secondArr[secondArr.length - 1],secondArr[0],firstArr[firstArr.length - 1],firstArr[0]];
    let newArr = firstArr.concat(secondArr);
    let res = newArr.join('');
    return res;
}

function check(encryptedPassword, originalPassword) {
    if (!encryptedPassword || !originalPassword) {
        return false;
    }
    return originalPassword === crypto(encryptedPassword);
}

let str = prompt().toLowerCase();
if (str.length < 4){
    console.log('Пароль должен быть не менее 4 символов');
} else {
    let encryptedPassword = crypto (str);
    let decrypted = crypto (encryptedPassword);
    console.log(str,encryptedPassword,decrypted, str === decrypted);
    console.log(check(encryptedPassword,str));
}


// Генерация пароля

const CHARS = `!#$%&0123456789?@ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvw`
function crypt(password) {
    if (!password || !password.length) {
        return NaN;
    }
    const splitedArray = password.split('');
    if (splitedArray.length < 8) {
        return false;
    }

    const middleIndex = Math.floor(splitedArray.length / 2);
    const firstHalf = splitedArray.slice(0, middleIndex).reverse();
    const secondHalf = splitedArray.slice(middleIndex).reverse();
    const length = secondHalf.length;
    
    [firstHalf[1], secondHalf[length - 2]] = [secondHalf[length - 2], firstHalf[1]];
    [secondHalf[1], firstHalf[length - 2]] = [firstHalf[length - 2], secondHalf[1]];

    [firstHalf[0], secondHalf[length - 1]] = [secondHalf[length - 1], firstHalf[0]];
    [secondHalf[0], firstHalf[length - 1]] = [firstHalf[length - 1], secondHalf[0]];

    const encryptedPassword = firstHalf.concat(secondHalf);
    return encryptedPassword.join('');
}

function checkPassword(encryptedPassword, originalPassword) {
    if (!encryptedPassword || !originalPassword) {
        return false;
    }
    return originalPassword === crypt(encryptedPassword);
}

function getRandomNumber(min = 0, max = 86) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomPassword(length = 12) {
    // const symbolArray = Array.from({ length: 87 }, (_, index) => String.fromCharCode(index + 33));
    const password = Array.from({ length }, () => CHARS[getRandomNumber(0, CHARS.length)]);
    return password.join('');
}

/*
    logging and test function with console
*/

const password = getRandomPassword();
const encrypted = crypt(password);
const decrypted = crypt(encrypted)

console.log('Пароль:', password);
console.log('Зашифрованный пароль:', encrypted);
console.log('Проверка пароля (обратимость):', decrypted === password);
console.log('Проверка пароля (check):', checkPassword(encrypted, password));



















