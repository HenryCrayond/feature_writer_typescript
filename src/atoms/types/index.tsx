import { HTMLAttributes } from "react";
import { TW } from "twind";
import { EditorDatatableProps } from "../../types";

interface defaultValProps {
  label?: string;
  value?: string;
}

// Box prop types
export interface BoxProps extends Omit<HTMLAttributes<HTMLDivElement>, "id"> {
  rootStyle?: string;
  // id?:number|string;
}

// button prop types
export interface ButtonProps {
  /**
   * Label to be shown on the button
   */
  children: React.ReactNode;
  /**
   * class name of the component for styling
   */
  className?: string;
  /**
   * Defines the size of the button
   */
  size?: "sm" | "md" | "lg";
  /**
   * Defines the color of the button which is set through theme.
   */
  color?: "primary" | "gray";
  /**
   * Defines the variant of the button
   */
  variant?: "solid" | "outlined" | "link" | "ghost";
  /**
   * Defines whether the button should be enabled or disabled
   */
  disabled?: boolean;
  /**
   * Defines the gradient of the button
   */
  gradient?: boolean;
  /**
   * Defines the loading state of the button
   */
  loading?: boolean;
  /**
   * Defines the text to be displayed while the loading
   */
  loadingText?: string;
  /**
   * Defines the icon to be shown in the left of the button text. Eg.<CircularProgress/>
   */
  leftIcon?: React.ReactNode;
  /**
   * Defines the icon to be shown in the right of the button text. Eg.<CircularProgress/>`
   */
  rightIcon?: React.ReactNode;
  /**
   * Handler function for button click
   */

  rootStyle?: string;

  title?: string;

  onClick?: () => void;
}

// Heading prop types
export interface HeadingProps {
  /**
   * Classname to style the component
   */
  className?: string;
  /**
   * root style of the component
   */
  rootStyle?: string;
  /**
   * Size of the heading
   */
  size: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  /**
   * Element to be placed inside the component
   */
  children: string;
  /**
   * as extend the heding key
   */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

// Text prop types
export interface TextProps {
  /**
   * Classname to style the component
   */
  className?: string;
  /**
   * root style of the component
   */
  rootStyle?: string;
  /**
   * Element to be placed inside the component
   */
  children?: string;
  /**
   * id is the unique
   */
  id?: string;
}

//TextArea props type
export interface TextareaProps
  extends Omit<HTMLAttributes<HTMLTextAreaElement>, "value"> {
  className?: string;
  rootStyle?: string;
  placeholderText: string;
  size?: "sm" | "md" | "lg";
  rows?: number;
  variant?: "flushed" | "outlined";
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
  value?: string;
}
// input type props
export interface InputProps {
  /**
   * class name of the input field for styling purpose
   */
  className?: string;

  id?: string;

  rootStyle?: {};
  /**
   * Defines the Value to be filled in the input field
   */
  value?: string;

  inputStyle?: string;
  /**
   * Defines the Placeholder text to be shown in the input field
   */
  placeholderText?: string;
  /**
   * Defines the type of Value to be filled in the input field
   */
  type?: "text" | "number" | "email" | "password";
  /**
   * Defines the size of the input field
   */
  size?: "sm" | "md" | "lg";
  /**
   * Handler function to handle the chenages in input field
   */
  onChange?: (val: React.ChangeEvent<HTMLInputElement>) => void;

  errorElement?: React.ReactNode;

  leftIcon?: React.ReactNode;
  /**
   * Defines the Variant of the input field
   */
  variant?: "flushed" | "outlined";
  /**
   * Defines wheather input has error or not in input
   */
  error?: boolean;
  /**
   * Defines the whether the input is mandate or not
   */
  required?: boolean;
  /**
   * Defines wheather input is disabled or not
   */
  disabled?: boolean;

  rightIcon?: React.ReactNode;

