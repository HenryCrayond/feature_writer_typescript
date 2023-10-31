import { CircularProgress } from '../../feedback/circularProgress';
import { focus } from '../../../utils/twind';
import React, { forwardRef } from 'react';
import { apply, tw } from 'twind';
import { ButtonProps } from '../../types';

const Button = forwardRef((props:ButtonProps, ref) => {
  const {
    className = '',
    children,
    size = 'md',
    color = 'primary',
    variant = "solid",
    disabled = false,
    gradient = false,
    loading = false,
    loadingText = 'loading...',
    rootStyle,
    leftIcon,
    rightIcon,
    title,
    ...rest
  } = props;

  const sizeMap = {
    sm: apply`text-xs py-1 px-2 rounded`,
    md: apply`text-sm py-1 px-2.5 rounded-md`,
    lg: apply`text-base py-1.5 px-3 rounded-md`,
  };

  const variantMap = {
    ghost: apply`bg(${color}-50) text-${color}(500 600(hover:&)) transition ease-in duration-200 hover:(bg(${color}-100))`,
    outlined: apply`bg-white text-${color}-500 transition ease-in duration-200 
      border([1.5px] ${color}-500) hover:(bg(${color}-50))`,
    solid: apply`text-white bg(${
      gradient ? 'primaryGradient' : `${color}-500`
    })  bg-${color}(600(hover:& focus:&)) transition ease-in duration-200 border([1.5px] ${color}-500)`,
    link: apply`text-${color}-500 underline transition ease-in duration-200`,
  };

  const buttonTw = apply`inline-flex items-center justify-between relative
    ${sizeMap[size]}
    ${variantMap[variant]}
    ${focus}
    ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
    ${rootStyle}
  `;

  return React.createElement(
    'button',
    {
      ref,
      className: `${tw(buttonTw)} ${className}`,
      disabled: disabled || loading,
      type: 'button',
      title:title,
      ...rest,
    },
    leftIcon && !loading && leftIcon,
    loading && React.createElement(CircularProgress),
    loading ? loadingText : children,
    rightIcon && !loading && rightIcon
  );
});

Button.displayName = 'Button';

Button.defaultProps = {
  color: 'primary',
  size: 'md',
  variant: 'solid',
  disabled: false,
  loading: false,
  gradient: false,
  loadingText: 'Loading...',
};

export { Button };
