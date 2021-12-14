export function getAppointmentsForDay(state, day) {
  const daysarr = state.days;
  const appsarray = [];

  for (const currentDay of daysarr) {
    if (currentDay.name === day) {
      currentDay.appointments.forEach((appointmentId) => {
        appsarray.push(state.appointments[appointmentId]);
      });
    }
  }

  return appsarray;
}

export function getInterviewersForDay(state, day) {
  const daysarr = state.days;
  const interviewersForAppointments = [];

  for (const currentDay of daysarr) {
    if (currentDay.name === day) {
      currentDay.interviewers.forEach((interviewerId) => {
        interviewersForAppointments.push(state.interviewers[interviewerId]);
      });
    }
  }

  return interviewersForAppointments;
}

export function getInterview(state, interview) {
  if (interview !== null) {
    return {
      student: interview.student,
      // interviewer: {
      //   id: state.interviewers[`${interview.interviewer}`].id,
      //   name: state.interviewers[`${interview.interviewer}`].name,
      //   avatar: state.interviewers[`${interview.interviewer}`].avatar,
      // },
      interviewer: state.interviewers[`${interview.interviewer}`],
    };
  }

  return null;
}
