import * as yup from "yup"

const regFormValidationSchema = yup.object().shape(
    {
        fullName : yup.string().required("Name cant be empty!"),
        email : yup.string().required("Email cant be empty!").email("Enter a valid email!"),
        pwd : yup.string().required("Cant be empty!").min(6, "Minimum 6 characters!"),
        cnfPwd : yup.string().required("Cant be empty!").oneOf([yup.ref("pwd"), null], "Passwords do not match!")
    }
)

export default regFormValidationSchema