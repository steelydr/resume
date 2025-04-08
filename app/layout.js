"use client";

import { useEffect } from "react";
import { Inter } from "next/font/google";
import { CacheProvider, Global, css } from "@emotion/react";
import createCache from "@emotion/cache";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const globalStyles = css`
  html, body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    width: 100%;
    max-width: 100%;
    touch-action: pan-x pan-y;
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }
  .container {
    max-width: 100vw;
    overflow-x: hidden;
  }
`;

const cache = createCache({ key: "css" });

export default function RootLayout({ children }) {
  useEffect(() => {
    const preventZoom = (event) => {
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
      }
    };

    const preventZoomKeys = (event) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        (event.key === "+" || event.key === "-" || event.key === "0")
      ) {
        event.preventDefault();
      }
    };

    window.addEventListener("touchstart", preventZoom, { passive: false });
    window.addEventListener("touchmove", preventZoom, { passive: false });
    window.addEventListener("wheel", preventZoom, { passive: false });
    window.addEventListener("keydown", preventZoomKeys);

    return () => {
      window.removeEventListener("touchstart", preventZoom);
      window.removeEventListener("touchmove", preventZoom);
      window.removeEventListener("wheel", preventZoom);
      window.removeEventListener("keydown", preventZoomKeys);
    };
  }, []);

  return (
    <html lang="en" className={inter.className}>
      <head>
        <title>Rajeswari Depala</title>
        <meta name="description" content="My Resume Application" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="google-site-verification" content="o087uF7ht2Coqk9UaqJQlCNuCkTCV3ArmU4av2EtfXU" />
      </head>
      <CacheProvider value={cache}>
        <Global styles={globalStyles} />
        <body className="container">
          {children}
        </body>
      </CacheProvider>
    </html>
  );
}
