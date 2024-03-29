import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  selectFoundChild,
  getFoundChildStatus,
} from '../foundchild/FoundChildSlice'
import { getNodal, getNodalStatus } from './NodalSlice'
import { useNavigate } from 'react-router-dom'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Button, Skeleton } from '@mui/material'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import SideBar from '../../components/Sidebar'
import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import sidebarMenus from '../../components/sidebarMenus'

function refresh() {
  if (!window.location.hash) {
    window.location = window.location + '#loaded'
    window.location.reload()
  }
}

const NodalDashboard = () => {
  refresh()
  const navigate = useNavigate()
  const statusFoundChild = useSelector(getFoundChildStatus)
  const foundChildData = useSelector(selectFoundChild)
  const statusNodal = useSelector(getNodalStatus)
  const nodalData = useSelector((state) => getNodal(state))
  const [childData, setChildData] = useState([])
  const loading = useSelector(getNodalStatus)
  const [uiLoading, setUiLoading] = useState(true)

  useEffect(() => {
    if (statusFoundChild === 'Succeeded' && statusNodal === 'Succeeded') {
      setChildData(
        foundChildData.filter(
          (child) =>
            child.state.toLowerCase() === nodalData.state.toLowerCase() &&
            child.district.toLowerCase() === nodalData.district.toLowerCase(),
        ),
      )
    }
  }, [
    statusFoundChild,
    statusNodal,
    nodalData?.state,
    nodalData?.district,
    foundChildData,
  ])
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <SideBar
        nSections={sidebarMenus.nodal.nSections}
        sectionList={sidebarMenus.nodal.sectionList}
        header={sidebarMenus.nodal.header}
      />

      {loading !== 'Succeeded' ? (
        <Box
          sx={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Skeleton variant="rectangular" width={210} height={118} />
        </Box>
      ) : (
        <>
          {/* Table for XL Screens to L Screens */}
          <TableContainer
            sx={{
              display: { xs: 'none', lg: 'inherit' },
              mx: '20px',
              mt: '100px',
              maxHeight: '500px',
            }}
          >
            <Table stickyHeader component={Paper}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Is Accepted</TableCell>
                  <TableCell>Is Verified</TableCell>
                  <TableCell>Reported By</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {childData.map((child) => (
                  <TableRow>
                    <TableCell>{child?.name}</TableCell>
                    <TableCell>{child?.address}</TableCell>
                    <TableCell>
                      {child?.isAccepted ? (
                        <CheckCircleIcon sx={{ color: 'green' }} />
                      ) : (
                        <CancelIcon sx={{ color: 'red' }} />
                      )}
                    </TableCell>
                    <TableCell>
                      {child?.isVerified ? (
                        <CheckCircleIcon sx={{ color: 'green' }} />
                      ) : (
                        <CancelIcon sx={{ color: 'red' }} />
                      )}
                    </TableCell>
                    <TableCell>{child?.reportedBy?.name}</TableCell>
                    <TableCell>
                      <Button
                        size="medium"
                        variant="contained"
                        onClick={() => navigate(`/child/${child?._id}`)}
                      >
                        <ArrowRightAltIcon />
                        <Typography
                          component="span"
                          sx={{ display: { xs: 'none', md: 'block' } }}
                        >
                          View Details
                        </Typography>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* , */}
          </TableContainer>

          {/* Table for XS Screens to M Screens */}
          <TableContainer
            sx={{
              display: { xs: 'none', md: 'inherit', lg: 'none' },
              mx: '20px',
              mt: '100px',
              maxHeight: '500px',
            }}
          >
            <Table stickyHeader component={Paper}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography varient="h4"> Name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography varient="h4"> Reported By</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography varient="h4"> Is Verified</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography varient="h4"> Actions</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {childData.map((child) => (
                  <TableRow>
                    <TableCell>
                      <Typography varient="h4"> {child?.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography varient="h4">
                        {' '}
                        {child?.reportedBy?.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {child?.isVerified ? (
                        <CheckCircleIcon sx={{ color: 'green' }} />
                      ) : (
                        <CancelIcon sx={{ color: 'red' }} />
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => navigate(`/child/${child?._id}`)}
                      >
                        <ArrowRightAltIcon />
                        <Typography
                          component="span"
                          sx={{ display: { xs: 'none', md: 'block' } }}
                        >
                          View Details
                        </Typography>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Table for M Screens to L Screens */}
          <TableContainer
            sx={{
              display: { xs: 'inherit', md: 'none', lg: 'none' },
              mx: '20px',
              mt: '100px',
              maxHeight: '500px',
            }}
          >
            <Table stickyHeader component={Paper}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Reported By</TableCell>
                  <TableCell>Is Verified</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {childData.map((child) => (
                  <TableRow>
                    <TableCell>{child?.name}</TableCell>
                    <TableCell>{child?.reportedBy?.name} </TableCell>
                    <TableCell>
                      {child?.isVerified ? (
                        <CheckCircleIcon sx={{ color: 'green' }} />
                      ) : (
                        <CancelIcon sx={{ color: 'red' }} />
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => navigate(`/child/${child?._id}`)}
                      >
                        <ArrowRightAltIcon />
                        <Typography
                          component="span"
                          sx={{ display: { xs: 'none', md: 'block' } }}
                        >
                          View Details
                        </Typography>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  )
}

export default NodalDashboard
