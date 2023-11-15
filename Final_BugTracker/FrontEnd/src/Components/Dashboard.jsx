import { useEffect, useState } from 'react';

function Dashboard() {
  const [permissionLevel, setPermissionLevel] = useState('');

  useEffect(() => {
    // Make an API request to get the user's permission level
    fetch('http://localhost:5000/dashboard')
      .then((response) => response.json())
      .then((data) => {
        setPermissionLevel(data.permission_level);
      });
  }, []);

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      {permissionLevel === 'ADMIN' && (
        <p>Content for admin users</p>
      )}
      {permissionLevel === 'MANAGER' && (
        <p>Content for manager users</p>
      )}
      {permissionLevel === 'DEVELOPER' && (
        <p>Content for developer users</p>
      )}
      {permissionLevel === 'WORKER' && (
        <p>Content for worker users</p>
      )}
      {permissionLevel === '' && (
        <p>Loading...</p>
      )}
      {permissionLevel === 'unauthorized' && (
        <p>You do not have permission to access this page</p>
      )}
    </div>
  );
}

export default Dashboard;
