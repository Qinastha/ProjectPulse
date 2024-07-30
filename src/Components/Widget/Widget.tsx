import * as echarts from "echarts";
import React, { useEffect, useRef } from "react";
import { IWidget } from "../../core/interfaces/IWidget";

interface WidgetChartProps {
  widget: IWidget;
  mode?: string;
}

export const Widget: React.FC<WidgetChartProps> = ({ widget, mode }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);

      let chartOptions: echarts.EChartsOption;

      const fontSize = mode === "showWidget" ? "1rem" : "0.6rem";

      if (widget.type === "area") {
        chartOptions = {
          tooltip: {},
          xAxis: {
            type: "category",
            data: widget.data.map((item: any) => item.name),
            boundaryGap: true,
            max: widget.data.length - 1,
            axisLabel: { fontSize },
          },
          yAxis: {
            type: "value",
            axisLabel: { fontSize },
          },
          color: "#ffb6c1",
          series: [
            {
              name: widget.name,
              type: "line",
              areaStyle: {},
              data: widget.data.map((item: any) => item.value),
              label: { fontSize },
            },
          ],
        };
      } else if (widget.type === "polar") {
        const maxValue = Math.max(
          ...widget.data.map((item: any) => item.value),
        );
        chartOptions = {
          polar: {
            radius: [30, "80%"],
          },
          angleAxis: {
            type: "value",
            max: maxValue + maxValue * 0.2,
            splitNumber: 5,
            startAngle: 85,
          },
          radiusAxis: {
            type: "category",
            data: widget.data.map((item: any) => item.name),
            max: widget.data.length,
            splitNumber: 10,
            axisLabel: {
              show: false,
            },
          },
          tooltip: {},
          series: [
            {
              type: "bar",
              data: widget.data.map((item: any) => item.value),
              coordinateSystem: "polar",
              itemStyle: {
                color: "#ffb6c1",
              },
              label: {
                show: true,
                position: "start", // or 'start', 'insideStart', 'end', 'insideEnd'
                formatter: "{b}",
                fontSize,
              },
            },
          ],
        };
      } else {
        chartOptions = {};
      }

      chartInstance.setOption(chartOptions);

      return () => {
        chartInstance.dispose();
      };
    }
  }, [widget]);

  const containerStyles = {
    height: mode === "showWidget" ? "65vh" : "30vh",
    width: mode === "showWidget" ? "100%" : "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div ref={chartRef} className="widget-chart" style={containerStyles}></div>
  );
};
