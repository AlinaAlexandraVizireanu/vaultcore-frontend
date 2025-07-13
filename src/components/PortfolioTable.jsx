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

export default function PortfolioTable({ enrichAndSetStock, portfolio }) {
  const handleRowClick = async (userStock) => {
    await enrichAndSetStock(userStock);
  };

  if (!portfolio)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
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
            <TableRow
              key={stock._id}
              hover
              sx={{ cursor: "pointer" }}
              onClick={() => handleRowClick(stock)}
            >
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
