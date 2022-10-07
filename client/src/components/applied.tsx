import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { ThemeProvider } from "@mui/material/styles";
import { createMuiTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { Menu } from "@mui/material";
import moment from "moment";

enum status {
  Applied = 0,
  Interview,
  Offer,
  Rejected,
}

function createData(
  _id: string,
  company_name: string,
  title: string,
  date_applied: string,
  status: number,
  user_id: string,
  application_id: number
) {
  return {
    _id,
    company_name,
    title,
    date_applied,
    status,
    user_id,
    application_id,
  };
}

const initialApplications = [
  createData(
    "h111",
    "Cupcake",
    "Software Engineer",
    "2021-08-01",
    status.Rejected,
    "brh",
    0
  ),
  // createData(1, "Donut", "Software Engineer", "2021-08-01", status.Interview),
  // createData(2, "Eclair", "Software Engineer", "2021-08-01", status.Interview),
  // createData(
  //   3,
  //   "Frozen yoghurt",
  //   "Software Engineer",
  //   "2021-08-01",
  //   status.Offer
  // ),
  // createData(
  //   4,
  //   "Gingerbread",
  //   "Software Engineer",
  //   "2021-08-01",
  //   status.Rejected
  // ),
];

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Montserrat"].join(","),
  },
});

const MyTableCell = styled(TableCell)({
  borderBottom: "none",
});

const textFieldProps = { style: { fontSize: 14 } };

const selectProps = {
  style: {
    ariaLabel: "Without label",
    fontSize: 14,
    // width: 100,
    marginRight: 10,
  },
};

// localStorage.setItem("user_id", "6336395ebee55c95f269e98d");

// if (localStorage.getItem("user_id") === null) {
//   alert("Please login first");
//   window.location.href = "/login";
// }

