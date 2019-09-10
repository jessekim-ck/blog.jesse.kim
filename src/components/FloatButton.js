import React from 'react'
import styles from "../app.module.css";


const FloatButton = props => {
    return (
        <div className={styles.floatButtonItem}>
            <img
                className={styles.basicButton}
                onClick={props.handle_click}
                src={props.source}
                width="66"
                height="66"
                alt="login"/>
        </div>
    )
}

export default FloatButton