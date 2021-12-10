export function getAppointmentsForDay(state, day) {
  let daysarr = state.days;
  let appsarray = [];
  let wrong = "";

  for (let i = 0; i < daysarr.length; i++) {
    if (daysarr[i].name === day) {
      daysarr[i].appointments.forEach((element) => {
        appsarray.push(state.appointments[element]);
      });
    }
  }

  return appsarray;
}

export function getInterview(state, interview) {
  let interviewerObject = {};
  let apps = state.appointments;

  if (interview !== null) {
    return {
      student: interview.student,
      interviewer: {
        id: state.interviewers[`${interview.interviewer}`].id,
        name: state.interviewers[`${interview.interviewer}`].name,
        avatar: state.interviewers[`${interview.interviewer}`].avatar,
      },
    };
  }

  return null;
}
