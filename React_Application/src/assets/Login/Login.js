import styles from "./Login.module.css";
import LoginButton from "../../components/LoginButton/LoginButton";
import LoginInput from "../../components/LoginInput/LoginInput";
import React, { useState } from "react";
import emailicon from "./email.svg";
import passwordicon from "./password.svg";
import { Link,Redirect } from "react-router-dom";
import axios from "axios";
function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function postRegister() {
    const reg = await axios.post("http://127.0.0.1:5000/login", {
      email: email,
      password: password,
    }   ,{       headers: {'Content-Type' : 'application/json; charset=UTF-8'}});
    localStorage.setItem("access_token", reg.data.access_token);


// function postRegister(){
//   axios.post("http://127.0.0.1:5000/login", {
//     email:email,
//     password:password,
//   })
//   .then((reg)=>sessionStorage.setItem("access_token", reg.data.access_token)).then(<Redirect to="/greenhouse" />
// )
//   .catch(function (error) {
//     console.log(error);
//   });

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
          <h2 className={styles.h2}>Greenhouse Dashboard</h2>
          <div>
            <img className={styles.Placeholder} src={emailicon} />
            <input
              className={styles.LoginInput}
              name="Email"
              type="email"
              placeholder="Email"
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>


              <Link to="/greenhouse" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                              <button className={styles.LoginButton} onClick={postRegister}>


                Login</button>


              </Link>


          </div>
          <p>
            Don't have an account ?
            <Link
              style={{
                color: "inherit",
                textDecoration: "inherit",
              }}
              to="/signup"
            >
              <h3 className={styles.RegisterNow}>Register Now</h3>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
