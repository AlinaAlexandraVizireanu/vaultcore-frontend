import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import StockSummaryCard from "../components/StockSummaryCard";
import StockChart from "../components/StockChart";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const { displayStock } = useOutletContext();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!displayStock?.symbol) return;

    const fetchChartData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/stocks/chart?symbol=${displayStock.symbol}`
        );
        setChartData(data);
      } catch (err) {
        console.error("Error fetching chart data:", err);
        setChartData([]);
      }
    };

    fetchChartData();
  }, [displayStock]);

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        {/* Left Column */}
        <Grid size={{ xs: 12, md: 6 }}>
          {/* Portfolio / Orders / Activity / News / Education components */}
        </Grid>

        {/* Right Column */}
        <Grid size={{ xs: 12, md: 6 }}>
          {displayStock && (
            <>
              <StockSummaryCard stockData={displayStock} />
              <StockChart data={chartData} />
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
