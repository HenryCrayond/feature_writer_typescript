import {
    FloatingFocusManager,
    FloatingOverlay,
    useMergeRefs,
  } from '@floating-ui/react';
  import { forwardRef } from 'react';
  import { tw } from 'twind';
  
  import { useOverlayContext } from '../../../hooks';
  import { Box } from '../../layout/box';
import { DialogContentProps } from '../../types';
  
  export const DialogContent = forwardRef((props:DialogContentProps, propRef) => {
    const { context: floatingContext, ...context } = useOverlayContext();
  
    const {className, children,floatingOverlay, ...rest } = props;
  
    const ref = useMergeRefs([context.refs.setFloating, propRef]);
  
    return (
      <>
        {context.open && (
          <FloatingOverlay
            className={tw(
              'bg-black bg-opacity-80 z-50 grid justify-items-center relative',
            )}
            lockScroll
          >
            <FloatingFocusManager context={floatingContext} modal={context.modal}>
              <Box
                {...context.getFloatingProps({ ref, ...rest })}
                className={tw(
                  'absolute top-12 bg-white p-3 rounded grid gap-y-2',
                 className
                )}
              >
                {children}
              </Box>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </>
    );
  });
  
  DialogContent.displayName = 'DialogContent';
  