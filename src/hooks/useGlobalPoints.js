import { useState, useEffect } from 'react';
import resetPoints from '../components/Functions/ResetPoints';

const COUNTER_KEY = 'globalPoints';

function getStoredPoints() {
  return parseInt(localStorage.getItem(COUNTER_KEY) || '0', 10);
}

function useGlobalPoints() {
  const [points, setPoints] = useState(getStoredPoints);

  useEffect(() => {
    const updatePoints = () => setPoints(getStoredPoints());
    window.addEventListener('pointsUpdated', updatePoints);
    return () => window.removeEventListener('pointsUpdated', updatePoints);
  }, []);

  return [points, resetPoints];
}

export default useGlobalPoints;
