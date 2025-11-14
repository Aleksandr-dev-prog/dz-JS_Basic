"use strict"

const language = prompt();

console.log(language);

switch (language) {
	case 'en':
	case 'EN':	
		console.log('Hello!');
		break;
	case 'ru':
	case 'RU':
		console.log('Здравствуйте!');
		break;
	case 'de':
	case 'DE':
		console.log('Guten Tag!');
		break;
	default:
		console.log('undefined');	
}