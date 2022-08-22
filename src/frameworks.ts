const frameworks: Record<string, {
    name: string, htmlUrl: string, cssUrl: URL
  }> = {
    "": { name: "Browser", htmlUrl: "/", cssUrl: `/styles/index.css` }, // This is a hack to use my default style
    "mvp": {name: "MVP.css", htmlUrl: "/mvp.html", cssUrl: 'https://unpkg.com/mvp.css'},
    "water": { name: "Water.css", htmlUrl: "/water.html", cssUrl: new URL("https://cdn.jsdelivr.net/npm/water.css@2/out/water.css") },
    "tufte": { name: "Tufte.css", htmlUrl: "/tufte.html", cssUrl: '/styles/tufte.css' }
  }

export default frameworks;