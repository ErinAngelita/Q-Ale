import React from 'react';
import PropTypes from 'prop-types';

const Dashboard = ({ secretData, user }) => (
  <div className="container">
    <h2>Dashboard</h2>
    <h3>You should get access to this page only after authentication.</h3>
    {secretData && <p style={{ fontSize: '16px', color: 'green' }}>Welcome <strong>{user.name}</strong>!<br />{secretData}</p>}
  </div>
);

Dashboard.propTypes = {
  secretData: PropTypes.string.isRequired
};

export default Dashboard;
