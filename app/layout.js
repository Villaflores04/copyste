export const metadata = {
  title: "CopySte",
  description: "Copy and edit text panels"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
