'use strict'

let habbits = [];//создаём пустой массив привычек (состояние приложения), по другому: текущие привычки, или пустые, или туда будут загружаться данные
const HABBIT_KEY = 'HABBIT_KEY';//ключ для LocalStorage
let globalActiveHabbitId;//создаём переменную (простой способ хранить текущее состояние выбора, чтобы интерфейс всегда показывал актуальное активное меню или элемент)
let editDayIndex = null; // Глобальная переменная для хранения индекса редактируемого дня
const defaultWindow = {name: "Добавьте новую привычку!", target: "1", days: []};//окно контента, когда нет ни одной привычки

/* page */

const page = {
    menu: document.querySelector('.menu__list'),
    header:{
        h1: document.querySelector('.h1'),
        progressPercent: document.querySelector('.progress__percent'),
        progressCoverBar: document.querySelector('.progress__cover-bar'),
    },
    content: {
        daysContainer: document.getElementById('days'), 
        nextDay: document.querySelector('.habbit__day'),
    }, 
    popup: {
        addHabbit:document.getElementById('add-habbit-popup'),
        iconField:document.querySelector('.popup__form input[name="icon"]'),
        changeDay:document.getElementById('change-day-popup'),
        comField:document.querySelector('.popup__form input[name="newComment"]')
    }
}

/*utils*/ 

function loadData() {// получяем данные и кладём в habbits (3 строка)
    const habbitsString = localStorage.getItem(HABBIT_KEY);//извлекаем данные из localStorage
    const habbitArray = JSON.parse(habbitsString);//переводим данные из строки в объект (парсим)
    if (Array.isArray(habbitArray)) {//проверяем массив, является ли он массивом
        habbits = habbitArray;// пустому массиву присваиваем то, что распарсили
    }
}

function saveData() {// сохранение данных
    localStorage.setItem(HABBIT_KEY, JSON.stringify(habbits)); 
}

function togglePopup(elem){
    if (elem.classList.contains('cover_hidden')){
        elem.classList.remove('cover_hidden');
    } else {
        elem.classList.add('cover_hidden');
    }
}

function resetForm(form,fields) {//сброс полей формы
    for(const field of fields){
        form[field].value = '';
    }
}

function validateAndGetFormData(form,fields){//валидация и получение данных формы
    const formData = new FormData(form);//создаём объект с нашей формой (FormData API - это специальная коллекция данных, которая позволяет передавать данные в виде пар [ключ, значение] на сервер при помощи fetch() или XMLHttpRequest)
    const res = {};
    for(const field of fields){
        const fieldValue = formData.get(field);
        form[field].classList.remove('error');
        if(!fieldValue){
            form[field].classList.add('error');
        }
        res[field] = fieldValue;
    }
    let isValid = true;//если вся форма валидна, то мы можем вернуть все поля
    for (const field of fields){
        if (!res[field]){//если есть хотя бы одно не верное поле, то 
            isValid = false;
        }
    }
    if (!isValid){//если вся форма не валидна, то мы возвращаем undefined
        return;
    }
    return res;
}

/* render */

function rerenderMenu(activeHabbit) {
    for (const habbit of habbits){        
        const existed = document.querySelector(`[menu-habbit-id="${habbit.id}"]`);        
        if (!existed) {
            //создание
            const element = document.createElement('button');
            element.setAttribute('menu-habbit-id', habbit.id);
            element.classList.add('menu__item');
            element.addEventListener('click', () => rerender(habbit.id));
            element.innerHTML = `
                <img src="./images/${habbit.icon}.svg" alt="${habbit.name}"/>
                <button class="delete__habbit" onclick="deleteHabbit(${habbit.id})"> x </button>
            `;
            if (activeHabbit.id === habbit.id){
                element.classList.add('menu__item_active');
            }
            page.menu.appendChild(element);//добавляем доччерний элемент 
            continue;
        }
        if (activeHabbit.id === habbit.id){
            existed.classList.add('menu__item_active');
        } else {
            existed.classList.remove('menu__item_active');
        }
    }
}

