import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import '@fontsource/roboto';
import { Typography } from '@material-ui/core';
import styles from './NewsletterRadio.module.css'
import Checkbox from '@material-ui/core/Checkbox'


export default function RadioButtonsGroup(props) {

const OrangeCheckbox = withStyles({
  root: {
    color: '#D16B49',
    '&$checked': {
      color: '#D16B49',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);


  const [selectedValue, setSelectedValue] = React.useState('b');

  console.log(selectedValue)
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (


<FormControl component="fieldset">
  <RadioGroup defaultValue="female" aria-label="gender" name="customized-radios" row>
    <FormControlLabel labelPlacement="start"  value="female" onClick={() => setSelectedValue('Male')} control={<OrangeCheckbox />} label={<Typography className={styles.formControlLabelqw}>Is your plant reoccurring ?</Typography>}/>
  </RadioGroup>
</FormControl>




  );
}