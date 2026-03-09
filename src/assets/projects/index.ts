/**
 * @fileoverview Projects barrel export
 * Centralizes all project definitions and maintains array interface for backward compatibility
 */

import { Retex } from '../dataTypes';
import { veridisquo } from './veridisquo';
import { gpgtool } from './gpgtool';
import { eewAnalyzer } from './eew-analyzer';
import { mstar } from './mstar';
import { ecograph } from './ecograph';
import { dummyArrays } from './dummy-arrays';
import { votator } from './votator';
import { studyOfEew } from './study-of-eew';
import { scalewayDeployment } from './scaleway-deployement';

/**
 * All projects - maintains array interface for backward compatibility
 * Projects are ordered by date (most recent first)
 */
export const projects: Retex[] = [
  veridisquo,
  scalewayDeployment,
  gpgtool,
  eewAnalyzer,
  mstar,
  ecograph,
  dummyArrays,
  votator,
  studyOfEew,
];

// Individual exports for direct access
export {
  veridisquo,
  gpgtool,
  eewAnalyzer,
  mstar,
  ecograph,
  dummyArrays,
  votator,
  studyOfEew,
  scalewayDeployment
};