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


        <Grid container spacing={2} pr={10} pl={10} mt={2} maxWidth={1250} >
          <Grid item xs>
            <Card
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              sx={{
                maxHeight: 700,
                position: 'relative',
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height='100%'
                  width='100%'
                  image="https://breademporium.co.za/wp-content/uploads/2021/02/IMG_9201.jpg"
                  alt="Image Title"
                  sx={{
                    filter: hovered ? 'brightness(90%)' : 'brightness(100%)',
                    transition: 'filter 0.3s',
                    objectFit: 'fill',
                  }}
                />
              </CardActionArea>
              {hovered && (
                <Button
                  // variant="outlined"
                  color="white"
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  shop bannetons
                </Button>
              )}
            </Card>
          </Grid>

          <Grid item xs>
            <Card
              onMouseEnter={() => setHovered2(true)}
              onMouseLeave={() => setHovered2(false)}
              sx={{
                maxHeight: 700,
                position: 'relative',
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height='100%'
                  width='100%'
                  image="https://breademporium.co.za/wp-content/uploads/2021/02/IMG_9202.jpg"
                  alt="Image Title"
                  sx={{
                    filter: hovered2 ? 'brightness(90%)' : 'brightness(100%)',
                    transition: 'filter 0.3s',
                    objectFit: 'contain',
                    objectPosition: 'center center'
                  }}
                />
              </CardActionArea>
              {hovered2 && (
                <Button
                  // variant="outlined"
                  color="white"
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  shop bannetons
                </Button>
              )}
            </Card>
          </Grid>
        </Grid>
      </Grid>


      {/* <Typography color="white"                 sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}>
                SHOP BANNETONS
              </Typography> */}
    </>
  )
}

export default FrontPage