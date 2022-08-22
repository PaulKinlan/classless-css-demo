import { serve } from "https://deno.land/std@0.152.0/http/server.ts";
import { join } from "https://deno.land/std@0.152.0/path/mod.ts";
import { contentType } from "https://deno.land/std@0.152.0/media_types/mod.ts";
import template from "./src/flora.ts";

import { Route, Framework } from "./src/types.ts";
import frameworks from "./src/frameworks.ts";

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

const render = (currentFramework) => {
  return template`
  <link rel="stylesheet" href="${frameworks[currentFramework].cssUrl.toString()}">

  <h1>Welcome</h1>
  <p>I was struggling to make a simple page I was building look decent. 
     I knew there were stylesheets just used 'semantic html' (like Tufte) and didn't require any special className 
     (i.e <code>&ltbutton class="btn-primary"&gt;a button&lt;/button&gt;</code>), however I was struggling to find them.</p>
  <blockquote>I should know this, but I'm looking for a simple CSS stylesheet that would replace the default user agent and make it look half decent. Google-fu is failing me, all I can find is resets and full frameworks. :\
  </blockquote>

  <p><a href="https://twitter.com/Paul_Kinlan/status/1560769014787411969">Twitter to the rescue</a>:</p>

  <p>Once I found examples of 'class-less CSS', it was a bit of a pain to find them and compare all the different examples. Hence this page.</p>

  <p>This page is designed to collate all the CSS frameworks into one place and let you compare and contrast them.</p>
  
  <p>Here is the list of class-less CSS frameworks that you can checkout:</p>

  <ul>
    ${Object.values(frameworks).map(framework => template`<li><a href="${framework.htmlUrl}">${framework.name}</a> - <a href="${framework.siteUrl}">homepage</a></li>`)}
  </ul>

  <p>If you have a framework you would like include, create PR against <a href="https://github.com/PaulKinlan/classless-css-demo/blob/main/src/frameworks.ts">frameworks.ts</a></p>
  
  <p><a href="https://paul.kinlan.me/">Check out my other site.</a></p>
  <hr>

  <p>This page is rendered using ${frameworks[currentFramework].name}.</p>
  <p>Some of the entries are taken from the layout from <a href="https://vasanthv.com/stylize.css/demo.html">stylize</a>.</p>

  <section>
			<h2>Typography:</h2>
			<h1>This is a H1 heading</h1>
			<h2>This is a H2 heading</h2>
			<h3>This is a H3 heading</h3>
			<h4>This is a H4 heading</h4>
			<h5>This is a H5 heading</h5>
			<h6>This is a H6 heading</h6>
			<p>This is a paragraph of text. It's my paragraph, I like it.</p>
			<br>
			<strong>This is a Strong / Bold text</strong>
			<br>
			<i>This is an Emphasized / Italic text</i>
			<br>
			This is a <mark>Marked / Highlighted</mark> text
			<br>
			<small>This is a Small text</small>
			<br>
			This is a <del>Deleted</del> text
			<br>
			This is a <ins>Underlined / Inserted</ins> text
			<br>
			This is a <sub>Subscript</sub> text
			<br>
			This is a <sup>Superscript</sup> text
			<br>
			<pre>This is a preformatted text.</pre>
			<blockquote>This is a Blockquote.</blockquote>
			<samp>This is a sample output.</samp>
			<br>
			This is the <code>&lt;code&gt;</code> &amp; <kbd>kbd</kbd>
			<br>
			<h3>Links &amp; navigation:</h3>
			<nav>
				<a href="#">Nav Link 1</a>
				<a href="#">Nav Link 2</a>
				<div class="right">
					<a href="#">Nav Link 3</a>
				</div>
			</nav>
			<br>
			<br>
			<a href="#">Normal link</a>
		</section>`
    .then(data => new Response(data, { status: 200, headers: { 'content-type': 'text/html' } }));
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
        return render(""); // index
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