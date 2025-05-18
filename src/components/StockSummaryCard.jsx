import { Card, CardContent, Typography, Box } from "@mui/material";

export default function StockSummaryCard({ stockData }) {
  if (!stockData) return null;

  const {
    name,
    symbol,
    currency,
    price,
    change,
    changePercent,
    open,
    previousClose,
    high,
    low,
  } = stockData;

  const isPositive = parseFloat(change) >= 0;

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {name} ({symbol}) — {currency}
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          ${parseFloat(price).toFixed(2)}
        </Typography>

        <Typography sx={{ color: isPositive ? "green" : "red", mb: 2 }}>
          {isPositive ? "+" : ""}
          {parseFloat(change).toFixed(2)} ({changePercent})
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Typography variant="body2">
            Open: ${parseFloat(open).toFixed(2)}
          </Typography>
          <Typography variant="body2">
            Previous Close: ${parseFloat(previousClose).toFixed(2)}
          </Typography>
          <Typography variant="body2">
            High: ${parseFloat(high).toFixed(2)}
          </Typography>
          <Typography variant="body2">
            Low: ${parseFloat(low).toFixed(2)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}