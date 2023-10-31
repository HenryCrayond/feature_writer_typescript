import { useMergeRefs } from '@floating-ui/react';
import React, { forwardRef } from 'react';

import { useOverlayContext } from '../../../hooks';
import { DialogTriggerProps } from '../../types';

export const DialogTrigger = forwardRef(({ children }:DialogTriggerProps, propRef) => {
  const context = useOverlayContext();
  const childrenRef = children.ref;

  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  return React.cloneElement(
    children,
    context.getReferenceProps({ref,...children.props,'data-state': context.open ? 'open' : 'closed'} as React.HTMLProps<Element>)
  );
});

DialogTrigger.displayName = 'DialogTrigger';
