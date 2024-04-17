const Sidebar = ({ className, children }) => {
  return (
    <div
      className={`sidebar d-none d-lg-flex flex-column bg-secondary ${className}`}
    >
      {children}
    </div>
  );
};

export default Sidebar;
