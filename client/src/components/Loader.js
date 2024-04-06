import { TailSpin } from 'react-loader-spinner';
import styles from '../styles/loader.module.css';

function Loader(){
  return(
    <div className={styles.parent}>
      <TailSpin height="100" width="100"/>
    </div>
  )
}

export default Loader;