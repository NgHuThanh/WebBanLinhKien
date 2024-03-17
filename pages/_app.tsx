import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../next-i18next.config.js'
import React from "react";
import { Provider } from 'react-redux'
import { store } from "@/lib/store";
import { ThemeProvider, createTheme } from "@mui/material";


const theme = createTheme({
  palette: {
    mode: "dark"
  }
});


const App = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </ThemeProvider>
)

export default appWithTranslation(App)

