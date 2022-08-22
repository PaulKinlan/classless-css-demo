const frameworks: Record<string, {
  name: string, htmlUrl: string, cssUrl: URL
}> = {
  "": { name: "Browser default style", htmlUrl: "/", cssUrl: `/styles/index.css`, siteUrl: "https://meiert.com/en/blog/user-agent-style-sheets/" }, // This is a hack to use my default style
  "mvp": { name: "MVP.css", htmlUrl: "/mvp.html", cssUrl: "https://unpkg.com/mvp.css", siteUrl: "https://andybrewer.github.io/mvp/" },
  "tufte": { name: "Tufte.css", htmlUrl: "/tufte.html", cssUrl: "/styles/tufte.css", siteUrl: "https://github.com/edwardtufte/tufte-css" },
  "water": { name: "Water.css", htmlUrl: "/water.html", cssUrl: new URL("https://cdn.jsdelivr.net/npm/water.css@2/out/water.css"), siteUrl: "https://watercss.kognise.dev/" }
}

export default frameworks;