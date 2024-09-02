import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";

export default function UpdateProfileModal({ isOpen, onClose, user, onUpdateSuccess }) {
    const { data: session, status } = useSession();
    // console.log(session.token)
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [lname, setLname] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);

    // Pre-fill the form with user data when the modal opens
    useEffect(() => {
        if (user) {
            // console.log(user)
            setId(user.id || '');
            setTitle(user.title || 'Mr');
            setName(user.name || '');
            setLname(user.lname || '');
            setAddress(user.address || '233/233');
            setEmail(user.email || '');
            setPhone(user.phone || '034564344');
        }
    }, [user]);

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/updateprofile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.token}`
                },
                // credentials: 'include',
                body: JSON.stringify({
                    id,
                    title,
                    name,
                    lname,
                    address,
                    email,
                    phone,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            // const data = await response.json();
            // console.log('Profile updated successfully:', data);

            // Optionally refresh session data here
            // await getSession(); // Fetch updated session data
            onUpdateSuccess();
            onClose(); // Close the modal after successful update
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('There was an error updating your profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <select
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input input-bordered w-full"
                    >
                        <option value="">Select Title</option>
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Ms">Ms</option>
                        <option value="Dr">Dr</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                        type="text"
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="btn"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdate}
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
}
