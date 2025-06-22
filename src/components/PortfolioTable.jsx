import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PortfolioTable() {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/stocks/portfolio", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setPortfolio(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load portfolio");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" align="center" mt={4}>
        {error}
      </Typography>
    );

  if (portfolio.length === 0)
    return (
      <Typography align="center" mt={4}>
        You have no stocks in your portfolio.
      </Typography>
    );

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Symbol</strong>
            </TableCell>
            <TableCell>
              <strong>Name</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Quantity</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Avg. Price ($)</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {portfolio.map((stock) => (
            <TableRow key={stock._id}>
              <TableCell>{stock.symbol}</TableCell>
              <TableCell>{stock.name}</TableCell>
              <TableCell align="right">{stock.quantity}</TableCell>
              <TableCell align="right">
                {parseFloat(stock.averagePrice).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
