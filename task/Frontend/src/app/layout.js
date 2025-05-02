export const metadata = {
  title: 'Apollo Clone',
  description: 'Listing doctors using filters',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-xl font-bold">Apollo247 Clone</h1>
        </header>
        <main className="max-w-6xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
