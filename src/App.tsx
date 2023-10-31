import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import "./App.css";
import { Box } from "./atoms";
import { FeatureWriter, setupFWTheme } from "./components";
import { FeatureProps } from './types';

function App() {
  setupFWTheme();
  return (
    <Box rootStyle="bg-white min-h-screen max-w-4xl mx-auto">
      <Box rootStyle="min-h-screen">
        <FeatureWriter
          onFeatureChange={(feature: FeatureProps) => console.log(feature)}
          defaultFeature={
            {
            keyword: "Feature",
            name: "",
            description: "",
            scenarios: [
              {
                id: 7674655345,
                keyword: "Scenario",
                name: "Tesing the Mood Selection UI",
                type: "scenario",
                steps: [
                  {
                    id: 896756456,
                    keyword: "Given",
                    name: "I am on the page 'http://127.0.0.1:3000/mindbodyfood/moodforyou'",
                    source_step: "I am on the page {string}",
                    params: {
                      page_url: "http://127.0.0.1:3000/mindbodyfood/moodforyou",
                    },
                  },
                ],
              },
            ],
            id: 1698301492634,
          }
        }
        />
      </Box>
    </Box>
  );
}

export default App;
