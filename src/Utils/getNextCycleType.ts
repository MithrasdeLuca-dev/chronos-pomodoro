// FizzBuzz -> fizz, bizz, fizzbizz
// Ciclo 1, 2, 3, 4, 5, 6, 7, 8
// Ciclo 1 -> trabalho
// Ciclo 2 -> descanso curto
// Ciclo 3 -> trabalho
// Ciclo 4 -> descanso curto
// Ciclo 5 -> trabalho
// Ciclo 6 -> descanso curto
// Ciclo 7 -> trabalho
// Ciclo 8 -> descanso longo

import type { TaskModel } from '../models/TaskModel';

export function getNextCycleType(currentCycle: number): TaskModel['type'] {
  if (currentCycle % 8 === 0) {
    return 'longBreakTime';
  }

  if (currentCycle % 2 === 0) {
    return 'shortBreakTime';
  }

  return 'workTime';
}
