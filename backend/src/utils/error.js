export const violatesUniqueConstraint = error => {
  return (
    error.name === 'QueryFailedError' && error.message.indexOf('UNIQUE') !== -1
  );
};
