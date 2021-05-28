import styles from "./Greenhouse.module.css";
import React, { useEffect, useState} from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { FaSeedling } from "react-icons/all";
import MeasurementCard from "../../components/MeasurementCard/MeasurementCard";
import Temperature from "./Temperature.svg";
import Plant from "../../components/Plant/Plant";
import axios from "axios";
import { Link , useParams } from "react-router-dom";

function Greenhouse() {

    let {id} = useParams()
  const foo = Array.from(Array(100).keys());
  const bar = window.location.pathname.slice(12)
  const [data, setData] = useState([]);
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);

  const url =
    "http://127.0.0.1:5000/greenhouse/" + window.location.pathname.slice(12);

  useEffect(() => {
    setLoading(true);
    // GET request using fetch inside useEffect React hook

    fetch(url, {
      method: "get",
      headers: {            'Content-Type': 'application/json',
          Authorization: "Bearer " + localStorage.getItem("access_token")

      }
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data.ghmeasurements);
        setPlants(data.plants);
        console.log(data);
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
        <div className={styles.Row}>
          <h4 className={styles.TopText}>
            <FaSeedling />
            Greenhouse
          </h4>
                                <Link
            to={`/greenhouse/${id+"/"+"harvest"}`}
            style={{
              color: "inherit",
              textDecoration: "inherit",
            }}
          >
          <button className={styles.Harvest}>
            <h4 className={styles.ButtonText}>Harvest</h4>
          </button>
                                </Link>

        </div>
        <div className={styles.CardRow}>
          <Link
            to={`/metrics/${window.location.pathname.slice(12)}`}
            style={{
              color: "inherit",
              textDecoration: "inherit",
            }}
          >
            <MeasurementCard greenhouses={data.slice(0, 1)} />
          </Link>
                    <Link
            to={`/metrics/${window.location.pathname.slice(12)}`}
            style={{
              color: "inherit",
              textDecoration: "inherit",
            }}
          >
          <MeasurementCard greenhouses={data.slice(1, 2)} />
                    </Link>
                              <Link
            to={`/metrics/${window.location.pathname.slice(12)}`}
            style={{
              color: "inherit",
              textDecoration: "inherit",
            }}
          >
          <MeasurementCard greenhouses={data.slice(2, 3)} />
           </Link>
        </div>
        <div className={styles.CardRow}>
                                        <Link
            to={`/metrics/${window.location.pathname.slice(12)}`}
            style={{
              color: "inherit",
              textDecoration: "inherit",
            }}
          >
          <MeasurementCard greenhouses={data.slice(3, 4)} />
           </Link>
                                                  <Link
            to={`/metrics/${window.location.pathname.slice(12)}`}
            style={{
              color: "inherit",
              textDecoration: "inherit",
            }}
          >
          <MeasurementCard greenhouses={data.slice(4, 5)} />
                     </Link>                                                  <Link
            to={`/metrics/${window.location.pathname.slice(12)}`}
            style={{
              color: "inherit",
              textDecoration: "inherit",
            }}
          >
          <MeasurementCard greenhouses={data.slice(5, 6)} />
           </Link>
        </div>
        <div className={styles.Row}>
          <div className={styles.card}>
            <h3 className={styles.HeaderOne}>Plants</h3>
            <div className={styles.plantWrapper}>
              <Plant Plant={plants} GH={bar} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Greenhouse;
