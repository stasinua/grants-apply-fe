'use client'

import { Button, Grid2, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter()
  return (
    <Grid2
      container
      columns={12}
      alignItems={'center'}
      sx={{ height: '100vh' }}
    >
      <Grid2 size={12}>
        <Typography variant="h1" textAlign={'center'}>
          Grants made easy
        </Typography>
      </Grid2>
      <Grid2 size={12}>
        <Grid2 container columns={12} justifyContent={'center'}>
          <Button onClick={() => router.push('/dashboard')} variant='outlined'>
            Go to dashboard
          </Button>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
