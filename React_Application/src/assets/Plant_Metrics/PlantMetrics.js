import styles from "./PlantMetrics.module.css";
import React, {useEffect, useState} from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { FaSeedling } from "react-icons/all";
import MeasurementCard from "../../components/MeasurementCard/MeasurementCard";
import Temperature from "../Greenhouse/Temperature.svg";
import Plant from "../../components/Plant/Plant";
import Charts from "../../components/Charts/Charts";
import { ResponsiveContainer } from "recharts";
import { useHistory, useParams } from 'react-router-dom'


function PlantMetrics() {

const { id,ghid } = useParams()
      const [data, setData] = useState([]);
  const [temperature, settemperature] = useState([]);
  const [light, setlight] = useState([]);
  const [co2, setco2] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      console.log(ghid)
    setLoading(true);
    // GET request using fetch inside useEffect React hook



    fetch("http://127.0.0.1:5000/greenhouse/"+id+"/"+ghid, {
      method: "get",
      headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token")

      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("http://127.0.0.1:5000/greenhouse/"+id+"/"+ghid)
        let Temperature = data.measurements.filter(
          (answer) => answer.measurement_name === "Temperature"
        );
        let Light = data.measurements.filter(
          (answer) => answer.measurement_name === "Light"
        );
        let Co2 = data.measurements.filter(
          (answer) => answer.measurement_name === "Co2"
        );
        settemperature(Temperature);
                setData(data.measurements);
                console.log(data)
        setco2(Co2);
        setlight(Light);
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

      <div className={styles.Row}>
        <h4 className={styles.TopText}>
          <FaSeedling />
          Plant Metrics
        </h4>
      </div>
      <div className={styles.Row}>
        <div className={styles.card}>
          <p className={styles.ChartHeader}>Temperature</p>
          <Charts data={temperature}/>
        </div>
      </div>
      <div className={styles.Row}>
        <div className={styles.card}>
          <p className={styles.ChartHeader}>Light Levels</p>
          <Charts data={light}/>
        </div>
      </div>
      <div className={styles.Row}>
        <div className={styles.card}>
          <p className={styles.ChartHeader}>Co2</p>
          <Charts data={co2}/>
        </div>
      </div>
    </div>
  );
}

export default PlantMetrics;
