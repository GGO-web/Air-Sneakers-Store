import { FormEvent, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

import { isValidEmail } from "../../utilities/emailValidator";
import { isValidPassword } from "../../utilities/passwordValidator";

const Login = () => {
   const [errors, setErrors] = useState({ email: true, password: true });
   const [validated, setValidated] = useState(false);

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
      event.preventDefault();
      event.stopPropagation();

      setValidated(false);

      event.currentTarget.reset();
      setErrors({ email: true, password: true });
   };

   return (
      <section className="login section-offsets">
         <div className="login__inner container">
            <h1 className="login__title title mb-5">Login</h1>

            <Form
               noValidate
               validated={validated}
               onChange={(e) => formChangeEvent(e)}
               onSubmit={(e) => formSubmitHandler(e)}
               className="login__form login-form"
            >
               <Form.Group className="login__form-group mb-4">
                  <Form.Label className="login__form-label">E-mail</Form.Label>
                  <InputGroup className="mb-3">
                     <InputGroup.Text>
                        <img
                           className="login__form-input"
                           src="/images/mail.svg"
                           alt=""
                        />
                     </InputGroup.Text>

                     <Form.Control
                        required
                        name="email"
                        className="login__form-input"
                        type="email"
                        placeholder="Your email"
                        isInvalid={!errors.email}
                     />
                     <Form.Control.Feedback type="invalid">
                        Please, input valid email
                     </Form.Control.Feedback>
                  </InputGroup>
               </Form.Group>

               <Form.Group className="login__form-group mb-4">
                  <Form.Label className="login__form-label">
                     Password
                  </Form.Label>
                  <InputGroup className="mb-3">
                     <InputGroup.Text>
                        <img
                           className="login__form-input"
                           src="/images/lock.svg"
                           alt=""
                        />
                     </InputGroup.Text>

                     <Form.Control
                        required
                        name="password"
                        className="login__form-input"
                        type="password"
                        placeholder="Your password"
                        isInvalid={!errors.password}
                     />
                     <Form.Control.Feedback type="invalid">
                        Password length should be more than 3
                     </Form.Control.Feedback>
                  </InputGroup>
               </Form.Group>

               <Form.Group className="login__form-group mb-4">
                  <Form.Check
                     type="checkbox"
                     id={`default-checkbox`}
                     label={`Remember Me`}
                  />
               </Form.Group>

               <Button
                  type="submit"
                  className="mt-3 login__form-button button-style btn-reset w-100"
                  disabled={!validated}
               >
                  Login
               </Button>
            </Form>
         </div>
      </section>
   );
};

export default Login;
