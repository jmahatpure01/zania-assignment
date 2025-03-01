import styles from '@/components/Column.module.css';
import { JSX } from 'react';
export function Column({ items }: { items: Array<string | JSX.Element> }) {
  const getKey = (item: string | JSX.Element, idx: number) => {
    if (typeof item === 'string') {
      return item + idx;
    } else {
      return 'checkbox' + idx;
    }
  };
  return (
    <div className={styles.column}>
      {items.map((item, idx) => (
        <p key={getKey(item, idx)}>
          {item === 'available' ? (
            <span className={styles.greenCircle}></span>
          ) : (
            ''
          )}
          {item}
        </p>
      ))}
    </div>
  );
}
