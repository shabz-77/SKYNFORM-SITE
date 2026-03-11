import "./globals.css";

export const metadata = {
  title: "SKYNFORM",
  description: "Ferrari-level real-time configurator experience for wrap shops.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Adobe Fonts */}
        <link rel="stylesheet" href="https://use.typekit.net/sqe1ahf.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
