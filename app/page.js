"use client";
import React from "react";
import dynamic from 'next/dynamic';

// Dynamically import BrowserRouter with no SSR
const BrowserRouter = dynamic(() => import('react-router-dom').then(mod => mod.BrowserRouter), { ssr: false });

import { Route, Routes } from "react-router-dom";
import ResumePage from "./ResumePage";

export default function Page() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<ResumePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
