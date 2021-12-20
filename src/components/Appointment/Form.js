import React from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import { useState } from "react";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = function () {
    setStudent("");
    setInterviewer(null);
  };
  const cancel = function () {
    reset();
    props.onCancel();
  };

  function validate() {
    if (student === "") {
      setError("student name cannot be blank");
      return;
    }
    if (!interviewer) {
      setError("Please choose an Interviwer");
      return;
    }
    setError("");
    props.onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="student-name-input"
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => setStudent(event.target.value)}
            value={student}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          value={interviewer}
          interviewers={props.interviewers}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          {/* <Button confirm onClick={() => props.onSave(student, interviewer)}> */}
          <Button confirm onClick={() => validate(student, interviewer)}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
