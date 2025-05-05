"use strict"

/*
Задача

Разработать простой таск-менеджер с базовыми функциями добавления, удаления, обновления и сортировки задач.

Структура таск-менеджера:
Объект таск-менеджера содержит одно свойство, в котором хранится массив задач. Каждая задача имеет:
title (строка)
id (число)
priority (число)
Основные методы:

   Добавление задачи:
      Принимает параметры: title и priority.
      Генерирует id (можно использовать инкремент последнего id).
      Добавляет новую задачу в массив.

   Удаление задачи по id:
      Принимает идентификатор задачи.
      Удаляет задачу с указанным id из массива.

   Обновление задачи:
      Принимает id задачи и параметры для обновления (например, новый title, новый приоритет).
      Обновляет информацию о задаче в массиве.

   Сортировка задач:
      Можно сортировать по id или приоритету.
      Реализует порядок сортировки (от меньшего к большему и наоборот).

*/

let isTemplateTask = {
   title:'',
   id: 0,
   priority: 0
}

const ToDoList = {
   tasks: [],
   addTask: function(title, priority){
      const task = {...isTemplateTask};
      task.title = title;
      task.id = ++isTemplateTask.id;
      task.priority = priority;
      this.tasks.push(task);
   },
   removeTask: function(id){
      this.tasks = this.tasks.filter(elem => elem.id !== id);
   },
   upgradeTask: function(id, title, priority){
      const task = this.tasks.find(elem => elem.id == id);
      if (!task){
         console.log(`Задача c идентификатором ${id}, отсутствует`);
         return;
      };
      task.title = title;
      task.priority = priority;
   },
   sortTask: function(){
      this.tasks = this.tasks.sort((a, b) => a.priority - b.priority);
   },
}

ToDoList.addTask('Помыть посуду', 7);
ToDoList.addTask('Вынести мусор', 5);
ToDoList.addTask('Постирать одежду', 3);
ToDoList.addTask('Помыть полы', 4);
// ToDoList.removeTask(3);
ToDoList.upgradeTask(10, 'Сделано', 10);
// ToDoList.upgradeTask(4, 'Сделано', 10);
ToDoList.sortTask();

console.log(ToDoList.tasks.length);
console.log(ToDoList.tasks);


















































