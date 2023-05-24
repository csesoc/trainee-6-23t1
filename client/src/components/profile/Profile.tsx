import { Grid } from "@mui/material"
import Img from "./Img"
import styles from './Profile.module.css'
import Details from "./Details"
import { GrGamepad } from "react-icons/gr";

const Profile = () => {

  return (
    <>
      {/* MATCHMAKING */}
      <GrGamepad className={styles.play}/>

      <Grid container className={styles.container}>

        {/* IMAGE - Left */}
        <Img/>

        {/* DETAILS - Right */}
        <Details/>
      </Grid>
    </>
  )
}

export default Profile