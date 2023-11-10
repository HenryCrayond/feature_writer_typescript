import {
  FloatingArrow,
  FloatingFocusManager,
  FloatingList,
  useMergeRefs,
} from "@floating-ui/react";
import React, { forwardRef } from "react";
import { apply, tw } from "twind";
import { useOverlayListContext } from "../../../hooks";
import { Box } from "../../layout/box";
import { EmptyState } from "../autocomplete/emptyState";
import { Option as AutocompleteOption } from "../autocomplete/option";
import { Option } from "./option";
import { OptionGroup } from "./optionGroup";
import { OptionListProps } from "../../types";

const OptionList = forwardRef((props: OptionListProps, propRef) => {
  const { children, arrowProps, className } = props;

  // Check that all children are either Option or OptionGroup
  React.Children.forEach(children, (child) => {
    if (child === null) return;
    if (!React.isValidElement(child)) {
      throw new Error(
        "Option List component only accepts Option and OptionGroup children"
      );
    }
    if (
      child.type !== Option &&
      child.type !== OptionGroup &&
      child.type !== AutocompleteOption &&
      child.type !== EmptyState
    ) {
      throw new Error(
        "Option List component only accepts Option and OptionGroup children"
      );
    }
  });
  const optionListStyle = apply`card overflow-y-auto z-[99999]`;

  const {
    context,
    modal,
    showArrow,
    getFloatingProps,
    listRef,
    arrowRef,
    refs,
    open,
  } = useOverlayListContext();

  const floatingRef = useMergeRefs([refs.setFloating, propRef]);

  return (
    <>
      {open && (
        <FloatingFocusManager initialFocus={-1} context={context} modal={modal}>
          <Box
            style={{
              position: context.strategy,
              top: context.y ?? 0,
              left: context.x ?? 0,
            }}
            {...getFloatingProps({ ref: floatingRef })}
            className={tw(optionListStyle, className)}
          >
            {showArrow && (
              <FloatingArrow
                {...(arrowProps ?? {})}
                ref={arrowRef}
                context={context}
                className={tw(
                  "fill-white [&>path:last-of-type]:stroke-gray-100",
                )}
              />
            )}
            <FloatingList elementsRef={listRef}>{children}</FloatingList>
          </Box>
        </FloatingFocusManager>
      )}
    </>
  );
});

OptionList.displayName = "OptionList";

export { OptionList };
