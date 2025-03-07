// app/layout.tsx
import "@/app/globals.css";
import Navbar from "../components/Navbar";
import ClientOnlyProvider from "../components/ClientOnlyProvider"; // Import the Client-Only Provider

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Render ClientOnlyProvider to ensure Redux works client-side */}
        <ClientOnlyProvider>
          <Navbar />
          <main>{children}</main>
        </ClientOnlyProvider>
      </body>
    </html>
  );
}
