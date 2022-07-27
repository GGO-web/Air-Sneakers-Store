import { FormEvent, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../hooks/reduxHooks";

import { firebaseAuth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { isValidEmail } from "../../utilities/emailValidator";
import { isValidPassword } from "../../utilities/passwordValidator";
import { isValidUserName } from "../../utilities/userNameValidator";

const SignUp = () => {
   const [errors, setErrors] = useState({
      userName: true,
      email: true,
      password: true,
   });
   const [validated, setValidated] = useState(false);

   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const [showPassword, setShowPassword] = useState(false);

   const formChangeEvent = (event: FormEvent<HTMLFormElement>) => {
      const form: HTMLFormElement = event.currentTarget;

      setErrors({
         userName: isValidUserName(form["userName"].value),
         email: isValidEmail(form["email"].value),
         password: isValidPassword(form["password"].value),
      });

      setValidated(
         isValidEmail(form["email"].value) &&
            isValidUserName(form["userName"].value) &&
            isValidPassword(form["password"].value)
      );
   };

   const formSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
      const form: HTMLFormElement = event.currentTarget;

      event.preventDefault();
      event.stopPropagation();

      createUserWithEmailAndPassword(
         firebaseAuth,
         form["email"].value,
         form["password"].value
      )
         .then((result) => {
            updateProfile(result.user, {
               displayName: (form["userName"] as unknown as HTMLInputElement)
                  .value,
            }).then(() => {
               navigate("/login");
            });
         })
         .catch(() => {
            setValidated(false);

            form.reset();

            setErrors({ userName: true, email: true, password: true });
         });
   };

   const togglePassword = () => {
      setShowPassword(!showPassword);
   };

   return (
      <section className="authentication signup section-offsets">
         <div className="authentication__inner container">
            <NavLink
               to="/login"
               className="d-inline-block btn-reset mb-3"
               style={{ padding: "5px" }}
            >
               <img src="images/arrow-left.svg" alt="Back to Login" />
            </NavLink>

            <h1 className="authentication__title title mb-5">Sign up</h1>

            <Form
               noValidate
               validated={validated}
               onChange={(e) => formChangeEvent(e)}
               onSubmit={(e) => formSubmitHandler(e)}
               className="authentication__form authentication-form mb-5"
            >
               <Form.Group className="authentication__form-group mb-4">
                  <Form.Label className="authentication__form-label">
                     Name
                  </Form.Label>
                  <InputGroup className="authentication-form__input-group mb-3">
                     <Form.Control
                        required
                        name="userName"
                        className="authentication__form-input"
                        type="text"
                        placeholder="Your name"
                        isInvalid={!errors.userName}
                     />
                     <Form.Control.Feedback type="invalid">
                        Name length should be at least 3
                     </Form.Control.Feedback>
                  </InputGroup>
               </Form.Group>

               <Form.Group className="authentication__form-group mb-4">
                  <Form.Label className="authentication__form-label">
                     E-mail
                  </Form.Label>
                  <InputGroup className="authentication-form__input-group mb-3">
                     <InputGroup.Text>
                        <img
                           className="authentication__form-icon"
                           src="/images/mail.svg"
                           alt=""
                        />
                     </InputGroup.Text>

                     <Form.Control
                        required
                        name="email"
                        className="authentication__form-input"
                        type="email"
                        placeholder="Your email"
                        isInvalid={!errors.email}
                     />
                     <Form.Control.Feedback type="invalid">
                        Please, input valid email
                     </Form.Control.Feedback>
                  </InputGroup>
               </Form.Group>

               <Form.Group className="authentication__form-group mb-4">
                  <Form.Label className="authentication__form-label">
                     Password
                  </Form.Label>
                  <InputGroup className="authentication-form__input-group mb-3">
                     <InputGroup.Text>
                        <img
                           className="authentication__form-icon"
                           src="/images/lock.svg"
                           alt=""
                        />
                     </InputGroup.Text>

                     <Form.Control
                        required
                        name="password"
                        className="authentication__form-input authentication__form-input--password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Your password"
                        isInvalid={!errors.password}
                     />

                     <InputGroup.Text className="authentication__form-icon authentication__form-icon--append">
                        <button
                           onClick={() => togglePassword()}
                           type="button"
                           className="btn-reset"
                        >
                           {!showPassword ? (
                              <img src="/images/eye.svg" alt="" />
                           ) : (
                              <img src="/images/eye-crossed.svg" alt="" />
                           )}
                        </button>
                     </InputGroup.Text>

                     <Form.Control.Feedback type="invalid">
                        Password length should be more than 3
                     </Form.Control.Feedback>
                  </InputGroup>
               </Form.Group>

               <Form.Group className="authentication__form-group mb-4">
                  <p className="authentication__form-privacy text-muted">
                     By signing up you agree to our{" "}
                     <a className="link-dark" href="#!">
                        Terms & Condition
                     </a>{" "}
                     and{" "}
                     <a className="link-dark" href="#!">
                        Privacy Policy.*
                     </a>
                  </p>
               </Form.Group>

               <Button
                  type="submit"
                  className="mt-3 authentication__form-button button-style btn-reset w-100"
                  disabled={!validated}
               >
                  Continue
               </Button>
            </Form>

            <p className="authentication__text-moveback text-center text-muted">
               Already signed up?{" "}
               <NavLink className="link-primary" to="/login">
                  Login
               </NavLink>
            </p>
         </div>
      </section>
   );
};

export default SignUp;
