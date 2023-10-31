import { Box, Text } from "../../../atoms";
import { forwardRef } from "react";
import { apply, tw } from "twind";
import { InputProps } from "../../types";

const Input = forwardRef((props:InputProps, ref: React.Ref<HTMLInputElement> | undefined) => {
  const {
    className = "",
    rootStyle = "",
    value,
    inputStyle = "",
    placeholderText = "Placeholder Text..",
    type = "text",
    size = "md",
    onChange,
    errorElement,
    leftIcon,
    variant = "flushed",
    error = false,
    required = false,
    disabled = false,
    rightIcon,
    rootProps,
    ...rest
  } = props;

  const variantMap = {
    outlined: apply`bg-white outline-none border([1.5px ] gray-200) focus:(ring-1)`,
    filled: apply`bg(gray-100 white(focus:&)) border([1.5px] gray-200)`,
    flushed: apply`bg-white border(b-1 gray-200 primary-500(focus:&)) 
                     rounded-none focus:(outline-none)`,
  };

  const sizeMap = {
    sm: apply`text-xs py-1 px-2 rounded`,
    md: apply`text-sm py-1.5 px-2 rounded-md`,
    lg: apply`text-base py-2 px-4 rounded-lg`,
  };

  const paddingMap = {
    sm: apply`pl-8`,
    md: apply`pl-9`,
    lg: apply`pl-10`,
  };

  const inputTw = apply`
      block text-gray-900 font-medium
      placeholder::(text-gray-400 font-medium ${
        size === "lg" ? "text-base" : "text-sm"
      })
      ${
        variant !== "flushed"
          ? `focus:(outline-none border([1.5px] primary-500))`
          : ""
      }
      ${sizeMap[size]} 
      ${variantMap[variant]} 
      ${
        error
          ? `border([1.5px] red-500 red-500(focus:&)) 
            focus:(outline-none border([1.5px] red-400) ring([0.5px] red-400))`
          : ""
      }
      ${disabled ? "bg-gray-200 border-none cursor-not-allowed" : ""}
      ${leftIcon && paddingMap[size]}
      ${inputStyle}
  `;

  return (
    <Box rootStyle={`relative w-64 ${rootStyle}`} {...rootProps}>
      {leftIcon && (
        <Box
          rootStyle={`absolute grid items-center pointer-events-none text-gray-400 h-full
            ${size === "lg" ? " pl-4" : " pl-3"}`}
        >
          {leftIcon}
        </Box>
      )}

      <input
        type={type}
        style={{
          width: "inherit",
        }}
        onChange={onChange}
        className={`${tw(inputTw)} ${className}`}
        placeholder={placeholderText}
        disabled={disabled}
        required={required}
        ref={ref}
        value={value}
        {...rest}
      />

      {rightIcon && (
        <Box
          rootStyle={`absolute grid items-center text-gray-400 h-full right-0 top-0
            ${size === "lg" ? " pr-4" : " pr-3"}`}
        >
          {rightIcon}
        </Box>
      )}

      {error && <Text>{`${error}`}</Text>}
      {errorElement && errorElement}
    </Box>
  );
});

Input.displayName = "Input";

Input.defaultProps = {
  value: "",
  placeholderText: "Placeholder",
  type: "text",
  size: "md",
  variant: "flushed",
  error: false,
  required: false,
  disabled: false,
};

export { Input };
