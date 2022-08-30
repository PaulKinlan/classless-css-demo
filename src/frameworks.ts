/*
  To add a framework, add in the details below:
  + Please keep it in alphabetical order.
  + If you need to add a version of the stylesheet, add it to the /static/styles folder (otherwise a link is fine).
  + Make sure to add a link to the homepage.
*/

const frameworks: Record<string, {
  name: string, htmlUrl: string, cssUrl: URL
}> = {
  "": { name: "Browser default style", htmlUrl: "/", cssUrl: `/styles/index.css`, siteUrl: "https://meiert.com/en/blog/user-agent-style-sheets/" }, // This is a hack to use my default style
  "attri": { name: "AttriCSS", htmlUrl: "/attri.html", cssUrl: "/styles/attri.css", siteUrl: "https://raj457036.github.io/attriCSS/" },
  "awsm": { name: "Awsm.css", htmlUrl: "/awsm.html", cssUrl: "/styles/awsm.css", siteUrl: "https://igoradamenko.github.io/awsm.css/elements.html" },
  "basic": { name: "Basic.css", htmlUrl: "/basic.html", cssUrl: "/styles/basic.css", siteUrl: "https://vladocar.github.io/Basic.css/" },
  "bahunya": { name: "Bahunya", htmlUrl: "/bahunya.html", cssUrl: " https://cdn.jsdelivr.net/gh/kimeiga/bahunya/dist/bahunya.min.css", siteUrl: "https://hakanalpay.com/bahunya/" },
  "bedrocss": { name: "Bedrocss", htmlUrl: "/bedrocss.html", cssUrl: "https://unpkg.com/bedrocss", siteUrl: "https://bedrocss.austingil.com/" },
  "classless": { name: "Classless.css", htmlUrl: "/classless.html", cssUrl: "https://classless.de/classless.css", siteUrl: "https://classless.de/" },
  "downstyler": { name: "Downstyler", htmlUrl: "/downstyler.html", cssUrl: "https://raw.githack.com/waldyrious/downstyler/master/downstyler.css", siteUrl: "https://waldyrious.net/downstyler/" },
  "holiday": {name: "Holiday.css", htmlUrl: "holiday.html", cssUrl: "https://cdn.jsdelivr.net/npm/holiday.css@0.9.8", siteUrl: "https://holidaycss.js.org/"},
  "marx": { name: "Marx", htmlUrl: "/marx.html", cssUrl: "/styles/marx.css", siteUrl: "https://mblode.github.io/marx/" },
  "mvp": { name: "MVP.css", htmlUrl: "/mvp.html", cssUrl: "https://unpkg.com/mvp.css", siteUrl: "https://andybrewer.github.io/mvp/" },
  "openprops": { name: "OpenProps + Normalize.css", htmlUrl: "/openprops.html", cssUrl: "/styles/openprops.css", siteUrl: "https://open-props.style" },
  "sakura": { name: "Sakura", htmlUrl: "/sakura.html", cssUrl: "/styles/sakura.css", siteUrl: "https://github.com/oxalorg/sakura" },
  "simple": { name: "Simple.css", htmlUrl: "/simple.html", cssUrl: "https://cdn.simplecss.org/simple.min.css", siteUrl: "https://simplecss.org/demo" },
  "stylize": { name: "Stylize", htmlUrl: "/stylize.html", cssUrl: "/styles/stylize.css", siteUrl: "https://vasanthv.com/stylize.css/demo.html" },
  "tacit": { name: "Tacit", htmlUrl: "/tacit.html", cssUrl: "https://cdn.jsdelivr.net/gh/yegor256/tacit@gh-pages/tacit-css-1.5.5.min.css", siteUrl: "https://yegor256.github.io/tacit/" },
  "tufte": { name: "Tufte.css", htmlUrl: "/tufte.html", cssUrl: "/styles/tufte.css", siteUrl: "https://github.com/edwardtufte/tufte-css" },
  "water": { name: "Water.css", htmlUrl: "/water.html", cssUrl: "https://cdn.jsdelivr.net/npm/water.css@2/out/water.css", siteUrl: "https://watercss.kognise.dev/" },
  "writ": { name: "Writ", htmlUrl: "/writ.html", cssUrl: "/styles/writ.css", siteUrl: "https://writ.cmcenroe.me/writ.css" },
}

export default frameworks;