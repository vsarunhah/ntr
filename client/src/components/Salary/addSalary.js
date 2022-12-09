import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { TextField, Typography } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Rating from "@mui/material/Rating";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import { v4 as uuidv4 } from "uuid";

export default function AddSalary() {
    const [form, setForm] = useState({
        companyName: "",
        base: "",
        bonus: "",
        stock: "",
    });
    const navigate = useNavigate();

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    function onSubmit(e) {
        e.preventDefault();
        navigate("/salary");
    }

    return (
        <Grid mx={35} style={{ display: "grid" }}>
            <Navbar />
            <form onSubmit={onSubmit}>
                <Grid item>
                    <Typography my={"20px"} variant="h5">
                        New Salary Report
                    </Typography>
                    <Typography my={"20px"} variant="body2" color="textSecondary">
                        Please fill in the salary information.
                    </Typography>
                </Grid>
                <Grid item>
                    <TextField
                        my={"20px"}
                        style={{ width: "1000px" }}
                        placeholder="Enter company name"
                        label="Company Name"
                        variant="outlined"
                        fullWidth
                        required
                        value={form.companyName}
                        onChange={(e) => updateForm({ companyName: e.target.value })}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        my={"20px"}
                        style={{ width: "1000px" }}
                        placeholder="Enter base salary"
                        label="Base"
                        variant="outlined"
                        fullWidth
                        required
                        value={form.base}
                        onChange={(e) => updateForm({ base: e.target.value })}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        my={"20px"}
                        style={{ width: "1000px" }}
                        placeholder="Enter bonus"
                        label="Bonus"
                        variant="outlined"
                        fullWidth
                        required
                        value={form.bonus}
                        onChange={(e) => updateForm({ bonus: e.target.value })}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        my={"20px"}
                        style={{ width: "1000px" }}
                        placeholder="Enter stocks"
                        label="Stock"
                        variant="outlined"
                        fullWidth
                        required
                        value={form.stock}
                        onChange={(e) => updateForm({ stock: e.target.value })}
                    />
                </Grid>
                
                <div className="form-group">
                    <input
                        style={{ width: "200px" }}
                        my={"20px"}
                        type="submit"
                        value="Submit Report"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </Grid>
    );
}
