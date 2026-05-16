import type { TaskStateModel } from './TaskStateModel';

export type TaskModel = {
  id: string;
  name: string;
  duration: number;
  startDate: number;
  completeDate: number | null; // quado o timer chegar ao final
  interruptDate: number | null; // quando o timer for interrompido
  type: keyof TaskStateModel['config']; // workTime, shortBreakTime ou longBreakTime
};
