export const cucumberExpressions = ['{string}', '{int}'];

export const initialFeatureData = {
  keyword: 'Feature',
  name: '',
  description: '',
  scenarios: [],
};

export const initialScenarioData = {
  keyword: 'Scenario',
  name: '',
  steps: [],
};

export const initialStepData = {
  keyword: '',
  name: '',
  source_step: '',
  params: {},
};

export const initialDatatableData = {
  type: 'doc',
  content: [
    {
      type: 'table',
      content: [
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableHeader',
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: null,
              },
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Email',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableHeader',
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: null,
              },
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Password',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableCell',
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: null,
              },
              content: [
                {
                  type: 'paragraph',
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: null,
              },
              content: [
                {
                  type: 'paragraph',
                },
              ],
            },
          ],
        },
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableCell',
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: null,
              },
              content: [
                {
                  type: 'paragraph',
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: null,
              },
              content: [
                {
                  type: 'paragraph',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const keywords = [
  {
    value: 'Given',
    label: 'Given',
  },
  {
    value: 'When',
    label: 'When',
  },
  {
    value: 'And',
    label: 'And',
  },
  {
    value: 'Then',
    label: 'Then',
  },
];

export const featureJSON = {
  keyword: 'Feature',
  name: 'Mood Selection',
  id: 'f0ba11cc-567e-44f0-bc02-f2affd3015e4',
  description: 'Feature Description',
  scenarios: [
    {
      id: 'ff6e0663-da38-4981-a3ae-2820f4cb59ab',
      keyword: 'Scenario',
      name: 'Tesing the Mood Selection UI',
      type: 'scenario',
      steps: [
        {
          keyword: 'Given',
          name: "I am on the page 'http://127.0.0.1:3000/mindbodyfood/moodforyou'",
          source_step: 'I am on the page {string}',
          params: {
            page_url: 'http://127.0.0.1:3000/mindbodyfood/moodforyou',
          },
        },
        {
          keyword: 'And',
          name: "I type '7904009560' in the 'mobileNumber'",
          source_step: 'I am on the page {string}',
          params: {
            page_url: 'http://127.0.0.1:3000/mindbodyfood/moodforyou',
          },
        },
      ],
    },
  ],
};

export const keys = [
  { label: "AltLeft", value: "AltLeft"},
  { label: "AltRight", value: "AltRight"},
  { label: "ArrowDown", value: "ArrowDown"},
  { label: "ArrowLeft", value: "ArrowLeft"},
  { label: "ArrowRight", value: "ArrowRight"},
  { label: "ArrowUp", value: "ArrowUp"},
  { label: "Backspace", value: "Backspace"},
  { label: "Clear", value: "Clear"},
  { label: "Command | Control", value: "CommandOrControl"},
  { label: "Delete", value: "Delete"},
  { label: "End", value: "End"},
  { label: "Enter", value: "Enter"},
  { label: "Escape", value: "Escape"},
  { label: "Home", value: "Home"},
  { label: "Insert", value: "Insert"},
  { label: "Meta", value: "Meta"},
  { label: "MetaRight", value: "MetaRight"},
  { label: "Numpad0", value: "Numpad0"},
  { label: "Numpad1", value: "Numpad1"},
  { label: "Numpad2", value: "Numpad2"},
  { label: "Numpad3", value: "Numpad3"},
  { label: "Numpad4", value: "Numpad4"},
  { label: "Numpad5", value: "Numpad5"},
  { label: "Numpad6", value: "Numpad6"},
  { label: "Numpad7", value: "Numpad7"},
  { label: "Numpad8", value: "Numpad8"},
  { label: "Numpad9", value: "Numpad9"},
  { label: "F1", value: "F1"},
  { label: "F2", value: "F2"},
  { label: "F3", value: "F3"},
  { label: "F4", value: "F4"},
  { label: "F5", value: "F5"},
  { label: "F6", value: "F6"},
  { label: "F7", value: "F7"},
  { label: "F8", value: "F8"},
  { label: "F9", value: "F9"},
  { label: "F10", value: "F10"},
  { label: "F11", value: "F11"},
  { label: "F12", value: "F12"},
  { label: "NumpadAdd", value: "NumpadAdd"},
  { label: "NumpadDecimal", value: "NumpadDecimal"},
  { label: "NumpadDivide", value: "NumpadDivide"},
  { label: "NumpadMultiply", value: "NumpadMultiply"},
  { label: "NumpadSubtract", value: "NumpadSubtract"},
  { label: "PageDown", value: "PageDown"},
  { label: "PageUp", value: "PageUp"},
  { label: "Pause", value: "Pause"},
  { label: "Return", value: "Return"},
  { label: "Shift", value: "Shift"},
  { label: "Space", value: "Space"},
  { label: "Tab", value: "Tab"},
  { label: "A", value: "A"},
  { label: "B", value: "B"},
  { label: "C", value: "C"},
  { label: "D", value: "D"},
  { label: "E", value: "E"},
  { label: "F", value: "F"},
  { label: "G", value: "G"},
  { label: "H", value: "H"},
  { label: "I", value: "I"},
  { label: "J", value: "J"},
  { label: "K", value: "K"},
  { label: "L", value: "L"},
  { label: "M", value: "M"},
  { label: "N", value: "N"},
  { label: "O", value: "O"},
  { label: "P", value: "P"},
  { label: "Q", value: "Q"},
  { label: "R", value: "R"},
  { label: "S", value: "S"},
  { label: "T", value: "T"},
  { label: "U", value: "U"},
  { label: "V", value: "V"},
  { label: "W", value: "W"},
  { label: "X", value: "X"},
  { label: "Y", value: "Y"},
  { label: "Z", value: "Z"},
]
