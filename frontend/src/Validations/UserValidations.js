import * as yup from "yup";

export const userValidation = (userName, email, password)=>{
    const userSchema = yup.object().shape({
        userName: yup.string().min(2).max(20).required,
        email: yup.string().email().required,
        password: yup.string().min(6).max(20).required,
    })
    const FormData = {
        userName: userName,
        email: email,
        password: password
    }

    return userSchema.isValid(FormData)

}