  rootProps?: {
    rootStyle?: string;
  };
}

// InputEditable prop types
export interface InputEditableProps {
  /**
   * Classname for Styling the component
   */
  className?: string;
  /**
   * Value to be shown on the Input
   */
  text?: string;
  /**
   * Size of the Input
   */
  size?: "sm" | "md" | "lg";
  /**
   * Placeholder to be shown on the inputF
   */
  placeholderText?: string;
  /**
   * onTextEdited function used to text edit
   */
  onTextEdited?: (val: string) => void;
  /**
   * Decides the width of the Input
   */
  inputWidth?: string;
  /**
   * Default Value of the Editable State input
   */
  defaultEdit?: boolean;
  /**
   * root class name of the extire area for styling
   */
  rootStyle?: string;
  /**
   * Classname of the text for styling
   */
  textStyle?: string;
  /**
   * headingStyle
   */
  headingStyle?: string;
  /**
   * headingSize
   */
  headingSize?: number;
}

// Icon props types
export interface IconProps {
  /**
   * Classname to style the component
   */
  className?: string;
  /**
   * Size of the heading
   */
  size?: number;
  /**
   * tw css props
   */
  tw?: TW;
  /**
   * as extend the heding key
   */
  as?: React.ReactElement | null;
  /**
   * to using tabIndex number
   */
  tabIndex?: number;
}

// Select prop types
export interface SelectProps {
  /**
   * class name of the component for styling
   */
  className?: string;
  /**
   * To handle modal open and close
   */
  modal?: boolean;
  /**
   * This props used to placeholder text
   */
  placeholder?: string;
  /**
   * Its default value
   */
  defaultValue?: defaultValProps | undefined;

  /**
   * Handle open in popover
   */
  open?: boolean;
  /**
   * used to unput width
   */
  width?: number;
  /**
   * Used to show empty state
   */
  showEmptyState?: boolean;
  /**
   * empty state
   */
  emptyState?: React.ReactNode;
  /**
   * handle on open chnage events
   */
  onOpenChange?: () => void;
  /**
   * handle on input chnage events
   */
  onInputChange?: (val: React.ChangeEvent) => void;
  /**
   * handle clearable input values
   */
  clearable?: boolean;
  /**
   * handle focusable input
   */
  focusable?: boolean;
  /**
   * render options here
   */
  options?: { label: string; value: string };
  /**
   * options props
   */
  optionProps?: OptionProps;
  /**
   * option list props
   */
  optionListProps?: OptionListProps;
  /**
   * unique id
   */
  id?: number | string;
  /**
   * find initials open in popover
   */
  initialOpen?: boolean;
  /**
   * placement
   */
  placement?: undefined;
  /**
   * is show Arrow
   */
  showArrow?: boolean;
  /**
   * middlewere
   */
  middleware?: [];
  /**
   * Defines the size of the input
   */
  size?: "sm" | "md" | "lg";
  /**
   * Elements to be rendered inside the component
   */
  children?: React.ReactNode;

  arrowProps?: undefined;

  value?: string;

  listProps?: OptionListProps;

  optionGroupProps?: OptionGroupProps;

  allowHover?: undefined;

  variant?: string;

  leftIcon?: React.ReactNode;
  placeholderText?: string;
  /**
   * to change input change event
   */
  onChange?: (option: { label: string; value: string }) => void;
}

// Option prop types
export interface OptionProps {
  /**
   * Classname to style the component
   */
  className?: string;
  /**
   * select options value
   */
  value?: string;
  /**
   * options lable
   */
  label?: string;
  /**
   * tabIndex
   */
  tabIndex?: number;
  /**
   * onclick event executes a certain functionality click
   */
  onClick?: () => void;
  /**
   * onKeyDown event executes a certain functionality
   */
  onKeyDown?: (e: KeyboardEvent) => void;
  /**
   * Elements to be rendered inside the component
   */
  children?: React.ReactNode;
}

// OptionList prop types
export interface OptionListProps {
  /**
   * Elements to be rendered inside the component
   */
  children?: React.ReactNode;
  arrowProps?: undefined;
  /**
   * class name of the component for styling
   */
  className?: string;
}

// option group list
export interface OptionGroupProps {
  /**
   * Elements to be rendered inside the component
   */
  children?: React.ReactNode;
  /**
   * options lable
   */
  label?: string;
  /**
   * class name of the component for styling
   */
  className?: string;
}

// DialogClose props type

export interface DialogCloseProps {
  /**
   * Elements to be rendered inside the component
   */
  children?: React.ReactNode|any;
}

// Dialog props types
export interface DialogProps {
  /**
   * Elements to be rendered inside the component
   */
  children?: React.ReactNode;

