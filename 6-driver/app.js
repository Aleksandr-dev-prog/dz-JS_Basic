"use strict"

const hasLicence = true;//имеет права
const age = 18;//возраст
const isDrunk = false;//пьян

const canDrive = age >= 18 && hasLicence && !isDrunk;
console.log(`Пользователь вести машину ${canDrive ?'может' :'не может'}`);
