import { Link } from 'react-router-dom';
import { RiFacebookBoxFill, RiInstagramLine } from 'react-icons/ri';

const SocialShareButtons = ({ url }) => {
  const app_id = '423161656834912';

  return (
    <div className="w-100 d-flex justify-content-start align-items-center gap-1">
      <Link
        to={`https://www.facebook.com/dialog/share?app_id=${app_id}&display=popup&href=${url}`}
        target="_blank"
        rel="noreferrer"
      >
        <RiFacebookBoxFill
          className="text-secondary"
          style={{ width: '30px', height: 'auto' }}
        />
      </Link>
      <Link to="https://instagram.com" target="_blank" rel="noreferrer">
        <RiInstagramLine
          className="text-secondary"
          style={{ width: '30px', height: 'auto' }}
        />
      </Link>
    </div>
  );
};

export default SocialShareButtons;
