import styles from "./Greenhouse_Harvest.module.css"
import React, {useState} from 'react'

import Sidebar from '../../components/Sidebar/Sidebar'

import NewsLetterRadio from '../../components/NewsletterRadio/NewsletterRadio'
import LoginButton from "../../components/LoginButton/LoginButton";
import LoginInput from "../../components/LoginInput/LoginInput";
import greenhouseicon from '../Greenhouse_Register/Address.svg'
import axios from "axios";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import {Link, useParams} from 'react-router-dom';

function GreenhouseHarvest(props){

    let {id} = useParams()
const OrangeCheckbox = withStyles({
  root: {
    color: '#D16B49',
    '&$checked': {
      color: '#D16B49',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

    const [typeProduce,setProduceType]=useState("")
        const [produceAmount,setAmount]=useState("")
     const [dateProduce,setDate]=useState("")
     const [datePlanting,setDateP]=useState("")
 const [selectedValue, setSelectedValue] = React.useState(0);

     async function postRegister() {
    const reg = await axios.post("http://127.0.0.1:5000/greenhouse/"+id+"/harvest", {

      produce_type:typeProduce,
      produce_amount: produceAmount,
      harvesting_date: dateProduce,
      planting_date: datePlanting,
        reoccurring:selectedValue,
        gh_id:id

    },{
        headers: {'Authorization': 'Bearer '+ localStorage.getItem("access_token")}}

    );
  }


    return(


        <div className={styles.background}>
            <Sidebar/>
            <div>
            <form className={styles.card}>

            <div className={styles.Row}>
              <h2 className={styles.H2}>Register Produces</h2>
            </div>

            <div className={styles.Row}>
        <div className={styles.Block}>
        <label htmlFor="Produce Type" className={styles.Label}>Produce Type</label>
                 <div>
        <img className={styles.Placeholder} src={greenhouseicon}/>
        <input
        className={styles.LoginInput}
          name="Produce Type"
          type="text"
          placeholder="Produce Type"
        value={typeProduce}
        onChange={(e)=>setProduceType(e.target.value)}
          />
          </div>
        </div>
            </div>


            <div className={styles.Row}>
        <div className={styles.Block}>
        <label htmlFor="Amount of Produce" className={styles.Label}>Amount of Produce</label>
             <div>
        <img className={styles.Placeholder} src={greenhouseicon}/>
        <input
        className={styles.LoginInput}
          name="Amount of Produce"
          type="text"
          placeholder="Amount of Produce"
        value={produceAmount}
        onChange={(e)=>setAmount(e.target.value)}
          />
          </div>
        </div>
            </div>

            <div className={styles.Row}>
                <div className={styles.Block}>
        <label htmlFor="Harvesting Date" className={styles.Label}>Harvesting Date</label>
             <div>
        <img className={styles.Placeholder} src={greenhouseicon}/>
        <input
        className={styles.LoginInput}
          name="Harvesting Date"
          type="date"
          placeholder="Harvesting Date"
        value={dateProduce}
        onChange={(e)=>setDate(e.target.value)}
          />
          </div>
                </div>
            </div>


           <div className={styles.Row}>
               <div style={{marginBottom:'25px'}}>
   <FormControl component="fieldset">
  <RadioGroup defaultValue="female" aria-label="gender" name="customized-radios" row>
    <FormControlLabel labelPlacement="start"  value="reccourr" onClick={() => setSelectedValue(1)} control={<OrangeCheckbox />} label={<Typography className={styles.formControlLabelqw}>Is your plant reoccurring ?</Typography>}/>
  </RadioGroup>
</FormControl>

         </div>
           </div>


            <div className={styles.Row}>
                <div className={styles.Block}>
        <label htmlFor="Planting Date" className={styles.Label}>Planting Date</label>
           <div>
        <img className={styles.Placeholder} src={greenhouseicon}/>
        <input
        className={styles.LoginInput}
          name="Planting Date"
          type="date"
          placeholder="Planting Date"
        value={datePlanting}
        onChange={(e)=>setDateP(e.target.value)}
          />
          </div>

                </div>
            </div>

            <div className={styles.Row}>
                     {/*<Link to="/" style={{ color: 'inherit', textDecoration: 'inherit'}}>*/}
                              <button className={styles.LoginButton} onClick={postRegister}>

                Sign Up</button>


              {/*</Link>*/}
            </div>


            </form>
            </div>
        </div>




    )
}

export default GreenhouseHarvest