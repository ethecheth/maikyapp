import Footer from './Footer';
import React from 'react'

function Layout({ children }) {
    return (
        <div>
            <main className="layout">{children}</main>
            <Footer />
        </div>
    );
}

export default Layout