function rerenderHead(activeHabbit) {
    page.header.h1.innerText = activeHabbit.name;
    const progress = activeHabbit.days.length / activeHabbit.target > 1
        ? 100
        : activeHabbit.days.length / activeHabbit.target * 100;
    page.header.progressPercent.innerText = progress.toFixed(0) + '%';
    page.header.progressCoverBar.setAttribute('style',`width:${progress}%`);
}

function rerenderContent(activeHabbit) {
    if (!activeHabbit){
        return;
    }
    page.content.daysContainer.innerHTML = '';// при смене активной привычки(activeHabbit) или подругому (иконки), не дублируются дни и коментарии предыдущих привычек, которые прошли рендер и уже не активны
    for (const index in activeHabbit.days){
        const element = document.createElement('div');
        element.classList.add('habbit');
        element.innerHTML = ` <div class="habbit__day">День ${Number(index) + 1}</div>
            <div class="habbit__comment">
                ${activeHabbit.days[index].comment}
            </div>
            <button class="day__change" onclick="changeDay(${index})">
                <img src="./images/change.svg" alt="Редактировать день ${Number(index) + 1}">
            </button>
            <button class="day__delete" onclick="deleteDay(${index})">
                <img src="./images/delete.svg" alt="Удалить день ${Number(index) + 1}">
            </button>`;
        page.content.daysContainer.appendChild(element);
    }
    page.content.nextDay.innerHTML = `День ${activeHabbit.days.length + 1}`;
}

function rerender(activeHabbitId) {
    globalActiveHabbitId = activeHabbitId;
    const activeHabbit = habbits.find(habbit => habbit.id === activeHabbitId);
    if (!activeHabbit){
        return;
    }
    document.location.replace(document.location.pathname + '#' + activeHabbitId);
    rerenderMenu(activeHabbit);
    rerenderHead(activeHabbit);
    rerenderContent(activeHabbit);
    saveData();
}

/* work with days-работа с днями */ 

function addDays(event){
    event.preventDefault();//игнорирование дефолтного поведения,при нажатии кнопки с пустым полем, страница не перезагружается
    const data = validateAndGetFormData(event.target, ['comment']);
    if (!data){
        return;
    } 
    habbits = habbits.map(habbit => {
        if (habbit.id === globalActiveHabbitId){
            return {// возвращаем модифицированный объект
                ...habbit,//берём все свойства, по другому (ключ:'значение'), объекта активной привычки, и добавляем ключ days с новым значением =>
                days: habbit.days.concat([{ comment: data.comment }])
            }
        }
        return habbit;
    })
    resetForm(event.target, ['comment']);
    rerender(globalActiveHabbitId);
    saveData();
}

function deleteDay(index){//удаление дня
    habbits = habbits.map(habbit =>{
        if (habbit.id === globalActiveHabbitId){
            habbit.days.splice(index, 1);
            return {
                ...habbit,
                days: habbit.days
            };
        }
        return habbit;
    });
    rerender(globalActiveHabbitId);
    saveData();
}

function changeDay(index){
    const habbit = habbits.find(habbit => habbit.id === globalActiveHabbitId);
    if (habbit) {
        page.popup.comField.value = habbit.days[index].comment;
        editDayIndex = index; // Запоминаем индекс для использования при сохранении
        togglePopup(page.popup.changeDay);
    }
}

function saveDayComment(event) {
    event.preventDefault();
    if (editDayIndex === null) return;
    habbits = habbits.map(habbit => {
        if (habbit.id === globalActiveHabbitId) {
            // Обновляем нужный день
            habbit.days[editDayIndex].comment = page.popup.comField.value;
        }
        return habbit;
    });
    editDayIndex = null; // Сбросить состояние
    togglePopup(page.popup.changeDay);// Скрыть попап
    rerender(globalActiveHabbitId);
    saveData();
}

/* working with habbits-работа с привычками*/ 

function setIcon(context,icon) {//функция установки иконки в окне popap
    page.popup.iconField.value = icon;
    const activeIcon = document.querySelector('.icon.icon_active');
    activeIcon.classList.remove('icon_active');
    context.classList.add('icon_active');
};

