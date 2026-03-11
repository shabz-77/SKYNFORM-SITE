import "./globals.css";

export const metadata = {
  title: "SKYNFORM",
  description: "Ferrari-level real-time configurator experience for wrap shops.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/sqe1ahf.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}