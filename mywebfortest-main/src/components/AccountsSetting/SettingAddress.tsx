import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SettingAddress: React.FC = () => {
  const [user, setUser] = useState({
    id: 0,
    email: '',
    role: 'regular',
  });
  const [password, setPassword] = useState('');
  const [newRole, setNewRole] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch user data when component mounts
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/api/user', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUser(response.data);
    } catch (error) {
      setMessage('Failed to fetch user data');
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.get('/auth/set-password', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        data: { password }
      });
      setMessage('Password updated successfully');
    } catch (error) {
      setMessage('Failed to update password');
    }
  };

  const handleRoleChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user.role !== 'admin') {
      setMessage('Only admins can change roles');
      return;
    }
    try {
      await axios.get(`/auth/set-role/${user.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        data: { role: newRole }
      });
      setMessage('Role updated successfully');
      fetchUserData();  // Refresh user data
    } catch (error) {
      setMessage('Failed to update role');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User Settings</h2>
      <div className="mb-4">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
      <form onSubmit={handlePasswordChange} className="mb-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Change Password
        </button>
      </form>
      {user.role === 'admin' && (
        <form onSubmit={handleRoleChange}>
          <select
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            className="border p-2 mr-2"
          >
            <option value="">Select Role</option>
            <option value="regular">Regular</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="bg-green-500 text-white p-2 rounded">
            Change Role
          </button>
        </form>
      )}
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default SettingAddress;