import { create } from "zustand";
import { stepParamsFormatter } from "../utils/helperFunctions";
import { stepDefinitionProps } from "../types";

interface StepDefinitionStoreProp {
  stepDefinition: stepDefinitionProps[] | [];
  isLoading: boolean;
  getStepDefinition: () => void;
}

interface DefenitionsRespons {
  id: string;
  createdTime: string;
  fields: {
    Action: string;
    Description: string;
    Params: string;
    Status: string;
    Step: string;
  };
}

const formatStepDefinitions = (defenitionsRespons: DefenitionsRespons[]) => {
  const result: { source_step: string; params: {} }[] = [];
  defenitionsRespons.forEach((record: DefenitionsRespons) => {
    const sourceStep = record?.fields?.Step.split("\n");
    if (sourceStep.length > 1) {
      const separatedParams = record?.fields?.Params?.split("\n") ?? [];
      sourceStep.forEach((step: string, index: number) => {
        const params = separatedParams[index]?.split(",") ?? [];
        const refactored = stepParamsFormatter(step, params);
        result.push(refactored);
      });
    } else {
      const params = record?.fields?.Params?.split(",") ?? [];
      const refactored = stepParamsFormatter(record?.fields?.Step, params);
      result.push(refactored);
    }
  });
  return result;
};

export const getApiStepDefinitions = create<StepDefinitionStoreProp>((set) => ({
  stepDefinition: [],
  isLoading: true,

  // To get set definition responds
  getStepDefinition: async () => {
    try {
      set({ isLoading: true });
      await fetch(
        `https://api.airtable.com/v0/appSSkKcfh1sekMGU/Steps?filterByFormula=SEARCH('Completed'%2C+%7BStatus%7D)&sort%5B0%5D%5Bfield%5D=Action&sort%5B0%5D%5Bdirection%5D=asc`,
        // `https://api.airtable.com/v0/appgRjxLVoZ5xS6Kx/tblp3WUcZRSKKkqmh?filterByFormula=SEARCH('Completed'%2C+%7BStatus%7D)&sort%5B0%5D%5Bfield%5D=Action&sort%5B0%5D%5Bdirection%5D=asc`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer keyX0sIrUTepQRxfD`, // notice the Bearer before your token
            // Authorization: `Bearer patJipfjbQ1gpQxgp.2c0efdd852acff9c1271a3f2c911151017a5754bb640bf9bb4f4a160fff6fe87`
          },
        }
      )
        .then((res) => {
          const data = res.json();
          return data;
        })
        .then((data) => {
          const stepResponds = data?.records;
          set({
            isLoading: false,
            stepDefinition: formatStepDefinitions(stepResponds) ?? [],
          });
        })

        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (error) {
      set({ isLoading: false });
      console.log(error);
    }
  },
}));
