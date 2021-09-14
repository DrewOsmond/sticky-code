import Cookies from "js-cookie";

export const csrfProtectedFetch = async (
  url: RequestInfo,
  options: RequestInit | undefined
) => {
  if (options) {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    requestHeaders.set("XSRF-TOKEN", Cookies.get("XSRF-TOKEN") as string);
    options.headers = requestHeaders;
    const res = await window.fetch(url, options);

    if (res.status >= 400) {
      console.error(res);
    } else return res;
  } else {
    const standardHeader = { method: "GET", headers: {} };
    const res = await window.fetch(url, standardHeader);

    if (res.status >= 400) {
      console.error(res);
    } else return res;
  }
};
