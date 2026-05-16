import { createContext } from 'react';
import type { TaskStateModel } from '../../models/TaskStateModel';
import { initialTaskState } from './initialTaskState';

const inialContextValue: TaskContextProps = {
  state: initialTaskState,
  setState: () => {},
};

type TaskContextProps = {
  state: TaskStateModel;
  setState: React.Dispatch<React.SetStateAction<TaskStateModel>>;
};

export const TaskContext = createContext<TaskContextProps>(inialContextValue);
