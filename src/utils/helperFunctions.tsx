/* eslint-disable no-inner-declarations */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
import { cucumberExpressions } from "./constants";
import { colors, customPreset } from "./theme";
import FileSaver from "file-saver";
import { RefObject, useEffect } from "react";
import { apply, setup } from "twind";
import {
  Content,
  Content2,
  Content3,
  EditorDatatableProps,
  FeatureProps,
  ScenarioProps,
  StepProps,
  stepDefinitionProps,
  updateParamsProp,
} from "../types";

// To set the twind theme
interface ParamsPropType {
  page_url: string;
}
export interface ParamsStepPropType {
  params: ParamsPropType;
  source_step: string;
}

interface TableOpetion {
  label: string;
  value: string;
}

export function setTheme(customTheme: any) {
  const config = {
    preflight: () => ({
      ...customPreset,
      body: {},
    }),
    plugins: {
      card: apply`bg-white shadow rounded py-1.5 px-1.5`,
    },
    theme: {
      extend: {
        colors: {
          primary: customTheme?.colors?.primary ?? colors?.blue,
          error: customTheme?.colors?.error ?? colors?.red,
          gray: customTheme?.colors?.gray ?? colors?.gray,
        },
        ...customTheme,
      },
    },
  };
  setup(config);
}

export function updateParams(params: updateParamsProp) {
  return Object.entries(params).reduce(
    (
      updatedParams: { [key: string]: string | null | undefined },
      [key, value]
    ) => {
      if (
        typeof value === "string" &&
        value.startsWith("<") &&
        value.endsWith(">")
      ) {
        updatedParams[key] = null;
      } else {
        updatedParams[key] = value;
      }
      return updatedParams;
    },
    {}
  );
}

export function useClickAway(
  ref: RefObject<HTMLInputElement>,
  callback: () => void
) {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref, callback]);
}

export function compareSentences(sentence1: string, sentence2: string) {
  const regex1 = /<([^>]+)>/;
  const regex2 = /{([^}]+)}/;
  const value1 = sentence1.match(regex1)?.[1];
  const value2 = sentence2.match(regex2)?.[1];
  return [value1, value2];
}

// Editor component json to table
// export function datatableGenerator(
//   json: EditorDatatableProps | undefined,
//   headersDatatypes: { [key: string]: string }[]
// ) {
//   const rows = json?.content[0]?.content;

//   const array = rows?.map((eachRow: Content2) =>
//     eachRow.content.map(
//       (header: Content3) =>
//         header.content[0]?.content && header.content[0].content[0].text
//     )
//   );
//   const headers = array?.shift();

//   const columnWidths:number[] | undefined = headers?.map(
//     (header: string | undefined, index: number) =>
//       Math.max(
//         header?.length || 0,
//         ...array.map((row: (string | undefined)[]) => row[index]?.length || 0)
//       )
//   );
//   const table = array?.map(
//       (row: (string | undefined)[]) =>
//         `\t\t\t| ${row
//           .map((cell: string | undefined, index: number) => {
//             const result =
//               headersDatatypes[index][headers[index]] === "string"
//                 ? `"${cell||""}"`
//                 : cell;
//             return result.padEnd(columnWidths[index]);
//           })
//           .join(" | ")} |`
//     )
//     .join("\n");
//     return `| ${headers
//       ?.map((header: string | undefined, index: number) => header?.padEnd(columnWidths[index]) || "")
//       .join(" | ")} |\n${table}`;
// }

export function datatableGenerator(
  json: EditorDatatableProps | undefined,
  headersDatatypes: {}[]
): string {
  if (!json) {
    return ""; // or handle the undefined case as per your requirement
  }

  const rows: Content2[] | undefined = json.content[0]?.content;

  const array: (string | undefined)[][] =
    rows?.map((eachRow: Content2) =>
      eachRow.content.map(
        (header: Content3) =>
          header.content[0]?.content && header.content[0].content[0].text
      )
    ) ?? [];

  const headers: (string | undefined)[] = array.shift() ?? [];

  const columnWidths: number[] = headers.map(
    (header: string | undefined, index: number) =>
      Math.max(
        header?.length || 0,
        ...array.map((row: (string | undefined)[]) => row[index]?.length || 0)
      )
  );
  const table = array
    .map(
      (row: (string | undefined)[]) =>
        `| ${row
          .map((cell: string | undefined, index: number) => {
            const result: string =
              headersDatatypes[headers[index] as keyof (string | undefined)] ===
              "string"
                ? `"${cell}"`
                : cell || "";
            return result.padEnd(columnWidths[index]);
          })
          .join(" | ")} |`
    )
    .join("\n");

  return `| ${headers
    .map(
      (header: string | undefined, index: number) =>
        header?.padEnd(columnWidths[index]) || ""
    )
    .join(" | ")} |\n${table}`;
}

