import styles from '@/components/ActionBar.module.css';
import React, { Dispatch, RefObject, SetStateAction } from 'react';
import { IdataItem } from '@/interfaces';
export function ActionBar({
  allSelectorCheckboxRef,
  allSelectorLabel,
  selectedRows,
  isDownloadable,
  handleAllSelectorCheckboxChange,
}: {
  allSelectorCheckboxRef: RefObject<HTMLInputElement | null>;
  allSelectorLabel: string;
  selectedRows: Array<IdataItem>;
  isDownloadable: boolean;
  handleAllSelectorCheckboxChange: (checked: boolean) => void;
}) {
  const handleDownloadSelected = () => {
    const selectedRowsInStringArray = selectedRows.map(
      (row) => `Name: ${row.name} Device: ${row.device} Path: ${row.path}`
    );
    alert(`Downloaded Items\n${selectedRowsInStringArray.join('\n')}`);
  };

  return (
    <div className={styles.actionBarCont}>
      <div className={styles.checkboxCont}>
        <input
          type='checkbox'
          ref={(ele) => {
            allSelectorCheckboxRef.current = ele;
          }}
          onChange={(evt) =>
            handleAllSelectorCheckboxChange(evt.target.checked)
          }
        />
        <span className={styles.checkboxLabel}>{allSelectorLabel}</span>
      </div>
      <button
        disabled={!isDownloadable}
        className={styles.downloadBtn}
        onClick={handleDownloadSelected}
      >
        <span>&#11015;</span>Download selected
      </button>
    </div>
  );
}
