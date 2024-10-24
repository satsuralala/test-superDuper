export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <div>
        <body>{children}</body>
      </div>
    );
  } 