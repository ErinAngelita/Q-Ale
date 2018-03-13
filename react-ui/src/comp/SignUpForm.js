import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
  <div className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Sign Up</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        Name
        <input
          name="name"
          onChange={onChange}
          value={user.name}
        />
        {errors.name ? <p> errors.name </p> : <p> </p> }
      </div>

      <div className="field-line">
        Email
        <input
          name="email"
          onChange={onChange}
          value={user.email}
        />
        {errors.email ? <p> errors.email </p> : <p> </p> }
      </div>

      <div className="field-line">
        Password
        <input
          type="password"
          name="password"
          onChange={onChange}
          value={user.password}
        />
        {errors.password ? <p> errors.password </p> : <p> </p> }
      </div>

      <div className="button-line">
        <button type="submit">Create New Account</button>
      </div>

      <p>Already have an account? <Link to={'/login'}>Log in</Link></p>
    </form>
  </div>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm;
