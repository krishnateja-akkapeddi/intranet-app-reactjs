import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StarIcon from "@mui/icons-material/Star";
import { dashboardData } from "../../../domain/data";
import Typography from "@mui/material/Typography";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import DashBoardBox from "./DashboardBox";

export default function UsefulLinks() {
  const [dashboardDetails, setDashboardDetails] = React.useState(
    dashboardData[0]
  );
  function createPopupWin(
    pageURL: string,
    pageTitle: string,
    popupWinWidth: string,
    popupWinHeight: string
  ) {
    var left = window.width;
    var top = window.height;
    var myWindow = window.open(
      pageURL,
      pageTitle,
      "resizable=yes, width=" +
        popupWinWidth +
        ", height=" +
        popupWinHeight +
        ", top=" +
        top +
        ", left=" +
        left
    );
  }
  return (
    <div>
      <br />
      <Paper elevation={0}>
        <br />
        <Paper elevation={0} sx={{ paddingLeft: "10px" }}>
          <Typography fontWeight={600} fontSize={14}>
            Dashboards{" "}
          </Typography>
        </Paper>
        <List
          sx={{
            paddingLeft: "10px",
          }}
          aria-label="contacts"
        >
          {dashboardData.map((val, ind) => {
            return (
              <ListItem disablePadding>
                <ArrowCircleRightIcon
                  sx={{ fontSize: "20px" }}
                  color="primary"
                />
                <ListItemButton
                  onClick={() =>
                    createPopupWin(val.Link, val.DashBoard, "1200", "900")
                  }
                >
                  <Typography sx={{ fontSize: "12px" }}>
                    {val.DashBoard}
                  </Typography>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </div>
  );
}
