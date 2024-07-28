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
  }

  :root {
    --theme: light;
  }

  body {
    background-color: var(--theme, white);
    color: var(--theme, black);
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

    window.addEventListener("wheel", preventZoom, { passive: false });
    window.addEventListener("keydown", preventZoomKeys);

    return () => {
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
      </head>
      <CacheProvider value={cache}>
        <Global styles={globalStyles} />
        <body className={inter.className}>
          {children}
        </body>
      </CacheProvider>
    </html>
  );
}
