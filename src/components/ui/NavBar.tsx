import { Link } from "react-router-dom";
import Account from "./Account/";
import { Home } from "./Icons/Home";
import { Settings } from "./Icons/Settings";
export const NavBar = () => {
  return (
    <div className="flex p-3 w-full justify-between items-center rounded-3xl bg-background-light">
      <div className="flex-1 text-neutral-50 text-xl font-semibold font-heading">
        <Link to={"/"}>Templify</Link>
      </div>
      <div className="flex-1">
        <ul className="flex gap-12 justify-center items-center text-neutral-50 capitalize">
          <li>
            <Link to={"/"} className="flex gap-2 items-center font-semibold hover:text-secondary transition-colors links">
              <Home/>
              home
            </Link>
          </li>
          <li>
            <Link to={"/settings"} className="flex gap-2 items-center font-semibold hover:text-secondary transition-colors links">
              <Settings />
              settings
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex-1 flex justify-end">
        <Account.Expanded
          accountName="Ivandro Neto"
          currentPlan="Free"
          nameStyle="text-neutral text-sm"
          planStyle="font-bold text-fuchsia-600 text-xs"
          image=""
        />
      </div>
    </div>
  );
};
