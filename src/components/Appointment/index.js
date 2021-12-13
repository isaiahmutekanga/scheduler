import React from "react";
import "components/Appointment/style.scss";
import { getInterviewersForDay } from "helpers/selectors.js";
import Header from "./Header.js";
import Show from "./Show.js";
import Empty from "./Empty.js";
import useVisualMode from "hooks/useVisualMode.js";
import Form from "./Form.js";
import Status from "./Status.js";
import Confirm from "./Confirm.js";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => transition(SHOW));
  }

  function deleteInterview() {
    const interview = {
      student: "",
      interviewer: null,
    };

    transition(DELETING);
    props.cancelInterview(props.id, interview).then(() => transition(EMPTY));
  }
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === SHOW && (
        <Show
          key={props.id}
          interviewer={props.interview.interviewer}
          student={props.interview.student}
          //onDelete={deleteInterview}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CONFIRM && <Confirm onConfirm={deleteInterview} />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back(EMPTY)}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="saving please wait" />}
      {mode === DELETING && <Status message="DELETING please wait" />}
    </article>
  );
}
