import styles from "./GreenhouseRegister.module.css"
import React, {useState} from 'react'
import Logo from '../Login/Logo.svg'
import Container from '@material-ui/core/Container';
import Sidebar from '../../components/Sidebar/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {FaSeedling} from "react-icons/all";
import Table from '../../components/Table/Table'
import Paper from "@material-ui/core/Paper";
import SignupRadio from "../../components/SignupRadio/SignupRadio";
import ExperienceSelect from '../../components/ExperienceSelect/ExperienceSelect'
import NewsLetterRadio from '../../components/NewsletterRadio/NewsletterRadio'
import LoginButton from "../../components/LoginButton/LoginButton";
import LoginInput from "../../components/LoginInput/LoginInput";
import GreenhouseRegisterRadio_Greenhouse from "../../components/GreenhouseRegisterRadio/GreenhouseRegisterRadio_Greenhouse";
import emailicon from "../Login/email.svg";
import passwordicon from "../Login/password.svg";
import nameicon from "../Signup/Name.svg";
import addressicon from "./Address.svg";
import phoneicon from "../Signup/Phone.svg";

import greenhouseicon from './greenhouse.svg'
import GreenhouseRegisterRadio_Plant from "../../components/GreenhouseRegisterRadio/GreenhouseRegisterRadio_Plant";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";
import {Link} from "react-router-dom";



