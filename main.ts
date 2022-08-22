import { serve } from "https://deno.land/std@0.152.0/http/server.ts";
import { join } from "https://deno.land/std@0.152.0/path/mod.ts";
import { contentType } from "https://deno.land/std@0.152.0/media_types/mod.ts";
import template from "./src/flora.ts";

import { Route, Framework } from "./src/types.ts";
//import { StripStream } from "./src/stream-utils.ts";

class StaticFileHandler {

  #basePath: string = "";

  constructor(base: string) {
    this.#basePath = base;
  }

  handler(request: Request): Response {
    const pathname = new URL(request.url).pathname;
    const extension = pathname.substr(pathname.lastIndexOf("."));
    const resolvedPathname = (pathname == "" || pathname == "/") ? "/index.html" : pathname;
    const path = join(Deno.cwd(), this.#basePath, resolvedPathname)
    const file = Deno.readFile(path)
      .then(data => new Response(data, { status: 200, headers: { 'content-type': contentType(extension) } })) // Need to think about content tyoes.
      .catch(_ => new Response("Not found", { status: 404 }));

    return file;
  }

  get pattern(): URLPattern {
    return new URLPattern({ pathname: "*" })
  }
}

const frameworks: Record<string, {
  name: string, htmlUrl: string, cssUrl: URL
}> = {
  "": { name: "Browser", htmllUrl: "/", cssUrl: new URL(`${window.location}/styles/index.css`) }, // This is a hack to use my default style
  "water": { name: "Water.css", htmlUrl: "/water.html", cssUrl: new URL("https://cdn.jsdelivr.net/npm/water.css@2/out/water.css") }
}

const render = (framework) => {
  return template`
  <link rel="stylesheet" href="${frameworks[framework].cssUrl.toString()}">
  <h1>Hello World</h1>
  <ul>
    ${Object.values(frameworks).map(framework => template`<ol><a href="${framework.htmlUrl}">${framework.name}</a></ol>`)}
  </ul>`.then(data => new Response(data, { status: 200, headers: { 'content-type': 'text/html' } }));
}

serve((req: Request) => {
  const url = req.url;
  const staticFiles = new StaticFileHandler('static');
  let response: Response = new Response(new Response("Not found", { status: 404 }));

  // Probably only needs to be a static site
  const routes: Array<Route> = [
    [
      new URLPattern({ pathname: "/" }),
      (request, patternResult) => {
        console.log(window.location)
        return render("index");
      }
    ],
    [
      new URLPattern({ pathname: "/:framework.html" }),
      (request, patternResult) => {
        const pathname = new URL(request.url).pathname;
        const { framework } = patternResult.pathname.groups;

        if (framework == null) {
          return new Response("Not found", { status: 404 })
        }

        return render(framework);
      }
    ],
    // Fall through.
    [
      staticFiles.pattern,
      staticFiles.handler.bind(staticFiles)
    ]
  ];

  for (const [pattern, handler] of routes) {
    const patternResult = pattern.exec(url);
    console.log(pattern, url, patternResult)
    if (patternResult != null) {
      // Find the first matching route.
      const responseFromHandler = handler(req, patternResult);

      response = responseFromHandler;
      break;
    }
  }

  return response;
});