import Header from '@/components/Header'
import Layout from '@/components/Layout'
import MainCategory from '@/components/MainCategory'
import React from 'react'
import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';

const products = [
    {
        id: 1,
        name: 'Product 1',
        description: 'This is the first product.',
        price: '$10.00',
        image: '/path/to/image1.jpg',
    },
    {
        id: 2,
        name: 'Product 2',
        description: 'This is the second product.',
        price: '$20.00',
        image: '/path/to/image2.jpg',
    },
    {
        id: 3,
        name: 'Product 3',
        description: 'This is the third product.',
        price: '$30.00',
        image: '/path/to/image3.jpg',
    },
];

function ProductCard({ product }) {
    // console.log(product)
    return (
        
        <div className="card w-96 bg-base-100 shadow-xl">
            { <figure>
                <img src={product.imageUrl} alt={product.productName} />
            </figure> }
            <div className="card-body">
                <h2 className="card-title">{product.productName}</h2>
                <p>{product.productDescription}</p>
                <div className="card-actions justify-end">
                    <span className="text-lg font-bold">{product.productPrice}</span>
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
}

export default function Product() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }
    return (
        <div>
            <Header />
            <MainCategory />
            <Layout>
                <div className="p-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </Layout>
        </div>
    );
}
