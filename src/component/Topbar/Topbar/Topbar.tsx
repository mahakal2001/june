import MenuButton from "../MenuButton/MenuButton";
import SearchBar from "../SearchBar/SearchBar";
import NotificationButton from "../NotificationButton/NotificationButton";
import SettingsButton from "../SettingButton/SettingButton";
import UserMenu from "../UserMenu/UserMenu";
import DashboardBreadcrumb from "../BreadCrumb/BreadCrumb";
import './Topbar.css'

function Topbar() {
  return (
    <header className="header sticky top-0 left-0 z-30 flex pt-4 pb-4
     items-center justify-between border-b bg-white
      px-6">

      <div className="menu-bar flex items-center gap-3">

        <MenuButton />

        <DashboardBreadcrumb />

      </div>

      <div className="search flex items-center gap-8">

        <SearchBar />

      </div>  

      <div className="others relative left-.5 flex items-center gap-4">

        <NotificationButton />

        <SettingsButton />

        <UserMenu />

      </div>


    </header>
  );
}

export default Topbar;