import { Signale } from 'signale';

export default (...logScope) => {
  const defaultScope = 'iFORP Backend';
  const scope = [defaultScope, ...logScope].filter(Boolean);
  return new Signale({
    scope
  });
};
