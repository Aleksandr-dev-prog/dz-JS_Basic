"use strict"

let positionLat = 0;//текущее положение пользователя (широта)
let positionLong = 0;//текущее положение пользователя (долгота)
let addressLat = 10;//адрес назначения пользователя (широта)
let addressLong = 15;//адрес назначения пользователя (долгота)

let distance = Math.sqrt((addressLat - positionLat)**2 + (addressLong - positionLong)**2);
console.log(distance);//18.027756377319946


