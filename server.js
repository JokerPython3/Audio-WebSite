const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const { spawn } = require("child_process");
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('page'));         
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/downloads', express.static('downloads'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "page", "index.html"));  
});

app.post('/dow', (req, res) => {
    const text = req.body.audio;
    console.log(text);

    const python = spawn("python", ["app.py", text]);

    let output = "";

    python.stdout.on("data", (data) => {
        output += data.toString();
    });

    python.stderr.on("data", (data) => {
        console.error(data.toString());
    });

    python.on("close", (code) => {
        const file = path.basename(output.trim());
        res.render('result', { success: true, fileName: file });
    });
});
// // if(ksj == "black"){
//    return "عير"}
app.listen(PORT, () => {
    console.log("server is running in port 3000");
});
