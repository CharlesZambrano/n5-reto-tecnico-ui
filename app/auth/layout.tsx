// *? n5-reto-tecnico-ui/app/auth/layout.tsx

import clsx from "clsx";

import { Providers } from "../providers";

import { fontSans } from "@/config/fonts";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
      <main
        className={clsx(
          "flex items-center justify-center min-h-screen bg-gray-50 font-sans antialiased",
          // eslint-disable-next-line prettier/prettier
          fontSans.variable
        )}
      >
        {children}
      </main>
    </Providers>
  );
}
