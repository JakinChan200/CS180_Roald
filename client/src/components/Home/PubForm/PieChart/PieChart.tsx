import * as React from "react";
import { ResponsivePie } from '@nivo/pie'

// const data = [
//   {
//     "id": "lisp",
//     "label": "lisp",
//     "value": 168,
//     "color": "hsl(39, 70%, 50%)"
//   },
//   {
//     "id": "scala",
//     "label": "scala",
//     "value": 262,
//     "color": "hsl(187, 70%, 50%)"
//   },
//   {
//     "id": "stylus",
//     "label": "stylus",
//     "value": 410,
//     "color": "hsl(302, 70%, 50%)"
//   },
//   {
//     "id": "python",
//     "label": "python",
//     "value": 368,
//     "color": "hsl(348, 70%, 50%)"
//   },
//   {
//     "id": "make",
//     "label": "make",
//     "value": 599,
//     "color": "hsl(76, 70%, 50%)"
//   }
// ]
// Formatting and code from the nivo chart website https://nivo.rocks/pie/
export type PieChartProps = {
    results: any[];
  };
  
  export const PieChart: React.FC<PieChartProps> = ({ results }) => {
    return (
      <div style={{ height: 420, maxWidth: "100%" }}>
        <ResponsivePie
            data={results}
            margin={{ top: 20, right: 20, bottom: 40, left: 800 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.2
                    ]
                ]
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        2
                    ]
                ]
            }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'ruby'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'c'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'go'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'python'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'scala'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'lisp'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'elixir'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'javascript'
                    },
                    id: 'lines'
                }
            ]}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
        />
      </div>
    );
  };