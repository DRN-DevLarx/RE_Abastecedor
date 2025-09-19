import React, { useState, useEffect } from "react";
import { X, ChartAreaIcon, User, Package, MessageCircle, Settings, LogOut, ArrowLeft } from "lucide-react";
import Statistics from "./Statistics";
import Products from "./Products"
import { Link } from "react-router-dom";

function Sidebar({ sidebarOpen, setSidebarOpen }) {

  const [activeMenu, setActiveMenu] = useState("Statistics");
  const [currentComponent, setCurrentComponent] = useState(<Statistics />);

  const menuItems = [
    { name: "Estadísticas", icon: <ChartAreaIcon size={18} />, component: <Statistics /> },
    { name: "Productos", icon: <Package size={18} />, component: <Products/> },
    { name: "Mensajes", icon: <MessageCircle size={18} />, component: <div>Mensajes</div> },
    { name: "Ajustes", icon: <Settings size={18} />, component: <div>Ajustes</div> },
    { name: "Cerrar sesión", icon: <LogOut size={18} />, component: <div>Cerrar sesión</div> },
  ];

  // Recuperar menú activo al montar
  useEffect(() => {
    const savedMenu = localStorage.getItem("activeMenu");
    if (savedMenu) {
      const item = menuItems.find((i) => i.name === savedMenu);
      if (item) {
        setActiveMenu(item.name);
        setCurrentComponent(item.component);
      }
    }
  }, []);

  // Guardar menú activo y actualizar componente
  const handleClick = (item) => {
    setActiveMenu(item.name);
    setCurrentComponent(item.component);
    setSidebarOpen(false)
    localStorage.setItem("activeMenu", item.name);
  };

  return (
    <>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 text-white bg-[#1e293b] w-64 p-4 transform lg:translate-x-0 transition-transform duration-300 z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-around mb-5">

          <Link to="/principal"
          className="hover:scale-150"
          >
            <ArrowLeft size={24} />
          </Link>

          <h1 className="text-2xl font-bold">Administración</h1>
        </div>

        <nav className="space-y-3">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleClick(item)}
              className={`flex items-center gap-3 p-2 w-full text-left rounded-lg hover:bg-[#334155] ${
                activeMenu === item.name ? "bg-[#334155]" : ""
              }`}
            >
              {item.icon} {item.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Renderizado del componente activo */}
      <main className="flex-1 p-6 overflow-y-auto lg:ml-64">
        {currentComponent}
      </main>
    </>
  );
}

export default Sidebar;
