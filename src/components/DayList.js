import React from "react";

import "components/DayListItem.js";
import classNames from "classnames";
import DayListItem from "components/DayListItem.js";

export default function DayList(props) {
  const listItems = props.days.map((x, i) => (
    <DayListItem
      key={props.days[i].id}
      name={props.days[i].name}
      spots={props.days[i].spots}
      selected={props.days[i].name === props.value}
      setDay={props.onChange}
    />
  ));
  return <ul>{listItems}</ul>;
}
