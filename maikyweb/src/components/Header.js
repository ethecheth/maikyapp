import Link from 'next/link'
import { useSession } from "next-auth/react";
import React,{ useEffect } from "react";
import { useRouter } from "next/router";

import { FaAngleDown, FaShoppingBasket } from "react-icons/fa"
import { RiHeart2Fill, RiShoppingBag3Fill, RiUser3Fill } from "react-icons/ri"
import { signOut } from "next-auth/react";

export const HEADER_NAV = [
    {
        label: "Profile",
        path: "/profile",
        icon: <RiUser3Fill fontSize={20} />,
    },
    {
        label: "Orders",
        path: "/orders",
        icon: <RiHeart2Fill fontSize={20} />,
    },
    {
        label: "My cart",
        path: "/cart",
        icon: <RiShoppingBag3Fill fontSize={20} />,
    }
]

function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();
    useEffect(() => {
        if (status === "loading") return; // Do nothing while loading
        if (!session) {
          router.push('/login'); // Redirect to login if not authenticated
        }
      }, [session, status, router]);

    return (
        <header className="bg-white border-b border-b-gray-300">
            <div className="navbar layout">
                <div className="navbar-start text-secondary">
                    <Link href="/" className="flex items-center gap-2 text-secondary text-xl font-semibold">
                        <FaShoppingBasket fontSize={26} />
                        <span>Basket</span>
                    </Link>
                </div>
                <div className="navbar-center">
                    <div className="join w-[30rem]">
                        <div>
                            <div>
                                <input
                                    className="input w-full input-sm input-bordered join-item"
                                    placeholder="Search" />
                            </div>
                        </div>
                        <div className="dropdown dropdown-hover join-item">
                            <label tabIndex={0} className="w-[7rem] px-1 btn btn-sm btn-outline border-gray-300 rounded-none capitalize">
                                Category <FaAngleDown />
                            </label>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-1 shadow border-gray-300 bg-base-100 rounded-box">
                                <li><a>Electronic</a></li>
                                <li><a>Home furniture</a></li>
                            </ul>
                        </div>
                        <button className="btn btn-sm btn-secondary join-item">Search</button>
                    </div>
                </div>
                <div className="navbar-end flex gap-8">
                    {HEADER_NAV.map(link => <Link href={link.path} key={link.path} className="flex flex-col items-center gap-1 text-gray-500">
                        {link.icon}
                        <span className="text-xs">{link.label}</span>
                    </Link>
                    )}
                    <button onClick={() => signOut({ callbackUrl: "/login" })} className="btn btn-sm btn-secondary">
                        Sign out
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header