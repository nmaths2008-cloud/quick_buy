const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
// Initialize Razorpay with secret keys from dashboard
const razorpay = new Razorpay({
  key_id: 'YOUR_RAZORPAY_KEY_ID',     // Replace with your Key ID
  key_secret: 'YOUR_RAZORPAY_KEY_SECRET' // Replace with your Secret Key
});
// Endpoint to create an order
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const options = {
      amount: amount * 100, // Amount in lowest subunit (e.g., paise or cents)
      currency: currency || "INR",
      receipt: `receipt_${Date.now()}`
    };
    const order = await razorpay.orders.create(options);
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
app.listen(5000, () => console.log('Server running on port 5000'));