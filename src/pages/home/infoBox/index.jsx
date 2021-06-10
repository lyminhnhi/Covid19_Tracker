import React from 'react';
import { Card, CardContent, Typography } from "@material-ui/core";
import "./infobox.css";

function InfoBox({ title, cases, active, total, ...props }) {
  return (
    <Card 
    className="infoBox"
    onClick={props.onClick}
    style={{cursor: "pointer"}}>
      <CardContent className="infoBox_content">
        <Typography
          className="infoBox_title"
          color="textSecondary">
          {title}
        </Typography>
        <h2 className={`infoBox_cases ${active && "infoBox_selected"}`}>{cases}</h2>
        <Typography
          className="infoBox_total"
          color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  )
}

export default InfoBox
