import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
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

  function handleInterruptTask() {
    setState(prev => {
      return {
        ...prev,
        secondsRemaining: 0,
        formatedSecondsRemaining: '00:00',
        activeTask: null,
        tasks: prev.tasks.map(task => {
          if (prev.activeTask && prev.activeTask.id === task.id) {
            return {
              ...task,
              interruptDate: Date.now(),
            };
          }

          return task;
        }),
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
          disabled={!!state.activeTask}
        />
      </div>
      <div className='formRow'>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>

      {state.currentCycle > 0 && (
        <div className='formRow'>
          <Cycles />
        </div>
      )}

      {/*
          Usamos um ternario com keys para alternar entre os botoes de iniciar e interromper.
          Como os botoes tem tipo e comportamento diferentes, a key ajuda o React a tratar
          cada versao como um elemento distinto, evitando reaproveitamento indevido.
          Outra opcao e usar blocos com &&; as duas abordagens funcionam.

          {!state.activeTask && (
            <DefaultButton type='submit' key='buttonStartTask' />
          )}

          {state.activeTask && (
            <DefaultButton type='button' key='buttonInterruptTask' />
          )}
    */}

      <div className='formRow'>
        {!state.activeTask ? (
          <DefaultButton
            aria-label='Iniciar uma nova tarefa'
            title='Iniciar uma nova tarefa'
            type='submit'
            color='green'
            icon={<PlayCircleIcon />}
            key='buttonStartTask'
          />
        ) : (
          <DefaultButton
            aria-label='Interromper tarefa em andamento'
            title='Interromper tarefa em andamento'
            type='button'
            color='red'
            icon={<StopCircleIcon />}
            onClick={handleInterruptTask}
            key='buttonInterruptTask'
          />
        )}
      </div>
    </form>
  );
}
