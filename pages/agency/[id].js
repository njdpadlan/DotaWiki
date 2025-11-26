// pages/agency/[id].js
import Head from "next/head";
import { Container, Grid, Typography } from "@mui/material";
import NavBar from "@components/NavBar";
import SimpleDetailsCard from "@components/SimpleDetailsCard";
import LoadingCircle from "@components/LoadingCircle";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getHeroes } from "@utils/api/agencies";
import { getHeroById } from "@utils/api/heroes";
import { getHeroLore } from "@utils/api/heroes";

export default function Agency() {
  const [heroData, setHeroData] = useState(null); // single hero object
  const [heroImg, setHeroImg] = useState("");
  const [heroLore, setHeroLore] = useState("");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return; // wait for id to be available
    getHeroById(id).then((data) => {
      setHeroData(data);

      // Clean hero name for the image URL
      const heroName = data.name.replace("npc_dota_hero_", "");
      // Dota 2 CDN URL
      const imgURL = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${heroName}.png`;

      setHeroImg(imgURL);

      //get hero lore
      getHeroLore(heroName).then(lore => {
        setHeroLore(lore);
      });
      
    });
  }, [id]);

  // Show loading while waiting for heroData
  if (!heroData) return <LoadingCircle />;

  return (
    <>
      <NavBar />
      <Container sx={{ paddingTop: 2 }}>
        <Grid container>
          <Grid item xs={10}>
            <Typography variant="h3" gutterBottom>
              {heroData.localized_name}
            </Typography>
          </Grid>
          <Grid item xs="2">
            <img src={heroImg} alt="qwe" style={{ width: `200px` }} />
          </Grid>
          <Typography variant="h5">
            {heroLore}
            </Typography>
        </Grid>
      </Container>
    </>
  );
}
