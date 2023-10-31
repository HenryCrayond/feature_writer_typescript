import {
  Box,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Icon,
  Input,
  Text,
} from "../../atoms";
import { Datatable, Step } from "../../components";
import { focus } from "../../utils/twind";
import { useKeyPress } from "ahooks";
import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Draggable } from "react-beautiful-dnd";
import { CgCloseO } from "react-icons/cg";
import { HiOutlineTrash } from "react-icons/hi";
import { RiAddFill } from "react-icons/ri";
import { VscTable } from "react-icons/vsc";
import { tw } from "twind";
import { MdContentCopy } from "react-icons/md";
import { convertJsonToOptions } from "../../utils/helperFunctions";
import { Menu, Option } from "../../atoms/overlay/menu";
import { useFeatureStore } from "../../store/feature";
import { ScenarioWriterProps, StepProps } from "../../types";

export interface MenuOnchangeProp {
  label: string;
  value: string;
}
const ScenarioWriter = forwardRef((props:ScenarioWriterProps) => {
  const {
    rootProps = {},
    className = "",
    onScenarioDelete=()=>{},
    stepDefinitions,
    scenario,
    duplicateScenario,
    index,
  } = props;

  const { rootStyle, ...restRootProps } = rootProps;

  const rootTw = `bg-white flex min-h-max flex-col gap-4 px-3 py-3 rounded shadow ${rootStyle}`;

  const nameRef = useRef<any>(null);
  const deleteRef = useRef(null);
  const menuRef = useRef<any>(null);

  const {
    handleScenarioChange,
    switchScenario,
    createStep,
    updateScenarioTable,
  } = useFeatureStore();

  const [options, setOptions] = useState<any>([]);
  const [confirmation, setConfirmation] = useState(false);

  // It converts the table headers to options for the autocomplete
  const handleTableHeaders = () => {
    if (scenario?.datatable?.content[0]) {
      const result = convertJsonToOptions(scenario?.datatable?.content[0]);
      setOptions(result);
    }
  };

  useKeyPress(
    "enter",
    () => {
      onScenarioDelete();
    },
    { target: deleteRef }
  );

  useKeyPress(
    "enter",
    () => {
      if (scenario?.name.length > 1) createStep(scenario,index);
    },
    { target: nameRef }
  );

  // Use useLayoutEffect to set focus after rendering
  useLayoutEffect(() => {
    if (!scenario?.name) {
      nameRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (scenario?.datatable) {
      handleTableHeaders();
    } else {
      setOptions([]);
    }
  }, [scenario]);

  useEffect(() => {
    if (menuRef.current) menuRef.current.focus();
  }, []);

  const handleMenu = (value: string) => {
    switch (value) {
      case "Duplicate":
        duplicateScenario(scenario.id);
        break;
      case "Delete":
        setConfirmation(true);
        break;
      default:
        break;
    }
  };

  return (
    <Box
      rootStyle={rootTw}
      id="scenario-writer"
      className={`FeatureWriter ${className}`}
      {...restRootProps}
    >
      <Box className={tw`flex justify-between items-center`}>
        <Box className={tw`grid gap-x-4 items-center`}>
          <Box
            className={tw`bg-white shadow-sm my-2 flex p-1 gap-x-2 max-w-max rounded`}
          >
            <Button
              className={tw`font-medium`}
              variant={scenario.keyword === "Scenario" ? "solid" : "ghost"}
              onClick={() => {
                switchScenario("scenario", scenario, index);
              }}
              size="sm"
            >
              Scenario
            </Button>
            <Button
              className={tw`font-medium`}
              variant={
                scenario.keyword === "Scenario Outline" ? "solid" : "ghost"
              }
              onClick={() =>
                switchScenario("scenario-outline", scenario, index)
              }
              size="sm"
            >
              Scenario Outline
            </Button>
          </Box>
        </Box>

        {scenario.keyword === "Scenario Outline" && (
          <Dialog>
            <DialogTrigger className={tw`cursor-pointer`}>
              <Box
                title="Add a data table"
                tabIndex={0}
                className={tw`w-8 h-8 ${focus} rounded-full cursor-pointer grid place-items-center bg-primary-50 text-primary-500`}
              >
                <Icon as={VscTable} className={tw`w-6 h-6`} />
              </Box>
            </DialogTrigger>
            <DialogContent className={tw`w-9/12 min-h-[360px] block pb-12`}>
              <DialogClose>
                <Icon
                  tabIndex={0}
                  className={tw`float-right rounded-full ${focus} text-gray-400 w-5 h-5 cursor-pointer`}
                  as={CgCloseO}
                />
              </DialogClose>
              <Datatable
                datatable={scenario?.datatable}
                onChange={(tableData: any) =>
                  updateScenarioTable(tableData, scenario, index)
                }
              />
            </DialogContent>
          </Dialog>
        )}
      </Box>
      <Box rootStyle="flex items-center gap-2">
        <Input
          ref={nameRef}
          rootStyle="flex-grow w-full"
          value={scenario?.name}
          onChange={(e) => handleScenarioChange("name", e.target.value, index)}
          variant="outlined"
          placeholderText="Scenario Name"
        />
        <Box ref={menuRef} rootStyle={`${focus}`}>
          <Menu
            ref={menuRef}
            onChange={(e: MenuOnchangeProp) => {
              handleMenu(e.value);
            }}
          >
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
              <HiOutlineTrash
                style={{ display: "unset" }}
                className={tw(
                  "text-gray(300 400(hover:& focus:&)) mr-1 font-medium cursor-pointer"
                )}
              />
              Delete
            </Option>
          </Menu>
        </Box>
      </Box>

      {scenario?.steps &&
        scenario.steps.length > 0 &&
        scenario.steps.map((step: StepProps, i: number) => (
          <Draggable
            key={step?.id.toString()}
            draggableId={step?.id.toString()}
            index={i}
          >
            {(draggableprovided) => (
              <div
                ref={draggableprovided.innerRef}
                {...draggableprovided.draggableProps}
              >
                <Step
                  scenarioIndex={index}
                  scenarioId={Number(scenario.id)}
                  stepIndex={i}
                  stepDefinitions={stepDefinitions}
                  options={options}
                  key={step?.id}
                  step={step}
                  addStep={createStep}
                  dragHandleProps={draggableprovided.dragHandleProps}
                />
              </div>
            )}
          </Draggable>
        ))}

      <Button
        variant="ghost"
        size="sm"
        rootStyle={scenario?.steps.length > 0 ? "w-max" : "w-max my-4 mx-auto"}
        leftIcon={<RiAddFill className={tw(`w-4 h-4`)} />}
        onClick={() => createStep(scenario, index)}
      >
        Add step
      </Button>

      <Dialog
        open={confirmation}
        onOpenChange={() => {
          console.log();
        }}
      >
        <DialogContent className={tw`w-4/12 min-h-[110px] block`}>
          <Box className={tw`flex flex-col justify-around p-1`}>
            <Text className={tw`text-center font-medium`}>
              Are you sure want to delete the scenario ?
            </Text>

            <Box className={tw`flex space-x-4 justify-center pt-5`}>
              <Button
                className={tw`font-medium focus:bg-red-600 focus:ring-red-600 focus:border-red-600`}
                variant="solid"
                onClick={onScenarioDelete}
              >
                Delete
              </Button>
              {/* <DialogClose> */}
              <Button
                className={tw`font-medium`}
                color="gray"
                variant="ghost"
                onClick={() => setConfirmation(false)}
              >
                Cancel
              </Button>
              {/* </DialogClose> */}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
});

ScenarioWriter.displayName = "ScenarioWriter";

export { ScenarioWriter };
