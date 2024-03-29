import React from 'react'
import old from '../images/nclp_guildline_old.png'
import neww from '../images/new_ncil_guildlines.png'
import { Box, Stack } from '@mui/material'
import { Typography } from '@mui/material'

import Navbar from './Navbar'
import Container from '@mui/material/Container'



const Guidelines = () => {
  return (
    <div>
    <Navbar />
     

      <Container>
      <Box sx={{ 
        position: 'relative',
         marginTop: '10px' ,
         m: 2,
        borderRadius: 8,
         border: 3
         }}
         >
            
        <Typography
          variant="h4"
          component="p"
          sx={{
            fontWeight: 600,
            textAlign: 'center',
            mb: 5,
            fontSize: { xs: 25, sm: 32 },
          }}
        >
          National Child Labour Project Guidelines
        </Typography>
        <Stack sx={{ ml: 6, display: 'flex' }} direction="row" spacing={2}>
          <a
            href="https://pencil.gov.in/uploads/guidelines/NCLPGuideline.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <img width="500" height="500" src={old}></img>
          </a>
          <a
            href="https://pencil.gov.in/uploads/guidelines/RevisedNCLPguidelines01.04.2016.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <img width="500" height="500" src={neww}></img>
          </a>
        </Stack>

        </Box>
          </Container>
      

    </div>
  )
}

export default Guidelines
