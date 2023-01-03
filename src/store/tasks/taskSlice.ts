import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormDataType } from "../../types/task";
import type { RootState } from "../store";

// task: Array<{
//   name: string;
//   description: string;
// }>;

interface Task {
  name: string;
  description: string;
  id: string;
}

interface TaskState {
  // tasks: Task[];
  tasks: FormDataType[];
  //   tasks: {
  //     name: string;
  //     description: string;
  //   }[];
}

const initialState: TaskState = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<FormDataType>) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action: PayloadAction<FormDataType>) => {
      // const filteredTasks = state.tasks.filter((item) => item.id !== action.payload.id);
      // state.tasks = [...filteredTasks, action.payload];

      const foundIndex = state.tasks.findIndex((x) => x.id == action.payload.id);
      state.tasks[foundIndex] = action.payload;
      // const taskIndex = state.tasks.findIndex((item) => item.id === action.payload.id);
      // const replacedState = state.tasks.splice(taskIndex, 1, action.payload);
      // state.tasks = [...replacedState];
      /*
      console.log(action.payload);
      const taskIndex = state.tasks.findIndex((item) => item.id === action.payload.id);

      state.tasks = state.tasks.splice(taskIndex, 1, action.payload);
      console.log(current(state));
      */
    },
    removeTask: (state, action: PayloadAction<string>) => {
      // console.log(action);
      const filteredTasks = state.tasks.filter((item) => item.id !== action.payload);
      // console.log(current(state));
      // console.log(filteredTasks);
      state.tasks = filteredTasks;
    },
  },
});

export const { addTask, removeTask, editTask } = taskSlice.actions;

export const selectCount = (state: RootState) => state.tasks;
// state.tasks refer to reducer definition "tasks: taskReducer," in store.ts
export default taskSlice.reducer;
