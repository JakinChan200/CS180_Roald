import * as React from "react";
import { ResponsiveLine, Serie } from "@nivo/line";

export type Props = {
  results: any[];
  color?: boolean;
};

export const LineGraph: React.FC<Props> = ({ results, color }) => {
  console.log(results);
  return (
    <div style={{ height: 420, maxWidth: "100%" }}>
      <ResponsiveLine
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
