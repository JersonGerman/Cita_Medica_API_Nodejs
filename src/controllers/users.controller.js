const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Models
const { User } = require('../models/user.model');

const getAllUsers = async (req, res) => {

    const users = await User.findAll({
        attributes: { exclude: ['password'] }
    });

    return res.status(200).json({
        users
    })
}


const createUser = async (req, res) => {
    const { name, email, password, cedula, address, phone, role, status = "active" } = req.body;

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name,
        cedula,
        email,
        password: hashPassword,
        address,
        phone,
        role,
        status
    });

    newUser.password = undefined;
    return res.status(201).json({ newUser })
}

const login = async (req, res) => {
    const { email, password = '' } = req.body;

    // Validate that user exists with given email
    const user = await User.findOne({
        where: { email }
    });

    // Compare password with db
    if (!user || !(await bcrypt.compare(password, user.password))) return res.status(400).json({
        message: "Email or password incorrect"
    })

    // Generate JWT
    const token = await jwt.sign({ id: user.id }, process.env.JWT_KEY , { expiresIn: 60 * 5 }); // 60 * 5 => 5 min.

    user.password = undefined;
    res.status(200).json({ token, user });
}

module.exports = {
    getAllUsers,
    createUser,
    login
}
