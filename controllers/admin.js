const Admin = require('../schema/admin')
const Donor = require('../schema/donor');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
	try {
		const {
				name,
				email,
				password,
		} = req.body;
		
		//  verifications
		if (!name || !email || !password) {
			throw {
				status: 400,
				message: "Missing required fields"
			}
		}
		if (password.length < 6) {
			throw {
				status: 400,
				message: "Password must be at least 6 characters long"
			}
		}
		if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
			throw {
				status: 400,
				message: "Email must be valid"
			}
		}

		// checks
		let user = await Admin.findOne({email});
		if (user) {
			throw {
				status: 400,
				message: "Email already registered"
			}
		}

		//	creating donor
		const newUser = new Admin({
			name,
			email,
			password
		});
		await newUser.save();
		
		res.status(201).json({ message: "admin created" });
	} catch (error) {
		console.log(error);
		res.status(error?.status ?? 400).json({ message: error?.message ?? "Something went wrong" });
	}
}

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			throw {
				status: 400,
				message: "Missing required fields"
			}
		}
		const user = await Admin.findOne({ email });
		if (!user) {
			throw {
				status: 400,
				message: "admin not found"
			}
		}
		if (user.password !== password) {
			throw {
				status: 400,
				message: "Invalid password"
			}
		}
		const token = jwt.sign({ id: user._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });

		res.status(200).json({ message: "admin logged in", token });
	} catch (error) {
		console.log(error);
		res.status(error?.status ?? 400).json({ message: error?.message ?? "Something went wrong" });
	}
}

exports.showDonors = async (req, res) => {
  try {
    const donors = await Donor.find().select('-password -__v -address');
    res.status(200).json({ donors });
  } catch (error) {
    console.log(error);
    res.status(error?.status ?? 400).json({ message: error?.message ?? "Something went wrong" });
  }
}

exports.deleteDonor = async (req, res) => {
  try {
    const { id } = req.body;
    const donor = await Donor.findByIdAndDelete(id);
    if (!donor) {
      throw {
        status: 400,
        message: "Donor not found"
      }
    }
    res.status(200).json({ message: "Donor deleted" });
  } catch (error) {
    console.log(error);
    res.status(error?.status ?? 400).json({ message: error?.message ?? "Something went wrong" });
  }
}