  initialOpen?: boolean;
  open?: boolean;
  dismissable?: boolean;
  onOpenChange?: () => void;
}

// DialogContent props type
export interface DialogContentProps {
  /**
   * Elements to be rendered inside the component
   */
  children?: React.ReactNode;
  /**
   * class name of the component for styling
   */
  className?: string;
  floatingOverlay?: undefined|{};
}

// DialogTrigger props type
export interface DialogTriggerProps {
  /**
   * Elements to be rendered inside the component
   */
  children?: React.ReactNode|any;
  /**
   * class name of the component for styling
   */
  className?: string;
}

// EmptyState Prop types
export interface EmptyStateProps {
  /**
   * empty state render components
   */
  element: React.ReactNode;
}

// Autocomplete prop types
export interface AutocompleteProps {
  /**
   * class name of the component for styling
   */
  className?: string;
  /**
  /**
   * To handle modal open and close
   */
  modal?: boolean;
  /**
   * This props used to placeholder text
   */
  placeholder?: string;
  /**
   * Its default value
   */
  defaultValue?: defaultValProps | null;

  /**
   * Handle open in popover
   */
  open?: boolean;
  /**
   * used to unput width
   */
  width?: number;
  /**
   * Used to show empty state
   */
  showEmptyState?: boolean;
  /**
   * empty state
   */
  emptyState?: React.ReactNode;
  /**
   * handle on open chnage events
   */
  onOpenChange?: () => void;
  /**
   * handle on input chnage events
   */
  onInputChange?: (val:string) => void;
  /**
   * handle clearable input values
   */
  clearable?: boolean;
  /**
   * handle focusable input
   */
  focusable?: boolean;
  /**
   * render options here
   */
  options?: { label: string; value: string }[];
  /**
   * options props
   */
  optionProps?: {
    className?: string;
  };
  /**
   * option list props
   */
  optionListProps?: OptionListProps;
  /**
   * unique id
   */
  id?: number | string;
  /**
   * find initials open in popover
   */
  initialOpen?: boolean;
  /**
   * placement
   */
  placement?: undefined;
  /**
   * is show Arrow
   */
  showArrow?: boolean;
  /**
   * middlewere
   */
  middleware?: [];
  /**
   * Defines the size of the input
   */
  size?: "sm" | "md" | "lg";
  /**
   * Elements to be rendered inside the component
   */
  children?: React.ReactNode;

  value?: string;

  listProps?: OptionListProps;

  optionGroupProps?: OptionGroupProps;

  variant?: string;

  leftIcon?: React.ReactNode;
  placeholderText?: string;
  /**
   * to change input change event
   */
  onChange?: (option: { label: string; value: string }) => void;
}

// menu props type
export interface MenuProps extends SelectProps {}

// CircularProgress props type
export interface CircularProgressProps {
  /**
   * class name of the component for styling
   */
  className?: string;
  /**
   * Defines the size of the button
   */
  size?: "sm" | "md" | "lg";
  /**
   * Root Styling of the component
   */
  rootStyle?: string;
}

// Editor Props types
export interface EditorProps {
  /**
   * class name of the component for styling
   */
  className?: string;
  /**
   * Root Styling of the component
   */
  rootStyle?: string;

  content?: EditorDatatableProps;
  /**
   * to change input change event
   */
  onChange?: (val: any) => void;
  /**
   * to handle de bounds wait time
   */
  debounceWaitTime?: number;
}
// useAutocompletePropType props
export interface OptionsProp {
  label: string;
  value: string;
}
export interface UseAutocompletePropType {
  clearable: boolean;
  onChange?: (option: any) => void;
  onInputChange?: (value: string) => void;
  options?: {
    label: string;
    value: string;
  }[];
  defaultValue?: OptionsProp | null;
}

export interface UseAutocompleteContextProp{
  clearable: boolean;
  filteredOptions:OptionsProp[];
  handleChange:(option:any)=>void;
  handleClearValue:()=>void;
  handleInputChange:(value:string)=>void;
  inputValue:string;
  selectedValue:OptionsProp
}