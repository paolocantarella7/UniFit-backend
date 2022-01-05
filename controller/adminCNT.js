
exports.exampleGet = async (req, res) => {
    console.log(req.query)
    res.send('Chiamata di esempio GET')
}

exports.examplePost = async (req, res) => {
    console.log(req.query)
    res.send('Chiamata di esempio POST')
}
