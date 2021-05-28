import styles from "./Signup.module.css";
import LoginButton from "../../components/LoginButton/LoginButton";
import LoginInput from "../../components/LoginInput/LoginInput";
import React, { useState } from "react";
import emailicon from "../Login/email.svg";
import passwordicon from "../Login/password.svg";
import addressicon from "./Address.svg";
import phoneicon from "./Phone.svg";
import nameicon from "./Name.svg";
import SignupRadio from "../../components/SignupRadio/SignupRadio";
import ExperienceSelect from "../../components/ExperienceSelect/ExperienceSelect";
import NewsLetterRadio from "../../components/NewsletterRadio/NewsletterRadio";
import axios from "axios";
import { Add } from "@material-ui/icons";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import {Link} from "react-router-dom";

function Signup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Address, setAddress] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [selectedValue, setSelectedValue] = React.useState(0);

  const OrangeCheckbox = withStyles({
    root: {
      color: "#D16B49",
      "&$checked": {
        color: "#D16B49",
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

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

  const OrangeRadio = withStyles({
    root: {
      color: "#D16B49",
      "&$checked": {
        color: "#D16B49",
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

  const [Gender, setGender] = React.useState("");

  const classes = useStyles();
  const [Experience, setExperience] = React.useState("");




  async function postRegister() {
    const reg = await axios.post("http://127.0.0.1:5000/registration", {
      email: email,
      password: password,
      name: name,
      phone_number: PhoneNumber,
      address: Address,
      gender: Gender,
      sub_newsletter: selectedValue,
      experience: Experience,
    }
    ,{       headers: {'Content-Type' : 'application/json; charset=UTF-8'}}

    );

    console.log(reg.data)
    localStorage.setItem("access_token", reg.data.access_token);
  }






  return (
    <div className={styles.Background}>
      <div>
        <div className={styles.Logo}>
          <svg
            width="197"
            height="207"
            viewBox="0 0 197 207"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0)" filter="url(#filter0_d)">
              <path
                d="M122.638 108.6H119.261V112.05H122.638V108.6Z"
                fill="#14584E"
              />
              <path
                d="M117.407 113.94H114.03V117.389H117.407V113.94Z"
                fill="#14584E"
              />
              <path
                d="M117.407 108.6H114.03V112.05H117.407V108.6Z"
                fill="#14584E"
              />
              <path
                d="M122.638 113.94H119.261V117.389H122.638V113.94Z"
                fill="#14584E"
              />
              <path
                d="M34.6875 54.6179C34.6875 54.6179 37.2499 75.6379 46.4069 84.7242C55.5638 93.8104 67.8563 87.5717 67.8563 87.5717C67.8563 87.5717 73.6444 74.8518 64.4874 65.7488C55.3305 56.6458 34.6875 54.6179 34.6875 54.6179Z"
                fill="#14584E"
              />
              <path
                d="M73.6484 82.7589C73.6484 82.7589 80.5622 86.2796 85.7158 81.1616C90.8694 76.0435 92.3062 64.2142 92.3062 64.2142C92.3062 64.2142 80.6973 65.3599 75.5437 70.4864C70.3901 75.6128 73.6484 82.7589 73.6484 82.7589Z"
                fill="#14584E"
              />
              <path
                d="M93.002 0C41.6381 0 -1.52588e-05 42.5335 -1.52588e-05 95.0021C-1.52588e-05 147.471 41.6381 190.004 93.002 190.004C144.366 190.004 186.004 147.471 186.004 95.0021C186.004 42.5335 144.366 0 93.002 0ZM136.949 162.44C132.772 165.246 128.345 167.643 123.727 169.599V131.305H112.941V173.258C108.389 174.435 103.744 175.197 99.0603 175.536V117.619L118.623 99.6686L136.949 120.229V162.44ZM140.633 159.798V121.763H147.854L118.209 88.1027H73.7344L42.4895 120.02H45.9525V159.722C36.0012 152.177 27.9193 142.354 22.3547 131.042C16.7901 119.73 13.8977 107.244 13.9094 94.5839C13.9094 49.7757 49.4769 13.4642 93.3541 13.4642C137.231 13.4642 172.795 49.7757 172.795 94.5839C172.808 107.268 169.907 119.778 164.325 131.107C158.742 142.437 150.634 152.269 140.653 159.814L140.633 159.798Z"
                fill="#D16B49"
              />
            </g>
            <defs>
              <filter
                id="filter0_d"
                x="0"
                y="0"
                width="197"
                height="207"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset dx="6" dy="12" />
                <feGaussianBlur stdDeviation="2.5" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow"
                  result="shape"
                />
              </filter>
              <clipPath id="clip0">
                <rect width="186" height="190" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>

        <div className={styles.card}>
          <div className={styles.Row}>
            <h2 className={styles.h2}>Greenhouse Dashboard</h2>
          </div>
          <div className={styles.Row}>
            <div>
              <img className={styles.Placeholder} src={emailicon} />
              <input
                className={styles.LoginInput}
                name="Email"
                type="email"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <img className={styles.Placeholder} src={passwordicon} />
              <input
                className={styles.LoginInput}
                name="Password"
                type="password"
                placeholder="Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.Row}>
            <div>
              <img className={styles.Placeholder} src={nameicon} />
              <input
                className={styles.LoginInput}
                name="Name"
                type="text"
                placeholder="Name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <img className={styles.Placeholder} src={addressicon} />
              <input
                className={styles.LoginInput}
                name="Address"
                type="text"
                placeholder="Address"
                value={Address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.Row}>
            <div>
              <img className={styles.Placeholder} src={phoneicon} />
              <input
                className={styles.LoginInput}
                name="Phone Number"
                type="tel"
                pattern="[+]{1}[0-9]{11,14}"
                placeholder="Phone Number"
                value={PhoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div className={styles.Block}>
              <FormControl component="fieldset">
                <RadioGroup
                  defaultValue="female"
                  aria-label="gender"
                  name="customized-radios"
                  row
                >
                  <FormControlLabel
                    value="female"
                    onClick={() => setGender("Male")}
                    control={<OrangeRadio />}
                    label={
                      <Typography className={styles.formControlLabel}>
                        Male
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    value="male"
                    onClick={() => setGender("Female")}
                    control={<OrangeRadio />}
                    label={
                      <Typography className={styles.formControlLabel}>
                        Female
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    value="other"
                    onClick={() => setGender("Unknown")}
                    control={<OrangeRadio />}
                    label={
                      <Typography className={styles.formControlLabel}>
                        Don't want to tell
                      </Typography>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div className={styles.Row}>
            <FormControl className={classes.formControl}>
              <TextField
                className={classes.root}
                value={Experience}
                onChange={(e) => setExperience(e.target.value)}
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
          </div>
          <div className={styles.Row}>
            <FormControl component="fieldset">
              <RadioGroup
                defaultValue="female"
                aria-label="gender"
                name="customized-radios"
                row
              >
                <FormControlLabel
                  labelPlacement="start"
                  onClick={() => setSelectedValue(1)}
                  control={<OrangeCheckbox />}
                  label={
                    <Typography className={styles.formControlLabel}>
                      Would you like to subscribe to our Newsletter ?
                    </Typography>
                  }
                />
              </RadioGroup>
            </FormControl>
          </div>

          <div className={styles.Row}>
            <div>
              <Link to="/login" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                              <button className={styles.LoginButton} onClick={postRegister}>

                Sign Up</button>


              </Link>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
