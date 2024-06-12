const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/create-checkout-session', async (req, res) => {
    const { region, email } = req.body;

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price_data: {
                currency: 'usd',
                product_data: {
                    name: 'Enrollment Fee',
                    description: `Enrollment fee for region: ${region}`,
                },
                unit_amount: 5000, // Amount in cents ($50)
            },
            quantity: 1,
        }],
        customer_email: email,
        mode: 'payment',
        success_url: 'https://your-website.com/success.html',
        cancel_url: 'https://your-website.com/cancel.html',
    });

    res.json({ id: session.id });
});

app.listen(4242, () => console.log('Running on port 4242'));
