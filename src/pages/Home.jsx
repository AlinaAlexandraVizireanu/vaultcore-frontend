import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import StockSummaryCard from "../components/StockSummaryCard";
import ChartSwitcher from "../components/ChartSwitcher";
import PortfolioTable from "../components/PortfolioTable";
import { useRef, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const { displayStock, setDisplayStock } = useOutletContext();
  const [chartData, setChartData] = useState([]);
  const [candlesChartData, setCandlesChartData] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);

  const prevSymbolRef = useRef(null);

  const THIRTY_MINUTES = 30 * 60 * 1000;

  const handleTabChange = (_, newValue) => setTabIndex(newValue);

  const enrichAndSetStock = async (userStock) => {
    const cacheKey = `stock_${userStock.symbol}`;
    const cached = localStorage.getItem(cacheKey);
    const now = Date.now();

    if (cached) {
      console.log("Cache hit for", userStock.symbol);
      const parsed = JSON.parse(cached);
      console.log("Time diff (ms):", now - parsed.timestamp);
      if (now - parsed.timestamp < THIRTY_MINUTES) {
        console.log("Using cached data for", userStock.symbol);
        setDisplayStock({ ...userStock, ...parsed.data });
        return;
      } else {
        console.log("Cache expired for", userStock.symbol);
      }
    } else {
      console.log("No cache for", userStock.symbol);
    }

    try {
      const res = await axios.get(
        `http://localhost:3000/api/stocks/search?query=${userStock.symbol}`
      );
      const liveData =
        res.data.find((item) => item.symbol === userStock.symbol) || {};

      const enrichedStock = { ...userStock, ...liveData };

      localStorage.setItem(
        cacheKey,
        JSON.stringify({ data: liveData, timestamp: now })
      );

      setDisplayStock(enrichedStock);
    } catch (err) {
      console.error("Enrich failed:", err);
      setDisplayStock(userStock);
    }
  };

  const fetchPortfolio = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/stocks/portfolio",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPortfolio(response.data);
      if (response.data.length > 0) {
        await enrichAndSetStock(response.data[0]);
      }
    } catch (err) {
      console.error("Failed to fetch portfolio:", err);
    }
  };
  useEffect(() => {
    if (displayStock?.symbol) {
      console.log("Updated displayStock with enriched data:", displayStock);
    }
  }, [displayStock]);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  useEffect(() => {
    if (!displayStock?.symbol) return;

    const symbol = displayStock.symbol;
    const now = Date.now();

    if (prevSymbolRef.current === symbol) return;

    const cachedChart = JSON.parse(
      localStorage.getItem(`chart_${symbol}`) || "{}"
    );
    const cachedCandle = JSON.parse(
      localStorage.getItem(`candle_${symbol}`) || "{}"
    );

    const shouldUseCachedChart =
      cachedChart?.data && now - cachedChart.timestamp < THIRTY_MINUTES;
    const shouldUseCachedCandle =
      cachedCandle?.data && now - cachedCandle.timestamp < THIRTY_MINUTES;

    if (shouldUseCachedChart && shouldUseCachedCandle) {
      console.log(`Using cached charts for ${symbol}`);
      setChartData(cachedChart.data);
      setCandlesChartData(cachedCandle.data);
      return;
    }

    const fetchChartData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/stocks/chart?symbol=${symbol}`
        );
        setChartData(data);
        localStorage.setItem(
          `chart_${symbol}`,
          JSON.stringify({ data, timestamp: now })
        );
        console.log("Cached chart data for", symbol);
      } catch (err) {
        console.error("Error fetching chart data:", err);
        setChartData([]);
      }
    };

    const fetchCandleChartData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/stocks/candlestick?symbol=${symbol}`
        );
        setCandlesChartData(data);
        localStorage.setItem(
          `candle_${symbol}`,
          JSON.stringify({ data, timestamp: now })
        );
      } catch (err) {
        console.error("Error fetching candles chart data:", err);
        setCandlesChartData([]);
      }
    };
    const loadCharts = async () => {
      if (shouldUseCachedChart) {
        setChartData(cachedChart.data);
      } else {
        await fetchChartData();
      }

      if (shouldUseCachedCandle) {
        setCandlesChartData(cachedCandle.data);
      } else {
        await fetchCandleChartData();
      }
      prevSymbolRef.current = symbol;
    };

    loadCharts();
  }, [displayStock?.symbol]);

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        {/* Left Column */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={tabIndex} onChange={handleTabChange}>
              <Tab label="Portfolio" />
              <Tab label="Orders" />
              <Tab label="News" />
              <Tab label="Education" />
            </Tabs>
          </Box>
          {tabIndex === 0 && (
            <PortfolioTable
              enrichAndSetStock={enrichAndSetStock}
              portfolio={portfolio}
            />
          )}
          {tabIndex === 1 && <Box sx={{ p: 2 }}>Orders content here</Box>}
          {tabIndex === 2 && <Box sx={{ p: 2 }}>News content here</Box>}
          {tabIndex === 3 && <Box sx={{ p: 2 }}>Education content here</Box>}

          {/* Portfolio / Orders / News / Education components */}
        </Grid>

        {/* Right Column */}
        <Grid size={{ xs: 12, md: 6 }}>
          {displayStock && (
            <>
              <StockSummaryCard
                stockData={displayStock}
                fetchPortfolio={fetchPortfolio}
              />
              <ChartSwitcher
                lineData={chartData}
                candleData={candlesChartData}
              />
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
