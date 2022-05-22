export default (req,res) => {
    let body: string = ""
    req.on('data', (chunk) => {
        body += chunk
    })
    req.on('end', () => {
        if(body) {
            req.body = JSON.parse(body)
        }
    })
}