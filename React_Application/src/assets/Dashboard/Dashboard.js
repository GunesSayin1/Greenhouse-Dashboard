import styles from "./Dashboard.module.css";
import React, { useState, useEffect } from "react";
import Logo from "../Login/Logo.svg";
import Container from "@material-ui/core/Container";
import Sidebar from "../../components/Sidebar/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaSeedling } from "react-icons/all";
import Table from "../../components/Table/Table";
import Paper from "@material-ui/core/Paper";
import Add from "./Add.svg";
import axios from "axios";
import {green} from "@material-ui/core/colors";
import {Link} from "react-router-dom"
function Dashboard() {
  // const [tablestate, TablesetState] = useState();
  // let secret = {};
  //
  // async function getSecretMessage() {
  //   secret = await axios.get("http://127.0.0.1:5000/greenhouse", {
  //     headers: {
  //       Authorization: "Bearer " + sessionStorage.getItem("access_token"),
  //     },
  //   });
  //   await TablesetState(secret.data.YourGreenhouses);
  //   tablestate && console.log(tablestate);
  // }
  // function veryImportantTable() {
  //   axios
  //     .get("http://127.0.0.1:5000/greenhouse", {
  //       headers: {
  //         Authorization: "Bearer " + sessionStorage.getItem("access_token"),
  //       },
  //     })
  //     .then((res) => {
  //       const tablecell = res.data.YourGreenhouses
  //       TablesetState(tablecell);
  //       console.log(res);
  //     }).catch((err)=>console.log(err));
  // }


  const [greenhouse,setGreenhouses]=useState([])


  const [data, setData] = useState([]);
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // GET request using fetch inside useEffect React hook
    fetch("http://127.0.0.1:5000/greenhouse", {
      method: "get",
      headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token")

      }
    })
      .then((response) => response.json())
      .then((data) => {
        setGreenhouses(data.YourGreenhouses)
        console.log(data)
      })

      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
      });
  }, []);


  if (!greenhouse) {
    return <span>Loading...</span>;
  }


    if (loading) {
      return <p>Data is loading...</p>;
    }


    if (greenhouse.length === 0) {
      return <p>Data is loading... Be sure to have Greenhouse</p>;
    }
  return (

    <div className={styles.background}>
      <Sidebar />
      <div className={styles.wrapper}>
        <div classname={styles.Row}>
          <FontAwesomeIcon icon={FaSeedling} className={styles.TopText} />
          <h4 className={styles.TopText}>
            <FaSeedling /> Greenhouse
          </h4>
        </div>

        <div className={styles.Row}>
          <div className={styles.card}>
            <div className={styles.RowHeader}>
              <h1 className={styles.HeaderOne}>Active Greenhouses</h1>

                          <Link
              style={{
                color: "inherit",
                textDecoration: "inherit",
              }}
              to="/greenhouse-register"
            >
              <img
                src={Add}
                style={{ marginLeft: "650px", marginRight: "10px" }}
              />
            </Link>






            </div>
          <Table greenhouses={greenhouse}/>
            {/*  data={secret.data.YourGreenhouses && secret.data.YourGreenhouses}*/}
            {/*/>*/}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