// Editor component json to autocomplete options

export function convertJsonToOptions(json: Content) {
  if (!json) return null;
  const options: TableOpetion[] = [];

  if (json.type === "table") {
    const tableRows = json.content.filter(
      (row: Content2) => row.type === "tableRow"
    );

    tableRows.forEach((tableRow: Content2) => {
      tableRow.content.forEach((cell: Content3) => {
        if (
          cell.type === "tableHeader" &&
          cell.content[0]?.content &&
          cell.content[0]?.content[0]?.text
        ) {
          options.push({
            label: `<${cell.content[0].content[0].text}>`,
            value: `<${cell.content[0].content[0].text}>`,
          });
        }
      });
    });
  }

  return options;
}

// Output: [{ label: 'Email', value: 'Email' }, { label: 'Password', value: 'Password' }]

// To create the individual line from the object

export function lineGenerator(
  lineObject: FeatureProps | ScenarioProps | StepProps,
  description?: string
) {
  let line = "";

  if (description) {
    line = `\t${lineObject?.description}`;
    return line;
  }

  const payload = {
    keyword: lineObject?.keyword ?? "Given",
    name: lineObject?.name ?? "",
  };

  if (["Feature", "Scenario", "Scenario Outline"].includes(payload.keyword)) {
    if (
      payload.keyword === "Scenario" ||
      payload.keyword === "Scenario Outline"
    ) {
      line = `\n\t${payload.keyword}: ${payload?.name}`;
      return line;
    }
    line = `${payload.keyword}: ${payload?.name}`;
    return line;
  }
  line = `\t\t${payload.keyword} ${payload?.name}`;

  return line;
}

// To copy the feature

