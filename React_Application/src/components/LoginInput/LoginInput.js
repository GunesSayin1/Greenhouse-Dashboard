import React,{useState} from 'react';
import styles from "./LoginInput.module.css"
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import validator from 'validator'

function LoginButton (nameProps) {
    const [email,setEmail]=useState("")
    return (

      // <label className={styles.LoginLabel}>
      //     {nameProps.name}




        <div>
        <img className={styles.Placeholder} src={nameProps.image}/>
        <input
        className={styles.LoginInput}
        style={{width : nameProps.width}}
          name={nameProps.name}
          type={nameProps.type}
          placeholder={nameProps.name}
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
          />
          </div>
    )
}

export default LoginButton