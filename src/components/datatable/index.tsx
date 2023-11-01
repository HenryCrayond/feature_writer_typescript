import { Editor } from '../../atoms';
import { forwardRef } from 'react';
import { apply, tw } from 'twind';
import { DatatableProps } from '../../types';

const Datatable = forwardRef((props:DatatableProps, ref:React.Ref<HTMLDivElement> | undefined) => {
  const { className = '', datatable, onChange=()=>{}, rootStyle, ...rest } = props;

  const rootTw = apply` ${rootStyle}`;

  return (
    <div ref={ref} className={tw(rootTw, className)} {...rest}>
      <Editor content={datatable} onChange={(e)=>onChange(e)} />
    </div>
  );
});

Datatable.displayName = 'Datatable';

export { Datatable };

