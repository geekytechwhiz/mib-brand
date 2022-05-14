/* eslint-disable import/prefer-default-export */
export const Template = {
  Mobile: [
    {
      label: "Rear Camera Lens",
      component: "text",
      type: "text",
      name: "Camera",
      validation: {
        required: true,
      },
    },
    {
      label: "Screen Size ",
      component: "number",
      type: "text",
      name: "ScreenSize",
      validation: {
        required: true,
        type: "decimal",
      },
    },
    {
      label: "Screen Type",
      component: "list",
      type: "list",
      name: "ScreenType",
      validation: {
        required: true,
        type: "decimal",
      },
      data: [
        {
          value: "1",
          name: "AMOLED",
        },
        {
          value: "1",
          name: "TFT",
        },
      ],
    },
    {
      label: "Battery Power (In mAH) ",
      component: "text",
      type: "text",
      name: "BatteryCapacity",
      validation: {
        required: true,
        type: "decimal",
      },
    },
    {
      label: "Battery type",
      component: "list",
      type: "list",
      name: "BatteryType",
      validation: {
        required: false,
        type: "decimal",
      },
      data: [
        {
          value: "1",
          name: "LithiumIon",
        },
      ],
    },
    {
      label: "Inbuilt Storage (in GB) ",
      component: "text",
      type: "text",
      name: "InbuiltStorage",
      validation: {
        required: true,
        type: "decimal",
      },
    },
    {
      label: "Expandable Storage(in GB) ",
      component: "text",
      type: "text",
      name: "ExpandableStorage",
      validation: {
        required: true,
        type: "decimal",
      },
    },
    {
      label: "Processor Brand ",
      component: "text",
      type: "text",
      name: "Processor",
      validation: {
        required: true,
        type: "text",
      },
    },
    {
      label: "Operating System ",
      component: "text",
      type: "text",
      name: "OperatingSystem",
      validation: {
        required: true,
        type: "text",
      },
    },

    {
      label: "RAM",
      component: "text",
      type: "text",
      name: "RAM",
      validation: {
        required: true,
        type: "decimal",
      },
    },
    {
      label: "Processor Speed",
      component: "number",
      type: "number",
      name: "ProcessorSpeed",
      validation: {
        required: true,
        type: "decimal",
      },
    },
    {
      label: "Item Weight",
      component: "text",
      type: "text",
      name: "ProcessorSpeed",
      validation: {
        required: true,
        type: "decimal",
      },
    },
    {
      label: "Item Dimensions",
      component: "text",
      type: "text",
      name: "ItemDimensions",
      validation: {
        required: true,
        type: "decimal",
      },
    },
    {
      label: "Color",
      component: "list",
      type: "list",
      name: "Color",
      validation: {
        required: true,
        type: "text",
      },
      data: [
        {
          value: "1",
          name: "black",
        },
        {
          value: "2",
          name: "blue",
        },
      ],
    },
  ],
  Tablets: [
    {
      label: "Battery Power (In mAH) ",
      component: "number",
      type: "number",
      name: "BatteryCapacity",
      validation: {
        required: true,
        type: "decimal",
      },
    },
    {
      label: "Battery type",
      component: "list",
      type: "list",
      name: "BatteryType",
      validation: {
        required: false,
        type: "decimal",
      },
      data: [
        {
          value: "1",
          name: "Lithium Ion",
        },
      ],
    },
    {
      label: "Inbuilt Storage (in GB) ",
      component: "number",
      type: "number",
      name: "Inbuilt Storage Capacity",
      validation: {
        required: true,
        type: "decimal",
      },
    },
    {
      label: "Expandable Storage(in GB) ",
      component: "number",
      type: "number",
      name: "Expandable Storage Capacity",
      validation: {
        required: true,
        type: "decimal",
      },
    },
    {
      label: "Processor Brand ",
      component: "text",
      type: "text",
      name: "Processor",
      validation: {
        required: true,
        type: "text",
      },
    },
    {
      label: "Operating System ",
      component: "text",
      type: "text",
      name: "Operating System",
      validation: {
        required: true,
        type: "text",
      },
    },

    {
      label: "RAM",
      component: "number",
      type: "number",
      name: "RAM",
      validation: {
        required: true,
        type: "decimal",
      },
    },
    {
      label: "Processor Speed",
      component: "number",
      type: "number",
      name: "Processor Speed",
      validation: {
        required: true,
        type: "decimal",
      },
    },
    {
      label: "Item Weight",
      component: "number",
      type: "number",
      name: "Processor Speed",
      validation: {
        required: true,
        type: "decimal",
      },
    },
    {
      label: "Item Dimensions",
      component: "number",
      type: "number",
      name: "Item Dimensions",
      validation: {
        required: true,
        type: "decimal",
      },
    },
    {
      label: "Colour",
      component: "list",
      type: "list",
      name: "Colour",
      validation: {
        required: true,
        type: "text",
      },
      data: [
        {
          value: "1",
          name: "black",
        },
        {
          value: "2",
          name: "blue",
        },
      ],
    },
  ],
  Watches: [
    {
      label: "Type",
      component: "text",
      type: "text",
      name: "Type",
      validation: {
        required: true,
      },
    },
    {
      label: "Material ",
      component: "text",
      type: "text",
      name: "Material",
      validation: {
        required: true,
        type: "decimal",
      },
    },
  ],
};
