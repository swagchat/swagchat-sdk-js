export function createQueryParams(params: {[key: string]: string | number}) {
    return Object.keys(params)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(String(params[key])))
        .join("&");
}
