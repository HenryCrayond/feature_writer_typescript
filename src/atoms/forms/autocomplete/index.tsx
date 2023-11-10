import {
  size as middlewareSize,
  useClick,
  useDismiss,
  useFocus,
  useInteractions,
  useListNavigation,
  useMergeRefs,
  useRole,
} from "@floating-ui/react";
import { focus as focusTw } from "../../../utils/twind";
import { forwardRef, useMemo, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import { RiSearchLine } from "react-icons/ri";
import { tw } from "twind";
import {
  AutocompleteContext,
  OverlayListContext,
  overlayMiddleware,
  useAutocomplete,
  UseAutocompletePropType,
  useOverlay,
} from "../../../hooks";
import { Input } from "../input";
import { OptionList } from "../select/optionList";
import { EmptyState } from "./emptyState";
import { Option } from "./option";
import { AutocompleteProps, UseAutoCompleteContextProps } from "../../types";

export const Autocomplete = forwardRef((props: AutocompleteProps, propRef) => {
  const {
    modal = false,
    placeholder = "Search and select",
    defaultValue,
    onChange,
    open,
    width = 240,
    showEmptyState = true,
    emptyState,
    onOpenChange,
    onInputChange,
    clearable = true,
    focusable = true,
    options,
    optionProps,
    optionListProps,
    id,
    ...restOptions
  } = props;

  const {
    initialOpen,
    placement,
    showArrow = false,
    middleware = [],
    ...rest
  } = restOptions;

  const middlewareOptions = [
    overlayMiddleware.offset(5),
    middlewareSize({
      apply({ rects, elements, availableHeight }) {
        Object.assign(elements.floating.style, {
          maxHeight: `${availableHeight}px`,
          minWidth: `${rects.reference.width}px`,
        });
      },
      padding: 64,
    }),
    ...middleware,
  ];

  const { size, ...inputProps } = rest;

  const autocompleteState = useAutocomplete({
    defaultValue,
    onChange,
    onInputChange,
    clearable,
    options,
  } as UseAutocompletePropType);

  const data = useOverlay("listbox", {
    modal,
    initialOpen,
    placement,
    open,
    onOpenChange,
    middleware: middlewareOptions,
  });

  const dismiss = useDismiss(data.context);
  const role = useRole(data.context);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const click = useClick(data.context, {
    enabled: !open,
    toggle: false,
  });

  const focus = useFocus(data.context, {
    enabled: focusable,
  });

  const listRef = useRef([]);
  const listContentRef = useRef([]);

  const listNav = useListNavigation(data.context, {
    listRef,
    activeIndex,
    onNavigate: (number) => setActiveIndex(number),
    virtual: true,
    loop: true,
  });

  const interactions = useInteractions([dismiss, role, click, focus, listNav]);

  const autocomplete = useMemo(
    () => ({
      modal,
      showArrow,
      activeIndex,
      setActiveIndex,
      listRef,
      listContentRef,
      ...data,
      ...interactions,
    }),
    [data, interactions]
  );

  const ref = useMergeRefs([autocomplete.refs.setReference, propRef]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    if (value) {
      autocomplete.setOpen(true);
    }
    autocompleteState.handleInputChange(value);
  }

  function handleKeyDown(event: React.KeyboardEvent<Element>) {
    if (
      event.key === "Enter" &&
      activeIndex != null &&
      autocompleteState.filteredOptions[activeIndex]
    ) {
      autocompleteState.handleChange(
        autocompleteState.filteredOptions[activeIndex]
      );
      autocomplete.setOpen(false);
      setActiveIndex(null);
    }
  }
console.log(autocompleteState,"----");

  return (
    <OverlayListContext.Provider value={autocomplete}>
      <AutocompleteContext.Provider value={autocompleteState as UseAutoCompleteContextProps}>
        <Input
          leftIcon={<RiSearchLine className={tw`w-4 h-4`} />}
          variant="flushed"
          value={autocompleteState?.inputValue ?? ""}
          placeholderText={placeholder}
          rootProps={{ rootStyle: `w-${width}` }}
          size={"md"}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            autocompleteState.handleInputChange(event.target.value);
          }}
          ref={ref}
          {...autocomplete.getReferenceProps({
            ...inputProps,
            onChange: handleChange,
            onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
              handleKeyDown(e),
          })}
          {...(clearable &&
            autocompleteState.inputValue && {
              rightIcon: (
                <CgClose
                  tabIndex={0}
                  className={tw`w-4 h-4 rounded ${focusTw}`}
                  onClick={autocompleteState.handleClearValue}
                  onKeyDown={(event: React.KeyboardEvent<Element>) => {
                    if (event.key === "Enter") {
                      autocompleteState.handleClearValue();
                      const reference: any =
                        autocomplete?.refs?.reference?.current;
                      if (reference) {
                        reference.focus();
                      }
                    }
                  }}
                />
              ),
            })}
        />
        {(autocompleteState?.filteredOptions?.length > 0 ||
          (showEmptyState &&
            autocompleteState?.filteredOptions?.length === 0)) && (
          <OptionList {...optionListProps}>
            {autocompleteState.filteredOptions.length > 0 &&
              autocompleteState.filteredOptions.map(
                (option: { label: string; value: string }, index: number) => (
                  <Option
                    {...optionProps}
                    key={index}
                    label={option?.label}
                    value={option?.value}
                  />
                )
              )}
            {autocompleteState.filteredOptions?.length === 0 ? (
              <EmptyState element={emptyState} />
            ) : null}
          </OptionList>
        )}
      </AutocompleteContext.Provider>
    </OverlayListContext.Provider>
  );
});

export { EmptyState, Option };

Autocomplete.displayName = "Autocomplete";
