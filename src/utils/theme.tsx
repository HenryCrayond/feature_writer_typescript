export const customPreset = {
  ".FeatureWriter": {},
  ".FeatureWriter blockquote,.FeatureWriter dl,.FeatureWriter dd,.FeatureWriter h1,.FeatureWriter h2,.FeatureWriter h3,.FeatureWriter h4,.FeatureWriter h5,.FeatureWriter h6,.FeatureWriter hr,.FeatureWriter figure,.FeatureWriter p,.FeatureWriter pre,.FeatureWriter fieldset,.FeatureWriter ol,.FeatureWriter ul":
    {
      margin: "0",
    },
  ".FeatureWriter button": {},
  '.FeatureWriter button,.FeatureWriter [type="button"],.FeatureWriter [type="reset"],.FeatureWriter [type="submit"]':
    {
      WebkitAppearance: "button",
    },
  ".FeatureWriter button:focus": {
    // outline: ['1px dotted', '5px auto -webkit-focus-ring-color'],
  },
  ".FeatureWriter fieldset,.FeatureWriter ol,.FeatureWriter ul,.FeatureWriter legend":
    {
      padding: "0",
    },
  ".FeatureWriter ol,.FeatureWriter ul": {
    listStyle: "none",
  },
  "*,::before,::after": {
    border: "0 solid #e2e8f0",
  },
  ".FeatureWriter hr": {
    height: "0",
    color: "inherit",
    borderTopWidth: "1px",
  },
  ".FeatureWriter img": {
    borderStyle: "solid",
  },
  ".FeatureWriter textarea": {
    resize: "vertical",
  },
  ".FeatureWriter input::placeholder,.FeatureWriter textarea::placeholder": {
    opacity: "1",
    color: "#94a3b8",
  },
  '.FeatureWriter button,.FeatureWriter [role="button"]': {
    cursor: "pointer",
  },
  ".FeatureWriter table": {
    textIndent: "0",
    borderColor: "inherit",
    borderCollapse: "collapse",
  },
  ".FeatureWriter p,.FeatureWriter button,.FeatureWriter textarea,.FeatureWriter input,.FeatureWriter ol,.FeatureWriter ul,.FeatureWriter li,.FeatureWriter h1,.FeatureWriter h2,.FeatureWriter h3,.FeatureWriter h4,.FeatureWriter h5,.FeatureWriter h6":
    {
      fontFamily: "inherit",
      // fontSize: 'inherit',
      // fontWeight: 'inherit',
    },
  ".FeatureWriter a": {
    color: "inherit",
    textDecoration: "inherit",
  },
  "button,input,optgroup,select,textarea": {
    fontFamily: "inherit",
  },
  "button,select": {},
  ".FeatureWriter::-moz-focus-inner": {
    // borderStyle: 'none',
    // padding: '0',
  },
  ".FeatureWriter:-moz-focusring": {
    outline: "1px dotted ButtonText",
  },
  ".FeatureWriter:-moz-ui-invalid": {
    boxShadow: "none",
  },
  ".FeatureWriter progress": {
    verticalAlign: "baseline",
  },
  ".FeatureWriter::-webkit-inner-spin-button,.FeatureWriter::-webkit-outer-spin-button":
    {
      height: "auto",
    },
  '.FeatureWriter [type="search"]': {
    WebkitAppearance: "textfield",
    outlineOffset: "-2px",
  },
  ".FeatureWriter::-webkit-search-decoration": {
    WebkitAppearance: "none",
  },
  ".FeatureWriter::-webkit-file-upload-button": {
    WebkitAppearance: "button",
    font: "inherit",
  },
  ".FeatureWriter summary": {
    display: "list-item",
  },
  ".FeatureWriter abbr[title]": {
    textDecoration: "underline dotted",
  },
  ".FeatureWriter b,.FeatureWriter strong": {
    fontWeight: "bolder",
  },
  ".FeatureWriter pre,.FeatureWriter code,.FeatureWriter kbd,.FeatureWriter samp":
    {
      // fontFamily:
      //   'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
      fontSize: "1em",
    },
  ".FeatureWriter sub, .FeatureWriter sup": {
    fontSize: "75%",
    lineHeight: "0",
    position: "relative",
    verticalAlign: "baseline",
  },
  ".FeatureWriter sub": {
    bottom: "-0.25em",
  },
  ".FeatureWriter sup": {
    top: "-0.5em",
  },
  "img,svg,video,canvas,audio,iframe,embed,object": {},
  "img,video": {},
};

export const colors = {
  blue: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },
  gray: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },
  red: {
    50: "#FEF2F2",
    100: "#FEE2E2",
    200: "#FECACA",
    300: "#FCA5A5",
    400: "#F87171",
    500: "#EF4444",
    600: "#DC2626",
    700: "#B91C1C",
    800: "#991B1B",
    900: "#7F1D1D",
  },
};
