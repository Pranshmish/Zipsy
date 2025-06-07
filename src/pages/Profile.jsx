import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';
import database from '../appwrite/dbConfig';
import Breadcrumbs from '../components/Breadcrumbs';
import Tabs from '../components/Tabs';
import Card from '../components/Card';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import Alert from '../components/Alert';
import LoadingSpinner from '../components/LoadingSpinner';
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit';
import { FaUser, FaShoppingBag, FaHeart, FaMapMarkerAlt, FaCog } from 'react-icons/fa';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.userDetails);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      // Validate form data
      if (!formData.name || !formData.email) {
        setErrorMessage('Name and email are required');
        setLoading(false);
        return;
      }

      // Update user profile in database
      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      };

      await database.updateUserData(user.id, updatedUser);
      dispatch(setUserDetails(updatedUser));
      setSuccessMessage('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      // Validate password fields
      if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
        setErrorMessage('All password fields are required');
        setLoading(false);
        return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        setErrorMessage('New passwords do not match');
        setLoading(false);
        return;
      }

      // Update password in database
      await database.updateUserPassword(user.id, formData.currentPassword, formData.newPassword);
      
      // Clear password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      
      setSuccessMessage('Password updated successfully');
    } catch (error) {
      console.error('Error updating password:', error);
      setErrorMessage('Failed to update password. Please check your current password and try again.');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    {
      label: 'Profile',
      icon: <FaUser className="mr-2" />,
      content: (
        <div className="space-y-6">
          <Card>
            <Card.Header>
              <h2 className="text-xl font-semibold">Personal Information</h2>
            </Card.Header>
            <Card.Body>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="flex items-center justify-center mb-6">
                  <UserProfileAvatarEdit />
                </div>
                
                <FormInput
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                
                <FormInput
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                
                <FormInput
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={loading}
                    loading={loading}
                  >
                    Update Profile
                  </Button>
                </div>
              </form>
            </Card.Body>
          </Card>
        </div>
      )
    },
    {
      label: 'Orders',
      icon: <FaShoppingBag className="mr-2" />,
      content: (
        <div className="space-y-6">
          <Card>
            <Card.Header>
              <h2 className="text-xl font-semibold">Order History</h2>
            </Card.Header>
            <Card.Body>
              <p className="text-gray-500">View your order history and track current orders.</p>
              <div className="mt-4">
                <Button variant="outline" onClick={() => window.location.href = '/order-tracking'}>
                  View Orders
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      )
    },
    {
      label: 'Wishlist',
      icon: <FaHeart className="mr-2" />,
      content: (
        <div className="space-y-6">
          <Card>
            <Card.Header>
              <h2 className="text-xl font-semibold">My Wishlist</h2>
            </Card.Header>
            <Card.Body>
              <p className="text-gray-500">View and manage your saved items.</p>
              <div className="mt-4">
                <Button variant="outline" onClick={() => window.location.href = '/wishlist'}>
                  View Wishlist
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      )
    },
    {
      label: 'Addresses',
      icon: <FaMapMarkerAlt className="mr-2" />,
      content: (
        <div className="space-y-6">
          <Card>
            <Card.Header>
              <h2 className="text-xl font-semibold">Saved Addresses</h2>
            </Card.Header>
            <Card.Body>
              <p className="text-gray-500">Manage your delivery addresses.</p>
              <div className="mt-4">
                <Button variant="outline" onClick={() => window.location.href = '/address'}>
                  Manage Addresses
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      )
    },
    {
      label: 'Security',
      icon: <FaCog className="mr-2" />,
      content: (
        <div className="space-y-6">
          <Card>
            <Card.Header>
              <h2 className="text-xl font-semibold">Change Password</h2>
            </Card.Header>
            <Card.Body>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <FormInput
                  label="Current Password"
                  name="currentPassword"
                  type="password"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  required
                />
                
                <FormInput
                  label="New Password"
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  required
                />
                
                <FormInput
                  label="Confirm New Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
                
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={loading}
                    loading={loading}
                  >
                    Update Password
                  </Button>
                </div>
              </form>
            </Card.Body>
          </Card>
        </div>
      )
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs 
        items={[
          { label: 'Profile', href: '/profile' }
        ]} 
        className="mb-6"
      />
      
      <h1 className="text-3xl font-bold mb-6">My Account</h1>
      
      {successMessage && (
        <Alert 
          type="success" 
          message={successMessage} 
          onClose={() => setSuccessMessage('')}
          className="mb-6"
        />
      )}
      
      {errorMessage && (
        <Alert 
          type="error" 
          message={errorMessage} 
          onClose={() => setErrorMessage('')}
          className="mb-6"
        />
      )}
      
      {loading && <LoadingSpinner size="large" className="my-8" />}
      
      <Tabs 
        tabs={tabs} 
        defaultTab={activeTab} 
        onChange={setActiveTab}
        className="mt-6"
      />
    </div>
  );
};

export default Profile;