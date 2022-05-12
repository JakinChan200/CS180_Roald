import * as React from "react";
import { ResponsiveLine } from "@nivo/line";

export type Props = {
  results: any[];
  color?: boolean;
  size: number;
};

const scrollWidth = {
  width: 20000
}

export const LineGraph: React.FC<Props> = ({ results, color, size }) => {
  if (size <= 15){
    scrollWidth.width = 1750
  }
  else if (size < 51){
    scrollWidth.width = 2000
  }
  else if (size < 201){
    scrollWidth.width = 7000
  }
  else if (size < 1000){
    scrollWidth.width = 14000
  }
  else if (size < 2000){
    scrollWidth.width = 17000
  }
  else{
    scrollWidth.width = 22000
  } 
  return (
    <div style={{ height: 420, maxWidth: "100%", overflow: 'scroll'}}>
      <ResponsiveLine {... scrollWidth}
        data={[
          {
            id: "videos",
            data: results,
          },
        ]}
        colors={{ scheme: "paired" }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        lineWidth={5}
        pointLabelYOffset={1}
        pointSize={12}
        curve="monotoneX"
        pointBorderWidth={3}
        useMesh={true}
        enableSlices={false}
        enableGridY={false}
        margin={{ top: 10, right: 20, bottom: 60, left: 80 }}
        pointSymbol={
          !color
            ? () => (
                <circle
                  cx="0"
                  cy="0"
                  r="5"
                  fill="var(--light-blue)"
                  stroke="var(--light-blue)"
                />
              )
            : (e) => {
                let colorStroke = "";
                let colorFill = "";
                if (e.datum.custom) {
                  colorStroke = "black";
                  colorFill = "black";
                } else {
                  colorStroke = "var(--light-blue)";
                  colorFill = "var(--light-blue)";
                }
                return (
                  <circle
                    cx="0"
                    cy="0"
                    r="5"
                    stroke={colorStroke}
                    strokeWidth="2"
                    fill={colorFill}
                  />
                );
              }
        }
      />
    </div>
  );
};
