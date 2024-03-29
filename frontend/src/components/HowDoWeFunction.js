import { Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React from 'react'
import rightImg from '../assets/images/workImg.png'
const HowDoWeFunction = () => {
  return (
    <Box
      sx={{
        height: { md: '90vh', xs: 'auto' },
        width: '100%',
        marginTop: { xs: 0 },
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: 'primary.main',
      }}
    >
      {/* left */}
      <Box
        sx={{
          height: '100%',
          width: '50%',
          display: { md: 'flex', xs: 'none' },
          alignItems: 'center',
          justifyContent: 'center',
          //   marginLeft: '100px',
        }}
      >
        <Box component="img" src={rightImg} />
      </Box>
      {/* right */}
      <Box
        sx={{
          minHeight: { xs: '50vh' },
          height: { xs: 'auto' },
          width: { md: '50%', xs: '100%' },
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container
          sx={{
            height: { md: '70%', xs: 'auto' },
            width: { md: '80%', xs: '100%' },
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: { xs: 'center', lg: 'flex-start' },
            marginLeft: { md: '100px', xs: 0 },

            // alignItems: 'center',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              height: { md: '40%', xs: '20%' },

              display: 'flex',
              alignItems: 'center',
              color: 'primary.contrastText',
              // fontSize: { xs: '80px' },
              marginBottom: '20px',
            }}
          >
            How do we function
          </Typography>
          <Typography
            variant="h6"
            sx={{
              width: { md: '80%', xs: '100%' },
              height: '80%',
              color: 'primary.contrastText',
            }}
          >
            PENCiL (Platform for Effective Enforcement for No Child Labour) an
            electronic platform for effective enforcement for no child labour
            developed by Ministry of Labour and Employment. PENCiL Portal has
            following components:Child Tracking System, Complaint Corner, State
            Government, National Child Labour Project, Convergence.
          </Typography>
        </Container>
      </Box>
      {/* right */}
    </Box>
  )
}

export default HowDoWeFunction
