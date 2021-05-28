import styles from "./ProductAverages.module.css";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { FaSeedling } from "react-icons/all";
import MeasurementCard from "../../components/ProductCard/MeasurementCard";
import Temperature from "../Greenhouse/Temperature.svg";
import Plant from "../../components/Plant/Plant";
import Charts from "../../components/Charts/Charts";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { Navbar } from "react-bootstrap";
import {green} from "@material-ui/core/colors";
import {useParams} from 'react-router-dom';


function Greenhouse() {
  let {id} = useParams()
  const foo = Array.from(Array(100).keys());

  const [data, setData] = useState([]);
  const [greenhouse, setGreenhouse] = useState([]);
  const [products, setProducts] = useState([]);
  const [harvestDate, setHarvest] = useState("");
  const [produceAmount, setAmount] = useState("");
  const [produceName, setName] = useState("");

  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // GET request using fetch inside useEffect React hook
    fetch("http://127.0.0.1:5000/products/"+id, {
      method: "get",
      headers: new Headers({

        Authorization:
          "Bearer " + localStorage.getItem("access_token")
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setGreenhouse(data.greenhouse);
        setPlants(data.plants);
        setAmount(data.produce_amount);
        setName(data.produce_name);
        setHarvest(data.harvesting_date);
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

  if (!greenhouse) {
    return <span>Loading...</span>;
  }


    if (loading) {
      return <p>Data is loading...</p>;
    }


    if (greenhouse.length === 0) {
      return <p>Data is loading...</p>;
    }
  return (
    <>
      <div className={styles.background}>
        <Sidebar />
        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.card}>

                <div className={styles.Column}>
                  <h3 className={styles.MeasurementTitle}>Greenhouse</h3>
                  <h3 className={styles.Measurement}>{greenhouse[0][0]}</h3>

                </div>
                <div className={styles.Column}>
                  <h2 className={styles.MeasurementName}>{Math.round(greenhouse[0][1]*100)/100}</h2>
                </div>

            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.card}>

                <div className={styles.Column}>
                  <h3 className={styles.MeasurementTitle}>Greenhouse</h3>
                  <h3 className={styles.Measurement}>{greenhouse[1][0]}</h3>

                </div>
                <div className={styles.Column}>
                  <h2 className={styles.MeasurementName}>{Math.round(greenhouse[1][1]*100)/100}</h2>
                </div>

            </div>
          </div>
          <div className={styles.column}>

              <div className={styles.card}>
                <div className={styles.Column}>
                  <h3 className={styles.MeasurementTitle}>Greenhouse</h3>
                  <h3 className={styles.Measurement}>{greenhouse[2][0]}</h3>

                </div>
                <div className={styles.Column}>
                  <h2 className={styles.MeasurementName}>{Math.round(greenhouse[2][1]*100)/100}</h2>
                </div>
              </div>

          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.column}>

              <div className={styles.card}>
                <div className={styles.Column}>
                  <h3 className={styles.MeasurementTitle}>Greenhouse</h3>
                  <h3 className={styles.Measurement}>{greenhouse[3][0]}</h3>

                </div>
                <div className={styles.Column}>
                  <h2 className={styles.MeasurementName}>{Math.round(greenhouse[3][1]*100)/100}</h2>
                </div>
              </div>

          </div>
          <div className={styles.column}>

              <div className={styles.card}>
                <div className={styles.Column}>
                  <h3 className={styles.MeasurementTitle}>Greenhouse</h3>
                  <h3 className={styles.Measurement}>{greenhouse[4][0]}</h3>

                </div>
                <div className={styles.Column}>
                  <h2 className={styles.MeasurementName}>{Math.round(greenhouse[4][1]*100)/100}</h2>
                </div>
              </div>

          </div>
          <div className={styles.column}>

              <div className={styles.card}>
                <div className={styles.Column}>
                  <h3 className={styles.MeasurementTitle}>Greenhouse</h3>
                  <h3 className={styles.Measurement}>{greenhouse[5][0]}</h3>

                </div>
                <div className={styles.Column}>
                  <h2 className={styles.MeasurementName}>{Math.round(greenhouse[5][1]*100)/100}</h2>
                </div>
              </div>

          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.column}>
              <div className={styles.card}>
                <div className={styles.Column}>
                  <h3 className={styles.MeasurementTitle}>Plant</h3>
                  <h3 className={styles.Measurement}>{plants[0][0]}</h3>

                </div>
                <div className={styles.Column}>
                  <h2 className={styles.MeasurementName}>{Math.round(greenhouse[0][1]*100)/100}</h2>
                </div>
              </div>
          </div>
          <div className={styles.column}>
              <div className={styles.card}>
                <div className={styles.Column}>
                  <h3 className={styles.MeasurementTitle}>Plant</h3>
                  <h3 className={styles.Measurement}>{plants[1][0]}</h3>

                </div>
                <div className={styles.Column}>
                  <h2 className={styles.MeasurementName}>{Math.round(greenhouse[1][1]*100)/100}</h2>
                </div>
              </div>
          </div>
          <div className={styles.column}>
              <div className={styles.card}>
                <div className={styles.Column}>
                  <h3 className={styles.MeasurementTitle}>Plant</h3>
                  <h3 className={styles.Measurement}>{plants[2][0]}</h3>

                </div>
                <div className={styles.Column}>
                  <h2 className={styles.MeasurementName}>{Math.round(greenhouse[2][1]*100)/100}</h2>
                </div>
              </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
              <div className={styles.card}>
                <div className={styles.Column}>
                  <h3 className={styles.MeasurementTitle}>Produce</h3>
                  <h3 className={styles.Measurement}>{produceName}</h3>

                </div>
                <div className={styles.Column}>
                  <h2 className={styles.MeasurementName}>Produce Name</h2>
                </div>
              </div>
          </div>
          <div className={styles.column}>
              <div className={styles.card}>
                <div className={styles.Column}>
                  <h3 className={styles.MeasurementTitle}>Produce</h3>
                  <h3 className={styles.Measurement}>{produceAmount}</h3>

                </div>
                <div className={styles.Column}>
                  <h2 className={styles.MeasurementName}>Produce Amount</h2>
                </div>
              </div>
          </div>
          <div className={styles.column}>
              <div className={styles.card}>
                <div className={styles.Column}>
                  <h3 className={styles.MeasurementTitle}>Produce</h3>
                  <h3 className={styles.Measurement}>{harvestDate}</h3>

                </div>
                <div className={styles.Column}>
                  <h2 className={styles.MeasurementName}>Harvesting Date</h2>
                </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Greenhouse;
