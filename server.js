// const express = require('express');
// const bodyParser = require('body-parser');
// const validator = require('validator');

// const app = express();
// const port = 3000;
// const cors = require(`cors`);
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Endpoint to process emails
// app.post('/process-emails', (req, res) => {
//     console.log(req.body)
//     const emails = req.body.emails;

//     if (!emails || emails.length === 0) {
//         return res.status(400).json({ message: "No emails provided" });
//     }

//     const emailSet = new Set();
//     const duplicates = [];
//     const validEmails = [];
//     const invalidEmails = [];
//     const punctuationErrors = [];

//     emails.forEach(email => {
//         // Email validation
//         if (validator.isEmail(email)) {
//             validEmails.push(email);
//         } else {
//             invalidEmails.push(email);
//         }

//         // Duplicate detection
//         if (emailSet.has(email)) {
//             duplicates.push(email);
//         } else {
//             emailSet.add(email);
//         }

//         // Punctuation check (simple punctuation check for period and spaces)
//         if (!email.includes('.') || email.includes('  ')) {
//             punctuationErrors.push(email);
//         }
//     });

//     // Respond with results
//     res.json({
//         validEmails,
//         invalidEmails,
//         duplicates,
//         punctuationErrors,
//         totalValidEmails: validEmails.length,
//         totalInvalidEmails: invalidEmails.length
//     });
// });



const express = require('express');
const bodyParser = require('body-parser');
const validator = require('validator');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to process emails
app.post('/process-emails', (req, res) => {
    console.log(req.body);
    const emails = req.body.emails;

    if (!emails || emails.length === 0) {
        return res.status(400).json({ message: "No emails provided" });
    }

    const emailSet = new Set();
    const duplicates = [];
    const validEmails = [];
    const invalidEmails = [];
    const punctuationErrors = [];

    emails.forEach(email => {
        // Check for valid email
        if (validator.isEmail(email)) {
            validEmails.push(email);
        } else {
            invalidEmails.push(email);
        }

        // Check for duplicates
        if (emailSet.has(email)) {
            duplicates.push(email);
        } else {
            emailSet.add(email);
        }

        // Check for punctuation errors (e.g., missing period or double spaces)
        if (!email.includes('.') || email.includes('  ')) {
            punctuationErrors.push(email);
        }
    });

    // Response with results
    res.json({
        validEmails,
        invalidEmails,
        duplicates,
        punctuationErrors,
        totalValidEmails: validEmails.length,
        totalInvalidEmails: invalidEmails.length
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


