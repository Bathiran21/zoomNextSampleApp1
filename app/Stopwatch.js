'use client'

import React, { useState, useEffect, useRef } from 'react';

const formatTime = (seconds) => {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
};

export default function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState('Start Recording');
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
      setStatus('Recording Started');
    } else {
      clearInterval(intervalRef.current);
      if (seconds !== 0) setStatus('Recording Paused');
    }
  
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);
  

  const handleReset = () => {
    setSeconds(0);
    setIsRunning(false);
    setStatus('Recording Ended');
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4 text-center">
      <h1 className="text-3xl font-bold">{formatTime(seconds)}</h1>
      <div className="space-x-2">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => setIsRunning(true)}
        >
          Start
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded"
          onClick={() => setIsRunning(false)}
        >
          Pause
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={handleReset}
        >
          End
        </button>
      </div>
      <p className="text-gray-600">{status}</p>
    </div>
  );
}
