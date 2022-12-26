import styles from './Header.module.css';

import rocketIcon from '../assets/rocket.svg';

export function Header() {
  return (
    <header className={styles.header}>
      <img src={rocketIcon} />
      <div>
        <strong>to</strong>
        <span>do</span>
      </div>
    </header>
  )
}