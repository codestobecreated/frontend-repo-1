import type { NextConfig } from "next";

// Allow the local Django backend (http) during `next dev`; production uses https.
const DEV_BACKEND =
  process.env.NODE_ENV === "development" ? " http://localhost:8000 http://127.0.0.1:8000" : "";

const nextConfig: NextConfig = {
  output: "export",
  async redirects() {
    return [
      {
        source: "/ev-charging-station-franchise",
        destination: "/business/franchise",
        permanent: true,
      },
      {
        source: "/ZeroPayment",
        destination: "/business/zero-investment",
        permanent: true,
      },
      {
        source: "/franchise",
        destination: "/business/franchise",
        permanent: true,
      },
      {
        source: "/blog&news",
        destination: "/activity-hub/blogs",
        permanent: true,
      },
      {
        source: "/service",
        destination: "/business/service",
        permanent: true,
      },
      {
        source: "/products",
        destination: "/business/products",
        permanent: true,
      },
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "core.reluxelectric.com",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/llms.txt",
        headers: [
          {
            key: "Content-Type",
            value: "text/plain; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "Origin-Trial",
            value:
              "Ar3e18jUYYlmpRl2ByRmxAw8GiIq2VfXOWcXMYtpnxChtOF6rRe4YaoKfMgjl1XLP0IqrDXU4JjnTLAcBziP0g8AAABkeyJvcmlnaW4iOiJodHRwczovL3JlbHV4ZWxlY3RyaWMuY29tOjQ0MyIsImZlYXR1cmUiOiJXZWJNQ1AiLCJleHBpcnkiOjE3OTQ4NzM2MDAsImlzU3ViZG9tYWluIjp0cnVlfQ==",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Content-Security-Policy",
            value: `default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval'${DEV_BACKEND}; frame-src 'self' https://www.youtube.com https://youtube.com https://www.instagram.com https://instagram.com; img-src 'self' https: data: blob:${DEV_BACKEND}; media-src 'self' https: data: blob:${DEV_BACKEND};`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