export async function copyFeature(feature: string) {
  try {
    await navigator.clipboard.writeText(feature);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
}

// To save the feature file

export function saveFeatureFile(feature: string, fileName: string) {
  const blob = new Blob([feature], {
    type: "text/plain;charset=utf-8",
  });

  FileSaver.saveAs(blob, `${fileName}.feature`);
}

export function appendAngleBrackets(str: string) {
  return `<${str}>`;
}

// To create the feature from the JSON
export function jsonToFeature(jsonData: FeatureProps) {
  try {
    // Create a copy of the input JSON data to avoid modifying the original object
    const featureDataCopy = JSON.parse(JSON.stringify(jsonData));

    // Initialize an array to store the lines of the feature file
    const lines: string[] = [];

    // Initialize an array to store the data types of datatable headers in scenario outlines
    const headersDatatypes: {}[] = [];
    // Function to create a line of the feature file and add it to the lines array
    function createLine(
      obj: FeatureProps | ScenarioProps | StepProps,
      description?: string
    ) {
      // Use the lineGenerator function to create a string from the object and optional description
      const result = lineGenerator(obj, description);
      // Add the line to the lines array
      lines.push(result);
    }

    // Recursive function to check whether every object in the hierarchy has a type property with the value 'text'
    function checkText(obj: Content | undefined) {
      if (typeof obj === "object") {
        if (obj.type === "text") {
          return true;
        }
        if (Array.isArray(obj.content)) {
          for (const item of obj.content) {
            if (!checkText(item as any)) {
              return false;
            }
          }
          return true;
        }
        return false;
      }
      return false;
    }

    // Function to generate lines for a scenario and add them to the lines array
    function scenarioGenerator(scenarioData: ScenarioProps) {
      // Create a line for the scenario itself
      createLine(scenarioData);
      // If the scenario has steps, create lines for each step
      if (scenarioData?.steps.length > 0) {
        const steps = scenarioData?.steps;
        steps.map((step: StepProps) => {
          // If the scenario is a scenario outline, check for datatable headers with string values
          if (scenarioData?.keyword === "Scenario Outline") {
            const result = compareSentences(step.name, step.source_step);
            if (result.every((value) => Boolean(value))) {
              headersDatatypes.push({
                [result[0] as string]: result[1],
              });
            }
          }
          // Create a line for the step
          return createLine(step);
        });
      }
      // If the scenario is a scenario outline with a datatable, generate lines for the datatable
      if (scenarioData?.keyword === "Scenario Outline") {
        // Check whether every object in the datatable has a type property with the value 'text'
        if (!checkText(scenarioData?.datatable?.content[0])) return;
        // Generate the datatable lines using the datatableGenerator function
        const datatable = datatableGenerator(
          scenarioData?.datatable,
          headersDatatypes
        );
        // Add the datatable lines to the lines array
        lines.push(`\t\tExamples:\n\t\t\t${datatable}`);
      }
    }

    // Function to generate lines for a feature and add them to the lines array
    function featureGenerator(featureData: FeatureProps) {
      // Create a line for the feature itself
      createLine(featureData);
      // If the feature has a description, create a line for the description
      if (featureData?.description) {
        createLine(featureData, "description");
      }
      // If the feature has scenarios, generate lines for each scenario
      if (featureData?.scenarios.length > 0) {
        const scenarios = featureData?.scenarios;
        scenarios.map((scenario) => scenarioGenerator(scenario));
      }
    }

    // If the input JSON data is a feature, generate lines for the feature
    if (featureDataCopy?.keyword === "Feature") {
      featureGenerator(featureDataCopy);
      // If the input JSON data is a scenario, generate lines for the scenario
    } else if (featureDataCopy?.keyword === "Scenario") {
      scenarioGenerator(featureDataCopy);
    }
    // Join the lines array into a single string and return it
    const feature = lines.join("\n");
    return feature;
  } catch (error) {
    // If an error occurs, log it to the console and return null
    console.error("Error converting JSON to feature:", error);
    alert("Fill all the fields!");
    return null;
  }
}

export const titleCase = (str: string) =>
  str
    .split("_")
    .filter((x) => x.length > 0)
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
    .join(" ");

function makeid(length = 6) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const typeReturn = (type?: string, param?: string) => {
  switch (type) {
    case "{string}":
      return {
        id: makeid(),
        word: type,
        component_to_render: "autocomplete",
        param,
        placeholder: param ? `Add ${titleCase(param)}` : "",
        value: "",
      };
    case "{int}":
      return {
        id: makeid(),
        word: type,
        component_to_render: "autocomplete",
        param,
        placeholder: param ? `Add ${titleCase(param)}` : "",
        value: "",
      };

    default:
      return {
        id: makeid(),
        word: type,
        component_to_render: "text",
        placeholder: null,
        value: type,
      };
  }
};

export function parseNumber(input: string) {
  // Remove commas from the input string
  input = input.replace(/,/g, "");

  // Check if the input string contains a decimal point or a floating point
  if (input.includes(".")) {
    // If the input string contains a decimal point, parse it as a decimal number
    return parseFloat(input);
  }
  if (input.includes("/")) {
    // If the input string contains a floating point, parse it as a fraction
    const [numerator, denominator] = input.split("/");
    return parseFloat(numerator) / parseFloat(denominator);
  }
  // If the input string does not contain a decimal point or a floating point, parse it as an integer
  return parseInt(input, 10);
}

export const constructStepView = (step: ParamsStepPropType) => {
  const splittedStep = step?.source_step.split(" ");
  let params = Object.keys(step?.params);
  const array = splittedStep.map((word: string) => {
    if (cucumberExpressions.includes(word)) {
      const result = typeReturn(word, params[0]);
      params = params.slice(1);
      return result;
    }
    return typeReturn(word);
  });

  return array;
};

function getSourceStepWithParams(
  givenStep: string,
  predefinedSteps: stepDefinitionProps[]
) {
  // Remove text enclosed within single quotes and numbers/floats
  const modifiedGivenStep = givenStep
    .replace(/'(?:\\.|[^'\\])*'|\b\d+(\.\d+)?\b/g, "") // Remove not a single quote or a backslash strings and numbers
    .replace(/\S+\\(?=\s|$)/g, "") // Remove words ending with a backslash
    .replace(/\s+/g, " ") // Replace multiple spaces with a single space
    .trim();

  // match params character that is not a single quote or double quote a backslash strings and numbers
  const matchedParams = givenStep.match(
    /'(?:\\.|[^'])*'|"(?:\\.|[^"])*"|\b(\d+(\.\d+)?)\b/g
  );

  let matchedStep = {
    source_step: "",
    params: {},
  };

  predefinedSteps.forEach((step: stepDefinitionProps) => {
    const modifiedStep = step.source_step
      .split(" ")
      .filter((word: string) => !cucumberExpressions.includes(word))
      .join(" ");

    if (modifiedGivenStep === modifiedStep) {
      let params = {};
      Object.keys(step.params || {}).forEach((param, index) => {
        params = {
          ...params,
          [param]:
            matchedParams &&
            matchedParams[index]
              .replace(/^'(?![\\"])(.*)'$/, "$1") // It matches character that is not a backslash with a double  or single quote.
              .replace(/^'|'$/g, ""), // It matches beging to end remove single quote
        };
      });
      matchedStep = {
        source_step: step.source_step,
        params,
      };
    }
  });
  return matchedStep;
}

