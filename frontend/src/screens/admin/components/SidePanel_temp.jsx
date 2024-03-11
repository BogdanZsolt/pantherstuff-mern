import Sidebar from './Sidebar';
import { RiCodeSSlashLine } from 'react-icons/ri';
import { BsSpeedometer2, BsPeople, BsTable, BsGrid } from 'react-icons/bs';
import { useState } from 'react';

const SidePanel = () => {
  const [active, setActive] = useState(1);

  return (
    <Sidebar>
      <div>
        <a href="#" className="p-3">
          <RiCodeSSlashLine className="fs-4 me-4 text-primary" />
          <span className="text-primary fs-3">Sidebar</span>
        </a>
        <hr className="text-primary mt-2" />
        <ul className="nav nav-pills flex-column mt-3">
          <li
            className={`nav-item p-2 ${active === 1 ? 'active' : ''}`}
            onClick={() => setActive(1)}
          >
            <span className="p-1">
              <BsSpeedometer2 className="text-primary me-3 fs-5" />
              <span className="text-primary fs-4">
                <strong>Dashboard</strong>
              </span>
            </span>
          </li>
          <li
            className={`nav-item p-2 ${active === 2 ? 'active' : ''}`}
            onClick={() => setActive(2)}
          >
            <span className="p-1">
              <BsPeople className="text-primary me-3 fs-5" />
              <span className="text-primary fs-4">
                <strong>Users</strong>
              </span>
            </span>
          </li>
          <li
            className={`nav-item p-2 ${active === 3 ? 'active' : ''}`}
            onClick={() => setActive(3)}
          >
            <span className="p-1">
              <BsTable className="text-primary me-3 fs-5" />
              <span className="text-primary fs-4">
                <strong>Orders</strong>
              </span>
            </span>
          </li>
          <li
            className={`nav-item p-2 ${active === 4 ? 'active' : ''}`}
            onClick={() => setActive(4)}
          >
            <span className="p-1">
              <BsGrid className="text-primary me-3 fs-5" />
              <span className="text-primary fs-4">
                <strong>Report</strong>
              </span>
            </span>
          </li>
        </ul>
      </div>
      <div>
        <hr className="text-primary" />
        <li className="nav-item p-2">
          <a href="#" className="p-1">
            <BsGrid className="text-primary me-3 fs-5" />
            <span className="text-primary fs-4">
              <strong>Report</strong>
            </span>
          </a>
        </li>
      </div>
    </Sidebar>
  );
};

export default SidePanel;
