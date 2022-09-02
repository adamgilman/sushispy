import { getJestProjects } from '@nrwl/jest';

export default {
  projects: getJestProjects(),
  coveragePathIgnorePatterns: [
    'node_modules',
    'packages/protos/src/exchange_connection',
  ],
};
