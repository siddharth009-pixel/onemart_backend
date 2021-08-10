const UserAddress = require("../models/address");
const userModel = require("../models/user");

exports.addAddress = async (req, res) => {
  // let addressModelId='';
  const { payload } = req.body;
  if (payload) {
    if (payload.id) {
      
      await UserAddress.findOneAndUpdate(
        { user: req.user._id, "address._id": payload.id },
        {
          $set: {
            "address.$": {
              ...payload.address,
            },
          },
        },
        { new: true, upsert: true }
      ).exec((error, address) => {
        if (error) {
          return res.status(400).send({ error: error });
        }
        if (address) {
          console.log({address}) 
          return res.status(201).send({ userAddress: address });
        }
      });

      // userModel.findOneAndUpdate({_id:req.user._id},{
      //   $set:{
      //     "address":addressModelId
      //   }
      // })

    } else {
      UserAddress.findOneAndUpdate(
        { user: req.user._id },
        {
          $push: {
            address: payload.address,
          },
        },
        { new: true, upsert: true }
      ).exec((error, address) => {
        if (error) {
          return res.status(400).send({ error: error });
        }
        if (address) {
          return res.status(201).send({ userAddress: address });
        }
      });
    }
  } else {
    return res.status(400).send({ error: "params required" });
  }
};

exports.getAddress = async (req, res) => {
  UserAddress.findOne({ user: req.user._id }).exec((error, address) => {
    if (error) {
      return res.status(400).send({ error: error });
    }
    if (address) {
      return res.status(200).send({ userAddress: address });
    }
    if (!address) {
      return res.status(200).send({ userAddress: [] });
    }
  });
};
