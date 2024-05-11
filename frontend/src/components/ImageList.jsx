// https://youtu.be/bAJlYgeovlg?si=Ersdvhc7JdTpYByl
import { Button, Image } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import AddImages from './AddImages';
import { RiCloseLine } from 'react-icons/ri';
import MediaLibrary from './MediaLibrary';

const ImageList = ({ images, setImages }) => {
  const [active, setActive] = useState('');
  const [url, setUrl] = useState('');
  const [show, setShow] = useState(false);
  const [addShow, setAddShow] = useState(false);
  const [selected, setSelected] = useState('');

  const removeItem = (value) => {
    const newImages = images.filter((item) => item !== value);
    setImages(newImages);
  };

  useEffect(() => {
    if (active === '') {
      images.length > 0 ? setActive(images[0]) : setActive('');
    }
    if (active !== '' && !images.includes(active)) {
      if (images.length > 0) {
        setActive(images[0]);
      } else {
        setActive('');
      }
    }
    if (url !== '') {
      setImages((images) => [...images, url]);
      console.log(images);
      setUrl('');
    }
    if (selected !== '') {
      setImages((images) => [...images, selected]);
      setSelected('');
    }
  }, [active, images, setImages, url, selected]);

  console.log(selected);

  return (
    <div className="image-list-container flex-column-reverse flex-xl-row">
      <div className="image-list-photo flex-row-reverse flex-xl-column align-items-start align-items-xl-stretch">
        <Button onClick={() => setAddShow(true)}>Add image</Button>
        {active && (
          <div>
            <Image src={active} className="image-list-image__active" />
          </div>
        )}
      </div>
      <div className="image-list-wrapper">
        {images.length > 0 && images[0] !== '' && (
          <>
            {images.map((item, index) => (
              <div
                onClick={() => setActive(item)}
                className={`image-list-item ${active === item ? 'active' : ''}`}
                key={index}
              >
                <span>{item}</span>
                <RiCloseLine
                  className="image-list-item__remove"
                  onClick={() => removeItem(item)}
                />
              </div>
            ))}
          </>
        )}
      </div>
      <AddImages
        addImgShow={addShow}
        setAddImgShow={setAddShow}
        mediaShow={setShow}
        imageUrl={url}
        setImageUrl={setUrl}
      />
      <MediaLibrary
        displayMedia={show}
        setDisplayMedia={setShow}
        setSelectedImg={setSelected}
      />
    </div>
  );
};

export default ImageList;
