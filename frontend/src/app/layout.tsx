import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeLayout } from "./(application)/themelayout";
import { Navbar } from "@/components/ui/navbar";
// import { AuthProvider } from "@/context/provider/authprovider";
import UserProvider from "@/context/provider/userprovider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muxi",
  description: "A simple music app",
};

// Hydration failed because the server rendered HTML didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.className} bg-gradient-to-br from-blue-300/90 via-white to-rose-300 bg-no-repeat dark:bg-none dark:bg-background antialiased`}
      >
        <ThemeLayout>
          {/* <AuthProvider> */}
            <UserProvider>
            <Navbar />
            {children}
            </UserProvider>
          {/* </AuthProvider> */}
        </ThemeLayout>
      </body>
    </html>
  );
}
