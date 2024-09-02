export default async function handler(req, res) {
    // Make a request to the .NET Core API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ProductCategory`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Handle response from the .NET Core API
    if (response.ok) {
        const data = await response.json();
        res.status(200).json(data);
    } else {
        res.status(response.status).json({ error: 'Failed to fetch products' });
    }
}
