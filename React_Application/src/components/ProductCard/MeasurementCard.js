import styles from "./MeasurementCard.module.css";
function MeasurementCard(props) {
  return(

           <div className={styles.card}>
          <div className={styles.card}>
      <div className={styles.Column}>
      <h3 className={styles.Measurement}>
          {props.data}
      </h3>

      <h3 className={styles.MeasurementDate}>{props.date}</h3>
          </div>
     <div className={styles.Column}>
      <h2 className={styles.MeasurementName}>{props.name}</h2>
   </div>
          </div>
                  </div>


)
}

export default MeasurementCard;
