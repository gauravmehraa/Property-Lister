import { TailSpin } from 'react-loader-spinner';
import styles from '../styles/loader.module.css';

function Loader({text}){
  return(
    <div className={styles.parent}>
      <TailSpin height="100" width="100"/>
      <h3 className={styles.header}>{text}</h3>
    </div>
  )
}

export default Loader;