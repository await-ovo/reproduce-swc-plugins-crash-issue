import { transformSync } from "@swc/core";

const code = `import { A } from 'lodash';console.log(A);`;

const result = transformSync(code, {
  filename: "example.js",
  swcrc: false,
  configFile: false,
  jsc: {
    parser: {
      syntax: "ecmascript",
      jsx: false,
    },
    experimental: {
      plugins: [
        [
          "@swc/plugin-transform-imports",
          {
            lodash: {
              transform: "lodash/{{member}}",
            },
          },
        ],
        [
          "@swc/plugin-noop",
          {}
        ]
      ],
    },
  },
});

console.log(`transform output:`, result.code)
