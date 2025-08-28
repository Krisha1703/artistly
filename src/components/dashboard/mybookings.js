// components/MyBookingsTable.js
import { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, CircularProgress, Box, Paper
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import People from "@mui/icons-material/People";
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';

export default function MyBookingsTable() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/bookings/my")
      .then(res => res.json())
      .then(data => {
        setBookings(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setBookings([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" sx={{ p: 4 }}>
        <CircularProgress sx={{ color: "#9333ea" }} /> 
      </Box>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        borderRadius: "0px",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          m: 2,
          fontWeight: "bold",
          color: "#9333ea", 
        }}
      >
        My Events & Bookings
      </Typography>
      <Table
         sx={{
          borderCollapse: "collapse",
          "& td, & th": {
            border: "1px solid #9333ea",  
          },
         }}
      >
        <TableHead>
          <TableRow sx={{ backgroundColor: "#9333ea" }}>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              <PersonIcon fontSize="small" sx={{ mr: 1, color: "white" }} />
              Artist
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              <EventIcon fontSize="small" sx={{ mr: 1, color: "white" }} />
              Event Date
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              <AccessTimeIcon fontSize="small" sx={{ mr: 1, color: "white" }} />
              Event Time
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              <LocationOnIcon fontSize="small" sx={{ mr: 1, color: "white" }} />
              Location
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              <People fontSize="small" sx={{ mr: 1, color: "white" }} />
              Guests
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
               <AttachMoneyOutlinedIcon fontSize="small" sx={{ mr: 0, color: "white" }} />
              Fee
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
               <AutorenewOutlinedIcon fontSize="small" sx={{ mr: 1, color: "white" }} />
              Status
            </TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                align="center"
                sx={{ py: 4, color: "#9333ea", backgroundColor: "white" }}
              >
                No artist is booked yet. Kindly book an artist to see bookings here.
              </TableCell>
            </TableRow>
          ) : (
            bookings.map((b) => (
              <TableRow key={b.id} sx={{ backgroundColor: "white" }}>
                <TableCell>{b.artist?.name || "—"}</TableCell>
                <TableCell>
                  {b.eventDate ? new Date(b.eventDate).toLocaleDateString() : "—"}
                </TableCell>
                <TableCell>{b.eventTime || "—"}</TableCell>
                <TableCell>{b.location || "—"}</TableCell>
                <TableCell>{b.guests ?? "—"}</TableCell>
                <TableCell>
                  {b.bookingFee !== undefined ? `$${b.bookingFee}` : "—"}
                </TableCell>
                <TableCell>{b.paymentStatus || "—"}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
