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

export interface OverlayOptinPropType {
  initialOpen?: boolean;
  modal?: boolean;
  onOpenChange?: () => void;
  open?: boolean;
  placement?: undefined;
  middleware?: Middleware["options"];
}

export interface optionsProp {
  label?: string ; 
  value?: string;
}

export interface useSelectPropType {
  value?: string ;
  defaultValue?: optionsProp;
  onChange?: (vall: any) => void;
  controlledValue?:string | optionsProp;
  [key: string]: any;

}

export interface optionPharamProp {
  label?: string;
  value?: {
    params: {};
    source_step: string;
  };
}

export interface useAutocompletePropType {
  clearable?: boolean;
  onChange?: (option: any) => void;
  onInputChange?: (value: any) => void;
  options?: {
    label: string ; 
  value: string;
  }[];
  defaultValue?: optionsProp;
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

export const OverlayContext = createContext<any|null>(null);

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

export function useSelect(options: useSelectPropType) {
  const { value: controlledValue, defaultValue, onChange } = options;
  const [selectedValue, setSelectedValue] = useState<any>(defaultValue || null);

  useEffect(() => {
    if (controlledValue !== undefined) {
      setSelectedValue(controlledValue);
    }
  }, [controlledValue]);

  const handleOptionClick = (value: string) => {
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return useMemo(
    () => ({
      value: onChange && controlledValue ? controlledValue : selectedValue,
      onChange: onChange && controlledValue ? onChange : handleOptionClick,
    }),
    [selectedValue]
  );
}

export const SelectContext = createContext<any | null>(null);

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
}: useAutocompletePropType) => {
  const [inputValue, setInputValue] = useState<string|any>(defaultValue?.label ?? null);
  const [selectedValue, setSelectedValue] = useState(defaultValue ?? null);

  const [filteredOptions, setFilteredOptions] = useState<optionsProp|any>(options || []);

  const handleChange = (option:optionsProp) => {
    setFilteredOptions([option]);
    setSelectedValue(option);
    setInputValue(option?.label);
    onChange?.(option);
  };

  const handleInputChange = (value:string) => {
    setInputValue(value);
    onInputChange?.(value);
    if (!value) {
      setFilteredOptions(options);
      setSelectedValue(null);
    } else {
      const filteredOptionsResult = options?.filter((option) =>
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

export const AutocompleteContext = createContext<any | null>(null);

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
