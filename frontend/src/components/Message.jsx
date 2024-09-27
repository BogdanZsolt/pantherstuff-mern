import { Alert } from 'react-bootstrap';

const Message = ({ variant = 'info', children, className }) => {
  return (
    <Alert variant={variant} className={className}>
      {children}
    </Alert>
  );
};

export default Message;
