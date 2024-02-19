import { useState } from "react"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardMedia from '@mui/material/CardMedia'
import { CardActionArea } from '@mui/material';


const FrontPage = () => {

  const [hovered, setHovered] = useState();
  const [hovered2, setHovered2] = useState();

  return (
    <>
      <Grid container justifyContent='center'>
        frontpage!
      </Grid>
    </>
  )
}

export default FrontPage;