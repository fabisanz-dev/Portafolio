import { Link } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { NavLink } from "react-router-dom";
import { Avatar } from 'modern-react-avatar'
import 'modern-react-avatar/dist/index.css'

const Sidebar = () => {
  let activeClassName = "bg-red-500";
  return (
    <aside className="md:w-60 py-3 border-r sm:border-b bg-blue-pastel-200">
      <div className="flex justify-center md:mt-10">
        <span data-end="g">
          <Avatar name={"Fabian Jorge"} className={"w-32 h-32 border overflow-hidden bg-gray-100 rounded-full border-blue-pastel-200 text-5xl text-blue-pastel-300"}/>
        </span>
        
      </div>
      {/**menu mobile */}
      <div className="flex justify-center mt-2 mb-2 md:hidden visible">
        <Dropdown
          label="Menu"
          placement="bottom"
          style={{ backgroundColor: "red!important" }}
        >
          <Dropdown.Item>
            <Link to="/">Sobre mi</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="habilidades">Habilidades</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="proyectos">Proyectos</Link>
          </Dropdown.Item>
        </Dropdown>
      </div>
      {/**menu normal */}
      <div className="justify-center mt-1 md:visible hidden md:flex">
        <ul className="w-48 text-sm font-medium text-blue-pastel-100 bg-blue-pastel-200  text-center mt-1 uppercase">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "text-white" : undefined)}
          >
            <li className="block px-4 py-2 border-b border-blue-pastel-100  dark:border-gray-600 hover:bg-blue-pastel-300 hover:text-white">
              Sobre mi
            </li>
          </NavLink>
          <NavLink
            to="habilidades"
            className={({ isActive }) => (isActive ? "text-white" : undefined)}
          >
            <li
              aria-current="true"
              className="px-4 py-2 border-b border-blue-pastel-100 dark:border-gray-600 hover:bg-blue-pastel-300 hover:text-white"
            >
              Habilidades
            </li>
          </NavLink>

          <NavLink
            to="proyectos"
            className={({ isActive }) => (isActive ? "text-white" : undefined)}
          >
            <li className="px-4 py-2 border-b border-blue-pastel-100 hover:bg-blue-pastel-300 hover:text-white">
              Proyectos
            </li>
          </NavLink>
        </ul>
      </div>

    </aside>
  );
};

export default Sidebar;
