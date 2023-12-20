import { RouteSectionProps, cache, createAsync } from "@solidjs/router"
import { clientOnly } from "@solidjs/start"
import ms from "ms"
import { Show, createSignal, onMount } from "solid-js"

import Counter from "~/components/Counter"
const BreaksOnServer = clientOnly(() => import("~/components/BreaksOnServer"))

const getInfo = cache(async () => {
  "use server"
  return {
    region: process.env.VERCEL_REGION,
  }
}, "info")

export const route = {
  load: () => getInfo(),
}
const generatedAt = new Date()

export default function (props: RouteSectionProps) {
  const info = createAsync(getInfo)

  const [timeAgo, setTimeAgo] = createSignal<string>()
  onMount(() => {
    console.log("onMount")
    console.log("generatedAt", generatedAt.valueOf())
    console.log("Date.now()", Date.now())
    console.log("diff", Date.now() - generatedAt.valueOf())
    console.log("diff ms", ms(Date.now() - generatedAt.valueOf(), { long: true }))
    setTimeAgo(ms(Date.now() - generatedAt.valueOf(), { long: true }))
  })

  return (
    <main>
      <h1>Hello World!</h1>
      <div>
        {info() && (
          <div>
            <span>Served by </span>
            <strong style="text-transform: uppercase;">{info()!.region || "-"}</strong>
          </div>
        )}
      </div>

      <div>
        <div>
          <span>Generated</span>
          <span>
            <strong>
              <Show when={timeAgo()} fallback={`...`}>
                {(timeAgo) => ` ${timeAgo()} ago`}
              </Show>
            </strong>
            <div>{Date.now()}</div>
            <div>{generatedAt.valueOf()}</div>
            <div>{Date.now() - generatedAt.valueOf()}</div>
            <div>{ms(Date.now() - generatedAt.valueOf(), { long: true })}</div>
          </span>
        </div>
      </div>

      <div>Regenerated at {generatedAt.toISOString()}</div>

      <Counter />

      <BreaksOnServer />
    </main>
  )
}
