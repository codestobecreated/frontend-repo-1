"use client";

import React from "react";

interface LazySectionProps {
  children: React.ReactNode;
  placeholderHeight?: string;
}

export default function LazySection({ children }: LazySectionProps) {
  return <>{children}</>;
}

