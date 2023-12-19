const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const ffmpeg = require('ffmpeg-static');

app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    let filePath = path.join(__dirname, 'index.html');
    serveFile(filePath, res);

});


function serveFile(filePath, res, statusCode = 200) {
    let extname = path.extname(filePath);
    let contentType = 'text/html';

    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.mp3':
            contentType = 'audio/mpeg';
            break;
        case '.mp4':
            contentType = 'video/mp4';
            break;
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.status(404).json({ error: 'Not Found' });  // Send a JSON error response
        } else {
            res.status(statusCode).type(contentType).send(content);
        }
    });
}


// API endpoint
app.post('/', (req, res) => {
    const inputData = req.body.data;
    console.log(`Received data: ${inputData}`);

    // ...  thala checking logic
    function operationThala(input){
        //check whether it is string or int
        function convertStringToInt(input) {
            const parsedInt = parseInt(input, 10);
        
            if (!isNaN(parsedInt)) {
                return parsedInt;
            } else {
                return input;
            }
        }
        //check sum of digits
        function sumDigits(number) {
            const digits = number.toString().split('').map(Number);
            const sum = digits.reduce((acc, digit) => acc + digit, 0);
            return sum;
        }

        //check the ascii values of string ...not working:(
        //function asciiTotalChecker(input) {
        //    let sum = 0;
        
        //    for (let i = 0; i < input.length; i++) {
        //        sum += input[i].ascii; // Use input[i].ascii instead of arr[i]
        //    }
        
        //    return sum;
        //}
        
        //checking the lenght of the string
        function processString(input) {
            const length = input.length;
        
            if (length % 7 === 0) {
                return true;
            } else {
                return false;
            }
        }
        //main
        if (typeof(convertStringToInt(input))==='number'){
            const Input=convertStringToInt(input);
            if (sumDigits(Input)%7==0){
                num=sumDigits(Input)/7;
                const digitsArray = Input.toString().split('').map(Number);
                if (num==1){
                    return `${digitsArray.join('+')} = 7... Thala for a reason!`;
                }else{return `${digitsArray.join('+')}/${num} = 7... Thala for a reason!`;}
                
            
            }else if (Input==0){
                return `${Input}/ 7 = 7... Thala for a reason!`;
            }else if (Input%7==0){
                num=Input/7;
                return `${Input}/${num} = 7... Thala for a reason!`;
            }else{
                return `Thala for any and every reason`;
            }
        }else if (processString(input)===true){
            const num=input.length/7
            const charArray = input.split('')
            if (num==1){
                return `${charArray.join('+')} = 7... Thala for a reason!`;
            }else{return `String length is ${input.length} and ${input.length}/${num} = 7... Thala for a reason!`;}
            
        }else{
            return `Thala for any and every reason`;
        }
    }
    console.log(operationThala(inputData));

    res.json({ message: operationThala(inputData) });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
