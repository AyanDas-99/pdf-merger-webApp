const express = require('express');
const path = require('path');
const app = express()
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const { mergePdfs } = require('./merge')
app.use('/static', express.static('public'))
app.use(express.static('templates'));

const port = 3000

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/templates/index.html"))
})

app.post('/merge', upload.array('pdfs', 2), async function (req, res, next) {
    console.log(req.files);
    if (req.files.length === 2) {
        d = await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path));
        res.redirect(`http://localhost:3000/static/${d}.pdf`)
    }
    else {
        res.redirect("http://localhost:3000/index.html")
    }
    // res.send({data: req.files});
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
})



app.listen(port, () => {
    console.log(`Example app listening on  http://localhost:${port}`)
})