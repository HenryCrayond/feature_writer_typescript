import React, { forwardRef } from 'react';
import { RiAccountCircleFill } from 'react-icons/ri';
import { tw as twind } from 'twind';
import {IconProps } from '../../types';

export const Icon = forwardRef((props:IconProps, ref:React.Ref<HTMLDivElement> | undefined) => {
  const { className = '', as = RiAccountCircleFill, size, tw, ...rest } = props;

  const IconComponent = as({
    size,
  });

  return React.cloneElement(IconComponent, {
    ref,
    className: `${twind(className)}`,
    ...rest,
  });
});

Icon.displayName = 'Icon';
