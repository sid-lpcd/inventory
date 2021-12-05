import {PythonShell} from 'python-shell';
import express from "express";
const app = express();
app.use(express.json());

app.get("/imageUpload", async (req, res) => {
    let options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: 'C:/Users/sidon/Documents/Metalchemy_Vice_President_Engineering/Inventory_App/inventory/python_files/',
        args: ['C:/Users/sidon/Documents/Metalchemy_Vice_President_Engineering/Inventory_App/inventory/python_files/images/acetone.png', '0']
    };
    ocr.ImageDataFinder(path,0)
    PythonShell.run('ocr.py', options, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        console.log('results: %j', results);
    });
    res.json(results);
})

export default {
    path: "/api",
    handler: app
};

