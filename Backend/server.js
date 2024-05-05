const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 5500;

// Middleware to parse JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Define route for handling form submission
app.post('/submit-order', (req, res) => {
    // Process form data and calculate total amount here
    const formData = req.body;
    let totalPrice = 0;

    // Calculate price
    totalPrice += formData.quantity1 * 14.99;
    totalPrice += formData.quantity2 * 3.99;
    totalPrice += formData.quantity3 * 2.99;
    totalPrice += formData.quantity4 * 18.99;
    totalPrice += formData.quantity5 * 4.99;

    // Send response with total price or error message
    if (totalPrice > 0) {
        const htmlResponse = `
            <html>
                <head>
                    <title>Order Confirmation</title>
                </head>
                <body>
                    <h1>Order submitted successfully!</h1>
                    <p>Total price: $${totalPrice.toFixed(2)}</p>
                    <p>Thank you for choosing the Tech Cafe!</p>
                </body>
            </html>
        `;
        res.send(htmlResponse);
    } else {
        res.status(400).send('Error: Invalid form data');
    }
});

// Define route for serving the order confirmation page
app.get('/', (req, res) => {
    // Serve the order confirmation web page here
    res.sendFile(path.join(__dirname, '../Frontend/HTML/index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
