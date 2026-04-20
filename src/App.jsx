import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './index.css';

function Home() {
  return <h1 className="text-3xl font-bold">Daily Fitness Checker</h1>;
}

function FitnessCheck() {
  const [workouts, setWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    axios.get(`${BASE_URL}/workouts`)
      .then(response => {
        setWorkouts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`${BASE_URL}/workouts`, {
      date: date,
      workout: newWorkout
    })
      .then(response => {
        setWorkouts([...workouts, response.data]);
        setNewWorkout('');
        setDate('');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold">Log a workout</h2>
      <form onSubmit={handleSubmit}>
        <label className="block text-lg font-medium">Date:</label>
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          className="block w-full p-2 mb-4 border border-gray-400 rounded"
        />
        <label className="block text-lg font-medium">Workout:</label>
        <input
          type="text"
          value={newWorkout}
          onChange={(event) => setNewWorkout(event.target.value)}
          className="block w-full p-2 mb-4 border border-gray-400 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Log workout
        </button>
      </form>
      <h2 className="text-2xl font-bold mt-4">Workout log</h2>
      <ul>
        {workouts.map((workout) => (
          <li key={workout.id} className="py-2 border-b border-gray-400">
            {workout.date} - {workout.workout}
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fitness-check" element={<FitnessCheck />} />
      </Routes>
    </HashRouter>
  );
}

export default App;