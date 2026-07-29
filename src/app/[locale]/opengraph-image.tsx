import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config/site";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const fontsDir = path.join(process.cwd(), "node_modules/vazirmatn/fonts/ttf");
  const [regular, bold] = await Promise.all([
    readFile(path.join(fontsDir, "Vazirmatn-Regular.ttf")),
    readFile(path.join(fontsDir, "Vazirmatn-Bold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-end",
          backgroundColor: "#071f14",
          padding: "80px",
          textAlign: "right",
          fontFamily: "Vazirmatn",
        }}
      >
        <div style={{ display: "flex", color: "#dab465", fontSize: 28 }}>
          {siteConfig.locationLabel}
        </div>
        <div
          style={{
            display: "flex",
            color: "#fbf8f0",
            fontSize: 64,
            fontWeight: 700,
            marginTop: 16,
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            display: "flex",
            color: "#f4eeda",
            fontSize: 30,
            marginTop: 20,
          }}
        >
          {siteConfig.legalName}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Vazirmatn", data: regular, weight: 400, style: "normal" },
        { name: "Vazirmatn", data: bold, weight: 700, style: "normal" },
      ],
    }
  );
}
