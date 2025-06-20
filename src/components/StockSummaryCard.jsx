import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import axios from "axios";

export default function StockSummaryCard({ stockData }) {
  const [showForm, setShowForm] = useState(false);
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

  const handleOrderOnOpen = () => {
    setShowForm(true);
  };

  const handleOrderOnClose = () => {
    setShowForm(false);
  };

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        {showForm && (
          <Dialog
            open={showForm}
            onClose={handleOrderOnClose}
            slotProps={{
              paper: {
                component: "form",
                onSubmit: async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const data = {
                    symbol,
                    name,
                    quantity: parseFloat(formData.get("quantity")),
                    price: parseFloat(price),
                    transactionType: formData.get("transactionType"),
                  };

                  try {
                    await axios.post(
                      "http://localhost:3000/api/stocks/order",
                      data,
                      {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem(
                            "token"
                          )}`,
                        },
                      }
                    );
                    handleOrderOnClose();
                  } catch (err) {
                    console.error(
                      "Order failed:",
                      err.response?.data || err.message
                    );
                  }
                },
              },
            }}
          >
            <DialogTitle>New Order</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <strong>
                  {name} ({symbol}) — {currency}
                </strong>
                <br />
                Current Price: <strong>${parseFloat(price).toFixed(2)}</strong>
              </DialogContentText>

              <TextField
                margin="dense"
                name="quantity"
                label="Quantity"
                type="number"
                inputProps={{ min: 1 }}
                fullWidth
                required
                variant="standard"
              />

              <FormControl fullWidth margin="dense" variant="standard">
                <InputLabel id="transaction-type-label">
                  Transaction Type
                </InputLabel>
                <Select
                  labelId="transaction-type-label"
                  name="transactionType"
                  defaultValue="buy"
                  required
                >
                  <MenuItem value="buy">Buy</MenuItem>
                  <MenuItem value="sell">Sell</MenuItem>
                </Select>
              </FormControl>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleOrderOnClose}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
          </Dialog>
        )}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Typography variant="h6" gutterBottom>
            {name} ({symbol}) — {currency}
          </Typography>
          <Button variant="contained" onClick={handleOrderOnOpen}>
            New Order
          </Button>
        </Box>
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
