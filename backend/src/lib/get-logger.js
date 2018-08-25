import { Signale } from 'signale';

export const getLogger = (...logScope) => {
  const defaultScope = 'iFORP Backend';
  const scope = [defaultScope, ...logScope].filter(Boolean);
  return new Signale({
    scope
  });
};
export default getLogger;
