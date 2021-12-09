import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const dayClass = classNames("li", {
    "day-list__item ": true,
    "day-list__item--selected": props.selected ? true : false,
    "day-list__item--full": props.spots ? false : true,
  });

  const formatSpots = () => {
    if (props.spots === 0) {
      return "no spots remaining";
    } else if (props.spots === 1) {
      return "1 spot remaining";
    }

    return `${props.spots} spots remaining`;
  };

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}