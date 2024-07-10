import "./globals.css";

export const metadata = {
  title: "Cigar Buddy",
  description: "Your buddy for cigar recommendations",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
