import { Autocomplete, Box, Input, Text } from '../../atoms';
import { useLayoutEffect, useRef } from 'react';
import { tw } from 'twind';
import { addBackslashOnBefore } from '../../utils/helperFunctions';
import { SelectedStepProps, splittedStepObjPropType } from '../../types';


export function SelectedStep({ data = [], options, onChange = () => false }:SelectedStepProps) {
  const listItemRef = useRef<any>([]);
  const selectedRef = useRef(null);

  const switchComponents = (val:splittedStepObjPropType) => {
    switch (val.component_to_render) {
      case 'input':
        return (
          <Input
            inputStyle="w-44 text-sm font-medium text-primary-500"
            placeholderText={val?.placeholder}
            value={val.value}
            id={val?.id}
            ref={(el) => {
              listItemRef.current[
                listItemRef?.current?.length > 0
                  ? listItemRef.current.length
                  : 0
              ] = el;
            }}
            onChange={(e) => onChange(val, e.target.value)}
          />
        );
      case 'autocomplete': {
        return (
          <Box>
            <Autocomplete
              className={tw`text-sm font-medium text-primary-500`}
              options={options}
              ref={(el) => {
                listItemRef.current[
                  listItemRef?.current?.length > 0
                    ? listItemRef.current.length
                    : 0
                ] = el;
              }}
              placeholder={val?.placeholder}
              defaultValue={{
                label: val.value,
                value: val.value,
              }}
              leftIcon={undefined}
              focusable={false}
              clearable={false}
              showEmptyState={false}
              onChange={(option) => {
                onChange(val, option?.value);
              }}
              optionProps={{
                className: 'text-sm',
              }}
              onInputChange={(value) =>
                onChange(val, addBackslashOnBefore(value))
              }
            />
          </Box>
        );
      }
      case 'text':
        return (
          <Text id={val?.id} rootStyle="text-sm font-medium">
            {val?.value}
          </Text>
        );
      case 'number_input':
        return (
          <Input
            id={val?.id}
            inputStyle="text-sm w-20 font-medium text-primary-500"
            placeholderText={val?.placeholder}
            ref={(el) => {
              listItemRef.current[
                listItemRef?.current?.length > 0
                  ? listItemRef.current.length
                  : 0
              ] = el;
            }}
            value={val.value}
            onChange={(e) => onChange(val, parseInt(e.target.value, 10))}
            type="number"
          />
        );
      default:
        return null;
    }
  };

  useLayoutEffect(() => {
    if (listItemRef.current && listItemRef.current.length > 0) {
      const firstEmptyInputIndex = listItemRef.current.findIndex(
        (ref:any) => !ref.value
      );
      if (firstEmptyInputIndex !== -1) {
        listItemRef.current[firstEmptyInputIndex].focus();
      }
    }
  }, []);

  return (
    <Box ref={selectedRef} rootStyle="flex gap-1 items-center">
      {data?.map((i:splittedStepObjPropType) => switchComponents(i))}
    </Box>
  );
}
