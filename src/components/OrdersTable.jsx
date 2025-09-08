import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { format } from "date-fns";

export default function OrdersTable({ orders }) {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 550 }}>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Symbol</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Value</TableCell>
            <TableCell align="right">ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {order.transactionType}
              </TableCell>
              <TableCell align="right">
                {format(order.date, "MM/dd/yyyy HH:mm")}
              </TableCell>
              <TableCell align="right">{order.symbol}</TableCell>
              <TableCell align="right">{order.quantity}</TableCell>
              <TableCell align="right">{order.totalValue}</TableCell>
              <TableCell align="right">{order._id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
