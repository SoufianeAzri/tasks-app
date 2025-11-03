export function buildTaskActivity(
  action: 'CREATE' | 'UPDATE' | 'DELETE',
  oldTask?: any,
  newTask?: any,
) {
  if (action === 'CREATE') {
    return {
      description: `La tâche "${newTask.title}" a été créée.`,
      entityTitle: newTask.title,
      type: 10,
      isOldState: false,
    };
  }

  if (action === 'DELETE') {
    return {
      description: `La tâche "${oldTask.title}" a été supprimée.`,
      entityTitle: oldTask.title,
      type: 11,
      isOldState: false,
    };
  }

  if (action === 'UPDATE' && oldTask && newTask) {
    if (oldTask.title !== newTask.title) {
      return {
        description: `Le titre de la tâche "${oldTask.title}" a été modifiée est passé de "${oldTask.title}" à "${newTask.title}`,
        type: 1,
        isOldState: true,
        entityTitle: oldTask.title,
        oldState: oldTask.title,
        newState: newTask.title,
      };
    }

    if (oldTask.periorite !== newTask.periorite) {
      return {
        description: `La periorite de la tâche "${oldTask.title}" a été modifiée est passé de "${oldTask.periorite}" à "${newTask.periorite}"`,
        type: 2,
        isOldState: true,
        entityTitle: oldTask.title,
        oldState: oldTask.periorite,
        newState: newTask.periorite,
      };
    }

    if (oldTask.stateId !== newTask.stateId) {
      const oldStateName = oldTask.state?.name ?? String(oldTask.state ?? '');
      const newStateName = newTask.state?.name ?? String(newTask.state ?? '');
      return {
        description: `L’état de la tâche "${oldTask.title}" a été modifiée est passé de "${oldStateName}" à "${newStateName}"`,
        type: 3,
        isOldState: true,
        entityTitle: oldTask.title,
        oldState: oldStateName,
        newState: newStateName,
      };
    }

    if (oldTask.description !== newTask.description) {
      return {
        description: `Le description de la tâche "${oldTask.title}" a été modifiée est passé de "${oldTask.description}" à "${newTask.description}"`,
        type: 4,
        isOldState: true,
        entityTitle: oldTask.title,
        oldState: oldTask.description,
        newState: newTask.description,
      };
    }
  }

  return null;
}
