// SelectedStep component props types
export interface SelectedStepProps {
  data: any;
  options: any;
  addStep: any;
  onChange: (Obj: any, value: any) => void;
}

// Datatable prop types
export interface DatatableProps {
  className?: string;
  datatable?: any;
  onChange?: (e: any) => void;
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
  /**
   * Class name to style the component
   */
  className?: string;
  /**
   * root style name to style the component
   */
  flRootStyle?: string;
  /**
   * List of features to be displayed inside the component
   */
  featureList?: FeatureListProps[];
  /**
   * Button to add a new feature to the component
   */
  onAddFeature?: () => void;
  /**
   * Button to delete a feature from the component
   */
  onDeleteFeature?: (val: any) => void;
  /**
   * function to changes a particular feature's name inside the component
   */
  onFeatureNameChange?: (val: any, scenarios: any) => void;
  /**
   * function to set a particular feature name to active/editable state
   */
  setActive?: (id: number) => void;
  /**
   * Allowing to copy a feature's detail
   */
  allowCopy?: boolean;
  /**
   * Allowing to download a feature's detail
   */
  allowDownload?: boolean;

  activeId?: undefined;
}

// Steps components props types
export interface StepsComponentProps {
  stepRootStyle?: string;
  addStep: (val:any ,index:number) => void;
  stepDefinitions: any;
  options: any;
  step: any;
  dragHandleProps?: any;
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
  stepDefinitions: any;
  scenario: ScenarioProps;
  duplicateScenario: any;
  index: number;
}

// FeatureWriter props types
export interface FeatureWriterProps {
  onFeatureChange?: (val: any) => void;
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
  datatable?: any;
  steps: StepProps[];
}

// steps prop types
export interface StepProps {
  id: number;
  keyword: string;
  name: string;
  source_step: string;
  params?: {page_url: string| undefined};
}
