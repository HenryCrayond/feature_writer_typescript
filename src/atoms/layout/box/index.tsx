import { forwardRef } from "react";
import { apply, tw } from "twind";
import { BoxProps } from "../../types";

const Box = forwardRef(
  (
    props: BoxProps & {
      id?: string;
    },
    ref: React.LegacyRef<HTMLDivElement> | undefined
  ) => {
    const { className = "", children = "", rootStyle, ...rest } = props;

    const rootTw = apply` ${rootStyle}`;

    return (
      <div ref={ref} className={`${tw(rootTw)} ${className}`} {...rest}>
        {children}
      </div>
    );
  }
);

Box.displayName = "Box";

export { Box };
