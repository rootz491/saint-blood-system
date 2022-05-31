const jwt = require('jsonwebtoken');
const Donor = require('../schema/donor');

exports.signin = async (req, res) => {
  try {
    const { name, bloodGroupType, bloodGroupSign } = req.body;
    const token = jwt.sign({ name, bloodGroupSign, bloodGroupType, role: 'visitor' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ message: "User logged in", token });
  } catch (error) {
    console.log(error);
    res.status(error?.status ?? 400).json({ message: error?.message ?? "Something went wrong" });
  }
}

exports.getDonors = async (req, res) => {
  try {
    res.send('getDonors');  
    const bgType = req.body.bloodGroupType;
    const bgSign = req.body.bloodGroupSign;
    let donors = null;
    if (bgType === 'AB') {  //  AB <-- all
      donors = await Donor.find({bloodGroupSign: bgSign}).select('name email age weight');
    } else if (bgType === 'O') {  //  O <-- O
      donors = await Donor.find({
        bloodGroupType: bgType
      }).select('name email age weight');
    } else if (bgType === 'A') {  //  A <-- A,O
      donors = await Donor.find({
        $or: [{
          bloodGroupType: bgType
        }, {
          bloodGroupType: 'O'
        }],
        bloodGroupSign: bgSign
      }).select('name email age weight');
    } else if (bgType === 'B') {  //  B <-- B,O
      donors = await Donor.find({
        $or: [{
          bloodGroupType: bgType
        }, {
          bloodGroupType: 'O'
        }],
        bloodGroupSign: bgSign
      }).select('name email age weight');
    } else {
      throw {
        status: 500,
        message: "something went wrong"
      }
    }
    res.status(200).json({ donors });
  } catch (error) {
    console.log(error);
    res.status(error?.status ?? 400).json({ message: error?.message ?? "Something went wrong" });
  }
}

exports.getDonor = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id).select('name email age weight address phone');
    donor.visitors += 1;
    await donor.save();
    res.status(200).json({ donor });
  } catch (error) {
    console.log(error);
    res.status(error?.status ?? 400).json({ message: error?.message ?? "Something went wrong" });
  }
}
