import { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Box from "@mui/material/Box";

import StretchImage from "../images/IMG_0864.jpg";
import FoldImage from "../images/IMG_0874.jpg";
import CoilFoldImage from "../images/IMG_0904.jpg";
import ScoringImage from "../images/IMG_0919.jpg";
import Bread1Image from "../images/baking/IMG_4918.webp";
import sourdough from "../images/baking/IMG_4918.webp";
import watersourdoughmix from "../images/baking/IMG_4930.webp";
import mixflour from "../images/baking/IMG_4944.webp";
import mixflour2 from "../images/baking/IMG_4951.webp";
import mixflour3 from "../images/baking/IMG_4953.webp";
import squeezesalt from "../images/baking/IMG_4983.webp";
import stretch from "../images/baking/IMG_4987.webp";
import fold from "../images/baking/IMG_4988.webp";
import pour from "../images/baking/IMG_4992.webp";
import dougbench from "../images/baking/IMG_4993.webp";
import roundshape1 from "../images/baking/IMG_4994.webp";
import roundshape2 from "../images/baking/IMG_4995.webp";
import roundshape3 from "../images/baking/IMG_4996.webp";
import roundshape4 from "../images/baking/IMG_4997.webp";
import flipit from "../images/baking/IMG_5001.webp";

const Discover = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} marginX={20} marginTop={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Välkommen till Surdegshörnan
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Här på Surdegshörnan hittar du allt du behöver för att lyckas med ditt
          surdegsbak. För att få till ett riktigt bra surdegsbröd har vi försökt
          dokumentera receptet så noggrant som möjligt, med bilder som visar
          alla stegen, vi har också en instagram med videor som visar steg för
          steg hur du går tillväga, tveka inte att höra av dig på
          info@surdegshornan.se om du har frågor!
          <br />
          Det här behöver du för receptet:
          <ul>
            <li>Skål</li>
            <li>Degvisp (valfritt)</li>
            <li>Degskrapa</li>
            <li>Jäskorg</li>
            <li>Jäsduk (kökshandduk)</li>
            <li>Gjutjärnsgryta eller ugnsfast form med lock</li>
            <li>Köksvåg</li>
            <li>Surdegsgrund</li>
          </ul>
          Ingredienser:
          <ul>
            <li>Vetemjöl 300g</li>
            <li>Fullkornsvetemjöl (Grahams/Dinkel) 100g</li>
            <li>Vatten 280g</li>
            <li>Salt 10g</li>
          </ul>
          När vi bakar surdegsbröd pratar vi ofta om bakprocent, i det här
          recpetet bakar vi ett bröd med 70% hydrering, 280g vatten är 70% av
          den totala mjölmängden (400g).
          <br />
          Vi har en saltprocent på 2,5%, 2,5% av 400g mjöl är 10g salt.
          <br />
          Du kan öka mängden ingredienser men behålla samma recept, men också
          laborera med högre hydrering, men vi rekommenderar att du börjar med
          70% vatten för att få en någorlunda hanterbar deg.
        </Typography>
      </Grid>

      <Grid item xs={12} marginX={20} marginBottom={5}>
        <Typography variant="h5" component="h2" gutterBottom>
          Sammanfattning
        </Typography>
        <Typography variant="body2" color="textSecondary">
          1. Sätt din surdegsgrund natten innan.
          <br />
          2. Blanda surdegsgrunden med vatten och mjöl, låt vila.
          <br />
          3. Tillsätt salt och vatten, och knåda in.
          <br />
          4. Låt degen jäsa och gör sträck-och-vikningar.
          <br />
          5. Forma degen och låt den vila.
          <br />
          6. Forma degen igen och låt jäsa i kylskåpet över natten.
          <br />
          7. Grädda brödet i en förvärmd gjutjärnspanna.
        </Typography>
      </Grid>

      <Grid
        item
        key={2}
        xs={12}
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row", // alternate left and right alignment
        }}
      >
        <img
          src={sourdough}
          alt="sourdough"
          style={{
            width: "60%",
            marginRight: "20px",
            marginLeft: 0,
          }} // Adjust image width and spacing as needed
        />
        <Box>
          <Typography gutterBottom variant="h5" component="div">
            Surdegsgrunden
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Sätt din surdegsgrund natten innan eller på morgonen, den behöver
            jäsa i ungefär 8 timmar för att du ska kunna baka med den. Blanda
            två teskedar surdegsgrund med 100g vatten, 50g vetemjöl och 50g
            fullkornsmjöl (t.ex. grahamsmjöl eller dinkel). Använd gärna
            ekologiskt mjöl om du hittar, det ger ofta en mycket bubbligare
            surdeg!
          </Typography>
        </Box>
      </Grid>

      <Grid
        item
        key={2}
        xs={12}
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row-reverse", // alternate left and right alignment
        }}
      >
        <ImageList
          cols={2}
          style={{
            width: "90%",
            marginLeft: "20px",
          }} // Adjust image width and spacing as needed
        >
          <ImageListItem key="2">
            <img
              src={watersourdoughmix}
              alt="watersourdoughmix"
              loading="lazy"
            />
          </ImageListItem>
          <ImageListItem key="3">
            <img src={mixflour} alt="mixflour" loading="lazy" />
          </ImageListItem>
          <ImageListItem key="4">
            <img src={mixflour2} alt="mixflour2" loading="lazy" />
          </ImageListItem>
          <ImageListItem key="5">
            <img src={mixflour3} alt="mixflour3" loading="lazy" />
          </ImageListItem>
        </ImageList>

        <Box sx={{ marginLeft: "20px" }}>
          <Typography gutterBottom variant="h5" component="div">
            Blanda degen
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Efter 8h blanda din bubbliga surdegsgrund med 260g vatten, använd en
            degvisp eller händerna för att lösa upp surdegen i vattnet. Blanda i
            mjölet och rör ihop till en degklump, överarbeta inte degen, låt
            vila ca 40min.
          </Typography>
        </Box>
      </Grid>

      <Grid
        item
        key={2}
        xs={12}
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row", // alternate left and right alignment
        }}
      >
        <img
          src={squeezesalt}
          alt="squeezesalt"
          style={{
            width: "60%",
            marginRight: "20px",
            marginLeft: 0,
          }} // Adjust image width and spacing as needed
        />
        <Box>
          <Typography gutterBottom variant="h5" component="div">
            Saltet
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Efter att degen fått vila ca 40 min blanda 10g salt med resterande
            20g vatten, häll i med degen och krama in saltvattenblandningen i
            degen.
          </Typography>
        </Box>
      </Grid>

      <Grid
        item
        key={2}
        xs={12}
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row-reverse", // alternate left and right alignment
        }}
      >
        <ImageList
          cols={2}
          style={{
            width: "90%",
            marginLeft: "20px",
          }} // Adjust image width and spacing as needed
        >
          <ImageListItem key="2">
            <img src={stretch} alt="stretch" loading="lazy" />
          </ImageListItem>
          <ImageListItem key="3">
            <img src={fold} alt="fold" loading="lazy" />
          </ImageListItem>
          <ImageListItem key="4">
            <img src={pour} alt="pour" loading="lazy" />
          </ImageListItem>
          <ImageListItem key="5">
            <img src={dougbench} alt="dougbench" loading="lazy" />
          </ImageListItem>
        </ImageList>
        <Box sx={{ marginLeft: "20px" }}>
          <Typography gutterBottom variant="h5" component="div">
            Huvudjäsning
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Låt degen jäsa i en temperatur på mellan 24° – 27°, i cirka 3 – 4h.
            Du kan värma din ugn på 50° i 30 sekunder och jäsa degen där.
            <br />
            Under de första 2 timmarna gör du en sträck-och-vikning varje
            halvtimme. För att göra en sträck-och-vikning ta tag i undersidan av
            degen, sträck försiktigt degen uppåt och vik ner den under sig
            självt, gör detta 3 gånger tills degen är helt vänd.
            <br />
            När degen känns bullrig när du skakar på skålen och ser kullig ut är
            den redo att formas, häll ut den försiktigt på bordet.
          </Typography>
        </Box>
      </Grid>

      <Grid
        item
        key={2}
        xs={12}
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row", // alternate left and right alignment
        }}
      >
        <ImageList
          cols={2}
          style={{
            width: "90%",
          }} // Adjust image width and spacing as needed
        >
          <ImageListItem key="2">
            <img src={roundshape1} alt="roundshape1" loading="lazy" />
          </ImageListItem>
          <ImageListItem key="3">
            <img src={roundshape2} alt="roundshape2" loading="lazy" />
          </ImageListItem>
          <ImageListItem key="4">
            <img src={roundshape3} alt="roundshape3" loading="lazy" />
          </ImageListItem>
          <ImageListItem key="5">
            <img src={roundshape4} alt="roundshape4" loading="lazy" />
          </ImageListItem>
        </ImageList>
        <Box sx={{ marginLeft: "20px" }}>
          <Typography gutterBottom variant="h5" component="div">
            Huvudjäsning
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Forma degen försiktigt till en rund kula med en degskrapa och ena
            handen, ytan ska spännas men inte gå sönder, låt degen vila på
            bänken i ungefär 20 – 30 min, degen kommer att flyta ut på bänken.
          </Typography>
        </Box>
      </Grid>

      <Grid
        item
        key={2}
        xs={12}
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row-reverse", // alternate left and right alignment
        }}
      >
        <ImageList
          cols={2}
          style={{
            width: "90%",
            marginLeft: "20px",
          }} // Adjust image width and spacing as needed
        >
          <ImageListItem key="2">
            <img src={flipit} alt="flipit" loading="lazy" />
          </ImageListItem>
          <ImageListItem key="3">
            <img src={flipit} alt="flipit" loading="lazy" />
          </ImageListItem>
          <ImageListItem key="4">
            <img src={flipit} alt="pour" loading="lazy" />
          </ImageListItem>
          <ImageListItem key="5">
            <img src={flipit} alt="flipit" loading="lazy" />
          </ImageListItem>
        </ImageList>
        <Box sx={{ marginLeft: "20px" }}>
          <Typography gutterBottom variant="h5" component="div">
            Formning
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Mjöla ditt bakbord och överdelen av degen, vänd den med din
            degskrapa så den mjölade delen hamnar nedåt.
            <br />
            Dra ut degen till en rektangel och vik sedan upp nederdelen till
            mitten.
            <br />
            Ta tag i båda sidorna och vik in ena sidan, vik sedan över den andra
            sidan.
            <br />
            Ta tag i överdelen och vik den över degen. Ta tag i underdelen och
            vänd på degen, ta några tag med din degskrapa och hand och forma
            degen rund. Låt degen vila i någon minut.
            <br />
            Mjöla en bakduk, helst i obehandlat linne, med en 50/50 blandning av
            rismjöl och vetemjöl och lägg den i botten av din jäskorg.
            <br />
            Använd din degskrapa och flytta degen till jäskorgen med ovansidan
            nedåt.
            <br />
            Du har nu två alternativ, låt degen jäsa i 24° – 27° i 3 - 4h, eller
            låt degen jäsa klart i kylskåpet över natten, 8 - 12h.
          </Typography>
        </Box>
      </Grid>

      <Grid
        item
        key={2}
        xs={12}
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row", // alternate left and right alignment
        }}
      >
        <img
          src={squeezesalt}
          alt="squeezesalt"
          style={{
            width: "60%",
            marginRight: "20px",
            marginLeft: 0,
          }} // Adjust image width and spacing as needed
        />
        <Box>
          <Typography gutterBottom variant="h5" component="div">
            Gräddning
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Efter den sista jäsningen förvärm ugnen på 275° med en
            gjutgärnspanna med lock inne i ugnen. Ta ut degen om du har jäst den
            i kylskåpet under tiden.
            <br />
            Vänd upp degen på en bakmatta och dra försiktigt av din jäsduk,
            använd en degskrapa om jäsduken fastnar och använd mer
            rismjölsblandning nästa gång.
            <br />
            Ta ut din förvärmda gjutgärnspanna, lyft över degen till
            gjutgärnspannan och snitta degen med en snittkniv. Det finns olika
            sätt att göra det på men jag brukar göra ett klassiskt
            kvadrat-mönster (ett kryss fungerar också). Sänk värmen till 220°
            och grädda med lock på i 20min.
            <br />
            Efter 20min ta av locket, och grädda tills brödet har fått en fin
            yta, ca 25min.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Discover;
