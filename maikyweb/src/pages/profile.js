import Header from '@/components/Header';
import Layout from '@/components/Layout';
import UpdateProfileModal from '@/components/UpdateProfileModal';
import { useSession } from 'next-auth/react';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';

export default function Profile() {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const fetchUserData = async () => {
    try {
        const response = await fetch('/api/user');
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
  };

  useEffect(() => {
    if (session) {
      fetchUserData();
    }
  }, [session]);

  return (
    <div>
      <Header />
      <Layout>
        <div className="flex flex-col items-center justify-center py-10">
          <FaUserCircle className="text-gray-600 h-24 w-24 mb-4" />
          <h1 className="text-2xl font-semibold text-gray-800">User Profile</h1>

          {user ? (
            <div className="mt-6 text-center">
              <p className="text-lg text-gray-700 mb-2"><strong>Name:</strong> {user.name}</p>
              <p className="text-lg text-gray-700 mb-2"><strong>Last Name:</strong> {user.lname}</p>
              <p className="text-lg text-gray-700 mb-2"><strong>Email:</strong> {user.email}</p>
              <button
                className="mt-4 btn btn-outline flex items-center space-x-2"
                onClick={handleOpenModal}
              >
                <FaEdit className="h-5 w-5" />
                <span>Update Profile</span>
              </button>
            </div>
          ) : (
            <p className="text-lg text-gray-700">Please sign in to view your profile.</p>
          )}

          <UpdateProfileModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            user={user || { id: '', title: '', name: '', lname: '', email: '' }}
            onUpdateSuccess={fetchUserData}
          />
        </div>
      </Layout>
    </div>
  );
}
