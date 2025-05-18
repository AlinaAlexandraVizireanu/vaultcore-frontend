import Button from "@mui/material/Button";

function StockSummaryCard({ stockData }) {
  return (
    <div>
      <h2>{stockData.symbol}</h2>
      <p>{stockData.name}</p>
      <p>Price: ${stockData.price}</p>
    </div>
  );
}

export default StockSummaryCard;
