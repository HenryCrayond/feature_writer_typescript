import { useMergeRefs } from '@floating-ui/react';
import React, { forwardRef } from 'react';

import { useOverlayContext } from '../../../hooks';
import { DialogCloseProps } from '../../types';

export const DialogClose = forwardRef((props:DialogCloseProps, propRef) => {
  const { children } = props;
  
  const { setOpen } = useOverlayContext();

  const childrenRef = children.ref;

  const ref = useMergeRefs([propRef, childrenRef]);

  return React.cloneElement(children, {
    ref,
    ...children.props,
    onClick: (event:React.MouseEvent<HTMLElement>) => {
      children.props.onClick?.(event);
      setOpen(false);
    },
  });
});

DialogClose.displayName = 'DialogClose';
