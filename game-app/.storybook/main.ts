import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  staticDirs: ["../public", "../src/fonts"],
  previewHead: (head) => `

  <style>
    @font-face {
      font-family: 'NewAirport'; 
      src: url('/NewAirport/NewAirport-Dot1.otf') format('opentype');
      font-weight: 300;
      font-style: normal;
    }

    @font-face {
      font-family: 'NewAirport';
      src: url('/NewAirport/NewAirport-Dot2.otf') format('opentype');
      font-weight: 400;
      font-style: normal;
    }
  
    @font-face {
      font-family: 'NewAirport';
      src: url('/NewAirport/NewAirport-Dot3.otf') format('opentype');
      font-weight: 500;
      font-style: normal;
    }

    @font-face {
      font-family: 'NewAirport';
      src: url('/NewAirport/NewAirport-Dot4.otf') format('opentype');
      font-weight: 600;
      font-style: normal;
    }

    @font-face {
      font-family: 'NewAirport';
      src: url('/NewAirport/NewAirport-Dot5.otf') format('opentype');
      font-weight: 700;
      font-style: normal;
    }

    @font-face {
      font-family: 'Agrandir';
      src: url('/Agrandir/AgrandirVariable.ttf');
    }

    :root {
      --font-new-airport: 'NewAirport', sans-serif;
      --font-agrandir: 'Agrandir', sans-serif;
    }
    
    ${head}

  </style>

  `,
};
export default config;
