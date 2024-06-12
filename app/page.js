"use client";
import React from 'react';
import CompletePage from '@/components/CompletePage';

export default function Home() {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <style>
          {`
            body {
              touch-action: none;
            }
          `}
        </style>
      </head>
      <body>
        <div>
          <CompletePage />
        </div>
      </body>
    </html>
  );
}