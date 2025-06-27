const addPoints = (point = 1) => {
  const currentPoints = parseInt(
    localStorage.getItem('globalPoints') || '0',
    10
  );
  localStorage.setItem('globalPoints', currentPoints + point);
  window.dispatchEvent(new Event('pointsUpdated'));
};

export default addPoints;
