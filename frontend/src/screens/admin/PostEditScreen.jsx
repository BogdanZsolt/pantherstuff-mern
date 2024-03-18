import { useState, useEffect } from 'react';
import { Container, Row, Form, Button, Image } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { toast } from 'react-toastify';
import Editor from '../../components/admin/Editor';
import {
  useGetPostDetailsQuery,
  useUpdatePostMutation,
} from '../../slices/postsApiSlice';
import { useUploadImageMutation } from '../../slices/uploadImageApiSlice';
import { useGetPostCategoriesQuery } from '../../slices/postCategoriiesApiSlice';

const PostEditScreen = () => {
  const { id: postId } = useParams();

  const [title, setTitle] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [body, setBody] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [user, setUser] = useState('');

  const {
    data: post,
    isLoading,
    refetch,
    error,
  } = useGetPostDetailsQuery(postId);

  const {
    data: cats,
    isLoading: loadingGetCats,
    error: errGetCats,
  } = useGetPostCategoriesQuery();

  const [updatePost, { isLoading: updateLoading }] = useUpdatePostMutation();

  const [uploadImage, { isLoading: loadingImage }] = useUploadImageMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updatePost({
        postId,
        title,
        bannerImage,
        body,
        description,
        category,
        user,
      }).unwrap();
      toast.success('Post updated');
      refetch();
      navigate('/admin/postlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBannerImage(post.bannerImage);
      setBody(post.body);
      setDescription(post.description);
      setCategory(post.category);
      setUser(post.user);
    }
  }, [post]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadImage(formData).unwrap();
      console.log(res);
      toast.success(res.message);
      setBannerImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container className="mt-5" fluid>
      <Link to="/admin/postlist" className="btn btn-primary my-3">
        Go Back
      </Link>
      <Row>
        <h2 className="text-center fs-1 fw-bold">Edit Post</h2>
      </Row>
      <FormContainer>
        {updateLoading && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error.data.message}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="bannerImage" className="mb-2">
              <Form.Label>Banner Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={bannerImage}
                onChange={(e) => setBannerImage(e.target.value)}
              />
              <Form.Control
                label="Choose File"
                onChange={uploadFileHandler}
                type="file"
              />
              {loadingImage && <Loader />}
              {bannerImage && (
                <Image
                  src={bannerImage}
                  alt="banner"
                  rounded
                  style={{ width: '100%', height: 'auto' }}
                />
              )}
            </Form.Group>

            {/* Author Select from users */}

            {/* Category Select from post category  */}
            {loadingGetCats ? (
              <Loader />
            ) : errGetCats ? (
              <Message variant="danger">{errGetCats.data.message}</Message>
            ) : (
              cats &&
              cats.length > 0 && (
                <Form.Group controlId="category" className="mb-2">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>Uncategorized</option>
                    {cats.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.title}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              )
            )}

            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description" className="my-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="body" className="my-2">
              <Form.Label>Content</Form.Label>
              <Editor value={body} onChange={setBody} />
            </Form.Group>

            <Button type="submit" variant="primary" className="my-2">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </Container>
  );
};

export default PostEditScreen;
