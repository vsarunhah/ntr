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
import Navbar from '../components/Navbar/Navbar'
import {
  Grid,
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

export default function Applied() {
  const [applications, setApplications] = useState<any[]>([]);
  const falseArray = new Array(applications.length).fill(false);
  const [openArray, setOpenArray] = useState(falseArray);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [companyAnchorEl, setCompanyAnchorEl] = React.useState(null);
  const [titleAnchorEl, setTitleAnchorEl] = React.useState(null);
  const [dateAnchorEl, setDateAnchorEl] = React.useState(null);
  const [filter, setFilter] = React.useState("All");
  
  const company_names: Set<string> = new Set();
  const titles: Set<string> = new Set();
  const dates: Set<string> = new Set(); // TODO: change to date type
  var backupApplications = applications;

  const handleFilterClick = (e: any) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCompanyFilterClick = (e: any) => {
    setCompanyAnchorEl(e.currentTarget);
  };
  const handleTitleFilterClick = (e: any) => {
    setTitleAnchorEl(e.currentTarget);
  };
  const handleDateAppliedFilterClick = (e: any) => {
    setDateAnchorEl(e.currentTarget);
  
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
    setCompanyAnchorEl(null);
    setTitleAnchorEl(null);
    setDateAnchorEl(null);
    
  };

  const handleCompanyFilterClose = () => {
    setCompanyAnchorEl(null);
  };
  const handleTitleFilterClose = () => {
    setTitleAnchorEl(null);
  };

  const handleDateFilterClose = () => {
    setDateAnchorEl(null);
  };

  const handleFilterSelect = (e: React.MouseEvent) => {
    setFilter(e.currentTarget.id);
    console.log(e.currentTarget.id);
    handleFilterClose();
  };

  async function deleteApplicationAPI(application: any) {
    const response = await fetch(
      `http://localhost:5000/application/delete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          application_id: application.id,
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
        application_id: application.id,
        status: application.applicationStatus,
      }),
    });
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
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
      if (applications[i].id == event.target.name) {
        applications[i].applicationStatus = event.target.value;
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
      type body = Record<string, string>;
      let json_body: body = {};
      json_body["user_id"] = localStorage.getItem("user_id") || "";
      if (filter.includes("cname")) {
        const last_ind = filter.lastIndexOf("-");
        const cname = filter.slice(0, last_ind);
        json_body["company_name"] = cname;
      } else if (filter.includes("title")) {
        const last_ind = filter.lastIndexOf("-");
        const tit = filter.slice(0, last_ind);
        json_body["title"] = tit;
      } else if (filter.includes("date")) {
        const last_ind = filter.lastIndexOf("-");
        const date = filter.slice(0, last_ind);
        json_body["date_applied"] = date;
      } else if (filter.includes("status")) {
        const last_ind = filter.lastIndexOf("-");
        const stat = filter.slice(0, last_ind);
        json_body["status"] = stat;
      } else {
        json_body["status"] = "All";
      }
      const response = await fetch(`http://localhost:5000/applications/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json_body),
      });

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        //window.alert(message);
        console.log(message);
        return;
      }

      const res = await response.json();
      const applications1 = res.data;
      for (let i = 0; i < applications1.length; i++) {
        applications1[i].date_applied_formatted = moment(
          applications1[i].applicationDate
        ).format("DD-MM-YYYY");
        company_names.add(applications1[i].companyName);
        titles.add(applications1[i].roleName);
        dates.add(applications1[i].date_applied_formatted);
      }
      setApplications(applications1);
    }

    getApplications();
    const falseArray = new Array(applications.length).fill(false);
    setOpenArray(falseArray);
    backupApplications = applications;
    return;
  }, [applications.length, filter]);
  return (
    <Grid mx={35}>
      <Navbar />
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <MyTableCell>
              <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap',}}>
                  <Typography variant="h6">Company Name</Typography>
                  <IconButton
                    aria-label="filter"
                    onClick={handleCompanyFilterClick}
                    title="Open to show more"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                  >
                    <FilterAltOutlinedIcon />{" "}
                  </IconButton>
                  <Menu
                    id="filter_by_company"
                    anchorEl={companyAnchorEl}
                    keepMounted
                    open={Boolean(companyAnchorEl)}
                    onClose={handleCompanyFilterClose}
                  >
                    <MenuItem
                      value="All"
                      key="All"
                      onClick={handleFilterSelect}
                      id="All-cname"
                    >
                      <Typography noWrap fontSize={14}>
                        All
                      </Typography>
                    </MenuItem>
                    {applications.map((key) => (
                        <MenuItem
                          value={key.companyName}
                          key={key.companyName}
                          onClick={handleFilterSelect}
                          id={key.companyName + "-cname"}
                        >
                          <Typography noWrap fontSize={14}>
                            {key.companyName}
                          </Typography>
                        </MenuItem>
                      ))
                      }
                  </Menu>
                </div>
              </MyTableCell>
              <MyTableCell align="center">
              <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap',}}>
                 <Typography variant="h6">Title</Typography>
                  <IconButton
                    aria-label="filter"
                    onClick={handleTitleFilterClick}
                    title="Open to show more"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                  >
                    <FilterAltOutlinedIcon />{" "}
                  </IconButton>
                  <Menu
                    id="filter_by_title"
                    anchorEl={titleAnchorEl}
                    keepMounted
                    open={Boolean(titleAnchorEl)}
                    onClose={handleTitleFilterClose}
                  >
                    <MenuItem
                      value="All"
                      key="All"
                      onClick={handleFilterSelect}
                      id="All-title"
                    >
                      <Typography noWrap fontSize={14}>
                        All
                      </Typography>
                    </MenuItem>
                    {applications.map((key) => (
                        <MenuItem
                          value={key.roleName}
                          key={key.roleName}
                          onClick={handleFilterSelect}
                          id={key.roleName + "-title"}
                        >
                          <Typography noWrap fontSize={14}>
                            {key.roleName}
                          </Typography>
                        </MenuItem>
                      ))}
                  </Menu>
                </div>
              </MyTableCell>
              <MyTableCell align="center">
              <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap',}}>
                 <Typography variant="h6">Date Applied</Typography>
                  <IconButton
                    aria-label="filter"
                    onClick={handleDateAppliedFilterClick}
                    title="Open to show more"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                  >
                    <FilterAltOutlinedIcon />{" "}
                  </IconButton>
                  <Menu
                    id="filter_by_date"
                    anchorEl={dateAnchorEl}
                    keepMounted
                    open={Boolean(dateAnchorEl)}
                    onClose={handleDateFilterClose}
                  >
                    <MenuItem
                      value="All"
                      key="All"
                      onClick={handleFilterSelect}
                      id="All-date"
                    >
                      <Typography noWrap fontSize={14}>
                        All
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      value="Current Resume"
                      key="curr_resume"
                      onClick={handleFilterSelect}
                      id="curr_resume_filter-date"
                    >
                      <Typography noWrap fontSize={14}>
                        Current Resume Versions
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      value="Old Resume"
                      key="old_resume"
                      onClick={handleFilterSelect}
                      id="old_resume_filter-date"
                    >
                      <Typography noWrap fontSize={14}>
                        Old Resume Versions
                      </Typography>
                    </MenuItem>
                    {applications.map((key) => (
                        <MenuItem
                          value={key.date_applied_formatted}
                          key={key.dateApplied}
                          onClick={handleFilterSelect}
                          id={key.date_applied_formatted + "-date"}
                        >
                          <Typography noWrap fontSize={14}>
                            {key.date_applied_formatted}
                          </Typography>
                        </MenuItem>
                      ))}
                  </Menu>
                </div>
              </MyTableCell>
              <MyTableCell align="center">
              <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap',}}>
                  <Typography variant="h6">Status</Typography>
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
                      id="All-status"
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
                          id={key + "-status"}
                        >
                          <Typography noWrap fontSize={14}>
                            {key}
                          </Typography>
                        </MenuItem>
                      ))}
                  </Menu>
                </div>
              </MyTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map(
              (
                application // iterate over all the applications
              ) => (
                <TableRow
                  key={application.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <MyTableCell component="th" scope="row">
                    {application.companyName}
                  </MyTableCell>
                  <MyTableCell align="center">
                    <Typography noWrap fontSize={14}>{application.roleName}</Typography>
                  </MyTableCell>
                  <MyTableCell align="center">
                    {application.date_applied_formatted}
                  </MyTableCell>
                  <MyTableCell align="center">
                    <FormControl sx={{ width: "12vw", m: 0 }} size={"small"}>
                      <Select
                        defaultValue={
                          application.applicationStatus
                            ? `${application.applicationStatus}`
                            : `${status.Applied}`
                        } // application status
                        onChange={handleStatusChange}
                        displayEmpty
                        inputProps={selectProps}
                        name={application.id.toString()}
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
                    key={application.id + "cell"}
                  >
                    <IconButton
                      onClick={() => {
                        let data = [...openArray];
                        data[application.application_id] = true;
                        setOpenArray(data);
                      }}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                    <Dialog
                      open={openArray[application.application_id]}
                      onClose={() =>
                        {
                          let data = [...openArray];
                          data[application.application_id] = false;
                          setOpenArray(data);
                        }
                      } // close this specific dialog
                      aria-labelledby="delete_application_title"
                      aria-describedby="delete_application_text"
                      key={application.application_id}
                      id={application.id.toString() + "dialog"}
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
                            {
                              let data = [...openArray];
                              data[application.application_id] = false;
                              setOpenArray(data);
                            }
                          }
                        >
                          Disagree
                        </Button>
                        <Button
                          onClick={function () {
                            // setOpenArray(
                            //   openArray.map((x, i) =>
                            //     i === application.application_id ? false : x
                            //   )
                            // );
                            {
                              let data = [...openArray];
                              data[application.application_id] = false;
                              setOpenArray(data);
                            }
                            deleteApplication(application.application_id);
                          }}
                          autoFocus
                          key={application.id + "confirm"}
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
  </Grid>
  );
}
// filter out the keys that are numbers (i.e. the enum values) and map the remaining keys to menu items
// because of the way ts enums work, the enum gets converted to a js object with numeric and string keys for each enum value
// https://stackoverflow.com/questions/56044872/typescript-enum-object-values-return-value
