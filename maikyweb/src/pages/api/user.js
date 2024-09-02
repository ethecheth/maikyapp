// pages/api/user.js
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Fetch user data from your data source
    // For example, replace the following with your actual data fetching logic
    const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/UserProfile/${session.userobj.user.id}`, {
      headers: {
        'Authorization': `Bearer ${session.token}`, // If needed
      },
    });

    if (!userResponse.ok) {
      throw new Error('Failed to fetch user data');
    }

    const userData = await userResponse.json();
    return res.status(200).json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
