const { Order, Productcart } = require("../models/order");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((error, order) => {
      if (error) {
        return res.status(400).json({
          error: "No order found in the DB",
        });
      }
      req.order = order;
      next();
    });
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);

  order.save((error, order) => {
    if (error) {
      return res.status(400).json({
        error: "Failed to save your order in DB",
      });
    }
    res.json(order);
  });
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name ")
    .exec((error, orders) => {
      if (error) {
        return res.status(400).json({
          error: "No orders found",
        });
      }

      res.json(orders);
    });
};

exports.updateStatus = (req, res) => {
  Order.update(
    {_id: req.body.orderId},
    {$set: {status: req.body.status}},
    (error, order) => {
      if(error) {
        return res.status(400).json({
          error: "Cannot update order status"
        })
      }

      res.json(order)
    }
  )
}

exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path('status').enumValues)
}