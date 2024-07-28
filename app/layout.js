"use client";

import { Inter } from "next/font/google";
import { useEffect } from "react";
import Head from "next/head";
import { css, Global } from "@emotion/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const globalStyles = css`
  body, html {
    margin: 0;
    padding: 0;
    overflow-x: hidden; /* Prevent horizontal scrolling */
  }
`;

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
    <html lang="en">
      <Head>
        <title>Depala Rajeswari</title>
        <meta name="description" content="This is the description of Depala Rajeswari's website." />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <body className={inter.className}>
        <Global styles={globalStyles} />
        <div className="content-wrapper">{children}</div>
      </body>
    </html>
  );
}
