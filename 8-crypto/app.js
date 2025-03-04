"use strict"

let password = 'password';
let wrong = 'wrong';

function crypto (a) {
    let code = a.slice (0,4).split('').reverse().join('');
    let code1 = a.slice (4,8).split('').reverse().join('');
    let code2 = code1.slice (1,3).split('').reverse().join('');
    let str = code + 'd' + code2 + 'w';
    return str;
}
let cryptoFunc = crypto(password);
console.log(cryptoFunc);//ssapdorw

function check (a,b){
    let code = a.slice (0,4).split('').reverse().join('');
    let code1 = a.slice (4,8).split('').reverse().join('');
    let code2 = code1.slice (1,3).split('').reverse().join('');
    let str = code + 'w' + code2 + 'd';
    return (str === b);
}

console.log(check (cryptoFunc,password));//true
console.log(check (cryptoFunc,wrong));//false








