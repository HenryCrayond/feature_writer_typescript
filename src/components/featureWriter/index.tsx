/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  DragDropContext,
  Droppable,
  DropResult,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";

import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import isEqual from "react-fast-compare";
import { MdContentCopy } from "react-icons/md";
import { RiAddFill, RiCheckLine } from "react-icons/ri";
import { TbDownload, TbUpload } from "react-icons/tb";
import { tw } from "twind";
import {
  Box,
  Button,
  CircularProgress,
  Heading,
  Input,
  Textarea,
} from "../../atoms";
import { ScenarioWriter } from "../../components";
import { useFeatureStore } from "../../store/feature";
import { getApiStepDefinitions } from "../../store/stepDefinition";
import { FeatureProps, FeatureWriterProps, ScenarioProps } from "../../types";
import {
  copyFeature,
  featureToJSON,
  jsonToFeature,
  readFileContent,
  saveFeatureFile,
} from "../../utils/helperFunctions";

const FeatureWriter = forwardRef((props: FeatureWriterProps) => {
  const {
    onFeatureChange = () => {},
    rootProps = {},
    className = "",
    allowCopy = true,
    allowUpload = true,
    allowDownload = true,
    showFeatureName = true,
    defaultFeature = null,
  } = props;
  const { rootStyle, ...restRootProps } = rootProps;
  const rootTw = `flex flex-col ${rootStyle}`;

  const {
    featureState,
    handleFeatureChange,
    updateFeature,
    createFeature,
    createScenario,
    duplicateScenario,
    handleScenarioDelete,
    dragAndDropChange,
  } = useFeatureStore();

  const { isLoading, stepDefinition, getStepDefinition } =
    getApiStepDefinitions();

  const [loading, setLoading] = useState(isLoading);

  const [copied, setCopied] = useState(false);

  const [downloaded, setDownloaded] = useState(false);

  const rootRef = useRef();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (
        selectedFile &&
        (selectedFile.name.endsWith(".feature") ||
          selectedFile.type === "text/plain")
      ) {
        setLoading(true);
        try {
          const fileContent:string = await readFileContent(selectedFile);
          const featureJSON = featureToJSON(fileContent, stepDefinition);
          updateFeature(featureJSON);

          setLoading(false);
        } catch (error) {
          console.error("Error reading file:", error);
          alert(
            "Error reading file, kindly check the feature file is in the correct format!"
          );
        }
      } else {
        console.log("Invalid file selected:", selectedFile.name);
        alert("Invalid file selected!");
      }
    }
  };

  useLayoutEffect(() => {
    getStepDefinition();
  }, []);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 500);
    }
  }, [copied]);

  useEffect(() => {
    if (downloaded) {
      setTimeout(() => {
        setDownloaded(false);
      }, 500);
    }
  }, [downloaded]);

  // To put the latest feature data in the state
  useEffect(() => {
    if (defaultFeature) {
      createFeature(defaultFeature);
    } else {
      createFeature(null);
    }
  }, [defaultFeature]);

  useEffect(() => {
    const stateNotChanged = isEqual(defaultFeature, featureState);
    if (!stateNotChanged) {
      if (onFeatureChange) {
        onFeatureChange(featureState);
      }
    }
    if (!showFeatureName) {
      onFeatureChange({
        ...featureState,
        name: defaultFeature?.name ?? "",
      }as FeatureProps);
    } else {
      onFeatureChange(featureState);
    }
  }, [featureState]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      // reOrder the same senario
      dragAndDropChange(source, destination);
    } else {
      // move to the diffrent senario
      dragAndDropChange(source, destination);
    }
  };

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  if (loading)
    return (
      <Box rootStyle="min-h-[50vh] grid place-items-center my-auto">
        <CircularProgress rootStyle="w-10 h-10" />
      </Box>
    );
  return (
    <Box
      rootStyle={rootTw}
      ref={rootRef as unknown as React.Ref<HTMLDivElement>}
      id="feature-writer"
      className={`FeatureWriter ${className}`}
      {...restRootProps}
    >
      <Box rootStyle={`flex gap-x-3 items-center ${showFeatureName && "mb-4"}`}>
        {showFeatureName && (
          <Input
            rootStyle="w-full"
            value={featureState?.name}
            onChange={(e) => handleFeatureChange("name", e.target.value)}
            variant="outlined"
            placeholderText="Feature name"
          />
        )}
        <Box
          rootStyle={`flex items-center my-3 ${
            showFeatureName ? "gap-1" : "ml-auto gap-3"
          }`}
        >
          {allowUpload && (
            <label
              className={tw(
                "text-gray(500 600(hover:& focus:&)) w-6 h-6 cursor-pointer relative"
              )}
            >
              <input
                type="file"
                className={tw("hidden")}
                accept=".feature, text/plain" // Accept both .feature and plain text files
                onChange={handleFileChange}
              />
              <span className={tw("absolute top-0 left-0")}>
                <TbUpload className={tw("w-6 h-6")} />
              </span>
            </label>
          )}
          {(featureState?.name ||
            (featureState?.scenarios &&
              featureState?.scenarios.length > 0)) && (
            <>
              {allowCopy && (
                <>
                  {copied ? (
                    <RiCheckLine className={tw("text-green(500) w-6 h-6")} />
                  ) : (
                    <MdContentCopy
                      className={tw(
                        "text-gray(500 600(hover:& focus:&)) w-6 h-6 cursor-pointer"
                      )}
                      title="Copy Feature"
                      onClick={() => {
                        const featureFile = jsonToFeature(featureState);
                        copyFeature(featureFile as string);
                        setCopied(true);
                      }}
                    />
                  )}
                </>
              )}
              {allowDownload && (
                <>
                  {downloaded ? (
                    <RiCheckLine className={tw("text-green(500) w-6 h-6")} />
                  ) : (
                    <TbDownload
                      title="Download Feature"
                      className={tw(
                        "text-gray(500 600(hover:& focus:&)) w-6 h-6 cursor-pointer"
                      )}
                      onClick={() => {
                        const featureFile = jsonToFeature(featureState);
                        saveFeatureFile(featureFile as string, featureState?.name);
                        setDownloaded(true);
                      }}
                    />
                  )}
                </>
              )}
            </>
          )}
        </Box>
      </Box>
      <Textarea
        value={featureState?.description}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          handleFeatureChange("description", e.target.value)
        }
        variant="outlined"
        placeholderText="Feature description"
      />
      <Box rootStyle="mt-4 flex flex-col gap-4">
        <Heading as="h2" size="h6" rootStyle="text-gray(500)">
          Scenarios
        </Heading>
        <DragDropContext onDragEnd={onDragEnd}>
          {featureState?.scenarios &&
            featureState?.scenarios?.length > 0 &&
            featureState?.scenarios?.map(
              (scenario: ScenarioProps, i: number) => (
                <Droppable
                  key={String(scenario.id)}
                  droppableId={String(scenario.id)}
                >
                  {(provided: DroppableProvided,snapshot:DroppableStateSnapshot) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      <ScenarioWriter
                        index={i}
                        key={scenario.id + i}
                        scenario={scenario}
                        dragging={snapshot.isDraggingOver}
                        onScenarioDelete={() => {
                          handleScenarioDelete(scenario);
                        }}
                        stepDefinitions={stepDefinition}
                        duplicateScenario={(scenarioId: number) =>
                          duplicateScenario(scenarioId)
                        }
                        provided={provided}
                      />
                      
                    </div>
                  )}
                </Droppable>
              )
            )}
        </DragDropContext>
        <Button
          rootStyle={
            featureState?.scenarios && featureState?.scenarios.length > 0
              ? "w-max bg-blue-500"
              : "w-max my-4 mx-auto"
          }
          size="sm"
          leftIcon={<RiAddFill className={tw(`w-4 h-4`)} />}
          onClick={() => {
            createScenario();
          }}
        >
          Add scenario
        </Button>
      </Box>
    </Box>
  );
});

FeatureWriter.displayName = "FeatureWriter";

FeatureWriter.defaultProps = {
  allowCopy: true,
  allowDownload: true,
  showFeatureName: true,
};

export { FeatureWriter };
