import { ClipboardText, PlusCircle } from "phosphor-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import { Task } from "./Task";

import styles from "./Taskbar.module.css";

interface Task {
  id: string;
  content: string;
  isChecked: boolean;
}

export function Taskbar() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [contentTask, setContentTask] = useState('');

  function handleTaskDone(id: string) {
    const getTask = tasks.find(task => task.id === id);

    if (getTask) {
      getTask.isChecked = !getTask.isChecked;

      const getIndex = tasks.findIndex(task => getTask.id == task.id);
      const updateTasks = [...tasks];

      updateTasks[getIndex] = getTask;
      setTasks([...updateTasks]);
    }
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    const newTask = {
      id: uuid(),
      content: contentTask,
      isChecked: false
    }

    console.log(newTask)

    setTasks([...tasks, newTask])
  }

  function handleContentTask(event: ChangeEvent<HTMLInputElement>) {
    setContentTask(event.target.value);
  }

  function deleteTask(id: string) {
    const tasksWithoutDeleteOne = tasks.filter(task => {

      return task.id !== id;
    });

    setTasks(tasksWithoutDeleteOne);
  }

  const tasksCompleted = tasks.reduce((index, task) => {
    if (task.isChecked) {
      return index + 1;
    }
    return index
  }, 0)

  return (
    <main>
      <form className={styles.taskbar} onSubmit={handleCreateNewTask}>
        <input
          placeholder="Adicione uma nova tarefa"
          value={contentTask}
          onChange={handleContentTask}
        />
        <button type="submit">
          Criar
          <PlusCircle size={16} />
        </button>
      </form>

      <div className={styles.status}>
        <header>
          <div>
            <strong>Tarefas criadas</strong>
            <span>{tasks.length}</span>
          </div>
          <div>
            <strong>Concluídas</strong>
            <span>{tasksCompleted} de {tasks.length}</span>
          </div>
        </header>
      </div>

      {tasks.length
        ?
        tasks.map(task => {
          {
            return (
              <Task
                key={task.id}
                id={task.id}
                content={task.content}
                isChecked={task.isChecked}
                onDeleteTask={deleteTask}
                onHandleTaskDone={handleTaskDone}
              />
            )
          }
        })
        :
        <div>
          <div className={styles.empty}>
            <ClipboardText size={56} />
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        </div>
      }
    </main>
  );
}