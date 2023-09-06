import { userLogin, userRegister } from "../redux/features/auth/authActions";
import store from "../redux/store";

export const handleLogin = (e,email,password,role)=>{

    e.preventDefault();
    console.log("welcome to this ")
    try{
        if(!role || !email || !password)
        {
            return alert("Provide All fields")
        }
        console.log("login", e, role, email, password);
        store.dispatch(userLogin({email, password, role}))
    }
    catch(error)
    {

        console.log(error);
    }
}

export const handleRegister = (
    e,
    name,
    role,
    email,
    password,
    phone,
    organisationName,
    address,
    hospitalName,
    website
)=>{

        e.preventDefault();
        try{
          console.log("register =>",  e,
          name,
          role,
          email,
          password,
          phone,
          organisationName,
          address,
          hospitalName,
          website)
        
          store.dispatch(
            userRegister({
              name,
              role,
              email,
              password,
              phone,
              organisationName,
              address,
              hospitalName,
              website,
            })
          );
      


        }
        catch(error)
        {
            console.log(error);
        }
             
    };
    