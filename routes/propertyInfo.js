const Joi = require("joi");
const express = require("express");
const router = express.Router();
const PropertyInfo = require("../models/propertyInfo");

router.use(express.json());

router.post("/", async (req, res) => {
  try {
    const { error } = validateInfo(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    let addInfo = new PropertyInfo({
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      feature: req.body.feature,
      address: req.body.address,
      imageUrl: req.body.imageUrl,
      imageUrlCap1: req.body.imageUrlCap1,
      imageUrlCap2: req.body.imageUrlCap2,
    });
    addInfo = await addInfo.save();
    //show added item after it's being added
    res.send(addInfo);
  } catch (ex) {
    res.send(ex.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const infos = await PropertyInfo.filter((x) => x.isDeleted === false);
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
  const infos = await PropertyInfo.filter(
    (x) => x._id === req.params.id && x.isDeleted === false
  );
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
    const infoUpdate = await PropertyInfo.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
        feature: req.body.feature,
        address: req.body.address,
        imageUrl: req.body.imageUrl,
        imageUrlCap1: req.body.imageUrlCap1,
        imageUrlCap2: req.body.imageUrlCap2,
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
    const info = await PropertyInfo.updateOne(
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
    title: Joi.string().min(4).max(100).required(),
    type: Joi.string().min(8).max(100).required(),
    description: Joi.string().min(8).max(100).required(),
    address: Joi.string().min(8).max(200).required(),
    feature: Joi.string().min(8).max(100).required(),
    imageUrl: Joi.string().required(),
    imageUrlCap1: Joi.string(),
    imageUrlCap2: Joi.string(),
  });
  return schema.validate(info);
}

module.exports = router;
