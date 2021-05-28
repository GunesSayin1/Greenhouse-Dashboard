import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import styles from "./ExperienceSelect.module.css";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 0,
    border: 0,
    color: "#D16B49",
    boxShadow: "none",
    "& .MuiOutlinedInput-input": {
      color: "#D16B49",
      border: 0,
    },
    "& .MuiInputLabel-root": {
      border: 0,
      color: "#D16B49",
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: 0,
      borderColor: "#D16B49",
    },
    "&:hover .MuiOutlinedInput-input": {
      border: 0,
      color: "#D16B49",
    },
    "&:hover .MuiInputLabel-root": {
      border: 0,
      color: "#D16B49",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: 0,
      borderColor: "#D16B49",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      border: 0,
      color: "#D16B49",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      border: 0,
      color: "#D16B49",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: 0,
      borderRadius: 0,
    },
  },
  outlined: {
    color: "#D16B49",
  },
  filled: {
    color: "#D16B49",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
    color: "#D16B49",
    width: "414px",
    borderRadius: "8px",
    borderColor: "#f5eadf",
    background: "#F5EADF",
  },
  icon: {
    fill: "#D16B49",
  },
  InputLabel: {
    color: "#D16B49",
    padding: "0px 0px 0px 0.5em",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    color: "#D16B49",
  },
  MenuItem: {
    color: "#D16B49",
    marginleft: "5px",
  },
  select: {
    "&:before": {
      color: "#D16B49",
    },
    "&:after": {
      color: "#D16B49",
    },
  },
}));

export default function SignupRadio() {
  const classes = useStyles();
  const [age, setAge] = React.useState("");

  return (
    <FormControl className={classes.formControl}>
      <TextField
        className={classes.root}
        value={age}
        onChange={(e) => setAge(e.target.value)}
        variant="outlined"
        label="Greenhouse Experience"
        select
      >
        <MenuItem value={0} className={classes.MenuItem}>
          Don't have experience
        </MenuItem>
        <MenuItem value={1} className={classes.MenuItem}>
          1 Year
        </MenuItem>
        <MenuItem value={2} className={classes.MenuItem}>
          2 Year
        </MenuItem>
        <MenuItem value={3} className={classes.MenuItem}>
          3 Year
        </MenuItem>
        <MenuItem value={4} className={classes.MenuItem}>
          4 Year
        </MenuItem>
        <MenuItem value={5} className={classes.MenuItem}>
          5 Year +
        </MenuItem>
      </TextField>
    </FormControl>
  );
}
