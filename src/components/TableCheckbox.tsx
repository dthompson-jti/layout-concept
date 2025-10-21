// src/components/TableCheckbox.tsx
import { HTMLProps, useEffect, useRef } from 'react'; // FIX: Removed unused 'React' import

export function TableCheckbox({ indeterminate, ...rest }: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!);
  
  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return <input type="checkbox" ref={ref} className={'cursor-pointer'} {...rest} />;
}