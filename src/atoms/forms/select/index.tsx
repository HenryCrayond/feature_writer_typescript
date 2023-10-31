import {
  size as middlewareSize,
  safePolygon,
  useClick,
  useDismiss,
  useHover,
  useInteractions,
  useListNavigation,
  useMergeRefs,
  useRole,
  useTypeahead,
} from "@floating-ui/react";
import React, { forwardRef, useMemo, useRef, useState } from "react";
import { CgChevronDown } from "react-icons/cg";
import { tw } from "twind";
import {
  OverlayListContext,
  SelectContext,
  overlayMiddleware,
  useOverlay,
  useSelect,
} from "../../../hooks";
import { SelectProps } from "../../types";
import { Button } from "../button";
import { Option } from "./option";
import { OptionGroup } from "./optionGroup";
import { OptionList } from "./optionList";

export const Select = forwardRef((props: SelectProps, propRef) => {
  const {
    children,
    arrowProps,
    modal = false,
    placeholder,
    defaultValue,
    value,
    listProps,
    onChange,
    open,
    width = 240,
    onOpenChange,
    options,
    optionProps,
    optionGroupProps,
    allowHover,
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
      padding: 10,
    }),
    ...middleware,
  ];

  const { size, ...buttonProps } = rest;

  const selectState = useSelect({
    value,
    defaultValue,
    onChange,
  });

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

  const hover = useHover(data.context, {
    enabled: allowHover ?? false,
    handleClose: safePolygon({
      blockPointerEvents: false,
    }),
  });
  const click = useClick(data.context, {
    enabled: !open && !allowHover,
  });

  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const listRef = useRef([]);
  const listContentRef = useRef([]);

  const listNav = useListNavigation(data.context, {
    listRef,
    activeIndex,
    onNavigate: () => setActiveIndex,
    loop: true,
  });

  const typeahead = useTypeahead(data.context, {
    listRef: listContentRef,
    activeIndex,
    selectedIndex,
    onMatch: ()=> open ? setActiveIndex : setSelectedIndex,
  });

  const interactions = useInteractions([
    dismiss,
    role,
    hover,
    listNav,
    typeahead,
    click,
  ]);

  const select = useMemo(
    () => ({
      modal,
      showArrow,
      activeIndex,
      selectedIndex,
      setActiveIndex,
      setSelectedIndex,
      listRef,
      listContentRef,
      ...data,
      ...interactions,
    }),
    [
      modal,
      showArrow,
      activeIndex,
      selectedIndex,
      setActiveIndex,
      setSelectedIndex,
      listRef,
      listContentRef,
      data,
      interactions,
    ]
  );
  // Check that all children are either Option or OptionGroup
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      throw new Error(
        "Select component only accepts Option and OptionGroup children"
      );
    }
    if (child.type !== Option && child.type !== OptionGroup) {
      throw new Error(
        "Select component only accepts Option and OptionGroup children"
      );
    }
  });

  const ref = useMergeRefs([select.refs.setReference, propRef]);

  return (
    <OverlayListContext.Provider value={select}>
      <SelectContext.Provider value={selectState}>
        <Button
          rootStyle={`w-${width}`}
          rightIcon={
            <CgChevronDown
              className={tw`transition-all duration-200 ${
                select.open ? "rotate-180 " : "rotate-0 "
              }`}
            />
          }
          ref={ref}
          {...select.getReferenceProps({...buttonProps} as React.HTMLProps<Element>)}
          size={size}
        >
          {selectState?.value?.label ?? placeholder ?? "select"}
        </Button>
        {/* Render with options */}
        {!children && Array.isArray(options) && (
          <OptionList arrowProps={arrowProps} {...listProps}>
            {options.map((option, index) => {
              if ("options" in option) {
                // This is an OptionGroupType object
                return (
                  <OptionGroup
                    {...optionGroupProps}
                    key={index}
                    label={option.label}
                  >
                    {option.options.map((groupOption:{label:string,value:string}, groupIndex:number) => (
                      <Option
                        {...optionProps}
                        key={groupIndex}
                        value={groupOption.value}
                        label={groupOption.label}
                      />
                    ))}
                  </OptionGroup>
                );
              }
              // This is an OptionType object
              return (
                <Option
                  {...optionProps}
                  key={index}
                  value={option.value}
                  label={option.label}
                />
              );
            })}
          </OptionList>
        )}
        {/* Render with children */}
        {!options && children && (
          <OptionList arrowProps={arrowProps} {...listProps}>
            {children}
          </OptionList>
        )}
      </SelectContext.Provider>
    </OverlayListContext.Provider>
  );
});

Select.displayName = "Select";

export { Option, OptionGroup };

