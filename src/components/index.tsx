import { setTheme } from '../utils/helperFunctions';

export function setupFWTheme(theme?:any) {
  // Important:  To set the theme for this component
  console.log(theme,"9898686");
  
  setTheme(theme);
}

export {
  copyFeature,
  jsonToFeature,
  saveFeatureFile,
} from '../utils/helperFunctions';
export { Datatable } from './datatable';
export { FeatureList } from './featureList';
export { FeatureWriter } from './featureWriter';
export { ScenarioWriter } from './scenarioWriter';
export { Step } from './step';
