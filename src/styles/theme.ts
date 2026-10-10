import { createTheme, MantineColorsTuple } from "@mantine/core";

const brand: MantineColorsTuple = [
  "#f1f8f5",
  "#e4f0e9",
  "#c6e1d1",
  "#a6d2b9",
  "#8ac5a5",
  "#78b996",
  "#6daf8b",
  "#5a9674",
  "#4b8666",
  "#3b7556",
];

export const theme = createTheme({
  primaryColor: "brand",
  colors: { brand },
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  defaultRadius: "md",
});

