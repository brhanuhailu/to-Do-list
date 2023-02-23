class TaskStatus {
  constructor() {
    this.completed = false;
  }

  checked = (task) => {
    task.completed = true;
  }

  unchecked = (task) => {
    task.completed = false;
  }
}
//completed true / false
export default TaskStatus;