// Convert the feature text into JSON
export function featureToJSON(
  featureText: string,
  predefinedSteps: stepDefinitionProps[]
) {
  try {
    // Split the feature text into lines and remove extra whitespace
    const lines = featureText.split("\n").map((line: string) => line.trim());

    // Initialize the JSON data object with empty values
    const jsonData: FeatureProps = {
      id: Date.now(),
      keyword: "Feature",
      name: "",
      description: "",
      scenarios: [],
    };

    let currentScenario: ScenarioProps | null = null;
    let currentStep = null;

    // Loop through each line in the feature text
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check if the line starts with 'Feature:'
      if (line.startsWith("Feature:")) {
        // Extract the feature name and trim whitespace
        jsonData.name = line.replace("Feature:", "").trim();
      } else if (line.startsWith("Scenario:")) {
        // If a scenario was in progress, push it to the scenarios array
        if (currentScenario) {
          jsonData.scenarios.push(currentScenario);
        }
        // Create a new scenario object and initialize its properties
        currentScenario = {
          id: Date.now() + i,
          keyword: "Scenario",
          name: line.replace("Scenario:", "").trim(),
          steps: [],
        };
      } else if (
        line.startsWith("Given") ||
        line.startsWith("When") ||
        line.startsWith("Then") ||
        line.startsWith("And")
      ) {
        const stepKeyword = line.split(" ")[0].trim();
        const stepName = line.replace(stepKeyword, "").trim();
        // Check if the stepName matches predefined step's source_step
        const stepAndParams = getSourceStepWithParams(
          stepName,
          predefinedSteps
        );
        if (stepAndParams) {
          currentStep = {
            id: Date.now() + i,
            keyword: stepKeyword,
            name: stepName,
            source_step: stepAndParams.source_step,
            params: stepAndParams.params,
          };

          currentScenario?.steps?.push(currentStep);
        }
      } else if (line.length > 0 && !line.startsWith("#")) {
        jsonData.description = line;
      }
    }

    // If there's a pending scenario, push it to the scenarios array
    if (currentScenario) {
      jsonData.scenarios.push(currentScenario);
    }

    // Return the generated JSON data object
    return jsonData;
  } catch (error) {
    // Handle errors and return null in case of failure
    console.error("Error converting feature to JSON:", error);
    return null;
  }
}

export const readFileContent = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      resolve(event?.target?.result as string);
    };

    reader.onerror = (event: ProgressEvent<FileReader>) => {
      reject(event?.target?.error);
    };

    reader.readAsText(file);
  });

export const addBackslashOnBefore = (string: string) => {
  // add before backslash on single quotes or double quotes and remove empty backslash without apostrophe or quotation
  const finalValue = string
    .replace(/(['"])/g, "\\$1") // It matches single or double quote character and add before backslashes
    .replace(/\\+/g, "\\") // remove more than one backslashes
    .replace(/^'(?![\\"])(.*)'$/g, "$1") // It matches character that is not a backslash with a double  or single quote.
    .replace(/\\(?![\\"'])/g, ""); // remove solo backslash only
  return finalValue;
};

export function stepParamsFormatter(Step: string, params: string[]) {
  const reducedParams = params.reduce((prev: {}, curr: string) => {
    const key = curr.trim();
    return {
      ...prev,
      [key]: "",
    };
  }, {});
  const payload = {
    source_step: Step,
    params: reducedParams,
  };
  return payload;
}
