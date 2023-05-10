const Round = () => {
  const round = (num) => (isNaN(num) ? 0 : Math.round(num));

  return { round };
};

export default Round;
