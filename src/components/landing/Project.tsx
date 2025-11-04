import { type ProjectInterface } from '@/data/projects';
import styles from '@/styles/landing/Projects.module.scss';
import clsx from 'clsx';

interface Props {
  index: number;
  item: ProjectInterface;
  className?: string;
}

export default function Project({ index, item, className }: Props) {
  return (
    <div className={clsx(className, styles.projectCard)} key={index}>
      <div className={styles.icon}>{item.icon}</div>
      <div className={styles.textContent}>
        <div className={styles.title}>{item.title}</div>
        {/* <div className={styles.accent}>{item.accent}</div> */}
        <div className={styles.description}>{item.description}</div>
      </div>

    </div>
  );
}
