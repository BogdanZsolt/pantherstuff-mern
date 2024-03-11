const Sidebar = ({ className, children }) => {
  return (
    <div
      className={`sidebar d-none d-lg-flex justify-content-between flex-column bg-secondary text-primary py-3 ps-3 pe-5 vh-100 ${className}`}
    >
      {children}
    </div>
  );
};

export default Sidebar;
