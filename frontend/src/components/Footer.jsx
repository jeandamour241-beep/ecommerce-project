import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-20">

      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">

        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            MyShop
          </h2>

          <p className="text-sm leading-6">
            MyShop is an online store where you can buy quality
            products at the best prices. Fast delivery and secure
            payments guaranteed.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2">

            <li>
              <Link to="/" className="hover:text-orange-500">
                Home
              </Link>
            </li>

            <li>
              <Link to="/orders" className="hover:text-orange-500">
                Orders
              </Link>
            </li>

            <li>
              <Link to="/contact" className="hover:text-orange-500">
                Contact
              </Link>
            </li>

          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact
          </h3>

          <p>Email: support@myshop.com</p>
          <p>Phone: +250 792 525 460</p>
          <p>Kigali, Rwanda</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Follow Us
          </h3>

          <div className="flex space-x-4 text-xl">

            <a
              href="#"
              className="hover:text-blue-500"
            >
              <FaFacebook />
            </a>

            <a
              href="#"
              className="hover:text-pink-500"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="hover:text-blue-400"
            >
              <FaTwitter />
            </a>

            <a
              href="#"
              className="hover:text-white"
            >
              <FaGithub />
            </a>

          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">

        © {new Date().getFullYear()} MyShop. All rights reserved.

      </div>

    </footer>
  );
};

export default Footer;