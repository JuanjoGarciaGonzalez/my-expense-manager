// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  try {
    const { token, name, lastName, email, profileImage, password } = req.body;

    // Validar campos requeridos
    if (!token || !name || !lastName || !email || !password) {
      return res.status(404).json({ message: 'Todos los campos requeridos deben ser proporcionados.' });
    }

     // Encriptar la contraseña
     const hashedPassword = await bcrypt.hash(password, 10);

    // Crear y guardar nuevo usuario
    const newUser = new User({
      token,
      name,
      lastName,
      email,
      profileImage,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error ocurred creating user.' });
  }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(500).json({ status: 500, message: 'User not found.' });
        }
        res.status(200).json({status: 200, user});
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error ocurred getting user.' });
    }
}

exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found.' });
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json({ status: 404, message: 'Invalid password.' });
        }
        res.status(200).json(user);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error ocurred logging user.' });
    }
}