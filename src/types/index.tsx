import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";

// SelectedStep component props types
export interface OptionPropType {
  label: string;
  value: string;
}
export interface splittedStepObjPropType {
  component_to_render: string;
  id: string;
  placeholder: string;
  value: string|number;
  word: string;
  param: string;
}
export interface SelectedStepProps {
  data: splittedStepObjPropType[];
  options: []|OptionPropType[]|null;
  addStep: (val: ScenarioProps, index: number) => void;
  onChange: (Obj: splittedStepObjPropType, value: string | number) => void;
}

// Datatable prop types
export interface DatatableProps {
  className?: string;
  datatable?: EditorDatatableProps;
  onChange?: (e: EditorDatatableProps) => void;
  rootStyle?: string;
}

//FeatureList Props
export interface FeatureListProps {
  id: number;
  keyword: string;
  name: string;
  description: string;
  scenarios: ScenarioProps[];
}

// Feature list prop types
export interface FeatureListProps {
  className?: string;
  flRootStyle?: string;
  featureList?: FeatureListProps[];
  onAddFeature?: () => void;
  onDeleteFeature?: (val: FeatureProps) => void;
  onFeatureNameChange?: (val: string, feature: FeatureProps) => void;
  setActive?: (id: number) => void;
  allowCopy?: boolean;
  allowDownload?: boolean;
  activeId?: undefined;
}

// Steps components props types
export interface StepsComponentProps {
  stepRootStyle?: string;
  addStep: (val: ScenarioProps, index: number) => void;
  stepDefinitions: stepDefinitionProps[];
  options: OptionPropType[]|null;
  step: StepProps;
  dragHandleProps?: DraggableProvidedDragHandleProps | null | undefined;
  scenarioIndex: number;
  scenarioId: number;
  stepIndex: number;
}

//ScenarioWriter props types
export interface ScenarioWriterProps {
  rootProps?: {
    rootStyle?: string;
  };
  className?: string;
  onScenarioDelete?: () => void;
  stepDefinitions: stepDefinitionProps[];
  scenario: ScenarioProps;
  duplicateScenario: (ScenarioId: number) => void;
  index: number;
}

// FeatureWriter props types
export interface FeatureWriterProps {
  onFeatureChange?: (val: FeatureProps | null) => void;
  rootProps?: {
    rootStyle?: string;
  };
  className?: string;
  allowCopy?: boolean;
  allowUpload?: boolean;
  allowDownload?: boolean;
  showFeatureName?: boolean;
  defaultFeature?: FeatureProps;
}

// feture props type
export interface FeatureProps {
  id: number;
  keyword: string;
  name: string;
  description: string;
  scenarios: ScenarioProps[];
}

// Scenario props types
export interface ScenarioProps {
  id: number;
  keyword: string;
  name: string;
  type?: string;
  datatable?: EditorDatatableProps;
  steps: StepProps[];
}

// steps prop types
export interface StepProps {
  id: number;
  keyword: string;
  name: string;
  source_step: string;
  params: { page_url: string };
}
export interface stepDefinitionProps {
  source_step?: string;
  params?: {
    text?: string;
    element_id?: string;
    value?: string;
    popup_text?:string
    header_name?:string;
    [key: string]: string | undefined;
  }
}

// Edit Data table props

export interface EditorDatatableProps {
  type: string;
  content: Content[];
}

export interface Content {
  type: string;
  content: Content2[];
}

export interface Content2 {
  type: string;
  content: Content3[];
}

export interface Content3 {
  type: string;
  attrs: Attrs;
  content: Content4[];
}

export interface Attrs {
  colspan: number;
  rowspan: number;
  colwidth: null;
}

export interface Content4 {
  type: string;
  content?: Content5[];
}

export interface Content5 {
  type: string;
  text: string;
}
