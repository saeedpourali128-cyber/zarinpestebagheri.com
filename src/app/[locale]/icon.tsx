import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#071f14",
        }}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#dab465"
          strokeWidth="1.4"
        >
          <path d="M12 2.5c2.6 0 4.2 2.4 4.2 6.2 0 5.4-2.4 9.6-4.2 12.8-1.8-3.2-4.2-7.4-4.2-12.8 0-3.8 1.6-6.2 4.2-6.2Z" />
          <path d="M9 8.3c.8.6 1.9.9 3 .9s2.2-.3 3-.9" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
