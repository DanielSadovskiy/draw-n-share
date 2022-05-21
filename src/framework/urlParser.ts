export default (baseUrl: string) => (req, res) => {
    const parsedURL = new URL(req.url, baseUrl)
}