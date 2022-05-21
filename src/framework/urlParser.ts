export default (baseUrl: string) => (req, res) => {
    const parsedURL = new URL(req.url, baseUrl)
    console.log(parsedURL)
    const params = {}
    parsedURL.searchParams.forEach((value, key) => params[key] = value)
    req.pathname = parsedURL.pathname
    req.params = params
}