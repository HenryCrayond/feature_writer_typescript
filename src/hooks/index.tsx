import {
  Middleware,
  arrow,
  autoUpdate,
  flip,
  offset,
  shift,
  size,
  useFloating,
} from "@floating-ui/react";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { UseAutoCompleteContextProps } from "../atoms/types";

export interface OverlayOptinPropType {
  initialOpen?: boolean;
  modal?: boolean;
  onOpenChange?: () => void;
  open?: boolean;
  placement?: undefined;
  middleware?: Middleware["options"];
}

interface OptionProp {
  label: string | undefined;
  value: string | undefined;
}
export interface UseSelectContextPropType {
  value: any;
  defaultValue: any;
  onChange: (vall: OptionProp) => void;
}
export interface UseAutocompletePropType {
  clearable: boolean;
  onChange: (option: any) => void;
  onInputChange: (value: string) => void;
  options: {
    label: string;
    value: string;
  }[];
  defaultValue: SelectProp | null;
  inputValue: string | null | undefined;
}

interface SelectProp {
  label: string;
  value: string;
}

export function useOverlay(overlayType: string, options: OverlayOptinPropType) {
  const {
    initialOpen = false,
    open: controlledOpen,
    onOpenChange: setControlledOpen,
    placement,
    middleware = [],
  } = options;

  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);

  const arrowRef = useRef(null);

  const open =
    controlledOpen && setControlledOpen ? controlledOpen : uncontrolledOpen;
  const setOpen =
    controlledOpen && setControlledOpen
      ? setControlledOpen
      : setUncontrolledOpen;

  const data = useFloating({
    open,
    onOpenChange: setOpen,
    ...(["tooltip", "popover", "listbox"].includes(overlayType) && {
      placement,
      whileElementsMounted: autoUpdate,
      middleware: [
        flip(),
        shift(),
        offset(),
        arrow({
          element: arrowRef,
        }),
        ...middleware,
      ],
    }),
  });
  return {
    ...data,
    open,
    setOpen,
    arrowRef,
  };
}

export const OverlayContext = createContext<any | null>(null);

export const useOverlayContext = () => {
  const context = useContext(OverlayContext);
  if (context == null) {
    throw new Error("Components must be wrapped in <Popover />");
  }
  return context;
};

export const OverlayListContext = createContext<any | null>(null);

export const useOverlayListContext = () => {
  const context = useContext(OverlayListContext);
  if (context == null) {
    throw new Error("Components must be wrapped in <Popover />");
  }
  return context;
};

export function useSelect(options: UseSelectContextPropType) {
  const { value: controlledValue, defaultValue, onChange } = options;

  const [selectedValue, setSelectedValue] = useState(defaultValue || null);

  useEffect(() => {
    if (controlledValue !== undefined) {
      setSelectedValue(controlledValue);
    }
  }, [controlledValue]);

  const handleOptionClick = (value: SelectProp) => {
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return useMemo(
    () => ({
      value:
        Boolean(onChange) && controlledValue ? controlledValue : selectedValue,
      onChange:
        Boolean(onChange) && controlledValue ? onChange : handleOptionClick,
    }),
    [selectedValue]
  );
}

export const SelectContext = createContext<UseSelectContextPropType | null>(
  null
);

export const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (context == null) {
    throw new Error("Components must be wrapped in <Select />");
  }
  return context;
};

export const useAutocomplete = ({
  defaultValue,
  onChange,
  onInputChange,
  clearable,
  options,
}: UseAutocompletePropType) => {
  const [inputValue, setInputValue] = useState<string | undefined | null>(
    defaultValue?.label ?? null
  );
  const [selectedValue, setSelectedValue] = useState(defaultValue ?? null);

  const [filteredOptions, setFilteredOptions] = useState<SelectProp | any>(
    options || []
  );

  const handleChange = (option: SelectProp) => {
    setFilteredOptions([option]);
    setSelectedValue(option);
    setInputValue(option?.label);
    onChange?.(option);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    onInputChange?.(value);
    if (!value) {
      setFilteredOptions(options);
      setSelectedValue(null);
    } else {
      const filteredOptionsResult = options?.filter(
        (option: { label: string; value: string }) =>
          option.label.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filteredOptionsResult);
    }
  };

  const handleClearValue = () => {
    setSelectedValue(null);
    setInputValue("");
    setFilteredOptions(options || []);
  };

  useEffect(() => {
    if (!inputValue) setFilteredOptions(options || []);
  }, [options]);

  useEffect(() => {
    setInputValue(defaultValue?.label);
  }, [defaultValue]);

  return {
    inputValue,
    selectedValue,
    handleChange,
    handleInputChange,
    handleClearValue,
    filteredOptions,
    clearable,
  };
};

export const AutocompleteContext =
  createContext<UseAutoCompleteContextProps | null>(null);

export const useAutocompleteContext = () => {
  const context = useContext(AutocompleteContext);
  if (context == null) {
    throw new Error("Components must be wrapped in <Autocomplete />");
  }
  return context;
};

export const overlayMiddleware = {
  flip,
  offset,
  shift,
  size,
};
