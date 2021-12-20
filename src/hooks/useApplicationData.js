import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  const setDay = (day) => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("api/days"),
      axios.get("api/appointments"),
      axios.get("api/interviewers"),
    ]).then((all) => {
      const [days, appointments, interviewers] = all;

      setState((prev) => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      }));
    });
  }, []);

  const spotUpdate = function (value) {
    const daysCopy = [];
    for (let currentDay of state.days) {
      if (currentDay.name === state.day) {
        daysCopy.push({ ...currentDay, spots: currentDay.spots + value });
      } else {
        daysCopy.push(currentDay);
      }
    }
    return daysCopy;
  };

  async function bookInterview(id, interview, editing, setEditing) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    if (editing) {
      return await axios
        .put(`http://localhost:8001/api/appointments/${id}`, appointment)
        .then((response) => {
          setState({ ...state, appointments, days: spotUpdate(0) });

          setEditing(false);
        })
        .catch((error) => {
          throw error;
        });
    } else {
      return await axios
        .put(`http://localhost:8001/api/appointments/${id}`, appointment)
        .then((response) => {
          setState({ ...state, appointments, days: spotUpdate(-1) });
        })
        .catch((error) => {
          throw error;
        });
    }
  }

  async function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    await axios.delete(`/api/appointments/${id}`, { interview }).then(() => {
      setState({
        ...state,
        appointments,
        days: spotUpdate(1),
      });
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
