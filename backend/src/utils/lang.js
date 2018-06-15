export const deepMerge = (target = {}, ...others) => {
  return others.filter(Boolean).reduce((acc, other) => {
    Object.keys(other).forEach(property => {
      if (typeof other[property] === 'object')
        Object.assign(
          other[property],
          deepMerge(target[property], other[property])
        );
    });
    Object.assign(target, other);
    return target;
  }, target);
};
