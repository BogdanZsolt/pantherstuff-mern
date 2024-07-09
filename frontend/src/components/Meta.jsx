import { Helmet } from 'react-helmet-async';

const Meta = ({
  title = 'Welcome to PantherStuff',
  description = 'We sell the best eco-print, organic clothes.',
  keywords = 'clothes, ecoprint, organic',
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

export default Meta;
