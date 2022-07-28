import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

import { firebaseAuth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { isValidEmail } from "../../utilities/emailValidator";
import { isValidPassword } from "../../utilities/passwordValidator";
import { isValidUserName } from "../../utilities/userNameValidator";
import { FirebaseError } from "firebase/app";

const SignUp = () => {
   const [touched, setTouched] = useState(false);
   const [inputControls, setInputControls] = useState({
      userName: "",
      email: "",
      password: "",
   });

   const navigate = useNavigate();

   const [showPassword, setShowPassword] = useState(false);

   const [formSubmitError, setFormSubmitError] = useState("");

   const formCheckIsValid = () => {
      return (
         isValidUserName(inputControls.userName) &&
         isValidEmail(inputControls.email) &&
         isValidPassword(inputControls.password)
      );
   };

   const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setTouched(true);

      setInputControls({
         ...inputControls,
         [event.target.name]: event.target.value,
      });
   };

   const formSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const form: HTMLFormElement = event.currentTarget;

      try {
         const result = await createUserWithEmailAndPassword(
            firebaseAuth,
            inputControls.email,
            inputControls.password
         );

         await updateProfile(result.user, {
            displayName: inputControls.userName,
         });

         navigate("/login");
      } catch (error: any) {
         const fireError = error as FirebaseError;

         if (fireError.message.includes("email-already-in-use")) {
            setFormSubmitError("Email is already in use, try another one.");
         } else if (fireError.message.includes("weak-password")) {
            setFormSubmitError("The password is too weak.");
         } else {
            setFormSubmitError(fireError.message);
         }

         form.reset();
      }
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
               validated={formCheckIsValid()}
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
                        value={inputControls.userName}
                        onChange={inputChangeHandler}
                        placeholder="Your name"
                        isInvalid={
                           !isValidUserName(inputControls.userName) && touched
                        }
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
                        value={inputControls.email}
                        onChange={inputChangeHandler}
                        placeholder="Your email"
                        isInvalid={
                           !isValidEmail(inputControls.email) && touched
                        }
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
                        value={inputControls.password}
                        onChange={inputChangeHandler}
                        placeholder="Your password"
                        isInvalid={
                           !isValidPassword(inputControls.password) && touched
                        }
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
                  disabled={!formCheckIsValid()}
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

            <Modal
               show={formSubmitError ? true : false}
               onHide={() => setFormSubmitError("")}
               centered
            >
               <Modal.Header closeButton>
                  <Modal.Title>
                     You got an error while submitting the form
                  </Modal.Title>
               </Modal.Header>
               <Modal.Body>{formSubmitError}</Modal.Body>
            </Modal>
         </div>
      </section>
   );
};

export default SignUp;
