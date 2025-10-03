import "./globals.css";

export const metadata = {
  title: "Imperial Courses",
  description: "Courses catalog implementing the provided Figma design.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased bg-[#FAF7F2] text-slate-900">
        {children}
      </body>
    </html>
  );
}
