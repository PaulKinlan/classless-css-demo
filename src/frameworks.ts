const frameworks: Record<string, {
  name: string, htmlUrl: string, cssUrl: URL
}> = {
  "": { name: "Browser default style", htmlUrl: "/", cssUrl: `/styles/index.css`, siteUrl: "https://meiert.com/en/blog/user-agent-style-sheets/" }, // This is a hack to use my default style
  "attri": { name: "AttriCSS", htmlUrl: "/attri.html", cssUrl: "/styles/attri.css", siteUrl: "https://raj457036.github.io/attriCSS/" },
  "mvp": { name: "MVP.css", htmlUrl: "/mvp.html", cssUrl: "https://unpkg.com/mvp.css", siteUrl: "https://andybrewer.github.io/mvp/" },
  "tufte": { name: "Tufte.css", htmlUrl: "/tufte.html", cssUrl: "/styles/tufte.css", siteUrl: "https://github.com/edwardtufte/tufte-css" },
  "sakura": { name: "Sakura", htmlUrl: "/sakura.html", cssUrl: "/styles/sakura.css", siteUrl: "https://github.com/oxalorg/sakura" },
  "stylize": { name: "Stylize", htmlUrl: "/stylize.html", cssUrl: "/styles/stylize.css", siteUrl: "https://vasanthv.com/stylize.css/demo.html" },
  "water": { name: "Water.css", htmlUrl: "/water.html", cssUrl: "https://cdn.jsdelivr.net/npm/water.css@2/out/water.css", siteUrl: "https://watercss.kognise.dev/" },
  "writ": { name: "Writ", htmlUrl: "/writ.html", cssUrl: "/styles/writ.css", siteUrl: "https://writ.cmcenroe.me/writ.css" },
}

export default frameworks;