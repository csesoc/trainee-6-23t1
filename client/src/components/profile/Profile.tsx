import { Grid } from "@mui/material"
import Img from "./Img"
import styles from './Profile.module.css'
import Details from "./Details"
import { GrGamepad } from "react-icons/gr";
import Calendar from "./Calendar";

const Profile = () => {

  return (
    <>
      <GrGamepad className={styles.play}/>
      <Grid container className={styles.container} spacing={5}>
        <Img/>
        <Details/>
        <Calendar/>
      </Grid>
    </>
  )
}

export default Profile