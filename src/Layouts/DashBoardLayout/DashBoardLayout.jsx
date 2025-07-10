import {
  Button,
  Drawer,
  DrawerHeader,
  DrawerItems,
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
  TextInput,
} from "flowbite-react";
import { useState } from "react";
import {
  HiChartPie,
  HiClipboard,
  HiCollection,
  HiInformationCircle,
  HiLogin,
  HiMenu,
  HiPencil,
  HiSearch,
  HiShoppingBag,
  HiUsers,
} from "react-icons/hi";
import { Outlet } from "react-router";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  // Sidebar contents reused for Drawer and Static Sidebar
  const SidebarContent = () => (
    <Sidebar aria-label="Responsive Sidebar" className="h-full">
      {/* <form className="pb-3 md:hidden">
        <TextInput
          icon={HiSearch}
          type="search"
          placeholder="Search"
          required
          size={32}
        />
      </form> */}
      <SidebarItems>
        <SidebarItemGroup>
          {/* <SidebarItem href="/" icon={HiChartPie}>
            Dashboard
          </SidebarItem>
          <SidebarItem href="/e-commerce/products" icon={HiShoppingBag}>
            Products
          </SidebarItem> */}
          <SidebarItem href="/users/list" icon={HiUsers}>
            Users list
          </SidebarItem>
          {/* <SidebarItem href="/authentication/sign-in" icon={HiLogin}>
            Sign in
          </SidebarItem>
          <SidebarItem href="/authentication/sign-up" icon={HiPencil}>
            Sign up
          </SidebarItem> */}
        </SidebarItemGroup>
        {/* <SidebarItemGroup>
          <SidebarItem
            href="https://github.com/themesberg/flowbite-react/"
            icon={HiClipboard}>
            Docs
          </SidebarItem>
          <SidebarItem href="https://flowbite-react.com/" icon={HiCollection}>
            Components
          </SidebarItem>
          <SidebarItem
            href="https://github.com/themesberg/flowbite-react/issues"
            icon={HiInformationCircle}>
            Help
          </SidebarItem>
        </SidebarItemGroup> */}
      </SidebarItems>
      {/* <div className="p-4 border-t mt-4">
        <Button className="focus:outline-none focus:ring-0" size="xs" fullSized>
          Toggle Dark Mode
        </Button>
      </div> */}
    </Sidebar>
  );

  return (
    <div className="min-h-screen max-w-[1500px] mx-auto flex flex-col lg:flex-row">
      {/* Static Sidebar for lg+ */}
      <div className="hidden lg:block w-64 bg-white dark:bg-gray-800 border-r">
        <SidebarContent />
      </div>

      {/* Navbar for md and smaller */}
      <nav className="lg:hidden w-full bg-white dark:bg-gray-800 p-4 flex items-center justify-between border-b">
        <Button size="sm" onClick={() => setIsOpen(true)}>
          <HiMenu className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        {/* <Button className="focus:outline-none focus:ring-0" size="sm">
          🌓
        </Button> */}
      </nav>

      {/* Drawer for small screens */}
      <Drawer backdrop={true} open={isOpen} onClose={handleClose}>
        <DrawerHeader title="MENU" titleIcon={() => <></>} />
        <DrawerItems>
          <SidebarContent />
        </DrawerItems>
      </Drawer>

      {/* Main content */}
      <div className="flex-1 bg-blue-100 p-4">
        <h1 className="text-3xl font-bold mt-6">Welcome to Dashboard</h1>

        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
