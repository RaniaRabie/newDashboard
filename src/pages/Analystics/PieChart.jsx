import { Box, useTheme } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";

const data = [
  { id: "MUI", label: "MUI", value: 212 },
  { id: "CSS", label: "CSS", value: 382 },
  { id: "HTML", label: "HTML", value: 150 },
  { id: "JavaScript", label: "JavaScript", value: 161 },
  { id: "React", label: "React", value: 319 },
];

export default function PieChart() {
  const theme = useTheme();

  return (
    <Box sx={{ height: "75vh",  }}>
      <ResponsivePie
        data={data}
        colors={[
          "#98c1d9",
          "#6A9AB0",
          "#3d5a80",
          "#293241",
          "#ee6c4d",
        ]}
        theme={{
          text: {
            fontSize: 11,
            fill: theme.palette.text.primary,
            outlineWidth: 0,
            outlineColor: "transparent",
          },
          // Keep other theme settings as they are...
        }}
        margin={{ top: 40, right: 90, bottom: 80, left: 0 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#black" 
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor="#ffffff" // Set to white
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: theme.palette.text.primary,
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: theme.palette.text.secondary,
                },
              },
            ],
          },
        ]}
      />
    </Box>
  );
}
