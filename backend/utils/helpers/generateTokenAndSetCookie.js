import jwt from "jsonwebtoken"

const generateTokenAndSetCookie = (userID, res) => {
  const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  })

  res.cookie("jwt", token, {
    httpOnly: true, // this prevents client side JS from reading the cookie
    maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
    sameSite: "strict", //CSRF
  })

  return token
}

export default generateTokenAndSetCookie
