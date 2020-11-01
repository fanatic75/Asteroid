import { Typography } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import React from "react";

export default function DashboardBanner(props:{startDate:Date|null,endDate:Date|null,handleStartDate:(date: Date | null)=>void, handleEndDate:(date: Date | null)=>void}){
    return <div className={"banner"}>
    <Typography className={"bannerItem"} variant="h5">
      Explore Closest Asteroid by Date
    </Typography>

    <KeyboardDatePicker
      disableToolbar
      variant="inline"
      format="yyyy/MM/dd"
      margin="normal"
      label="Start Date"
      value={props.startDate}
      onChange={props.handleStartDate}
    />
    <KeyboardDatePicker
      disableToolbar
      variant="inline"
      minDate={props.startDate}
      format="yyyy/MM/dd"
      margin="normal"
      label="End Date"
      value={props.endDate}
      onChange={props.handleEndDate}
    />
  </div>
}