'use client';
import styles from '@/components/Table.module.css';
import { ActionBar } from './ActionBar';
import { IdataItem } from '@/interfaces';
import { Column } from './Column';
import { Checkbox } from './Checkbox';
import { ChangeEvent, createRef, useState } from 'react';

export function Table({ data }: { data: Array<IdataItem> }) {
  const [checkboxData, setCheckboxData] = useState<Array<boolean>>(
    data.map(() => false)
  );
  const [selectedRows, setSelectedRows] = useState<Array<IdataItem>>([]);
  const allSelectorCheckboxRef = createRef<HTMLInputElement>();
  const [allSelectorLabel, setAllSelectorLabel] =
    useState<string>('None selected');
  const [isDownloadable, setIsDownloadable] = useState<boolean>(false);

  const handleCheckboxChange = (
    evt: ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    setCheckboxData((checkboxes) =>
      checkboxes.map((checked, checkboxIdx) =>
        checkboxIdx === idx ? evt.target.checked : checked
      )
    );
    propagateChangeToAllSelectorCheckbox(idx, evt.target.checked);
  };

  const propagateChangeToAllSelectorCheckbox = (
    idx: number,
    checked: boolean
  ) => {
    if (allSelectorCheckboxRef.current) {
      let rows: Array<IdataItem> = [...selectedRows];
      if (checked) {
        rows.push(data[idx]);
      } else {
        rows = rows.filter((row) => row.name !== data[idx].name);
      }
      setIsDownloadable(
        rows.findIndex((row) => row.status.toLowerCase() !== 'available') === -1
      );
      setSelectedRows(rows);
      if (rows.length === data.length) {
        allSelectorCheckboxRef.current.indeterminate = false;
        allSelectorCheckboxRef.current.checked = true;
        setAllSelectorLabel('All selected');
      } else if (rows.length > 0) {
        allSelectorCheckboxRef.current.indeterminate = true;
        setAllSelectorLabel(`${rows.length.toString()} selected`);
      } else {
        allSelectorCheckboxRef.current.checked = false;
        allSelectorCheckboxRef.current.indeterminate = false;
        setAllSelectorLabel('None selected');
      }
    }
  };

  const handleAllSelectorCheckboxChange = (checked: boolean) => {
    if (checkboxData.length) {
      let rowCheckboxes = checkboxData.map(() => checked);
      setCheckboxData(rowCheckboxes);
      if (checked) {
        setSelectedRows(data);
        setIsDownloadable(
          data.findIndex((row) => row.status.toLowerCase() !== 'available') ===
            -1
        );
        setAllSelectorLabel('All selected');
      } else {
        setSelectedRows([]);
        setIsDownloadable(false);
        setAllSelectorLabel('None selected');
      }
    }
  };

  const columnHeadings = ['', ...Object.keys(data[0])];

  const getColumnItems = (heading: string) => {
    if (heading) {
      const items = [heading];
      return items.concat(data.map((item) => item[heading as keyof IdataItem]));
    } else {
      return [
        '',
        ...data.map((_, idx) => (
          <Checkbox
            checked={checkboxData[idx]}
            onChange={(evt) => handleCheckboxChange(evt, idx)}
          />
        )),
      ];
    }
  };

  return (
    <div className={styles.tableContainer}>
      <ActionBar
        allSelectorCheckboxRef={allSelectorCheckboxRef}
        allSelectorLabel={allSelectorLabel}
        selectedRows={selectedRows}
        isDownloadable={isDownloadable}
        handleAllSelectorCheckboxChange={handleAllSelectorCheckboxChange}
      />
      <div className={styles.row}>
        {columnHeadings.map((heading, idx) => (
          <Column key={heading + idx} items={getColumnItems(heading)} />
        ))}
      </div>
    </div>
  );
}
