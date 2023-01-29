const { default: Stripe } = require("stripe")
const stripe = new Stripe("")

const subUser = async (req, res) => {
    const { email, paymentMethod } = req.body

    const customer = await stripe.customers.create({
        payment_method: paymentMethod,
        email: email,
        invoice_settings: {
            default_payment_method: paymentMethod
        }
    })

    const theSub = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ plan: "price_1MOWZ4Bf3U2rieTNpRX5UYTO" }],
        expand: ["latest_invoice_payment_intent"]
    })
}

module.exports = subUser