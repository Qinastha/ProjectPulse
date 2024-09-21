import * as echarts from "echarts";
import React, { useEffect, useRef } from "react";
import { IWidget } from "../../core/interfaces/IWidget";
import { useViewport } from "@Qinastha/pulse_library";

interface WidgetChartProps {
  widget: IWidget;
  mode?: string;
}

const Widget: React.FC<WidgetChartProps> = ({ widget, mode }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const { viewportHeight, viewportWidth } = useViewport();
  const isHorizontal = viewportHeight < 450 && viewportWidth < 1000;

  // Update chart options and data when widget data changes
  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);

      let chartOptions: echarts.EChartsOption;

      const dataEntries = Object.entries(widget.data).map(([name, value]) => ({
        name,
        value,
      }));

      const fontSize =
        mode === "showWidget" ? "0.9rem" : isHorizontal ? "0.4rem" : "0.6rem";

      if (widget.name === "All projects") {
        chartOptions = {
          tooltip: {},
          xAxis: {
            type: "category",
            data: dataEntries.map((item: any) => item.name),
            boundaryGap: true,
            axisLabel: { fontSize },
          },
          yAxis: {
            type: "value",
            axisLabel: { fontSize },
          },
          color: "#ffb6c1",
          series: [
            {
              type: "line",
              areaStyle: {},
              data: dataEntries.map((item: any) => item.value),
              label: { fontSize },
            },
          ],
        };
      } else if (widget.name === "All users") {
        const maxValue = Math.max(
          ...dataEntries.map((item: any) => item.value),
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
            data: dataEntries.map((item: any) => item.name),
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
              data: dataEntries.map((item: any) => item.value),
              coordinateSystem: "polar",
              itemStyle: {
                color: "#ffb6c1",
              },
              label: {
                show: true,
                position: "start",
                formatter: "{b}",
                fontSize,
              },
            },
          ],
        };
      } else if (widget.name === "Members Performance") {
        chartOptions = {
          tooltip: {},
          xAxis: {
            type: "category",
            data: widget.data
              .map((item: any) => Object.keys(item.data))
              .filter(
                (item: any, index: number, arr: any[]) =>
                  arr.indexOf(item) == index,
              ),
            boundaryGap: true,
            axisLabel: { fontSize },
          },
          yAxis: {
            type: "value",
            axisLabel: { fontSize },
          },
          series: widget.data.map((item: any) => {
            return {
              name: widget.name,
              type: "line",
              data: Object.values(item.data),
              label: { fontSize },
            };
          }),
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
    height: mode === "showWidget" ? "60vh" : isHorizontal ? "50vh" : "30vh",
    width: mode === "showWidget" ? "100%" : "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  };

  return (
    <div ref={chartRef} className="widget-chart" style={containerStyles}></div>
  );
};

export default Widget;
