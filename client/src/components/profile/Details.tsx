import { Grid } from '@mui/material'
import styles from './Profile.module.css'
import Genders from './Genders'
import Interests from './Interests'


const Details = () => {

  return (
    <Grid item xs={12} sm={8}>
      <Grid container direction={'column'}>

        <Grid item xs={12}>
          <span className={styles.name}>Smexy - name here</span>
        </Grid>
        <Grid item xs={12}><div className={styles.bar}/></Grid>
        <Genders/>
        <Interests/>

      </Grid>
    </Grid>
  )
}

export default Details