function addHabbit(event){//добавление новой привычки
    event.preventDefault();//игнорирование дефолтного поведения,при нажатии кнопки с пустым полем, страница не перезагружается
    const data = validateAndGetFormData(event.target, ['name','icon','target']);
    if (!data){
        return;
    }
    const maxId = habbits.reduce((acc, habbit) => acc > habbit.id ? acc : habbit.id, 0);
    habbits.push({
        id:maxId + 1,
        name:data.name,
        target:data.target,
        icon:data.icon,
        days: []
    });
    resetForm(event.target, ['name','target']);
    togglePopup(page.popup.addHabbit);
    rerender(maxId + 1);
}  

function deleteHabbit(activeHabbitId){//удаление привычки
    page.menu.innerHTML = '';
    habbits = habbits.filter(habbit => habbit.id !== activeHabbitId);
    if(habbits.length === 0){
        rerenderHead(defaultWindow);
        rerenderContent(defaultWindow);
    } else {
        rerender(habbits[0].id);
    }
    saveData();
};

/* init */ 
(() => {
    loadData();
    const hashId = Number( document.location.hash.replace('#',''));
    const urlHabbit =  habbits.find(habbit => habbit.id == hashId);
    if (urlHabbit) {
        rerender(urlHabbit.id);
    } else {
        rerender(habbits[0].id);
    }
})();

// (() => {
//     loadData();
//     const hashId = Number(window.location.hash.replace('#', ''));
//     if (habbits.length === 0) {
//         // Нет ни одной привычки — просто ничего не делаем
//         return;
//     }
//     if (!hashId) {
//         // Нет hash — делаем активной первую привычку
//         rerender(habbits[0].id);
//     } else {
//         // Есть hash
//         const urlHabbit = habbits.find(habbit => habbit.id == hashId);
//         if (urlHabbit) {
//             rerender(urlHabbit.id);
//         } else {
//             // Hash есть, но привычки нет — fallback в первую
//             rerender(habbits[0].id);
//         }
//     }
// })();

// //Простой рендеринг привычек
// let habits = [//создали массив привычек
//   { id: 1, name: 'Чтение', count: 5 },
//   { id: 2, name: 'Спорт', count: 3 },
//   { id: 3, name: 'Учёба', count: 1 }
// ];

// // Функция удаления привычки по id
// function deleteHabit(habitId) {
//   // Фильтруем массив, исключая нужную привычку
//   habits = habits.filter(habit => habit.id !== habitId);

//   // Здесь можно добавить логику для обновления интерфейса, если нужно
//   renderHabits(); // Например, функция перерисовки списка привычек
// }

// function renderHabits() {
//   const list = document.getElementById('habitList');
//   list.innerHTML = '';
//   habits.forEach(habit => {
//     const li = document.createElement('li');
//     li.textContent = habit.name + ' ';
//     const btn = document.createElement('button');
//     btn.textContent = 'Удалить';
//     li.appendChild(btn);
//     list.appendChild(li);
//     btn.onclick = () => deleteHabit(habit.id);
//   });
// }

// // Первый рендер, который создаст первый список с кнопками внутри 
// renderHabits();

// Редактирование дня

// const days1 = [
//   { id: 1, comment: 'Прочитал книгу', date: '2024-06-01' },
//   { id: 2, comment: 'Пробежал 5км', date: '2024-06-02' },
// ]

// let comment = document.querySelector('.comment');

// function startEdit(dayId) {
//   const day = days1.find(day => day.id === dayId)
//   if (day) {
//     let newComment = prompt('Измени комментарий:', day.comment);
//     comment.innerText = newComment;
//     // if (newComment !== null) {
//     //   editDayComment(dayId, newComment)
//     //   renderDays() // функция, которая перерисует список дней
//     }
// }


// function editDayComment(dayId, newComment) {
//   // Найти нужный день по id и изменить comment
//   const day = days1.find(day => day.id === dayId)
//   if (day) {
//     day.comment = newComment
//   }
// }

// editDayComment(1, 'Изучил JS')
// days[0].comment теперь "Изучил JS"



