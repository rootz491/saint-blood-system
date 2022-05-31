const Donor = require('../schema/donor')
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
	try {
		const {
				name,
				email,
				password,
				bloodGroupType,
				bloodGroupSign,
				phone,
				age,
				weight,
				address
		} = req.body;
		
		//  verifications
		if (!name || !email || !password || !bloodGroupType || !bloodGroupSign || !phone || !age || !weight || !address) {
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
		if (age < 18 || age > 65) {
			throw {
				status: 400,
				message: "Age must be between 18 and 65"
			}
		}
		if (weight < 50) {
			throw {
				status: 400,
				message: "Weight must be at least 50"
			}
		}
		if (!/^\d+$/.test(phone)) {
			throw {
				status: 400,
				message: "Phone number must be numeric"
			}
		}
		if (phone.length < 10 || phone.length > 10) {
			throw {
				status: 400,
				message: "Phone number must be 10 digits long"
			}
		}
		if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
			throw {
				status: 400,
				message: "Email must be valid"
			}
		}
		if (['A', 'B', 'AB', 'O'].indexOf(bloodGroupType) === -1) {
			throw {
				status: 400,
				message: "Blood group type must be A, B, AB or O"
			}
		}
		if (['+', '-'].indexOf(bloodGroupSign) === -1) {
			throw {
				status: 400,
				message: "Blood group sign must be + or -"
			}
		}
		if (address.length < 10) {
			throw {
				status: 400,
				message: "Address must be at least 10 characters long"
			}
		}
		if (password.length < 8) {
			throw {
				status: 400,
				message: "Password must be at least 8 characters long"
			}
		}

		// checks
		let user = await Donor.findOne({email});
		if (user) {
			throw {
				status: 400,
				message: "Email already registered"
			}
		}

		//	creating donor
		const newUser = new Donor({
			name,
			email,
			password,
			bloodGroupType,
			bloodGroupSign,
			phone,
			age,
			weight,
			address
		});
		await newUser.save();
		
		res.status(201).json({ message: "User created" });
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
		const user = await Donor.findOne({ email });
		if (!user) {
			throw {
				status: 400,
				message: "User not found"
			}
		}
		if (user.password !== password) {
			throw {
				status: 400,
				message: "Invalid password"
			}
		}
		const token = jwt.sign({ id: user._id, role: 'donor' }, process.env.JWT_SECRET, '24h');

		res.status(200).json({ message: "User logged in", token });
	} catch (error) {
		console.log(error);
		res.status(error?.status ?? 400).json({ message: error?.message ?? "Something went wrong" });
	}
}

exports.getUser = async (req, res) => {
	try {
		const user = await Donor.findById(req.user.id).select('-password -__v');
		res.status(200).json({ user });
	} catch (error) {
		console.log(error);
		res.status(error?.status ?? 400).json({ message: error?.message ?? "Something went wrong" });
	}
}

exports.updateUser = async (req, res) => {
	try {
		const { phone, age, weight, address } = req.body;
		const user = await Donor.findById(req.user.id);
		//	verifications
		if (phone && !/^\d+$/.test(phone)) {
			throw {
				status: 400,
				message: "Phone number must be numeric"
			}
		}
		if (phone && phone.length < 10 || phone.length > 10) {
			throw {
				status: 400,
				message: "Phone number must be 10 digits long"
			}
		}
		if (age && (age < 18 || age > 65)) {
			throw {
				status: 400,
				message: "Age must be between 18 and 65"
			}	
		}
		if (weight && (weight < 50)) {
			throw {
				status: 400,
				message: "Weight must be at least 50"
			}	
		}
		if (address && address.length < 10) {
			throw {
				status: 400,
				message: "Address must be at least 10 characters long"
			}
		}

		user.phone = phone;
		user.age = age;
		user.weight = weight;
		user.address = address;

		await user.save();
		res.status(200).json({ message: "User updated" });
	} catch (error) {
		console.log(error);
		res.status(error?.status ?? 400).json({ message: error?.message ?? "Something went wrong" });
	}
}