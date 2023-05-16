import { Grid } from "@mui/material"
import Img from "./Img"
import styles from './Profile.module.css'
import Details from "./Details"
import { GrGamepad } from "react-icons/gr";

const Profile = () => {

  return (
    <>
      <GrGamepad className={styles.play}/>
      <Grid container className={styles.container}>
        <Img/>
        <Details/>
      </Grid>
    </>
  )
}

export default Profile