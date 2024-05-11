import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import nextI18NextConfig from "../next-i18next.config.js";
import React, { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";

import { ThemeProvider, createTheme } from "@mui/material";
import { NextPage } from "next";
import { CartProvider } from "./cart/CartContext";
const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(
    <ThemeProvider theme={theme}>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </ThemeProvider>
  );
}

// export default appWithTranslation(App)
