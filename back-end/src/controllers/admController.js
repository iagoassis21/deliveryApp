const createUsers = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(409).json({ message: 'Conflict User' });
  }
};

const deleteUsers = async (req, res) => {
  try {
    const newUser = await userService.deleteUser(req.body);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(409).json({ message: 'Not Found' });
  }
};

module.exports = {
  createUsers,
  deleteUsers,
};