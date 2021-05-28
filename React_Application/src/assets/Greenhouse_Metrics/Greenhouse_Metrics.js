import styles from "./Greenhouse_Metrics.module.css";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { FaSeedling } from "react-icons/all";
import MeasurementCard from "../../components/MeasurementCard/MeasurementCard";
import Temperature from "../Greenhouse/Temperature.svg";
import Plant from "../../components/Plant/Plant";
import Charts from "../../components/Charts/Charts";
import { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import { ResponsiveContainer } from "recharts";
import moment from 'moment'

function Metrics() {
  const [data, setData] = useState([]);
  const [temperature, settemperature] = useState([]);
  const [humidity, sethumidity] = useState([]);
  const [ammonia, setammonia] = useState([]);
  const [light, setlight] = useState([]);
  const [co2, setco2] = useState([]);
  const [o2, seto2] = useState([]);
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);

  const url = 'http://127.0.0.1:5000/greenhouse/' + window.location.pathname.slice(9) + "/metrics"
  useEffect(() => {
    setLoading(true);
    // GET request using fetch inside useEffect React hook
    fetch(url, {
      method: "get",
      headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token")

      }
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        let Temperature = data.measurements.filter(
          (answer) => answer.measurement_name === "Temperature"
        );
        let Humidity = data.measurements.filter(
          (answer) => answer.measurement_name === "Humidity"
        );
        let Ammonia = data.measurements.filter(
          (answer) => answer.measurement_name === "Ammonia"
        );
        let Light = data.measurements.filter(
          (answer) => answer.measurement_name === "Light"
        );
        let Co2 = data.measurements.filter(
          (answer) => answer.measurement_name === "Co2"
        );
        let O2 = data.measurements.filter(
          (answer) => answer.measurement_name === "O2"
        );
        settemperature(Temperature);
        setammonia(Ammonia);
        setco2(Co2);
        sethumidity(Humidity);
        setlight(Light);
        seto2(O2);
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


  if (!temperature) {
    return <span>Loading...</span>;
  }


    if (temperature.length <= 0) {
      return <p>Data is loading...</p>;
    }







  return (
    <div className={styles.background}>
      <Sidebar />
      <div className={styles.Row}>
        <h4 className={styles.TopText}>
          <FaSeedling />
          Greenhouse Metrics
        </h4>
      </div>
      <div className={styles.Row}>
        <div className={styles.card}>
          <p className={styles.ChartHeader}>Temperature</p>

        <Charts data={temperature}/>
        </div>
        <div className={styles.card}>
          <p className={styles.ChartHeader}>Humidity</p>
          <Charts data={humidity}/>
        </div>
      </div>
      <div className={styles.Row}>
        <div className={styles.card}>
          <p className={styles.ChartHeader}>Light Levels</p>
          <Charts data={light}/>
        </div>
        <div className={styles.card}>
          <p className={styles.ChartHeader}>Ammonia</p>
          <Charts data={ammonia}/>
        </div>
      </div>
      <div className={styles.Row}>
        <div className={styles.card}>
          <p className={styles.ChartHeader}>Co2</p>
          <Charts data={co2}/>
        </div>
        <div className={styles.card}>
          <p className={styles.ChartHeader}>o2</p>
          <Charts data={o2}/>
        </div>
      </div>
    </div>

  );
}

export default Metrics;
