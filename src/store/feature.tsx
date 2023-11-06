/* eslint-disable camelcase */
/* eslint-disable consistent-return */
import {
  initialDatatableData,
  initialFeatureData,
  initialScenarioData,
  initialStepData,
} from "../utils/constants";
import { create } from "zustand";
import { updateParams } from "../utils/helperFunctions";
import {
  EditorDatatableProps,
  FeatureProps,
  ScenarioProps,
  StepProps,
} from "../types";

interface DragDropProp {
  droppableId: string;
  index: number;
}
interface FeatureStorePropType {
  featureState: FeatureProps | null;
  handleFeatureChange: (key: string, val: string) => void;
  createFeature: (feature?: FeatureProps | null) => void;
  updateFeature: (updateFeature: FeatureProps | null) => void;
  createScenario: () => void;
  handleScenarioDelete: (scenario: ScenarioProps) => void;
  duplicateScenario: (scenarioId: number) => void;
  switchScenario: (
    type: string,
    scenario: ScenarioProps,
    scenarioIndex: number
  ) => void;
  updateScenarioTable: (
    tableData: EditorDatatableProps,
    updateScenario: ScenarioProps,
    scenarioIndex: number
  ) => void;
  stepOnChange: (
    key: string,
    val: string,
    scenarioIndex: number,
    stepIndex: number
  ) => void;
  createStep: (scenario: ScenarioProps, index: number) => void;
  duplicateStep: (stepId: number, scenarioId: number) => void;
  deleteStep: (stepId: number, scenarioId: number) => void;
  updateStep: (
    name: string,
    params: { page_url?: string },
    scenarioIndex: number,
    stepIndex: number
  ) => void;
  updateDefinitionStep: (
    source_step: string,
    scenarioIndex: number,
    stepIndex: number
  ) => void;
  editSteps: (step: StepProps, scenarioId: number, stepIndex: number) => void;
  handleScenarioChange: (key: string, val: string, index: number) => void;
  dragAndDropChange: (source: DragDropProp, destination: DragDropProp) => void;
}

