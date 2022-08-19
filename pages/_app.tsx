// Basic imports
import AppLayout from "../layout/AppLayout"

// Styles
import "../styles/globals.css"

// Types
import type { NextPage } from "next"
import type { AppProps } from "next/app"
import type { ReactElement, ReactNode } from "react"

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)
  return getLayout(
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  )
}

export default App
