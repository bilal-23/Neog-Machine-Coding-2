import { create } from 'zustand';

export type Habit = {
    id: string;
    name: string;
    goal: string;
    frequency: number;
    startDate: string;
};

const initialHabits: Habit[] = [
    {
        id: '1',
        name: 'Meditation',
        goal: 'Meditate for 10 minutes',
        frequency: 7,
        startDate: '2024-01-01'
    },
    {
        id: '2',
        name: 'Exercise',
        goal: 'Exercise for 30 minutes',
        frequency: 5,
        startDate: '2024-01-01'
    }
];

type HabitStore = {
    habits: Habit[];
    getHabit: (id: string) => Habit | undefined;
    addHabit: (habit: Habit) => void;
    deleteHabit: (id: string) => void;
    editHabit: (id: string, updatedHabit: Habit) => void;
};

const useHabitStore = create<HabitStore>((set, get) => ({
    habits: initialHabits,
    getHabit: (id) => {
        const habit = get().habits.find((habit) => habit.id === id);
        return habit;
    },
    addHabit: (habit) => {
        set((state) => ({
            habits: [{ ...habit }, ...state.habits]
        }));
    },
    deleteHabit: (id) => {
        set((state) => ({
            habits: state.habits.filter((habit) => habit.id !== id)
        }));
    },
    editHabit: (id, updatedHabit) => {
        set((state) => ({
            habits: state.habits.map((habit) => (habit.id === id ? updatedHabit : habit))
        }));
    }
}));

export default useHabitStore;