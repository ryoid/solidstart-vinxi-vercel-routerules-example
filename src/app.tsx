// @refresh reload
import { MetaProvider, Title } from "@solidjs/meta"
import { Router } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start"
import { Suspense } from "solid-js"
import "./app.css"
import Provider from "./components/Provider"

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Provider initialCount={10}>
            <Title>SolidStart - Bare</Title>
            <a href="/" title="swr 60s">
              Index
            </a>
            <a href="/about" title="swr 60s">
              About
            </a>
            <a href="/dynamic" title="Always fresh">
              Dynamic
            </a>
            <a href="/static" title="Always static">
              Static
            </a>
            <a href="/prerendered" title="Prerendered at build time">
              Prerendered
            </a>

            <a href="/redirect" title="Redirect to /static">
              Redirect
            </a>
            <Suspense>{props.children}</Suspense>
          </Provider>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  )
}
