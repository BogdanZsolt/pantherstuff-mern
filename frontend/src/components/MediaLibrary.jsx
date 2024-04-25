import { ReactMediaLibrary } from 'react-media-library';
import {
  useGetImagesQuery,
  useUploadImageMutation,
  useDeleteImageMutation,
} from '../slices/uploadImageApiSlice';
import Loader from './Loader';
import Message from './Message';
import { toast } from 'react-toastify';

const MediaLibrary = ({ displayMedia, setDisplayMedia, setSelectedImg }) => {
  const { data, isLoading, refetch, error } = useGetImagesQuery();

  const [uploadImage, { isLoading: uploadLoading }] = useUploadImageMutation();
  const [deleteImage, { isLoading: deleteLoading }] = useDeleteImageMutation();

  const uploadCallback = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await uploadImage(formData).unwrap();
      toast.success(res.message);
      return true;
    } catch (err) {
      toast.error(err?.data?.message || err.error);
      return false;
    }
  };

  const finishUploadCallback = async (data) => {
    refetch();
    return data;
  };

  const filesSelectCallback = (item) => {
    console.log(item[0]);
    setDisplayMedia(false);
    setSelectedImg(item[0].thumbnailUrl);
  };

  const filesDeleteCallback = async (item) => {
    console.log(item);
    try {
      const res = await deleteImage(item[0]._id);
      toast.success(res.message);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      {uploadLoading && <Loader />}
      {deleteLoading && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.data.message}</Message>
      ) : (
        <ReactMediaLibrary
          isOpen={displayMedia}
          onClose={() => setDisplayMedia(false)}
          fileLibraryList={data}
          defaultSelectedItemIds={['']}
          fileUploadCallback={uploadCallback}
          filesDeleteCallback={filesDeleteCallback}
          filesSelectCallback={filesSelectCallback}
          finishUploadCallback={finishUploadCallback}
        />
      )}
    </>
  );
};

export default MediaLibrary;
