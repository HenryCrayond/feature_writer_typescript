import { useListItem, useMergeRefs } from '@floating-ui/react';
import { forwardRef } from 'react';
import { apply, tw } from 'twind';

import { useAutocompleteContext, useOverlayListContext } from '../../../hooks';
import { Box } from '../../layout/box';
import { OptionProps } from '../../types';


export const Option = forwardRef((props:OptionProps, propRef:React.Ref<HTMLDivElement> | undefined) => {
  const { className, value, label, ...rest } = props;

  const { activeIndex, listContentRef, setOpen, refs } =useOverlayListContext();

  const { selectedValue, handleChange } = useAutocompleteContext();
  console.log(useAutocompleteContext(),"098765");
  
  const { ref, index } = useListItem();

  const isActive = activeIndex === index;

  const optionStyle = apply`
  cursor-pointer px-1.5 py-0.5 rounded ${
    selectedValue?.value === value && 'text-white'
  } 
  ${isActive && 'bg-primary-50 50(hover:& focus:&)'}
    focus:(outline-none) bg-primary-50(hover:& 
    focus:&) ${
      selectedValue?.value === value && 'bg-primary(500 500(hover:& focus:&))'
    }
  `;

  const listItemRef = useMergeRefs([ref, propRef]);

  const handleSelect = () => {
    const reference = refs?.reference?.current;
    if (reference) {
      reference.focus();
    }
    setOpen(false);
    handleChange({
      label,
      value,
    });
  };

  if (listContentRef) {
    listContentRef.current[index] = label;
  }

  return (
    <Box
      className={tw(optionStyle, className)}
      {...rest}
      ref={listItemRef}
      tabIndex={isActive ? 0 : -1}
      onClick={handleSelect}
      onKeyDown={(event:React.KeyboardEvent) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          handleSelect();
        }
      }}
    >
      {label}
    </Box>
  );
});

Option.displayName = 'Option';
