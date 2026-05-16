import type { TaskModel } from './TaskModel';

export type TaskStateModel = {
  tasks: TaskModel[];
  secondsRemaining: number;
  formatedSecondsRemaining: string;
  activeTask: TaskModel | null;
  currentCycle: number; // 1 a 8
  config: {
    workTime: number;
    shortBreakTime: number;
    longBreakTime: number;
  };
};
