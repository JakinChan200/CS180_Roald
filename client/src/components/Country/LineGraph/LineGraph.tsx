import * as React from "react";
import { ResponsiveLine } from "@nivo/line";
import { sortAndDeduplicateDiagnostics } from "typescript";

export type Props = {
  results: any[];
  color?: boolean;
  title: string;
};

const scrollWidth = {
  width: 10000
}

export const LineGraph: React.FC<Props> = ({ results, color, title }) => {
  switch (title){
    case 'Query':
      scrollWidth.width = 20000;
      break;
    default:
      scrollWidth.width = 1850;
  }

  for(let i = 0; i < results.length-1; i++){
    if(results[i].x === results[i+1].x){
      results[i].y = ((parseInt(results[i].y) + parseInt(results[i+1].y))/2).toString();
      results.splice(i+1, 1);
      i--;
    }
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
