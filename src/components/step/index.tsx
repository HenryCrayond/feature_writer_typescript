import { Autocomplete, Box, Icon } from "../../atoms";
import { cucumberExpressions, keywords } from "../../utils/constants";
import { constructStepView } from "../../utils/helperFunctions";
import { focus } from "../../utils/twind";
import { useKeyPress } from "ahooks";
import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  MdContentCopy,
  MdDragIndicator,
  MdModeEditOutline,
} from "react-icons/md";
import { RiCloseCircleLine } from "react-icons/ri";

import { tw } from "twind";

import { Menu, Option } from "../../atoms/overlay/menu";
import { SelectedStep } from "./selectedStep";

import { useFeatureStore } from "../../store/feature";
import { keys } from "../../utils/constants";
import {
  OptionPropType,
  StepProps,
  StepsComponentProps,
  splittedStepObjPropType,
} from "../../types";

const Step = forwardRef((props: StepsComponentProps) => {
  const {
    stepRootStyle = "",
    addStep,
    stepDefinitions,
    options,
    step,
    dragHandleProps,
    scenarioIndex,
    scenarioId,
    stepIndex,
  } = props;

  const rootTw = `flex items-center gap-2 ${stepRootStyle}`;

  const {
    stepOnChange,
    editSteps,
    updateStep,
    deleteStep,
    duplicateStep,
    updateDefinitionStep,
  } = useFeatureStore();

  const deleteRef = useRef(null);

  const [splittedStep, setSplittedStep] = useState<
    splittedStepObjPropType[] | null
  >(null);

  const keywordRef = useRef<HTMLDivElement>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  const handleStepChange = (
    key: string,
    val: any,
    scenarindex: number,
    stIndex: number
  ) => {
    if (key === "source_step") {
      const result = constructStepView(val);
      setSplittedStep(result as splittedStepObjPropType[] | null);
      updateDefinitionStep(val?.source_step, scenarindex, stIndex);
    } else {
      stepOnChange(key, val, scenarindex, stIndex);
    }
  };

  const handleStepInputsChange = (
    splittedStepObj: splittedStepObjPropType,
    value: string
  ) => {
    const splittedStepCopy = JSON.parse(JSON.stringify(splittedStep));

    splittedStepCopy.forEach(
      (
        eachSplittedStep: splittedStepObjPropType,
        index: number,
        array: splittedStepObjPropType[]
      ) => {
        if (eachSplittedStep.id === splittedStepObj?.id) {
          array[index] = {
            ...splittedStepObj,
            value,
          };
        }
      }
    );
    setSplittedStep(splittedStepCopy);
  };

  const handleStepEdit = () => {
    editSteps(step, scenarioId);
    setSplittedStep(null);
  };

  const handleMenu = (value: string) => {
    switch (value) {
      case "Edit":
        handleStepEdit();
        break;
      case "Duplicate":
        duplicateStep(step.id, scenarioId);
        break;
      case "Delete":
        deleteStep(step.id, scenarioId);
        break;
      default:
        break;
    }
  };

  useKeyPress(
    "enter",
    () => {
      deleteStep(step.id, scenarioId);
    },
    { target: deleteRef }
  );
  useLayoutEffect(() => {
    if (step?.source_step?.length > 1) {
      const sourceStep = stepDefinitions.find(
        (eachStep) => eachStep?.source_step === step?.source_step
      );
      const result = constructStepView({
        source_step: sourceStep?.source_step,
        params: sourceStep?.params,
      } as any);
      result.forEach((word: any, index: number, array: any) => {
        if (Object.keys(step.params).includes(String(word.param))) {
          array[index] = {
            ...word,
            value: step.params[word?.param as keyof StepProps["params"]] ?? "",
          };
        }
      });
      setSplittedStep(result as splittedStepObjPropType[] | null);
    } else {
      setSplittedStep(null);
    }
  }, []);

  useLayoutEffect(() => {
    if (keywordRef.current && !step?.keyword) keywordRef.current.focus();
    if (menuRef.current) menuRef.current.focus();
  }, []);

  useEffect(() => {
    if (!splittedStep) return;
    const params = { ...step?.params };
    const words: string[] = splittedStep.reduce(
      (prev: string[], curr: splittedStepObjPropType) => {
        let result = curr?.value as string;
        // To update the params with the selected value
        if (cucumberExpressions.includes(String(curr?.word))) {
          const key: string = curr.param;
          params[key as keyof StepProps["params"]] = result;
        }
        // To add quotation if it is string and return
        if (["{string}"].includes(String(curr?.word))) {
          // Add only if it is not a datatable column header value
          if (
            options &&
            !options.some(
              (option: OptionPropType) => option.value === curr.value
            ) &&
            curr?.word === "{string}"
          ) {
            result = `'${curr?.value}'`;
          }
        }
        return [...prev, result] as string[];
      },
      []
    );

    const name = words.join(" ");
    updateStep(name, params, scenarioIndex, stepIndex);
  }, [splittedStep]);
  return (
    <>
      {step?.name && splittedStep && (
        <Box
          rootStyle={rootTw}
          {...dragHandleProps}
          className={tw`bg-white rounded px-0.5`}
        >
          <Icon
            as={MdDragIndicator}
            className={tw("text-gray(300 400(hover:& focus:&)) cursor-pointer")}
          />
          <Autocomplete
            ref={keywordRef}
            variant="flushed"
            className={tw`text-sm font-medium text-primary-500`}
            clearable={false}
            leftIcon={undefined}
            focusable={false}
            placeholder="keyword"
            width={120}
            defaultValue={
              step?.keyword
                ? {
                    label: step?.keyword,
                    value: step?.keyword,
                  }
                : null
            }
            options={keywords}
            optionProps={{
              className: "text-sm",
            }}
            placeholderText="Keyword"
            onChange={(option) =>
              handleStepChange(
                "keyword",
                option?.value,
                scenarioIndex,
                stepIndex
              )
            }
          />
          <Box rootStyle="w-full overflow-x-auto">
            <SelectedStep
              data={splittedStep}
              onChange={(splittedStepObj, value) => {
                handleStepInputsChange(splittedStepObj, value as string);
              }}
              options={step.name.includes("press the key") ? keys : options}
              addStep={addStep}
            />
          </Box>
          <Box ref={menuRef} rootStyle={`${focus}`}>
            <Menu
              ref={menuRef}
              onChange={(e) => {
                handleMenu(e.value);
              }}
            >
              <Option
                className={tw(
                  "text-grey(400 600(hover:& focus:&)) text-md font-medium cursor-pointer"
                )}
                label="Edit"
                value="Edit"
              >
                <MdModeEditOutline
                  style={{ display: "unset" }}
                  className={tw(
                    "text-gray(300 400(hover:& focus:&)) mr-1 font-medium cursor-pointer"
                  )}
                />{" "}
                Edit
              </Option>
              <Option
                className={tw(
                  "text-gray(400 600(hover:& focus:&)) text-md font-medium cursor-pointer"
                )}
                label="Duplicate"
                value="Duplicate"
              >
                {" "}
                <MdContentCopy
                  style={{ display: "unset" }}
                  className={tw(
                    "text-gray(300 400(hover:& focus:&)) mr-1 font-medium cursor-pointer"
                  )}
                />
                Duplicate{" "}
              </Option>
              <Option
                className={tw(
                  "text-gray(400 600(hover:& focus:&)) text-md font-medium cursor-pointer"
                )}
                label="Delete"
                value="Delete"
              >
                {" "}
                <RiCloseCircleLine
                  style={{ display: "unset" }}
                  className={tw(
                    "text-gray(300 400(hover:& focus:&)) mr-1 font-medium cursor-pointer"
                  )}
                />
                Delete{" "}
              </Option>
            </Menu>
          </Box>
        </Box>
      )}
      {!step.name && (
        <Box
          rootStyle={rootTw}
          {...dragHandleProps}
          className={tw`bg-white rounded px-0.5`}
        >
          <Icon
            as={MdDragIndicator}
            className={tw("text-gray(300 400(hover:& focus:&)) cursor-pointer")}
          />
          <Autocomplete
            ref={keywordRef}
            variant="flushed"
            className={tw`text-sm font-medium text-primary-500`}
            clearable={false}
            leftIcon={undefined}
            focusable={false}
            placeholder="keyword"
            width={120}
            defaultValue={
              step?.keyword
                ? {
                    label: step?.keyword,
                    value: step?.keyword,
                  }
                : null
            }
            options={keywords}
            optionProps={{
              className: "text-sm",
            }}
            placeholderText="Keyword"
            onChange={(option) =>
              handleStepChange(
                "keyword",
                option?.value,
                scenarioIndex,
                stepIndex
              )
            }
          />
          <Box rootStyle="w-full">
            {!splittedStep && !step?.name && (
              <Autocomplete
                className="text-sm font-medium w-full"
                options={
                  stepDefinitions.map((stepDefinition) => ({
                    label: stepDefinition?.source_step,
                    value: stepDefinition,
                  })) as []
                }
                placeholder="Search to select step"
                optionProps={{
                  className: "text-sm my-0.5 font-medium text-gray-500",
                }}
                onChange={(option) =>
                  handleStepChange(
                    "source_step",
                    option.value,
                    scenarioIndex,
                    stepIndex
                  )
                }
              />
            )}
          </Box>
          <Box rootStyle="">
            <Box
              tabIndex={0}
              ref={deleteRef}
              rootStyle={`${focus}`}
              onClick={() => deleteStep(step.id, scenarioId)}
            >
              <RiCloseCircleLine
                className={tw(
                  `text-red(400 500(hover:& focus:&)) w-4 h-4 cursor-pointer`
                )}
              />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
});

Step.displayName = "Step";

export { Step };
