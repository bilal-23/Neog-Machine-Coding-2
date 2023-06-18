import { useState } from "react";
import "./App.css";
import HabitForm from "./components/HabitForm";
import useHabitStore, { Habit } from "./store/habitStore";
import HabitDetailCard from "./components/HabitDetailCard";

function App() {
  const { habits } = useHabitStore();
  const [activeHabit, setActiveHabit] = useState<Habit | null>(null); // [habit, setHabit
  const [openForm, setOpenForm] = useState(false);

  return (
    <div className="app">
      <h1>Habit Tracking App</h1>
      <div className="new-habit">
        <button className="new-habit-btn" onClick={() => setOpenForm(true)}>
          Create new habit
        </button>
      </div>
      {openForm && <HabitForm closeForm={() => setOpenForm(false)} />}
      <div className="habits-container">
        {habits.length === 0 && (
          <h2 style={{ textAlign: "center", width: "100%" }}>
            No Habits Added
          </h2>
        )}
        {habits.map((habit) => (
          <div className="habit" key={habit.id}>
            <h3>{habit.name}</h3>
            <button onClick={() => setActiveHabit(habit)}>View Details</button>
          </div>
        ))}
      </div>
      {activeHabit && (
        <HabitDetailCard
          close={() => setActiveHabit(null)}
          habit={activeHabit}
        />
      )}
    </div>
  );
}

export default App;
