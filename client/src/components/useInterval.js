import { useState, useEffect, useRef } from 'react';

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setTimeout(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;

// Code from Dan Abramov (modified for setTimeout rather than setInterval)
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
