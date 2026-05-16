import { PlayCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import type { TaskModel } from '../../models/TaskModel';
import { useRef } from 'react';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../Utils/getNextCycle';
import { getNextCycleType } from '../../Utils/getNextCycleType';
import { formatSecondsToMinutes } from '../../Utils/formatSecondsToMinutes';

export function MainForm() {
  const { state, setState } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

  //cliclos

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleCreateNewTask(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (taskNameInput.current === null) {
      return;
    }

    const task = taskNameInput.current.value.trim();

    if (!task) {
      alert('Digite o nome da tarefa');
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: task,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    const secondsRemaining = newTask.duration * 60;

    setState(prev => {
      return {
        ...prev,
        config: { ...prev.config },
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining,
        formatedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
        tasks: [...prev.tasks, newTask],
      };
    });
  }

  return (
    <form onSubmit={handleCreateNewTask} className='form' action=''>
      <div className='formRow'>
        <DefaultInput
          id='task'
          labelText='Tarefa'
          type='text'
          placeholder='Digite alguma coisa'
          ref={taskNameInput}
        />
      </div>
      <div className='formRow'>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className='formRow'>
        <Cycles />
      </div>
      <div className='formRow'>
        <DefaultButton color='green' icon={<PlayCircleIcon />} />
      </div>
    </form>
  );
}
