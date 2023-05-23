const Joi = require("joi");
const express = require("express");
const router = express.Router();
//const {Customer, validate} = require('../model/Customer');
const PersonalInfo = require("../models/personalInfo");

router.use(express.json());

//add personal request
router.post("/", async (req, res) => {
  try {
    // using object destructuring since the validate has another item called value. which we can add in the {}
    const { error } = validateInfo(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    let addInfo = new PersonalInfo({
      fullName: req.body.fullName,
      phone: req.body.phone,
      email: req.body.email,
      bio: req.body.bio,
      address: req.body.address,
      imageUrl: req.body.imageUrl,
    });
    addInfo = await addInfo.save();
    //show added item after it's being added
    res.send(addInfo);
  } catch (ex) {
    res.send(ex.message);
  }
});

router.get("/allInfos", async (req, res) => {
  try {
    //const infos = await PersonalInfo.filter((x) => x.isDeleted === true);
    const infos = await PersonalInfo.find();
    res.send(infos);
    //res.json(infos);
  } catch (ex) {
    res.send(ex.message);
  }
});

// router.get("/", async (req, res) => {
//   try {
//     const infos = await PersonalInfo.find().sort("name");
//     res.send(infos);
//     //res.json(customers);
//   } catch (ex) {
//     res.send(ex.message);
//   }
// });

router.get("/:id", async (req, res) => {
  const infos = await PersonalInfo.findById(req.params.id);
  if (!infos)
    return res
      .status(404)
      .send("The customers with the given ID was not found.");
  res.send(infos);
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validateInfo(req.body); // using object destructuring since the validate has another item called value. which we can add in the {}

    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const infoUpdate = await PersonalInfo.findByIdAndUpdate(
      req.params.id,
      {
        fullName: req.body.fullName,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        bio: req.body.bio,
        imageUrl: req.body.imageUrl,
      },
      { new: true }
    );
    if (!infoUpdate) {
      return res.status(404).send("cant update item, record does not exist");
    }
    res.send(infoUpdate);
  } catch (ex) {
    res.send(ex.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const info = await PersonalInfo.updateOne(
      { _id: req.params.id },
      { $set: { isDeleted: true } },
      { new: true }
    ); //Parameter "filter" to updateOne() must be an object error, if u don't use _id
    res.send(info);
  } catch (ex) {
    res.send(ex.message);
  }
});

// router.delete("/:id", async (req, res) => {
//   const infoDelete = await PersonalInfo.findByIdAndRemove(req.params.id);
//   if (!infoDelete)
//     return res
//       .status(404)
//       .send("The Info with the given ID was not found.");
//   //res.send(infoDelete); //see the deletd item
//   res.status(200).send("Item removed successfully");
// });

function validateInfo(info) {
  const schema = Joi.object({
    fullName: Joi.string().min(4).max(100).required(),
    phone: Joi.string().min(8).max(40).required(),
    email: Joi.string().min(8).max(100).required(),
    address: Joi.string().min(8).max(200).required(),
    bio: Joi.string().min(8).max(300).required(),
    imageUrl: Joi.string(),
  });
  return schema.validate(info);
}

module.exports = router;
