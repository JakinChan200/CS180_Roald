import * as React from "react";
import { ResponsiveLine, Serie } from "@nivo/line";

export type Props = {};
const data = [
  {
    id: "hours",
    data: [
      { x: "A", y: "2019-05-29 04:00" },
      { x: "B", y: "2019-05-29 02:00" },
      { x: "C", y: "2019-05-29 07:00" },
      { x: "D", y: "2019-05-30 04:00" }
    ]
  }
];
export const LineGraph: React.FC = ({}) => {
  return (
    <div style={{ height: 420, maxWidth: "100%" }}>
      <ResponsiveLine
        data={data}
        colors={{ scheme: "accent" }}
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
        animate={true}
      />
    </div>
  );
}

// import * as React from "react";
// import { ResponsiveLine, Serie } from "@nivo/line";

// export type Props = {};
// const data = [
//   {
//     id: "hours",
//     data: [
//       { x: "A", y: "2019-05-29 04:00" },
//       { x: "B", y: "2019-05-29 02:00" },
//       { x: "C", y: "2019-05-29 07:00" },
//       { x: "D", y: "2019-05-30 04:00" }
//     ]
//   }
// ];
// export const LineGraph: React.FC = ({}) => {
//   return (
//     <div style={{ height: 420, maxWidth: "100%" }}>
//       <ResponsiveLine
//         data={data}
//         margin={{ top: 20, right: 20, bottom: 60, left: 80 }}
//         animate={true}
//         enableSlices={"x"}
//         yScale={{
//           type: "linear",
//           stacked: true,
//           min: 0,
//           max: 1000
//         }}
//         lineWidth={3}
//         curve="linear"
//         colors={["#028ee6", "#774dd7"]}
//         enableGridX={false}
//         pointSize={12}
//         pointColor="white"
//         pointBorderWidth={2}
//         pointBorderColor={{ from: "serieColor" }}
//         layers={[
//           "grid",
//           "markers",
//           "areas",
//           "lines",
//           "slices",
//           "axes",
//           "points",
//           "legends"
//         ]}
//         theme={{
//           crosshair: {
//             line: {
//               strokeWidth: 2,
//               stroke: "#774dd7",
//               strokeOpacity: 1
//             }
//           }
//         }}
//       />
//     </div>
//   );
// }

// import React from "react";
// //import ReactDOM from "react-dom";
// import { ResponsiveLine } from "@nivo/line";
// import "./LineGraph.css"

// const data = [
//   {
//     id: "hours",
//     data: [
//       { x: "A", y: "2019-05-29 04:00" },
//       { x: "B", y: "2019-05-29 02:00" },
//       { x: "C", y: "2019-05-29 07:00" },
//       { x: "D", y: "2019-05-30 04:00" }
//     ]
//   }
// ];
// export const LineGraph = ({}) => {
//   return (
//     <div className="App" style={{ height: 400 }}>
//       <h1>Line y axis time scale</h1>
//       <ResponsiveLine
//         data={data}
//         margin={{ top: 50, right: 60, bottom: 50, left: 120 }}
//         xScale={{ type: "point" }}
//         yScale={{
//           type: "time",
//           format: "%Y-%m-%d %H:%M",
//           precision: "hour"
//         }}
//         yFormat="time:%Hh"
//         axisLeft={{
//           //orient: "left",
//           format: "%Hh%M [%d]",
//           legend: "day hour",
//           legendOffset: -80,
//           legendPosition: "middle"
//         }}
//         pointSize={10}
//         pointColor="white"
//         pointBorderWidth={2}
//         pointBorderColor={{ from: "serieColor" }}
//         useMesh={true}
//       />
//     </div>
//   );
// };

//const rootElement = document.getElementById("root");
//ReactDOM.render(<LineGraph />, rootElement);
// interface LineGraphProps {
//     notOpen?: boolean;
//   }
  
// export const LineGraph: React.FC<LineGraphProps> = ({
//     notOpen,
//     ...props
//   }) => {
//     const [isOpen, setIsOpen] = React.useState<boolean | undefined>(!notOpen);
//     const variant = isOpen ? "open" : "closed";
  
//     return (
//         <div>
//         <Line
//           width={600}
//           height={400}
//           margin={{ top: 60, right: 80, bottom: 60, left: 80 }}
//           axisBottom={{
//             //orient: "bottom",
//             tickSize: 0,
//             tickPadding: 10,
//             tickRotation: 0,
//             tickValues: ["FI", "CM"]
//           }}
//           data={[
//             {
//               id: "whatever",
//               data: [
//                 {
//                   x: "FI",
//                   y: 12
//                 },
//                 {
//                   x: "CM",
//                   y: 17
//                 },
//                 {
//                   x: "AW",
//                   y: 19
//                 },
//                 {
//                   x: "NL",
//                   y: 9
//                 }
//               ]
//             }
//           ]}
//         />
//       </div>
//     );
//   };
