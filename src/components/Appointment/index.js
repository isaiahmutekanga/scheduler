import React from "react";
import "components/Appointment/style.scss";
import Header from "./Header.js";
import Show from "./Show.js";
import Empty from "./Empty.js";
export default function Appointment(props) {
  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview ? (
        <Show
          key={props.id}
          interviewer={props.interview.interviewer}
          student={props.interview.student}
        />
      ) : (
        <Empty />
      )}
    </article>
  );
}
