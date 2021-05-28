import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import styles from './GreenhouseRegisterRadio_Greenhouse.module.css'
import { withStyles } from '@material-ui/core/styles';
import '@fontsource/roboto';
import { Typography } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup'
import Checkbox from '@material-ui/core/Checkbox'


export default function GreenhouseRegisterRadio_Plant() {

const OrangeCheckbox = withStyles({
  root: {
    color: '#D16B49',
    '&$checked': {
      color: '#D16B49',
    },
  },
})((props) => <Checkbox color="default" {...props} />);

  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
      checkedC: false,
      checkedD: false,
  });

   const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
<div className={styles.Blockplant}>
 <FormGroup row>
      <FormControlLabel
        control={<OrangeCheckbox checked={state.TemperaturePlant} onChange={handleChange} name="checkedA" />}
label={<Typography className={styles.formControlLabel}>Temperature</Typography>}/>
            <FormControlLabel
        control={<OrangeCheckbox checked={state.HumidityPlnat} onChange={handleChange} name="checkedB" />}
label={<Typography className={styles.formControlLabel}>Humidity</Typography>}/>
            <FormControlLabel
        control={<OrangeCheckbox checked={state.WeightPlant} onChange={handleChange} name="checkedC" />}
label={<Typography className={styles.formControlLabel}>Weight</Typography>}/>
            <FormControlLabel
        control={<OrangeCheckbox checked={state.NutritionPlant} onChange={handleChange} name="checkedD" />}
label={<Typography className={styles.formControlLabel}>Nutrition</Typography>}/>
 </FormGroup>
</div>
  );
}