export const useFeatureStore = create<FeatureStorePropType>((set, get) => ({
  // initial feature
  featureState: null,

  // To handle feature change
  handleFeatureChange: (key, val) => {
    set((state: any) => ({
      featureState: {
        ...state.featureState,
        [key]: val,
      },
    }));
  },

  // To create a specific feature
  createFeature: (feature) => {
    set({
      featureState: feature
        ? { ...feature }
        : {
            ...initialFeatureData,
            id: Date.now(),
          },
    });
  },

  // To update a Feature
  updateFeature: (updateFeature) => {
    set({
      featureState: updateFeature,
    });
  },

  // To create a Scenario
  createScenario: () => {
    set((state: any) => ({
      featureState: {
        ...state.featureState,
        scenarios: [
          ...state.featureState.scenarios,
          {
            ...initialScenarioData,
            id: Date.now(),
          },
        ],
      },
    }));
  },

  // To handle Delete Scenario
  handleScenarioDelete: (scenario) => {
    const { featureState } = get();
    const featureStateCopy = JSON.parse(JSON.stringify(featureState));
    const deleteScenario = featureStateCopy.scenarios.filter(
      (item: ScenarioProps) => item.id !== scenario.id
    );
    featureStateCopy.scenarios = [...deleteScenario];
    set({ featureState: featureStateCopy });
  },

  // To handle duplicate Scenario
  duplicateScenario: (scenarioId) => {
    const { featureState } = get();
    const featureStateCopy = JSON.parse(JSON.stringify(featureState));
    const duplicateScenario = featureStateCopy.scenarios.find(
      (item: ScenarioProps) => Number(item.id) === scenarioId
    );
    const duplicateSteps = duplicateScenario.steps.map(
      (step: StepProps, index: number) => {
        const updatedStep = { ...step, id: Date.now() + index };
        return updatedStep;
      }
    );
    const indexArr = featureStateCopy.scenarios.map((x: ScenarioProps) => x.id);
    const index = indexArr.indexOf(scenarioId) + 1;
    featureStateCopy.scenarios.splice(index, 0, {
      ...duplicateScenario,
      id: Date.now(),
    });
    featureStateCopy.scenarios[index].steps = duplicateSteps;

    set({ featureState: featureStateCopy });
  },

  // To switch a Scenario
  switchScenario: (type, scenario, scenarioIndex) => {
    const { featureState } = get();
    const featureStateCopy = JSON.parse(JSON.stringify(featureState));

    const keyword = type === "scenario" ? "Scenario" : "Scenario Outline";

    const duplicateScenario = featureStateCopy.scenarios.find(
      (item: ScenarioProps) => item.id === scenario.id
    );
    if (type === "scenario" && scenario?.datatable) {
      const result = duplicateScenario.steps.map((step: StepProps) => {
        const params = updateParams(step?.params);

        return {
          ...step,
          params,
        };
      });
      delete duplicateScenario?.datatable;
      const steps = result;
      featureStateCopy.scenarios[scenarioIndex] = {
        ...duplicateScenario,
        keyword,
        steps,
      };
      set({ featureState: featureStateCopy });
    } else {
      featureStateCopy.scenarios[scenarioIndex] = {
        ...featureStateCopy.scenarios[scenarioIndex],
        keyword,
        datatable: initialDatatableData,
      };
      set({ featureState: featureStateCopy });
    }
  },

  // To handle update Scenario data table
  updateScenarioTable: (tableData, updateScenario, scenarioIndex) => {
    const { featureState } = get();
    const featureStateCopy = JSON.parse(JSON.stringify(featureState));
    featureStateCopy.scenarios[scenarioIndex] = {
      ...updateScenario,
      datatable: tableData,
    };
    set({
      featureState: featureStateCopy,
    });
  },

  // To handle StepChange
  stepOnChange: (key, val, scenarioIndex, stepIndex) => {
    const { featureState } = get();
    const featureStateCopy = JSON.parse(JSON.stringify(featureState));
    featureStateCopy.scenarios[scenarioIndex].steps[stepIndex][key] = val;
    set({
      featureState: featureStateCopy,
    });
  },

  // To create a Step
  createStep: (scenario, index) => {
    const { featureState } = get();
    const featureStateCopy = JSON.parse(JSON.stringify(featureState));
    const newStep = {
      ...initialStepData,
      id: Date.now(),
    };
    featureStateCopy.scenarios[index].steps = [...scenario.steps, newStep];
    set({
      featureState: featureStateCopy,
    });
  },

  // To copy a Step
  duplicateStep: (stepId, scenarioId) => {
    const { featureState } = get();
    const featureStateCopy = JSON.parse(JSON.stringify(featureState));

    const findScenario = featureStateCopy.scenarios.find(
      (val: ScenarioProps) => Number(val.id) === scenarioId
    );
    const scenarioIndex = featureStateCopy.scenarios.indexOf(findScenario);

    const duplicateStep = featureStateCopy.scenarios[scenarioIndex].steps.find(
      (step: StepProps) => Number(step.id) === stepId
    );
    const indexArr = featureStateCopy.scenarios[scenarioIndex].steps.map(
      (x: StepProps) => x.id
    );
    const index = indexArr.indexOf(stepId) + 1;
    featureStateCopy.scenarios[scenarioIndex].steps.splice(index, 0, {
      ...duplicateStep,
      id: Date.now(),
    });
    set({
      featureState: featureStateCopy,
    });
  },

  // To delete a Step
  deleteStep: (stepId, scenarioId) => {
    const { featureState } = get();
    const featureStateCopy = JSON.parse(JSON.stringify(featureState));

    const findScenario = featureStateCopy.scenarios.find(
      (val: ScenarioProps) => Number(val.id) === scenarioId
    );
    const scenarioIndex = featureStateCopy.scenarios.indexOf(findScenario);

    const deleteStep = featureStateCopy.scenarios[scenarioIndex].steps.filter(
      (item: StepProps) => Number(item.id) !== stepId
    );
    featureStateCopy.scenarios[scenarioIndex].steps = deleteStep;
    set({
      featureState: featureStateCopy,
    });
  },

  // To update Step
  updateStep: (name, params, scenarioIndex, stepIndex) => {
    const { featureState } = get();
    const featureStateCopy = JSON.parse(JSON.stringify(featureState));
    featureStateCopy.scenarios[scenarioIndex].steps[stepIndex] = {
      ...featureStateCopy.scenarios[scenarioIndex].steps[stepIndex],
      name,
      params,
    };
    set({
      featureState: featureStateCopy,
    });
  },

  // To update definition steps
  updateDefinitionStep: (source_step, scenarioIndex, stepIndex) => {
    const { featureState } = get();
    const featureStateCopy = JSON.parse(JSON.stringify(featureState));
    featureStateCopy.scenarios[scenarioIndex].steps[stepIndex] = {
      ...featureStateCopy.scenarios[scenarioIndex].steps[stepIndex],
      source_step,
    };
    set(() => ({ featureState: { ...featureStateCopy } }));
  },

  // To edit Steps
  editSteps: (step, scenarioId, stepIndex) => {
    const { featureState } = get();
    const featureStateCopy = JSON.parse(JSON.stringify(featureState));

    const findScenario = featureStateCopy.scenarios.find(
      (val: ScenarioProps) => Number(val.id) === scenarioId
    );
    const scenarioIndex = featureStateCopy.scenarios.indexOf(findScenario);

    const copiedStep = {
      ...step,
      name: "",
      source_step: "",
      params: {},
    };
    featureStateCopy.scenarios[scenarioIndex].steps[stepIndex] = copiedStep;
    set({ featureState: { ...featureStateCopy } });
  },

  // To handle Scenario Change
  handleScenarioChange: (key, val, index) => {
    const { featureState } = get();
    const featureStateCopy = JSON.parse(JSON.stringify(featureState));
    featureStateCopy.scenarios[index][key] = val;
    set({
      featureState: {
        ...featureStateCopy,
      },
    });
  },

  // To handle drag Move on diffrent Scenario
  dragAndDropChange: (source, destination) => {
    const { featureState } = get();

    const featureStateCopy = JSON.parse(JSON.stringify(featureState));
    let removedStep: StepProps[] | null | any = null;

    featureStateCopy.scenarios.forEach((scenario: ScenarioProps) => {
      if (scenario.id === Number(source.droppableId)) {
        removedStep = scenario.steps.splice(source.index, 1);
      }
    });

    featureStateCopy.scenarios.forEach((scenario: ScenarioProps) => {
      if (scenario.id === Number(destination.droppableId)) {
        scenario.steps.splice(destination.index, 0, removedStep[0]);
      }
    });
    set({ featureState: { ...featureStateCopy } });
  },
}));
