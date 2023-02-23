import Tasks from './tasks.js';
import TaskStatus from './task.js';

export default class Todolist {
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
        // checkbox set
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
        inputBox[element.index].addEventListener('change', (e) => {
          const status = new TaskStatus();
          if (e.target.checked === true) {
            status.checked(this.taskDtata[element.index]);
          } else {
            status.unchecked(this.taskDtata[element.index]);
          }
          this.updatetask(e.target.nextSibling.id, e.target.nextSibling.innerText);
        });
        if (this.taskDtata[element.index].completed === true) {
          inputBox[element.index].setAttribute('checked', 'checked');
          li[element.index].classList.add('checked');
          p[element.index].style.textDecoration = 'line-through';
        } else if (this.taskDtata[element.index].completed === false) {
          inputBox[element.index].removeAttribute('checked');
          li[element.index].classList.remove('checked');
          p[element.index].style.textDecoration = 'none';
        }
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

    Clearallcompletedtasks = () => {
      this.taskDtata = this.taskDtata.filter((element) => element.completed === false);
      this.taskDtata.forEach((e, index) => {
        e.index = index;
      });
      if (typeof window !== 'undefined') {
        localStorage.setItem('LOCALLISTDB', JSON.stringify(this.taskDtata));
        window.location.reload();
      }
    };
}
