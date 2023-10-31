import {
    useClick,
    useDismiss,
    useInteractions,
    useRole,
  } from '@floating-ui/react';
  
  import React from 'react';
  import { OverlayContext, useOverlay } from '../../../hooks';
import { DialogProps } from '../../types';
  
  export function Dialog({ children, ...restOptions }:DialogProps) {
    const {
      initialOpen = false,
      open,
      dismissable = true,
      onOpenChange,
    } = restOptions;
  
    const data = useOverlay('dialog', {
      initialOpen,
      open,
      onOpenChange,
    });
  
    const dismiss = useDismiss(data.context, {
      enabled: dismissable,
    });
    const role = useRole(data.context);
  
    const click = useClick(data.context, {
      enabled: !open,
    });
  
    const interactions = useInteractions([click, dismiss, role]);
  
    const dialog = React.useMemo(
      () => ({ ...data, ...interactions }),
      [data, interactions]
    );
  
    return (
      <OverlayContext.Provider value={dialog}>{children}</OverlayContext.Provider>
    );
  }
  
  export * from './close';
  export * from './content';
  export * from './trigger';
  