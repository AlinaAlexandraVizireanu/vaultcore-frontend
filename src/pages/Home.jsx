import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import StockSummaryCard from "../components/StockSummaryCard";
import { useOutletContext } from "react-router-dom";
import StockChart from "../components/StockChart";

const mockChartData = [
  { time: '2024-05-01', value: 145.23 },
  { time: '2024-05-02', value: 146.8 },
  { time: '2024-05-03', value: 144.7 },
  { time: '2024-05-04', value: 147.2 },
  { time: '2024-05-05', value: 149.1 },
];

export default function Home() {
  const { displayStock } = useOutletContext();
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
              <StockChart data={mockChartData} />
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
