import Link from 'next/link'
import React from 'react'
import { useEffect, useState } from 'react';
import { RiMenu2Line } from 'react-icons/ri'

export const CATEGORY_LINKS=[
    {
        label:"Mobile Phones",
        path:"/list"
    },
    {
        label:"Laptops & Desktops",
        path:"/list"
    },
    {
        label:"PC Games",
        path:"/list"
    },
    {
        label:"Home & Furnitures",
        path:"/list"
    }
]

function MainCategory() {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        // Replace with your actual API endpoint
        const fetchCategories = async () => {
          try {
            const response = await fetch('/api/categories');
            const data = await response.json();
            setCategories(data);
          } catch (error) {
            console.error('Error fetching categories:', error);
          }
        };
    
        fetchCategories();
      }, []);
      
  return (
    <div className="bg-white border-b border-b-gray-300">
        <div className="layout">
            <div className="flex items-center gap-6 text-sm h-[2.8rem]">
                <Link href={"/product"} className="flex items-center gap-3">
                <RiMenu2Line fontSize={18}/>All Category
                </Link>
        {/* {CATEGORY_LINKS.map((category, idx) =><Link key={idx} href={category.path}>{category.label}</Link>)} */}
        
        {categories.map((category, idx) => (
            <Link key={idx} href={`/product?cat=${category.categoryId}`}>
              {category.categoryName}
            </Link>
          ))}
        </div>
        </div>
    </div>
  )
}

export default MainCategory