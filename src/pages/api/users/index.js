import dbConnect from 'lib/dbConnect';
import { User } from 'models/User';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    await dbConnect();
    const { username, password, email, fname, lname } = req.body;
    const user = new User({ username, password, email, fname, lname });

    try {
      await user.save();
      res.status(200).json({ message: "User created successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong." });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};

export default handler;
