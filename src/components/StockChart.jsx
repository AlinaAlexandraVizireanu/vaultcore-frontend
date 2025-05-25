import { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

export default function StockChart({ data }) {
  const chartContainerRef = useRef();
  const chartRef = useRef(null);
  const seriesRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    // Create chart only once
    if (!chartRef.current) {
      if (!chartContainerRef.current) return;
      if (!chartRef.current) {
        chartRef.current = createChart(chartContainerRef.current, {
          width: chartContainerRef.current.clientWidth,
          height: 300,
          layout: {
            background: { color: "#fff" },
            textColor: "#000",
          },
          grid: {
            vertLines: { color: "#eee" },
            horzLines: { color: "#eee" },
          },
          timeScale: {
            timeVisible: true,
            secondsVisible: false,
          },
        });
      }
      
      seriesRef.current = chartRef.current.addLineSeries({
        color: "#1976d2",
        lineWidth: 2,
      });
    }
    if (seriesRef.current) {
      seriesRef.current.setData(data);
    }

    const resizeObserver = new ResizeObserver(() => {
      chartRef.current.applyOptions({
        width: chartContainerRef.current.clientWidth,
      });
    });
    resizeObserver.observe(chartContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      chartRef.current.remove();
      chartRef.current = null;
    };
  }, [data]);

  return (
    <div ref={chartContainerRef} style={{ width: "100%", height: "300px" }} />
  );
}
