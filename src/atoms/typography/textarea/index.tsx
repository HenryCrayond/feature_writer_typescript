import { forwardRef } from 'react';
import { apply, tw } from 'twind';
import { TextareaProps } from '../../types';

const Textarea = forwardRef((props:TextareaProps, ref:React.Ref<HTMLTextAreaElement>| undefined) => {
  const {
    className = '',
    rootStyle = '',
    placeholderText = 'Placeholder Text..',
    size = 'md',
    rows = 3,
    variant = 'flushed',
    error = false,
    required = false,
    disabled = false,
    ...rest
  } = props;

  const variantMap = {
    outlined: apply`bg-white outline-none border([1.5px ] salte-200) focus:(ring-1)`,
    filled: apply`bg(gray-100 white(focus:&)) border([1.5px] salte-200)`,
    flushed: apply`bg-white border(b-1 salte-200 primary-500(focus:&)) 
                     rounded-none focus:(outline-none)`,
  };

  const sizeMap = {
    sm: apply`text-xs py-1 px-2 rounded`,
    md: apply`text-sm py-1.5 px-2 rounded-md`,
    lg: apply`text-base py-2 px-4 rounded-lg`,
  };

  const inputTw = apply`
      block text-gray-900 font-medium 
      placeholder::(text-gray-400 font-medium ${
        size === 'lg' ? 'text-base' : 'text-sm'
      })
      ${
        variant !== 'flushed'
          ? `focus:(outline-none border([1.5px] primary-500))`
          : ''
      }
      ${sizeMap[size]} 
      ${variantMap[variant]} 
      ${
        error
          ? `border([1.5px] red-500 red-500(focus:&)) 
            focus:(outline-none border([1.5px] red-400) ring([0.5px] red-400))`
          : ''
      }
      ${disabled ? 'bg-gray-200 border-none cursor-not-allowed' : ''}
      ${rootStyle}
  `;

  return (
    <textarea
      className={`${tw(inputTw)} ${className}`}
      rows={rows}
      placeholder={placeholderText}
      disabled={disabled}
      required={required}
      ref={ref}
      {...rest}
    />
  );
});

Textarea.displayName = 'Textarea';


Textarea.defaultProps = {
  placeholderText: 'Placeholder Text..',
  size: 'md',
  rows: 3,
  variant: 'flushed',
  error: false,
  required: false,
  disabled: false,
};

export { Textarea };
