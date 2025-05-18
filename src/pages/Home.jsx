import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import StockSummaryCard from "../components/StockSummaryCard";
import { useOutletContext } from "react-router-dom";

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
              {/* <StockChart symbol={selectedStock.symbol} /> */}
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
