export type Route = [URLPattern, RequestHandler];
export type RequestHandler = (Request) => Response;
export type Framewprk = [string, URL]