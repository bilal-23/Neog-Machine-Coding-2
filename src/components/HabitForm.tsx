import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useHabitStore, { Habit } from "../store/habitStore";

interface Props {
  closeForm: () => void;
  isEdit?: boolean;
  habit?: Habit;
}

const HabitForm: React.FC<Props> = ({ closeForm, isEdit, habit }) => {
  const { addHabit, editHabit } = useHabitStore();
  const [habitData, setHabitData] = useState(() => {
    if (isEdit && habit) {
      return habit;
    } else {
      return {
        name: "",
        goal: "",
        frequency: "",
        startDate: "",
      };
    }
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setHabitData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Validate the habit data
    const { name, goal, frequency, startDate } = habitData;
    if (!name || !goal || !frequency || !startDate) {
      console.log("Please fill in all the fields");
      return;
    }

    // Log the habit data
    if (!isEdit && !habit) {
      addHabit({ id: uuidv4(), frequency: +frequency, name, goal, startDate });
    } else {
      // Update the habit
      if (habit) {
        editHabit(habit?.id, {
          id: habit?.id,
          frequency: +frequency,
          name,
          goal,
          startDate,
        });
      }
    }
    closeForm();
    // Reset the form
    setHabitData({
      name: "",
      goal: "",
      frequency: "",
      startDate: "",
    });
  };

  return (
    <>
      <div className="overlay" onClick={closeForm}></div>
      <form onSubmit={handleSubmit} className="habit-form">
        {!isEdit ? <h2>Create New Habit</h2> : <h2>Edit Habit</h2>}
        <div>
          <label htmlFor="name">Name of the Habit:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={habitData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="goal">Goal of the Habit:</label>
          <input
            type="text"
            id="goal"
            name="goal"
            value={habitData.goal}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="frequency">How many times per week:</label>
          <input
            type="number"
            id="frequency"
            name="frequency"
            value={habitData.frequency}
            onChange={handleChange}
            min={1}
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={habitData.startDate}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        {!isEdit ? (
          <div>
            <button type="submit">Create Habit</button>
            <button type="button" onClick={closeForm}>
              Close Form
            </button>
          </div>
        ) : (
          <div>
            <button type="submit">Update</button>
            <button type="button" onClick={closeForm}>
              Close Form
            </button>
          </div>
        )}
      </form>
    </>
  );
};

export default HabitForm;
