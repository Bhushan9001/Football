// componentParams.js
export const filterParams = {
  filter1: {
    name: "KO",
    inputs: [
      {
        inputType: "select",
        selectOptions: [
          { name: "Option 1", value: "option1" },
          { name: "Option 2", value: "option2" },
          { name: "Option 3", value: "option3" },
        ],
      },
      { inputType: "text" },
    ],
  },
  filter2: {
    name: "Filter 2",
    inputs: [
      { inputType: "checkbox", label: "Checkbox 1" },
      {
        inputType: "radio",
        radioOptions: ["Option A", "Option B", "Option C"],
      },
    ],
  },
  // Add more filters as needed
};
