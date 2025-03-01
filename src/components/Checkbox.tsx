import { ChangeEventHandler } from 'react';

export function Checkbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return <input type='checkbox' checked={checked} onChange={onChange} />;
}
