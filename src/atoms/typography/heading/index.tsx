import { forwardRef } from 'react';
import { tw, apply } from 'twind';
import { HeadingProps } from '../../types';

const Heading = forwardRef((props:HeadingProps, ref :React.Ref<HTMLDivElement> | undefined) => {
  const {
    as: Component = 'h1',
    rootStyle,
    size,
    children,
    className = '',
    ...rest
  } = props;

  const sizeMap = {
    h1: apply`text-3xl`,
    h2: apply`text-2xl`,
    h3: apply`text-xl`,
    h4: apply`text-lg`,
    h5: apply`text-base`,
    h6: apply`text-sm`,
  };

  const rootTw = apply`
    text-gray-900 font-semibold text-xl
    ${sizeMap[size]}
    ${rootStyle}
  `;

  return (
    <Component ref={ref} className={`${tw(rootTw)} ${className}`} {...rest}>
      {children}
    </Component>
  );
});

Heading.displayName = 'Heading';

Heading.defaultProps = {
  size: 'h1'
}

export { Heading };
