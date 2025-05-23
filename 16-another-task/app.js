"use strict"

/*
Задача

Введение
Обзор предыдущего задания: создание мини Task Manager'a с базовыми свойствами (ID, Name, Order).
Расширение задачи
Ввод нового типа задачи с дополнительным свойством Description.
Цель: расширить функциональность без изменения исходных методов.

*/

const ToDoList = {
   tasks: [],
   lastId: 0,
   addTask(title, priority){
      this.tasks.push({
         title,
         id: ++this.lastId,
         priority
      });
   },
   removeTask(id){
      this.tasks = this.tasks.filter(elem => elem.id !== id);
   },
   upgradeTask (id, title, priority){
      const task = this.tasks.find(elem => elem.id == id);
      if (!task){
         console.log(`Задача c идентификатором ${id}, отсутствует`);
         return;
      };
      task.title = title;
      task.priority = priority;
   },
   sortTask(){
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


const newTask = {
   tasks:[],
   lastId: 0,
   addTask(title, priority, description){
      this.tasks.push({
         title,
         id: ++this.lastId,
         priority
      });
      const task = this.tasks[this.tasks.length - 1];
      task.description = description;
      return task;
   }
}

const addTaskFunc = newTask.addTask;
const removeTaskFunc = ToDoList.removeTask;
const upgradeTaskFunc = ToDoList.upgradeTask;
const sortTaskFunc = ToDoList.sortTask;

addTaskFunc.apply(newTask, ['Помыть посуду', 7, 'Тарелки']);
addTaskFunc.apply(newTask, ['Вынести мусор', 5, 'Сегодня']);
addTaskFunc.apply(newTask, ['Постирать одежду', 3 , 'Завтра']);
addTaskFunc.apply(newTask, ['Помыть полы', 4, 'В выходные']);
// removeTaskFunc.apply(newTask, [3]);
upgradeTaskFunc.apply(newTask, [15,'Не сделано', 18]);
upgradeTaskFunc.apply(newTask, [4,'Cделано', 19]);
sortTaskFunc.apply(newTask);

console.log(newTask.tasks.length);
console.log(newTask.tasks);




















































