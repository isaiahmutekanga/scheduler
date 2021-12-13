import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const dayClass = classNames("li", {
    "interviewers__item--selected ": props.selected ? true : false,
    interviewers__item: true,
  });

  return (
    <li className={dayClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />

      {props.selected && props.name}
    </li>
  );
}
