import { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import { Button, ButtonGroup, Box } from "@mui/material";

export default function ChartSwitcher({ lineData, candleData }) {
  const chartContainerRef = useRef();
  const chartRef = useRef();
  const seriesRef = useRef();
  const [type, setType] = useState("line");

  useEffect(() => {
    if (!chartContainerRef.current) return;

    chartRef.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
      layout: {
        textColor: "#000",
        background: { type: "solid", color: "#fff" },
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      priceScale: { borderVisible: false },
      timeScale: { borderVisible: false },
    });

    addSeries("line");

    return () => chartRef.current.remove();
  }, [lineData, candleData]);

  useEffect(() => {
    if (!chartRef.current) return;

    if (seriesRef.current) {
      chartRef.current.removeSeries(seriesRef.current);
    }

    addSeries(type);
  }, [type]);

  const addSeries = (chartType) => {
    if (!chartRef.current) return;

    if (chartType === "line") {
      seriesRef.current = chartRef.current.addLineSeries();
      seriesRef.current.setData(lineData);
    } else {
      seriesRef.current = chartRef.current.addCandlestickSeries();
      seriesRef.current.setData(candleData);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <ButtonGroup size="small" sx={{ mb: 2 }}>
        <Button
          variant={type === "line" ? "contained" : "outlined"}
          onClick={() => setType("line")}
        >
          Line
        </Button>
        <Button
          variant={type === "candle" ? "contained" : "outlined"}
          onClick={() => setType("candle")}
        >
          Candlestick
        </Button>
      </ButtonGroup>
      <div ref={chartContainerRef} />
    </Box>
  );
}
