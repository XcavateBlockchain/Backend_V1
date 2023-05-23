const Joi = require("joi");
const express = require("express");
const router = express.Router();
//const {Customer, validate} = require('../model/Customer');
const Lookup = require("../models/lookup");

router.use(express.json());

// router.post("/", async (req, res) => {
//   try {
//     const { error } = validateLookup(req.body); // using object destructuring since the validate has another item called value. which we can add in the {}

//     if (error) {
//       return res.status(400).send(error.details[0].message);
//     }
//     let addCustomer = new Customer({
//       name: req.body.name,
//       isGold: req.body.isGold,
//       phone: req.body.phone,
//     });
//     addCustomer = await addCustomer.save();
//     //show added item after it's being added
//     res.send(addCustomer);
//   } catch (ex) {
//     res.send(ex.message);
//   }
// });

router.get("/", async (req, res) => {
  try {
    //const customers = await Customer.find().sort("name");
    //res.send(customers);
    res.json("customers");
  } catch (ex) {
    res.send(ex.message);
  }
});

// router.get("/:id", async (req, res) => {
//   const customer = await Customer.findById(req.params.id);
//   if (!customer)
//     return res
//       .status(404)
//       .send("The customers with the given ID was not found.");
//   res.send(customer);
// });

// function validateLookup(lookup) {
//   const schema = Joi.object({
//     name: Joi.string().min(4).max(50).required(),
//     isGold: Joi.boolean(),
//     phone: Joi.string().min(8).max(20).required(),
//   });
//   return schema.validate(lookup);
// }

module.exports = router;
