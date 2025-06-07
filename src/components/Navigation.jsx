//import { useState } from "react";
import { FaTruck, FaListAlt, FaUtensils } from "react-icons/fa";

const Navigation = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { name: "Delivery", icon: <FaTruck /> },
    { name: "Current Orders", icon: <FaListAlt /> },
    { name: "Current Menu", icon: <FaUtensils /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-around p-3 border-t">
      {navItems.map((item) => (
        <button
          key={item.name}
          onClick={() => setActiveSection(item.name)}
          className={`flex flex-col items-center gap-1 p-2 text-sm font-semibold transition-all ${
            activeSection === item.name ? "text-red-600 border-t-4 border-red-600" : "text-gray-600"
          }`}
        >
          {item.icon}
          {item.name}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;






/*const Vendor = () => {
  const [activeSection, setActiveSection] = useState("current");

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-1 p-4">
        {activeSection === "history" && <div>Order History Content</div>}
        {activeSection === "current" && <div>Current Orders Content</div>}
        {activeSection === "menu" && <div>Current Menu Content</div>}
      </main>
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
    </div>
  );
};*/

/*const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="text-xl font-bold text-red-600">Zomato Vendor</div>
      <div className="flex items-center gap-2">
        <img
          src="https://via.placeholder.com/40" // Replace with actual vendor avatar
          alt="Vendor Avatar"
          className="w-10 h-10 rounded-full"
        />
        <p className="font-semibold">Vendor Name</p>
      </div>
    </header>
  );
};*/