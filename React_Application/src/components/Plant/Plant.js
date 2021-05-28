import PlantVector from './Plant.svg'
import styles from './Plant.module.css'
import Tooltip from "@material-ui/core/Tooltip"
import React from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {Link} from "react-router-dom";



function Plant({Plant , GH}){

console.log(Plant)
const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#F5EADF',
    color: 'rgba(255, 255, 255, 0.87)',

      borderRadius: '20px',
    fontSize: theme.typography.pxToRem(14),

    border: '1px solid #dadde9',

  },
}))(Tooltip);
    return(


        <div>

              {Plant&&Plant.map(plant => {
                  return(
 <Link
            to={`/plant/${plant.plant_id+"/"+GH}`}
            style={{
              color: "inherit",
              textDecoration: "inherit",
            }}
          >
      <HtmlTooltip
        title={
          <React.Fragment>
            <Typography className={styles.TooltipTop}>Plant No : {plant.plant_id}</Typography>
              <hr className={styles.Line}/>
            <Typography className={styles.TooltipTop}>Measurement Name: {plant.measurement_name}</Typography>
               <hr className={styles.Line}/>
              <Typography className={styles.TooltipTop}>Measurement: {plant.measurement}</Typography>
               <hr className={styles.Line}/>
              <Typography className={styles.TooltipTop}>Measurement Date: {plant.measurement_date}</Typography>
          </React.Fragment>
        }
      >
            <img data-tip={plant.measurement} data-for="registerTip" src={PlantVector} className={styles.PlantVector}/>
              </HtmlTooltip>
 </Link>
                      )})

              }


                  </div>
    );


}

export default Plant