// pages/api/updateprofile.js

export default async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        
        const { id, title, name, lname, address, email, phone } = req.body;
        let json = {
            title, name, lname,email
        };
        // Make sure to replace `process.env.NEXT_PUBLIC_API_URL` with your actual API URL
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/UserProfile/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': req.headers.authorization, // Add the authorization token if necessary
            },
            body: JSON.stringify(json),
        });
        const text = await response.text(); // Get response as text
        console.log('Response Text:', text);
        
        if (!response.ok) {
            throw new Error('Failed to update profile');
        }

        // const data = await response.json();
        const data = text ? JSON.parse(text) : {};
        // console.log('Profile updated successfully:', data);
        return res.status(200).json({ message: 'Profile updated successfully', data });
    } catch (error) {
        console.error('Error updating profile:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
