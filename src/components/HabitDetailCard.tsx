import { useEffect, useState } from "react";
import useHabitStore, { Habit } from "../store/habitStore";
import HabitForm from "./HabitForm";

interface Props {
  habit: Habit;
  close: () => void;
}

const HabitDetailCard: React.FC<Props> = ({ habit, close }) => {
  const [data, setData] = useState(habit);
  const [openEditForm, setOpenEditForm] = useState(false);
  const { deleteHabit, getHabit } = useHabitStore();

  useEffect(() => {
    if (habit) {
      const habitFromStore = getHabit(habit.id);
      if (habitFromStore) setData(habitFromStore);
    }
  }, []);

  const handeleDeleteHabit = () => {
    if (habit) deleteHabit(habit.id);
    close();
  };

  return (
    <>
      <div className="overlay" onClick={close}></div>
      {!openEditForm && (
        <div className="modal">
          <div className="modal-content">
            <h2>{data.name}</h2>
            <p>Goal: {data.goal}</p>
            <p>Frequency: {data.frequency}</p>
            <p>Start Date: {data.startDate}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button onClick={() => setOpenEditForm(true)}>Edit</button>
            <button onClick={handeleDeleteHabit}>Delete</button>
          </div>
        </div>
      )}
      {openEditForm && (
        <HabitForm
          closeForm={() => {
            setOpenEditForm(false);
            const habitFromStore = getHabit(habit.id);
            if (habitFromStore) setData(habitFromStore);
          }}
          habit={data}
          isEdit={true}
        />
      )}
    </>
  );
};

export default HabitDetailCard;
