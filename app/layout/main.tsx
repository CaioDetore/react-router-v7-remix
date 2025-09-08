import { NavLink, Outlet } from "react-router";

export default function () {
  return (
    <main>
      <ul className="gap-5 flex bg-slate-600 text-white p-4 fixed left-0 right-0 top-0">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>

        <li>
          <NavLink to="/loaders">Cervejarias</NavLink>
        </li>
      </ul>

      <Outlet />
    </main>
  )
}