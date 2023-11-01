import { useKeyPress } from "ahooks";
import { tw } from "twind";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import { useClickAway } from "react-use";
import { Box, Input, Text } from "../../../atoms";
import { InputEditableProps } from "../../types";

function InputEditable(props: InputEditableProps) {
  const {
    className = "",
    text = "A text",
    size = "sm",
    placeholderText,
    onTextEdited = () => {},
    inputWidth = "180px",
    defaultEdit = false,
    rootStyle,
    textStyle,
    headingStyle,
    headingSize,
    ...rest
  } = props;

  const rootTw = `w-max ${rootStyle}`;

  const inputRef = useRef<HTMLInputElement>(null);
  const inputActionRef = useRef(null);

  const [textValue, setTextValue] = useState(text ?? "");
  const [edit, setEdit] = useState(defaultEdit);

  const handleSubmit = () => {
    if (text?.trim().length === 0 && textValue?.trim().length === 0) {
      if (placeholderText) {
        onTextEdited(placeholderText);
      } else {
        onTextEdited("");
      }
    } else if (textValue?.trim().length === 0) {
      onTextEdited(text);
    } else {
      onTextEdited(textValue);
    }
    setEdit(false);
  };

  useKeyPress(
    ["esc", "enter"],
    () => {
      if (edit) {
        handleSubmit();
      }
    },
    {
      target: inputActionRef,
    }
  );

  useClickAway(inputActionRef, () => {
    if (edit && inputRef.current) {
      setEdit(false);
      setTextValue(text);
      if (text?.trim().length === 0) {
        setTextValue(placeholderText || "");
        onTextEdited(placeholderText || "");
      }
    }
  });

  useEffect(() => {
    if (edit) {
      inputRef.current?.focus();
    }
  }, [edit]);

  return (
    <Box className={`${tw(rootTw)} ${className}`} {...rest}>
      {edit ? (
        <div className={tw`flex gap-1 items-center`} ref={inputActionRef}>
          <Input
            placeholderText={placeholderText}
            size={size}
            inputStyle={`min-w-[${inputWidth}]`}
            value={textValue}
            onChange={(
              event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setTextValue(event.target.value);
            }}
            ref={inputRef}
            variant="outlined"
          />
        </div>
      ) : (
        <Box className={tw("flex gap-2 items-center")}>
          <MdEdit
            className={tw(
              "text-gray(400 500(hover:&)) min-w([16px]) min-h([16px])"
            )}
            onClick={() => setEdit(true)}
          />
          <Text rootStyle={`cursor-pointer ${textStyle}`}>{text}</Text>
        </Box>
      )}
    </Box>
  );
}

InputEditable.displayName = "InputEditable";

InputEditable.defaultProps = {
  inputWidth: "108px",
  placeholderText: "Text",
  size: "md",
  text: "A Text",
  defaultEdit: false,
};

export { InputEditable };
