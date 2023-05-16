import { Grid } from '@mui/material'
import Pic from '../../../public/theo.jpg'
import styles from './Profile.module.css'
import TryhardCard from '../tryhard/TryhardCard'

const Img = () => {

  return (
    <Grid item xs={12} sm={3.5} className={styles.imgContainer}>
      <TryhardCard>
        <img src={Pic} className={styles.img}/>
      </TryhardCard>
    </Grid>
  )
}

export default Img