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
