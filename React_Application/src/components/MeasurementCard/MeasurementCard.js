import styles from "./MeasurementCard.module.css";


function MeasurementCard({greenhouses}) {
  return(<div>

         {/*   <div className={styles.Column}>*/}
         {/*   <h3 className={styles.Measurement}>*/}
         {/*       {props.data}*/}
         {/*   </h3>*/}

         {/*   <h3 className={styles.MeasurementDate}>{props.date}</h3>*/}
         {/*       </div>*/}
         {/*  <div className={styles.Column}>*/}

         {/*   <h2 className={styles.MeasurementName}>{props.name}</h2>*/}
         {/*</div>*/}
  {greenhouses&&greenhouses.map(greenhouse => {
      return(
           <div className={styles.card}>
          <div key={greenhouse.measurement_name} className={styles.card}>
      <div className={styles.Column}>
      <h3 className={styles.Measurement}>
          {greenhouse.measurement}
      </h3>

      <h3 className={styles.MeasurementDate}>{greenhouse.measurement_date}</h3>
          </div>
     <div className={styles.Column}>
      <h2 className={styles.MeasurementName}>{greenhouse.measurement_name}</h2>
   </div>
          </div>
                  </div>

)
 })}
 </div>

)
}

export default MeasurementCard;
