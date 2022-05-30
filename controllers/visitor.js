const jwt = require('jsonwebtoken');
const Donor = require('../schema/donor');

exports.signin = async (req, res) => {
  try {
    const { name, bloodGroupType, bloodGroupSign } = req.body;
    const token = jwt.sign({ name, bloodGroupSign, bloodGroupSign, role: 'donor' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 week
      sameSite: true,
      secure: false,
      signed: true
    });
    res.status(200).json({ message: "User logged in" });
  } catch (error) {
    console.log(error);
    res.status(error.status).json({ message: error.message });
  }
}

exports.signout = async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: "User logged out" });
  } catch (error) {
    console.log(error);
    res.status(error.status).json({ message: error.message });
  }
}

exports.getDonors = async (req, res) => {
  try {
    const bgType = req.body.bloodGroupType;
    const bgSign = req.body.bloodGroupSign;
    let donors;
    if (bgType === 'AB') {  //  AB <-- all
      donors = await Donor.find({}).select('name email age weight');
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
        }]
      }).select('name email age weight');
    } else if (bgType === 'B') {  //  B <-- B,O
      donors = await Donor.find({
        $or: [{
          bloodGroupType: bgType
        }, {
          bloodGroupType: 'O'
        }]
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
    res.status(error.status).json({ message: error.message });
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
    res.status(error.status).json({ message: error.message });
  }
}
