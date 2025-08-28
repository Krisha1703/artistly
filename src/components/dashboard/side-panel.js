// Side Panel Component for Manager Dashboard

const SidePanel = ({ menus = [], selectedMenu, setSelectedMenu, isMobile = false }) => {
  return (
    <nav
      className={`${
        isMobile
          ? "w-full manager-sidepanel  p-4 flex flex-col gap-4 md:hidden"
          : "w-64 manager-sidepanel  h-screen p-6 flex flex-col gap-6"
      }`}
    >
      {!isMobile && <h2 className="text-2xl font-bold mb-8">Manager Dashboard</h2>}
      {menus.map((menu) => (
        <button
          key={menu.key}
          className={`text-left py-2 px-4 rounded  transition ${
            selectedMenu === menu.key ? "submenu font-semibold" : ""
          }`}
          onClick={() => setSelectedMenu(menu.key)}
        >
          {menu.label}
        </button>
      ))}
    </nav>
  );
};

export default SidePanel;
