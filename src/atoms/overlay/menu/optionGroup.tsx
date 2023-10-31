import React, { forwardRef } from 'react';
import { apply, tw } from 'twind';
import { Box } from '../../layout/box';
import { Option } from './option';
import { OptionGroupProps } from '../../types';

const OptionGroup = forwardRef((props:OptionGroupProps, ref:React.Ref<HTMLDivElement> | undefined) => {
  const { children, label, className, ...rest } = props;

  // Check that all children are either Option or OptionGroup
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      throw new Error('Option Group component only accepts Option as children');
    }
    if (child.type !== Option) {
      throw new Error('Option Group component only accepts Option as children');
    }
  });

  const optionGroupStyle = apply`text-gray-500 text-sm pl-1`;

  return (
    <Box ref={ref} role="group" aria-label={label}>
      <span className={tw(optionGroupStyle, className)} {...rest}>
        {label}
      </span>
      {children}
    </Box>
  );
});

OptionGroup.displayName = 'OptionGroup';

export { OptionGroup };
