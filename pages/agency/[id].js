// pages/agency/[id].js

import Head from 'next/head';

import {Container, Grid, Typography} from '@mui/material';

import NavBar from '@components/NavBar';
import SimpleDetailsCard from '@components/SimpleDetailsCard';

import LoadingCircle from '@components/LoadingCircle';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getHeroes } from '@utils/api/agencies';
import { getHeroById } from '@utils/api/heroes';

export default function Agency() {
  const [heroData, setHeroData] = useState(null); // single hero object
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return; // wait for id to be available
    getHeroById(id).then((data) => {
      console.log(data);
      setHeroData(data);
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
        </Grid>
      </Container>
    </>
  );
}