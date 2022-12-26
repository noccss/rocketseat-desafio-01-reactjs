import { Trash } from 'phosphor-react';
import styles from './Task.module.css';

interface TaskProps {
  id: string
  content: string
  isChecked: boolean
  onDeleteTask: (id: string) => void
  onHandleTaskDone: (id: string) => void
}

export function Task({ id, content, isChecked, onDeleteTask, onHandleTaskDone }: TaskProps) {
  function handleTaskDone(id: string) {
    onHandleTaskDone(id);
  }

  function handleDeleteTask() {
    onDeleteTask(id);
  }

  return (
    <section className={styles.task}>
      <div className={styles.wrapper}>
        <div className={styles.check}>
          <input
            id={id.toString()}
            type="checkbox"
            onClick={() => handleTaskDone(id)}
            defaultChecked={isChecked}
          />
          <label htmlFor={id.toString()}></label>
        </div>
        <span className={isChecked ? styles.text : ''}>{content}</span>
        <button title="Deletar comentário" onClick={handleDeleteTask}>
          <Trash size={20} />
        </button>
      </div>
    </section>
  );
}