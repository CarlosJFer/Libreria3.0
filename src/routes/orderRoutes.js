const { Router } = require("express");
const {
    getAllOrdersHandler,
    getOneOrderHandler,
    createOrderHandler,
    updateOrderHandler,
    deleteOrderHandler
} = require("../handlers/orderHandler");
const ordersRouter = Router();
ordersRouter.post("/", async (req, res) => {
    const { items, metodoPago } = req.body;

    // Crear la orden primero
    const order = await createOrderController(new Date(), 'Pendiente', metodoPago, items);
    const orderId = order._id;

    // Crear la preferencia de pago en Mercado Pago
    try {
        const body = {
            items: items.map((item) => ({
                title: item.title,
                quantity: Number(item.cantidad),
                currency_id: 'ARS',
                unit_price: Number(item.precio),
            })),
            back_urls: {
                success: `https://carlosjfer.github.io/Success-MercadoPago/${orderId}`,
                failure: 'https://carlosjfer.github.io/Failure-MercadoPago/',
                pending: 'https://carlosjfer.github.io/Pending-MercadoPago/',
            },
            auto_return: "approved",
        };
        const preference = await mercadoPagoClient.preferences.create(body);
        res.json({ id: preference.body.id });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating preference");
    }
});


ordersRouter.get("/", getAllOrdersHandler);
ordersRouter.get("/:id", getOneOrderHandler);
ordersRouter.post("/", createOrderHandler);
ordersRouter.put("/:id", updateOrderHandler);
ordersRouter.delete("/:id", deleteOrderHandler);

module.exports = ordersRouter;