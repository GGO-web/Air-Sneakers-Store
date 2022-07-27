import {
   browserSessionPersistence,
   FacebookAuthProvider,
   GoogleAuthProvider,
   inMemoryPersistence,
   setPersistence,
   signInWithEmailAndPassword,
   signInWithPopup,
   User,
} from "firebase/auth";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useSigninCheck } from "reactfire";

import { firebaseAuth } from "../../firebaseConfig";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { IUser } from "../../redux/user/user.model";
import { signIn } from "../../redux/user/userSlice";

import { isValidEmail } from "../../utilities/emailValidator";
import { isValidPassword } from "../../utilities/passwordValidator";

const Login = () => {
   const [errors, setErrors] = useState({ email: true, password: true });
   const [validated, setValidated] = useState(false);

   const dispatch = useAppDispatch();
   const { data: signInCheckResult } = useSigninCheck();
   const navigate = useNavigate();

   const [showPassword, setShowPassword] = useState(false);

   const formCheckboxRef = useRef<HTMLInputElement>(null);

   const formChangeEvent = (event: FormEvent<HTMLFormElement>) => {
      const form: HTMLFormElement = event.currentTarget;

      setErrors({
         email: isValidEmail(form["email"].value),
         password: isValidPassword(form["password"].value),
      });

      setValidated(
         isValidEmail(form["email"].value) &&
            isValidPassword(form["password"].value)
      );
   };

   const formSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
      const form: HTMLFormElement = event.currentTarget;

      event.preventDefault();
      event.stopPropagation();

      setValidated(false);

      signInWithEmailAndPassword(
         firebaseAuth,
         form["email"].value,
         form["password"].value
      )
         .then(async () => {
            if (formCheckboxRef.current?.checked) {
               await setPersistence(firebaseAuth, browserSessionPersistence);
            } else {
               await setPersistence(firebaseAuth, inMemoryPersistence);
            }
         })
         .catch(() => {
            form.reset();
            setErrors({ email: true, password: true });
         });
   };

   const loginWith = (
      AuthProvider: typeof FacebookAuthProvider | typeof GoogleAuthProvider
   ) => {
      const provider = new AuthProvider();
      signInWithPopup(firebaseAuth, provider);
   };

   const togglePassword = () => {
      setShowPassword(!showPassword);
   };

   useEffect(() => {
      if (signInCheckResult?.signedIn) {
         const user = signInCheckResult.user as User;

         dispatch(
            signIn({ name: user.displayName, email: user.email } as IUser)
         );

         navigate("/");
      }
   });

   return (
      <section className="authentication login section-offsets">
         <div className="authentication__inner container">
            <h1 className="authentication__title title mb-5">Login</h1>

            <Form
               noValidate
               validated={validated}
               onChange={(e) => formChangeEvent(e)}
               onSubmit={(e) => formSubmitHandler(e)}
               className="authentication__form authentication-form"
            >
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
                  <Form.Check
                     type="checkbox"
                     id={`default-checkbox`}
                     label={`Remember Me`}
                     ref={formCheckboxRef}
                  />
               </Form.Group>

               <Button
                  type="submit"
                  className="mt-3 authentication__form-button button-style btn-reset w-100"
                  disabled={!validated}
               >
                  Login
               </Button>
            </Form>

            <div className="login__auth mt-5 mb-5">
               <h2 className="login__auth-title text-muted text-center mt-3 mb-3">
                  <span>or continue with</span>
               </h2>

               <Row
                  xs="auto"
                  className="login__auth-providers d-flex justify-content-center"
               >
                  <Col>
                     <Button
                        onClick={() => loginWith(FacebookAuthProvider)}
                        className="login__auth-button btn-reset"
                     >
                        <img
                           className="login__auth-img"
                           src="images/facebook.svg"
                           alt="facebook"
                        />
                     </Button>
                  </Col>
                  <Col>
                     <Button
                        onClick={() => loginWith(GoogleAuthProvider)}
                        className="login__auth-button btn-reset"
                     >
                        <img
                           className="login__auth-img"
                           src="images/google.svg"
                           alt="google"
                        />
                     </Button>
                  </Col>
               </Row>
            </div>

            <p className="authentication__text-moveback text-center text-muted">
               Don't have an account?{" "}
               <NavLink className="link-primary" to="/signup">
                  Sign up
               </NavLink>
            </p>
         </div>
      </section>
   );
};

export default Login;
