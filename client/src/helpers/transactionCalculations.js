const currentTime = () => {
  return (
    new Date().toLocaleString('en-US', { month: 'long' }) +
    ' ' +
    new Date().toLocaleString('en-US', { day: '2-digit' }) +
    ', ' +
    new Date().getFullYear() +
    ' ' +
    new Date().toLocaleTimeString()
  );
};

const calculatePrice = (regMP, quantity) => {
  return (regMP * quantity).toFixed(2);
};

export { currentTime, calculatePrice };
