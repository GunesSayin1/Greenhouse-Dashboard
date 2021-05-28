import styles from "./LoginButton.module.css"
function LoginButton (props) {


    return (
        <input className={styles.LoginButton} type="submit" value={props.name}/>
    )
}

export default LoginButton