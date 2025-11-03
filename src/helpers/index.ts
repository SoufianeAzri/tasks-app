export const taskSelect = () => {
  return {
    id: true,
    title: true,
    description: true,
    addedDate: true,
    lastModified: true,
    beginDate: true,
    finishDate: true,
    stateId: true,
    managerId: true,
    periorite: true,
    state: {
      select: {
        id: true,
        name: true,
        color: true,
      },
    },
    manager: {
      select: memberSelect(),
    },
    teamMembers: {
      select: memberSelect(),
    },
    subtasks: {
      select: {
        id: true,
        title: true,
        status: true,
        lastModified: true,
        teamMembers: {
          select: memberSelect(),
        },
        manager: {
          select: memberSelect(),
        },
      },
    },
  };
};

export const memberSelect = () => {
  return {
    id: true,
    name: true,
    email: true,
    // phoneNumber: true,
    // role: true,
  };
};
