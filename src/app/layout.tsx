import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

export const metadata = {
  title: "Imperial Courses",
  description: "Courses catalog implementing the provided Figma design.",
};

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
  variable: "--font-plus-jakarta",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className="min-h-screen antialiased bg-[#FBF6F1] text-slate-900">
        {children}
      </body>
    </html>
  );
}
