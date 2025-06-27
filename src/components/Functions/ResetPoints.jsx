const resetPoints = () => {
  localStorage.setItem('globalPoints', 0);
  window.dispatchEvent(new Event('pointsUpdated'));
};

export default resetPoints;
