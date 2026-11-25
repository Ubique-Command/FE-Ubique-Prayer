import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Ubique Prayer",
    short_name: "Ubique Prayer",
    description: "함께 기도하는 공간",
    lang: "ko",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#3b7556",
    icons: [192, 512].map((size) => ({
      src: `/icons/prayer-${size}.png`,
      sizes: `${size}x${size}`,
      type: "image/png",
      purpose: "any",
    })),
  };
}
