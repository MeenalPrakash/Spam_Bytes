import {
  Box,
  Card,
  CardContent,
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Divider,
  Modal,
  Container,
  TextField,
} from "@mui/material";
import Sidebar from "./Sidebar";
import sidebarMenus from "./sidebarMenus";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getNodal } from "../features/nodal/NodalSlice";
import EditIcon from "@mui/icons-material/Edit";
import LocationIcon from "@mui/icons-material/LocationOn";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "200px", lg: "400px" },
  bgcolor: "background.paper",
  borderRadius: "10px",
  p: 4,
};

const NodalProfile = () => {
  const navigate = useNavigate();
  const nodalData = useSelector((state) => getNodal(state));
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [cNewPassword, setCNewPassword] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [telModalOpen, setTelModalOpen] = useState(false);

  const changePassword = async () => {
    if (
      newPassword !== "" &&
      cNewPassword !== "" &&
      cNewPassword !== newPassword
    ) {
      alert("Password Mismatch");
      return;
    }
    try {
      const data = {
        newpassword: newPassword,
        cpassword: cNewPassword,
        oldpassword: oldPassword,
      };
      const headers = {
        Authorization: `Bearer ${localStorage?.getItem("token")}`,
      };
      const resp = await axios.put(
        "http://localhost:5000/auth/changepassword",
        data,
        { headers }
      );
      alert(resp?.data?.message);
      setOldPassword("");
      setNewPassword("");
      setCNewPassword("");
      setPasswordModalOpen(false);
      navigate(0);
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message);
    }
  };

  const changePhoneNumber = async () => {
    if (newPhoneNumber === "") {
      alert("Empty Field");
      return;
    }
    try {
      const data = {
        phoneNumber: newPhoneNumber,
      };
      const headers = {
        Authorization: `Bearer ${localStorage?.getItem("token")}`,
      };
      const resp = await axios.put(
        "http://localhost:5000/auth/modifyprofile",
        data,
        { headers }
      );
      alert(resp?.data?.message);
      setNewPhoneNumber("");
      setTelModalOpen(false);
      navigate(0);
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message);
    }
  };
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <Sidebar
          nSections={sidebarMenus.nodal.nSections}
          sectionList={sidebarMenus.nodal.sectionList}
          header="Profile"
        />
        <Card sx={{ mx: "20px", mt: "100px" }}>
          <CardContent>
            <Divider />
            <TableContainer sx={{ display: { xs: "none", lg: "inherit" } }}>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                  <TableCell colSpan={3}>{nodalData?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>State</TableCell>
                  <TableCell>{nodalData?.state}</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>District</TableCell>
                  <TableCell>{nodalData?.district}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                  <TableCell>{nodalData?.user?.email}</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Password</TableCell>
                  <TableCell
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 1.5,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography>*************</Typography>
                    <Button
                      onClick={() => setPasswordModalOpen(true)}
                      type="text"
                      size="small"
                    >
                      <EditIcon />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Location (Lng, Lat)
                  </TableCell>
                  <TableCell
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 1.5,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {nodalData?.officeLocation && (
                      <Typography>
                        {nodalData?.officeLocation[0]},{" "}
                        {nodalData?.officeLocation[1]}
                      </Typography>
                    )}
                    <Button type="text" size="small">
                      <LocationIcon />
                    </Button>
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Phone Number
                  </TableCell>
                  <TableCell
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 1.5,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography>{nodalData?.user?.phoneNumber}</Typography>
                    <Button
                      onClick={() => setTelModalOpen(true)}
                      type="text"
                      size="small"
                    >
                      <EditIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </TableContainer>
            <TableContainer sx={{ display: { xs: "inherit", lg: "none" } }}>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                  <TableCell colSpan={3}>{nodalData?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>State</TableCell>
                  <TableCell>{nodalData?.state}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>District</TableCell>
                  <TableCell>{nodalData?.district}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                  <TableCell>{nodalData?.user?.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Password</TableCell>
                  <TableCell
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 1.5,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography>*************</Typography>
                    <Button
                      onClick={() => setPasswordModalOpen(true)}
                      type="text"
                      size="small"
                    >
                      <EditIcon />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Location</TableCell>
                  <TableCell
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 1.5,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {nodalData?.officeLocation && (
                      <Typography>
                        {nodalData.officeLocation[0]},{" "}
                        {nodalData.officeLocation[1]}
                      </Typography>
                    )}
                    <Button type="text" size="small">
                      <LocationIcon />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Phone Number
                  </TableCell>
                  <TableCell
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 1.5,
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography>{nodalData?.user?.phoneNumber}</Typography>
                    <Button
                      onClick={() => setTelModalOpen(true)}
                      type="text"
                      size="small"
                    >
                      <EditIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Modals */}
        <Modal
          open={passwordModalOpen}
          onClose={() => setPasswordModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Container
              sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <Typography
                component="h4"
                sx={{ fontSize: { xs: 20, lg: 30 } }}
                textAlign="center"
              >
                Change Password
              </Typography>
              <TextField
                type="password"
                id="oldpassword"
                placeholder="Enter Current Password"
                label="Current password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                variant="outlined"
              />
              <TextField
                id="newpassword"
                type="password"
                label="New Password"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                variant="outlined"
              />
              <TextField
                id="cnewpassword"
                type="password"
                label="Confirm New Password"
                placeholder="Re-Enter New Password"
                value={cNewPassword}
                onChange={(e) => setCNewPassword(e.target.value)}
                variant="outlined"
              />

              <Button onClick={changePassword} variant="contained">
                Change Password
              </Button>
            </Container>
          </Box>
        </Modal>
        <Modal
          open={telModalOpen}
          onClose={() => setTelModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Container
              sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <Typography
                component="h4"
                sx={{ fontSize: { xs: 20, lg: 30 } }}
                textAlign="center"
              >
                Change Phone Number
              </Typography>
              <TextField
                type="tel"
                id="phonenumber"
                placeholder="Enter New Phone Number"
                label="New Phone Number"
                value={newPhoneNumber}
                onChange={(e) => setNewPhoneNumber(e.target.value)}
                variant="outlined"
              />
              <Button onClick={changePhoneNumber} variant="contained">
                Change Phone Number
              </Button>
            </Container>
          </Box>
        </Modal>
      </Box>
    </div>
  );
};

export default NodalProfile;
