export const metadata = {
  title: "Fraud Voice Analyzer",
  description: "Detect fraud & AI-like speech patterns"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
