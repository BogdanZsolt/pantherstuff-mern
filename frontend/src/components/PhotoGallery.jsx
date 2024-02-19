const PhotoGallery = () => {
  const photos = [
    { photo: '/images/manopulcsi-01-450x600.webp', class: 'tail' },
    { photo: '/images/ecoprint-04-200x200.webp', class: '' },
    { photo: '/images/ecoprint-01-200x200.webp', class: 'tail wide' },
    { photo: '/images/ecoprint-07-200x200.webp', class: '' },
    { photo: '/images/ecoprint-06-200x200.webp', class: 'wide' },
    { photo: '/images/ecoprint-02-200x200.webp', class: '' },
    { photo: '/images/manopulcsi-03-450x600.webp', class: 'tail' },
    { photo: '/images/manopulcsi-02-450x600.webp', class: '' },
    { photo: '/images/ecoprint-03-200x200.webp', class: '' },
    { photo: '/images/ecoprint-05-200x200.webp', class: '' },
  ];
  return (
    <div className="photo-gallery">
      <div className="grid-container">
        {photos.map((photo, index) => (
          <div
            key={index}
            className={`grid-item ${photo.class}`}
            style={{
              backgroundImage: `url(${photo.photo})`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
