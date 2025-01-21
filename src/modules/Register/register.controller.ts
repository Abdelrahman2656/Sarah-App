import { User } from "../../../Database";
import { AppRequest, AppResponse } from "../../utils/types";

export const registerPage = (req: AppRequest, res: AppResponse) => {
  res.render("register", { error: req.query.error ,session:null,authentication:null});
};
// signup
export const handleRegister = async (req: AppRequest, res: AppResponse) => {
  //get data
  let { email, name, password } = req.body;
  //check email already exist
  let userExist = await User.findOne({ email });
  if (userExist) {
    return res.redirect("/register?error=Email Already Exist");
  }
  //prepare data
  await User.insertMany({
    email,
    name,
    password,
  });//{} // null
  res.redirect('login')
};