export default function Applied() {
  const [applications, setApplications] = useState<any[]>([]);
  const falseArray = new Array(applications.length).fill(false);
  const [openArray, setOpenArray] = useState(falseArray);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [filter, setFilter] = React.useState("All");
  var backupApplications = applications;

  const handleFilterClick = (e: any) => {
    setAnchorEl(e.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleFilterSelect = (e: React.MouseEvent) => {
    setFilter(e.currentTarget.id);
    handleFilterClose();
  };

  async function deleteApplicationAPI(application: any) {
    console.log(application._id);
    console.log(localStorage.getItem("user_id"));
    const response = await fetch(
      `http://localhost:5000/application/delete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          application_id: application._id,
          user_id: localStorage.getItem("user_id"),
        }),
      }
    );
    if (response.status != 200) {
      console.log(response);
      alert("Error deleting application");
    }
  }

  function deleteApplication(application_id: number) {
    console.log(application_id + " was deleted");
    deleteApplicationAPI(applications[application_id]);
    setApplications(
      applications.filter(
        (application) => application.application_id !== application_id
      )
    );
  }

  async function updateApplication(application: any) {
    const response = await fetch(`http://localhost:5000/application/update`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: localStorage.getItem("user_id"),
        application_id: application._id,
        status: application.status,
      }),
    });
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      //window.alert(message);
      console.log(message);
      return;
    }
    const status_response = await response.status;
    if (status_response === 200) {
      console.log("Application updated");
    } else {
      console.log("Application not updated");
      console.log(await response.json());
    }

  }

  const handleStatusChange = (event: SelectChangeEvent) => {
    event.preventDefault();
    for (let i = 0; i < applications.length; i++) {
      if (applications[i]._id == event.target.name) {
        applications[i].status = event.target.value;
        updateApplication(applications[i]);
        break;
      }
    }
    setApplications([]);
    // do actual db update
  };

  // useEffect to get applications from db
  useEffect(() => {
    async function getApplications() {
      const response = await fetch(`http://localhost:5000/applications/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: localStorage.getItem("user_id"),
          status: filter,
        }),
      });

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        //window.alert(message);
        console.log(message);
        return;
      }

      const applications = await response.json();
      for (let i = 0; i < applications.length; i++) {
        applications[i].date_applied_formatted = moment(
          applications[i].date_applied
        ).format("DD-MM-YYYY");
      }
      setApplications(applications);
    }

    getApplications();
    const falseArray = new Array(applications.length).fill(false);
    setOpenArray(falseArray);
    backupApplications = applications;
    return;
  }, [applications.length, filter]);

  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <MyTableCell>
                <Typography variant="h6">Company Name</Typography>
              </MyTableCell>
              <MyTableCell align="center">
                <Typography variant="h6">Title</Typography>
              </MyTableCell>
              <MyTableCell align="center">
                <Typography variant="h6">Date Applied</Typography>
              </MyTableCell>
              <MyTableCell align="center">
                <Typography variant="h6">Status</Typography>
              </MyTableCell>
              <MyTableCell>
                <IconButton
                  aria-label="filter"
                  onClick={handleFilterClick}
                  title="Open to show more"
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                >
                  <FilterAltOutlinedIcon />{" "}
                </IconButton>
                <Menu
                  id="filter_menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleFilterClose}
                >
                  <MenuItem
                    value="All"
                    key="All"
                    onClick={handleFilterSelect}
                    id="All"
                  >
                    <Typography noWrap fontSize={14}>
                      All
                    </Typography>
                  </MenuItem>
                  {Object.keys(status)
                    .filter((x) => isNaN(parseInt(x))) // filter out the keys that are numbers because of TS -> JS enum conversion
                    .map((key) => (
                      <MenuItem
                        value={key}
                        key={key}
                        onClick={handleFilterSelect}
                        id={key}
                      >
                        <Typography noWrap fontSize={14}>
                          {key}
                        </Typography>
                      </MenuItem>
                    ))}
                </Menu>
              </MyTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map(
              (
                application // iterate over all the applications
              ) => (
                <TableRow
                  key={application.application_id} // application_id is the company name
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <MyTableCell component="th" scope="row">
                    {application.company_name}
                  </MyTableCell>
                  <MyTableCell align="center">
                    {/* <TextField
                      id="title" // title you applied for
                      variant="standard"
                      defaultValue={application.title}
                      inputProps={textFieldProps}
                    /> */}
                    <Typography noWrap fontSize={14}>{application.title}</Typography>
                  </MyTableCell>
                  <MyTableCell align="center">
                    {application.date_applied_formatted}
                  </MyTableCell>
                  <MyTableCell align="center">
                    <FormControl sx={{ width: "12vw", m: 0 }} size={"small"}>
                      <Select
                        defaultValue={
                          application.status
                            ? `${application.status}`
                            : `${status.Applied}`
                        } // application status
                        onChange={handleStatusChange}
                        displayEmpty
                        inputProps={selectProps}
                        name={application._id.toString()}
                      >
                        {Object.keys(status)
                          .filter((x) => isNaN(parseInt(x))) // filter out the keys that are numbers because of TS -> JS enum conversion
                          .map((key) => (
                            <MenuItem
                              value={status[key as keyof typeof status]}
                              key={key}
                            >
                              <Typography noWrap fontSize={14}>
                                {key}
                              </Typography>
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </MyTableCell>
                  <MyTableCell
                    id={application.application_id + "delete_button"}
                    key={application.application_id + "cell"}
                  >
                    <IconButton
                      onClick={() => {
                        setOpenArray(
                          openArray.map((x, i) =>
                            i === application.application_id ? true : x
                          )
                        ); // open this specific dialog
                        // console.log(openArray);
                      }}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                    <Dialog
                      open={openArray[application.application_id]}
                      onClose={() =>
                        setOpenArray(
                          openArray.map((x, i) =>
                            i === application.application_id ? false : x
                          )
                        )
                      } // close this specific dialog
                      aria-labelledby="delete_application_title"
                      aria-describedby="delete_application_text"
                      key={application.application_id}
                      id={application.application_id.toString() + "dialog"}
                    >
                      <DialogTitle id="delete_application_title">
                        {"Delete this application?"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="delete_application_text">
                          This will delete the application from your profile.
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={() =>
                            setOpenArray(
                              openArray.map((x, i) =>
                                i === application.application_id ? false : x
                              )
                            )
                          }
                        >
                          Disagree
                        </Button>
                        <Button
                          onClick={function () {
                            setOpenArray(
                              openArray.map((x, i) =>
                                i === application.application_id ? false : x
                              )
                            );
                            deleteApplication(application.application_id);
                          }}
                          autoFocus
                          key={application.application_id + "confirm"}
                        >
                          Agree
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </MyTableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}
// filter out the keys that are numbers (i.e. the enum values) and map the remaining keys to menu items
// because of the way ts enums work, the enum gets converted to a js object with numeric and string keys for each enum value
// https://stackoverflow.com/questions/56044872/typescript-enum-object-values-return-value
