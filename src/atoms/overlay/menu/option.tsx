import { useListItem, useMergeRefs } from '@floating-ui/react';
import { forwardRef } from 'react';
import { apply, tw } from 'twind';

import { useOverlayListContext, useSelectContext } from '../../../hooks';
import { Box } from '../../layout/box';
import { OptionProps } from '../../types';

export const Option = forwardRef((props:OptionProps, propRef) => {
  const { children, className, value, label, ...rest } = props;

  const { activeIndex, setSelectedIndex, listContentRef, setOpen } =
    useOverlayListContext();

  const { value: selectedValue, onChange } = useSelectContext();

  const optionStyle = apply`
  cursor-pointer px-1.5 py-0.5 rounded ${
    selectedValue?.value === value && 'text-white'
  } 
    focus:(outline-none) bg-primary-50(hover:& 
    focus:&) ${
      selectedValue?.value === value && 'bg-primary(500 500(hover:& focus:&))'
    }
  `;

  const { ref, index } = useListItem();

  const listItemRef = useMergeRefs([ref, propRef]);
   
  const isActive = activeIndex === index;

  const handleSelect = () => {
    if (setSelectedIndex) setSelectedIndex(index);
    onChange({
      label,
      value,
    });
    setOpen(false);
  };
  if (listContentRef?.current) {
    listContentRef.current[index] = label;
  }
  return (
    <Box
      role="option"
      aria-selected={selectedValue?.value === value && index === activeIndex}
      className={tw(optionStyle, className)}
      data-selected={selectedValue?.value === value ? '' : undefined}
      {...rest}
      ref={listItemRef}
      tabIndex={isActive ? 0 : -1}
      onClick={handleSelect}
      onKeyDown={(event:React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          handleSelect();
        }
      }}
    >
      {children || label}
    </Box>
  );
});

Option.displayName = 'Option';
