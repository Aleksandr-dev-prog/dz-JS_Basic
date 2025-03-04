"use strict"

const language = prompt().toLowerCase();

console.log(language);

switch (language) {
	case 'en':	
		console.log('Hello!');
		break;
	case 'ru':
		console.log('Здравствуйте!');
		break;
	case 'de':
		console.log('Guten Tag!');
		break;
	default:
		console.log('undefined');	
}