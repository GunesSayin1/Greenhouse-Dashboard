import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import styles from './SignupRadio.module.css'
import { withStyles } from '@material-ui/core/styles';
import '@fontsource/roboto';
import { Typography } from '@material-ui/core';

export default function RadioButtonsGroup() {

const OrangeRadio = withStyles({
  root: {
    color: '#D16B49',
    '&$checked': {
      color: '#D16B49',
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);


  const [selectedValue, setSelectedValue] = React.useState('b');

  console.log(selectedValue)
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
<div className={styles.Block}>
<FormControl component="fieldset">
  <RadioGroup defaultValue="female" aria-label="gender" name="customized-radios" row>
    <FormControlLabel value="female" onClick={() => setSelectedValue('Male')} control={<OrangeRadio />} label={<Typography className={styles.formControlLabel}>Male</Typography>}/>
    <FormControlLabel value="male" onClick={() => setSelectedValue('Female')}  control={<OrangeRadio />} label={<Typography className={styles.formControlLabel}>Female</Typography>}/>
    <FormControlLabel value="other" onClick={() => setSelectedValue('Unknown')}  control={<OrangeRadio />} label={<Typography className={styles.formControlLabel}>Don't want to tell</Typography>}/>
  </RadioGroup>
</FormControl>
</div>
  );
}