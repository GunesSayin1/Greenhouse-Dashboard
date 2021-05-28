import styles from "./Products.module.css";
import React, { useEffect, useState } from "react";
import Logo from "../Login/Logo.svg";
import Container from "@material-ui/core/Container";
import Sidebar from "../../components/Sidebar/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaSeedling } from "react-icons/all";
import Table from "../../components/ProductsTable/Table";
import Paper from "@material-ui/core/Paper";

function Dashboard() {
  const [data, setData] = useState([]);
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // GET request using fetch inside useEffect React hook
    fetch("http://127.0.0.1:5000/products", {
      method: "get",
      headers: new Headers({
        Authorization:
          "Bearer " + localStorage.getItem("access_token")
      }),
    })
      .then((response) => response.json())
      .then((data) => {
setData(data.YourProducts)
      })

      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
      });
  }, []);

  if (loading) {
    return <p>Data is loading...</p>;
  }

  return (
    <div className={styles.background}>
      <Sidebar />
      <div className={styles.wrapper}>
        <div classname={styles.Row}>
          <FontAwesomeIcon icon={FaSeedling} className={styles.TopText} />
          <h4 className={styles.TopText}>
            <FaSeedling /> Produces
          </h4>
        </div>

        <div className={styles.Row}>
          <div className={styles.card}>
            <div className={styles.RowHeader}>
              <h1 className={styles.HeaderOne}>Harvested Products</h1>
            </div>
            <Table greenhouses={data}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
