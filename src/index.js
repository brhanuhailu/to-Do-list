/* eslint no-alert: "error" */
/* eslint-disable no-use-before-define */

import './style.css';

class Tasks {
  constructor(description, completed = false, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

class Todolist {
  constructor() {
    this.taskDtata = [];
  }

  display = () => {
    const taskitem = document.querySelector('.task-item');
    if (taskitem) {
      taskitem.innerHTML = '';
    }
    this.taskDtata.forEach((element) => {
      const li = [];
      li[element.index] = document.createElement('li');
      li[element.index].setAttribute('id', element.index);
      const p = [];
      p[element.index] = document.createElement('p');
      p[element.index].textContent = element.description;
      p[element.index].setAttribute('id', element.index);
      p[element.index].contentEditable = true;
      const inputBox = [];
      inputBox[element.index] = document.createElement('input');
      inputBox[element.index].setAttribute('type', 'checkbox');
      inputBox[element.index].classList.add('checkbox');
      inputBox[element.index].setAttribute('id', element.index);
      const button = [];
      button[element.index] = document.createElement('button');
      button[element.index].setAttribute('id', element.index);
      button[element.index].innerHTML = '<i class="fa-solid fa-ellipsis-vertical icon"></i>';
      li[element.index].append(inputBox[element.index], p[element.index], button[element.index]);
      taskitem.append(li[element.index]);

      p[element.index].addEventListener('click', (e) => {
        e.target.nextSibling.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        e.target.nextSibling.style.cursor = 'pointer';

        e.target.nextSibling.addEventListener('click', () => {
          li[element.index].remove();
          this.removetask(element.index);
        });
      });

      li[element.index].addEventListener('mouseleave', (e) => {
        button[element.index].innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>';
        this.updatetask(e.target.id, e.target.innerText);
      });
    });
  }

  addtask = (description, completed, index) => {
    const newtask = new Tasks(description, completed, index);
    this.taskDtata.push(newtask);
    if (typeof window !== 'undefined') {
      localStorage.setItem('LOCALLISTDB', JSON.stringify(this.taskDtata));
    }
  }

  removetask(item) {
    const key = item;
    if (this.taskDtata.length === 1) {
      this.taskDtata = [];
    } else {
      this.taskDtata.splice(key, 1);
    }
    this.taskDtata.forEach((element, index) => {
      element.index = index;
    });
    if (typeof window !== 'undefined') {
      localStorage.setItem('LOCALLISTDB', JSON.stringify(this.taskDtata));
      this.display();
    }
  }

  updatetask(item, description) {
    if (this.taskDtata[item].index === Number(item)) {
      this.taskDtata[item].description = description;
    }
    this.taskDtata.forEach((element, index) => {
      element.index = index;
    });
    if (typeof window !== 'undefined') {
      localStorage.setItem('LOCALLISTDB', JSON.stringify(this.taskDtata));
      this.display();
    }
  }
}

let index = 0;
const completed = false;
const taskentry = new Todolist();
const addnewtask = document.querySelector('.addbtn');
const inputelement = document.querySelector('.input-element');
addnewtask.addEventListener('click', () => {
  if (inputelement.value === '') {
    addnewtask.setCustomValidity('This is required field!');
  } else {
    taskentry.addtask(inputelement.value, completed, index);
    taskentry.display();
    inputelement.value = '';
    index += 1;
  }
});

window.onload = () => {
  taskentry.taskDtata = JSON.parse(localStorage.getItem('LOCALLISTDB' || '[]'));
  if (taskentry.taskDtata === null) {
    taskentry.taskDtata = [];
    return;
  }
  taskentry.display();
};
