const Banner = ({ src, alt, title, video }) => {
  return (
    <div className="banner">
      {video ? (
        <video src={src} className="banner-video" muted autoPlay loop />
      ) : (
        <img src={src} alt={alt} className="banner-image" />
      )}
      <div className="title">
        <h3>{title}</h3>
      </div>
    </div>
  );
};

Banner.defaultProps = {
  src: '',
  alt: '',
  title: '',
  video: false,
};
export default Banner;
