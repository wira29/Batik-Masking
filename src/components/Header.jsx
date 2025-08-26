import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MenuHeader from "../../src/assets/data/MenuHeader.json";
import { Menu } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActivePath = (currentPath, menuPath) => {
    if (menuPath === "/") return currentPath === "/";
    return currentPath.startsWith(menuPath);
  };

  return (
    <header className="flex justify-between items-center px-6 py-10 lg:py-20 bg-black">
      <div className="flex items-center gap-4 text-white">
        <div className="size-10">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_6_319)">
              <path
                d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                fill="currentColor"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_6_319">
                <rect width="48" height="48" fill="white"></rect>
              </clipPath>
            </defs>
          </svg>
        </div>
        <h2 className="text-amber-600 text-2xl md:text-4xl font-medium Font-Bodoni leading-tight tracking-[-0.015em]">
          Batik <span className="text-white">Nusantara</span>
        </h2>
      </div>

      <nav className="hidden md:flex flex-1 justify-end gap-9">
        {MenuHeader.map((item, index) => {
          const isActive = isActivePath(location.pathname, item.path);
          return (
            <Link
              key={index}
              to={item.path}
              className={`text-lg font-light Font-Bodoni transition-all duration-200 ease-in-out hover:scale-105 
                ${
                  isActive
                    ? "text-amber-500 font-medium"
                    : "text-white hover:text-gray-300"
                }
              `}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <button
        className="md:hidden text-white text-3xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu />
      </button>

      {isOpen && (
        <div className="absolute top-20 right-0 w-2/3 bg-black bg-opacity-95 z-50 p-6 flex flex-col items-start gap-4 md:hidden rounded-l-xl shadow-lg">
          {MenuHeader.map((item, index) => {
            const isActive = isActivePath(location.pathname, item.path);
            return (
              <Link
                key={index}
                to={item.path}
                className={`text-lg font-light w-full transition-colors
                  ${
                    isActive
                      ? "text-amber-500 font-medium"
                      : "text-white hover:text-gray-300"
                  }
                `}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default Header;
