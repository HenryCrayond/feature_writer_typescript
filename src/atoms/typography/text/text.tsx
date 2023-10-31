import { forwardRef } from 'react';
import { tw, apply } from 'twind';
import { TextProps } from '../../types';

const Text = forwardRef((props:TextProps, ref:React.Ref<HTMLParagraphElement> | undefined) => {
  const { className = '', children = '', rootStyle, ...rest } = props;

  const rootTw = apply`text-gray-900 text-sm ${rootStyle}`;

  return (
    <p ref={ref} className={`${tw(rootTw)} ${className}`} {...rest}>
      {children}
    </p>
  );
});

Text.displayName = 'Text';

export { Text };
