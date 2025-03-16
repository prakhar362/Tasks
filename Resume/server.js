const express = require("express");
const multer = require("multer");
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 5000;

// Configure multer for file uploads
const upload = multer({ dest: "uploads/" });

app.post("/parse-resume", upload.single("resume"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = path.join(__dirname, req.file.path);

    const pythonProcess = spawn("python", ["resume_parser.py", filePath]);


    let output = "";
    pythonProcess.stdout.on("data", (data) => {
        output += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
        console.error(`Error: ${data}`);
    });

    pythonProcess.on("close", (code) => {
        fs.unlinkSync(filePath); // Delete uploaded file after processing
        if (code !== 0) {
            return res.status(500).json({ error: "Error processing resume" });
        }
        res.json(JSON.parse(output));
    });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});