function GreenhouseRegister(props){

const OrangeCheckbox = withStyles({
  root: {
    color: '#D16B49',
    '&$checked': {
      color: '#D16B49',
    },
  },
})((props) => <Checkbox color="default" {...props} />);


    const [typeOfGreenhouse,setType]=useState("")
    const [numberOfPlants,setPlants]=useState("")
    const [PlantType,setPlantType]=useState("")
    const [PlantDate,setDate]=useState("")

        const [Reoccur,setReoccur]=useState(0)
    // const [numberOfPlants,setPlants]=useState("")
    // const [PlantType,setPlantType]=useState("")
    // const [PlantDate,setDate]=useState("")



  const [state, setState] = React.useState({
      Temperature:false,
      Humidity:false,
      Light:false,
      Ammonia:false,
      Co2:false,
      O2:false,
      TemperaturePlant:false,
      HumidityPlant:false,
      WeightPlant:false,
      NutritionPlant:false
  });

   const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

const headers = {
            'Authorization': "Bearer " + sessionStorage.getItem("access_token")
}

     async function postRegister() {
    const reg = await axios.post("http://127.0.0.1:5000/greenhouse/register", {

      gh_type: typeOfGreenhouse,
      gh_sensors:{
          temperature:state.Temperature,
          humidity:state.Humidity,
          light_levels:state.Light,
          ammonia:state.Ammonia,
          Co2:state.Co2,
          O2:state.O2,
      },
      number_of_spots: numberOfPlants,
      plant_type: PlantType,
      planting_date: PlantDate,
        reoccurring:Reoccur,
      plant_sensors:{
          temperature:state.TemperaturePlant,
          weight:state.WeightPlant,
          water_consumption:state.HumidityPlant,
          nutrition:state.NutritionPlant
      }
    },{       headers: {      'Content-Type' : 'application/json; charset=UTF-8','Authorization': 'Bearer '+ localStorage.getItem("access_token")}}

    );
  }


    return(


        <div className={styles.background}>
            <Sidebar/>
            <div>
            <form className={styles.card}>
            <div className={styles.Row}>
              <h2 className={styles.H2}>Greenhouse Registration</h2>
            </div>
            <div className={styles.Row}>



        <div>
        <img className={styles.Placeholder} src={greenhouseicon}/>
        <input
        className={styles.LoginInput}
          name="Type of Greenhouse"
          type="text"
          placeholder="Type of Greenhouse"
        value={typeOfGreenhouse}
        onChange={(e)=>setType(e.target.value)}
          />
          </div>

                <div>
                 <img className={styles.Placeholder} src={greenhouseicon}/>
        <input
        className={styles.LoginInput}
          name="Number of Spots"
          type="number"
          placeholder="Number of Spots"
        value={numberOfPlants}
        onChange={(e)=>setPlants(e.target.value)}
          />
          </div>


            </div>
            <div className={styles.Row}>

                <div>
                 <img className={styles.Placeholder} src={greenhouseicon}/>
        <input
        className={styles.LoginInput}
          name="Plant Type"
          type="text"
          placeholder="Plant Type"
        value={PlantType}
        onChange={(e)=>setPlantType(e.target.value)}
          />
          </div>

         <div className={styles.Blockone}>
                 <label htmlFor="Planting Date" className={styles.Label}>Planting Date</label>

                <div>
                 <img className={styles.Placeholder} src={greenhouseicon}/>
        <input
        className={styles.LoginInput}
          name="Planting Date"
          type="date"
          placeholder="Planting Date"
        value={PlantDate}
        onChange={(e)=>setDate(e.target.value)}
          />
          </div>

         </div>

            </div>
        <div className={styles.Row}>
             <div className={styles.Blockone}>
            <h5 className={styles.H5}>Greenhouse Sensors</h5>


<div className={styles.Block}>
 <FormGroup row>
      <FormControlLabel
        control={<OrangeCheckbox checked={state.Temperature} onChange={handleChange} name="Temperature" />}
label={<Typography className={styles.formControlLabel}>Temperature</Typography>}/>
            <FormControlLabel
        control={<OrangeCheckbox checked={state.Humidity} onChange={handleChange} name="Humidity" />}
label={<Typography className={styles.formControlLabel}>Humidity</Typography>}/>
            <FormControlLabel
        control={<OrangeCheckbox checked={state.Light} onChange={handleChange} name="Light" />}
label={<Typography className={styles.formControlLabel}>Light Levels</Typography>}/>
            <FormControlLabel
        control={<OrangeCheckbox checked={state.Ammonia} onChange={handleChange} name="Ammonia" />}
label={<Typography className={styles.formControlLabel}>Ammonia</Typography>}/>
            <FormControlLabel
        control={<OrangeCheckbox checked={state.Co2} onChange={handleChange} name="Co2" />}
label={<Typography className={styles.formControlLabel}>Co2</Typography>}/>
            <FormControlLabel
        control={<OrangeCheckbox checked={state.O2} onChange={handleChange} name="O2" />}
        label={<Typography className={styles.formControlLabel}>O2</Typography>}/>


 </FormGroup>

</div>






             </div>


            </div>
             <div className={styles.Row}>
                 <div className={styles.Blockone}>
                     <h5 className={styles.H5}>Plant Sensors</h5>

                     <div className={styles.Block}>
 <FormGroup row>
      <FormControlLabel
        control={<OrangeCheckbox checked={state.TemperaturePlant} onChange={handleChange} name="TemperaturePlant" />}
label={<Typography className={styles.formControlLabel}>Temperature</Typography>}/>
            <FormControlLabel
        control={<OrangeCheckbox checked={state.HumidityPlant} onChange={handleChange} name="HumidityPlant" />}
label={<Typography className={styles.formControlLabel}>Humidity</Typography>}/>
            <FormControlLabel
        control={<OrangeCheckbox checked={state.WeightPlant} onChange={handleChange} name="WeightPlant" />}
label={<Typography className={styles.formControlLabel}>Weight</Typography>}/>
            <FormControlLabel
        control={<OrangeCheckbox checked={state.NutritionPlant} onChange={handleChange} name="NutritionPlant" />}
label={<Typography className={styles.formControlLabel}>Nutrition</Typography>}/>
 </FormGroup>
</div>


                 </div>
             </div>
               <div className={styles.Row}>
                  <FormControl component="fieldset">
  <RadioGroup defaultValue="false" aria-label="reoccurr" name="customized-radios" row>
    <FormControlLabel labelPlacement="start"  value="Reoccur" onClick={() => setReoccur(1)} control={<OrangeCheckbox />} label={<Typography className={styles.formControlLabel}>Is your plant reoccurring ?</Typography>}/>
  </RadioGroup>
</FormControl>
             </div>
            <div className={styles.Row}>




                              <button className={styles.LoginButton} onClick={postRegister}>

                Sign Up</button>




         </div>
        </form>
            </div>
        </div>




    )
}

export default GreenhouseRegister