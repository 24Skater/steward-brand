/**
 * @steward/eslint-config/node
 * ESLint configuration for Node.js projects
 */

import baseConfig from "./index.js";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...baseConfig,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      // Node-specific rules
      "no-process-exit": "error",
      "no-console": "off", // Allow console in Node
    },
  },
];

