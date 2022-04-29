import * as React from "react";
import { ResponsiveLine, Serie } from "@nivo/line";

export type Props = {
  results: any[];
};

export const LineGraph: React.FC<Props> = ({ results }) => {
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
      />
    </div>
  );
};