// pages/agency/[id].js
import Head from "next/head";
import { Container, Grid, Typography } from "@mui/material";
import NavBar from "@components/NavBar";
import SimpleDetailsCard from "@components/SimpleDetailsCard";
import LoadingCircle from "@components/LoadingCircle";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getHeroById } from "@utils/api/heroes";
import { getHeroLore } from "@utils/api/heroes";
import Box from "@mui/material/Box";
import Image from "next/image";

export default function Heroes() {
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
    <Box sx={{backgroundColor: "#0d1117"}}>
    <Container sx={{ paddingTop: 2 }}>
      
      {/* Hero Header */}
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={9}>
          <Typography variant="h2" gutterBottom style={{ color: "white", paddingLeft: "1rem"}}>
            {heroData.localized_name}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
            <Image
            src={heroImg} 
            alt={heroData.localized_name}
            width={250}
            height={150}
            style={{ paddingLeft: "2rem", paddingTop: "2rem" }}
            />
        </Grid>
      </Grid>

        {/* Stats Section (3 columns) */}
        <Grid container spacing={2} sx={{ marginTop: 2 }}>

        {/* Column 1 */}
        <Grid item xs={12} sm={6} md={4}>
            <SimpleDetailsCard title="Primary Attribute" description={heroData.primary_attr} />
            <SimpleDetailsCard title="Attack Type" description={heroData.attack_type} />
            <SimpleDetailsCard title="Base Health" description={heroData.base_health} />
            <SimpleDetailsCard title="Base Mana" description={heroData.base_mana} />
            
        </Grid>

        {/* Column 2 */}
        <Grid item xs={12} sm={6} md={4}>
            <SimpleDetailsCard title="Base STR" description={heroData.base_str} />
            <SimpleDetailsCard title="Base AGI" description={heroData.base_agi} />
            <SimpleDetailsCard title="Base INT" description={heroData.base_int} />
            <SimpleDetailsCard title="Base Armor" description={heroData.base_armor} />
        </Grid>

        {/* Column 3 */}
        <Grid item xs={12} sm={6} md={4}>
            <SimpleDetailsCard title="Movement Speed" description={heroData.move_speed} />
            <SimpleDetailsCard title="Legs" description={heroData.legs} />
            <SimpleDetailsCard title="Attack Range:" description={heroData.attack_range} />
            <SimpleDetailsCard title="Attack Rate" description={heroData.attack_rate} />
        </Grid>

        </Grid>

      {/* Lore Full Width */}
      <Grid item xs={12} sx={{ marginTop: 3, paddingBottom: "2rem" }}>
        <SimpleDetailsCard title="Lore" description={heroLore} />
      </Grid>

    </Container>
    </Box>
  </>
);

}
