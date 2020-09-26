import type { GatsbyBrowser } from "gatsby"

const onClientEntry: GatsbyBrowser["onClientEntry"] = () => {
  const polyfills: Promise<any>[] = []

  if (typeof fetch === "undefined") {
    polyfills.push(import("whatwg-fetch"))
  }

  // add your polyfills here

  return Promise.all(polyfills)
}

export default onClientEntry
