const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Role = require("../models/Role");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateTokens");

exports.register = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const roleData = await Role.findOne({ where: { name: role } });

    if (!roleData) return res.status(400).json({ message: "Role not found" });

    const newUser = await User.create({
      email,
      password: hashedPassword,
      roleId: roleData.id,
    });

    res.status(201).json({ message: "User registered", userId: newUser.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email }, include: Role });

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = generateAccessToken({ id: user.id, role: user.Role.name });
    const refreshToken = generateRefreshToken({ id: user.id, role: user.Role.name });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // set true in production
    });

    res.json({ accessToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
