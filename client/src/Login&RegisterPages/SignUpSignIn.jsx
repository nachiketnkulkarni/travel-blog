import React, { useEffect, useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { CheckLogin } from "../Healpers/Functions/Functions";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function SignUpSignIn(props) {
  const [radioValue, setRadioValue] = useState(1);

  useEffect(() => {
    if (CheckLogin()) {
      props.history.push("/home");
    }
  }, [props.history]);

  return (
    <div style={{ height: "100vh", margin: "auto" }}>
      <div className='row'>
        <div className='col align-self-center text-center register'>
          <div className='row'>
            <div className='col-md-3 register-left'>
              <img src='https://image.ibb.co/n7oTvU/logo_white.png' alt='' />
              <h3>Welcome</h3>
              <p>You are a step away from joining the great travelling blog!</p>
              <br />
            </div>
            <div className='col-md-9 register-right'>
              <ToggleButtonGroup
                type='radio'
                name='options'
                defaultValue={radioValue}
                style={{
                  backgroundColor: "#b0f4e6",
                  width: "50%",
                  marginTop: "5px",
                  borderRadius: "1.5rem",
                }}>
                <ToggleButton
                  value={1}
                  onClick={() => setRadioValue(1)}
                  variant='link'>
                  Login
                </ToggleButton>
                <ToggleButton
                  value={2}
                  onClick={() => setRadioValue(2)}
                  variant='link'>
                  Register
                </ToggleButton>
              </ToggleButtonGroup>
              <div className='tab-content' id='myTabContent'>
                <div
                  className='tab-pane fade show active'
                  id='home'
                  role='tabpanel'
                  aria-labelledby='home-tab'>
                  <h3 className='register-heading'>
                    {radioValue === 1 ? "Login" : "Register"}
                  </h3>
                  {radioValue === 1 ? (
                    <SignIn {...props} />
                  ) : (
                    <SignUp {...props} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpSignIn;

// <ul className='nav nav-tabs nav-justified' id='myTab' role='tablist'>
//   <li className='nav-item'>
//     <a
//       className='nav-link active'
//       id='home-tab'
//       data-toggle='tab'
//       href='#home'
//       role='tab'
//       aria-controls='home'
//       aria-selected='true'>
//       Employee
//     </a>
//   </li>
//   <li className='nav-item'>
//     <a
//       className='nav-link'
//       id='profile-tab'
//       data-toggle='tab'
//       href='#profile'
//       role='tab'
//       aria-controls='profile'
//       aria-selected='false'>
//       Hirer
//     </a>
//   </li>
// </ul>;
