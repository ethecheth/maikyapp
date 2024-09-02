export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto flex flex-col items-center justify-center">
          <div className="text-sm">
            &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
          </div>
          <div className="mt-2 flex space-x-4">
            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400">Terms of Service</a>
            <a href="#" className="hover:text-gray-400">Contact Us</a>
          </div>
        </div>
      </footer>
    );
  }
  