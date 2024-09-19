import { useState, useEffect, lazy } from 'react';
import { Container, Row, Form, Button, Image, Col } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { toast } from 'react-toastify';
import SelectLanguage from '../../components/SelectLanguage.jsx';
// import Editor from '../../components/admin/Editor';
import {
  useGetPostDetailsQuery,
  useUpdatePostMutation,
} from '../../slices/postsApiSlice.js';
// import { useUploadImageMutation } from '../../slices/uploadImageApiSlice.js';
import { useGetPostCategoriesQuery } from '../../slices/postCategoriesApiSlice.js';
import { useGetUsersQuery } from '../../slices/usersApiSlice.js';

const Editor = lazy(() => import('../../components/Editor.jsx'));
const ImageForm = lazy(() => import('../../components/admin/ImageForm.jsx'));

const PostEditScreen = () => {
  const { id: postId } = useParams();
  const navigate = useNavigate();

  const { userAuth } = useSelector((state) => state.auth);

  const [lang, setLang] = useState('');
  const [title, setTitle] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [body, setBody] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState(userAuth._id);
  const [isPremium, setIsPremium] = useState(false);

  const {
    data: post,
    isLoading,
    refetch,
    error,
  } = useGetPostDetailsQuery(postId);

  const {
    data: users,
    isLoading: loadingUsers,
    error: errorUsers,
  } = useGetUsersQuery();

  const {
    data: cats,
    isLoading: loadingGetCats,
    error: errGetCats,
  } = useGetPostCategoriesQuery();

  const [updatePost, { isLoading: updateLoading }] = useUpdatePostMutation();

  // const [uploadImage, { isLoading: loadingImage }] = useUploadImageMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updatePost({
        postId,
        language: lang,
        title,
        bannerImage,
        body,
        description,
        category: category === '' ? undefined : category,
        user: author,
        isPremium,
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
      setLang(post.language || 'hu');
      setTitle(post.title);
      setBannerImage(post.bannerImage);
      setBody(post.body);
      setDescription(post.description);
      setCategory(post?.category?._id || '');
      setAuthor(post?.user?._id);
      setIsPremium(post.isPremium);
    }
  }, [post]);

  console.log(isPremium);

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
            {/* <Form.Group controlId="bannerImage" className="mb-2">
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
            </Form.Group> */}
            <ImageForm value={bannerImage} setValue={setBannerImage} />
            {bannerImage && (
              <Image
                src={bannerImage}
                alt="banner"
                rounded
                style={{ width: '100%', height: 'auto' }}
              />
            )}

            <Row>
              <Col>
                {/* Author Select from users */}
                {loadingUsers ? (
                  <Loader />
                ) : errorUsers ? (
                  <Message variant="danger">{errorUsers.data.message}</Message>
                ) : (
                  users &&
                  users.length > 0 && (
                    <Form.Group controlId="user" className="mb-2">
                      <Form.Label>Author</Form.Label>
                      <Form.Select
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                      >
                        <option>Select author</option>
                        {users.map((user) => (
                          <option key={user._id} value={user._id}>
                            {user.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  )
                )}
              </Col>

              <Col md={6}>
                <SelectLanguage lang={lang} setLang={setLang} />
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                {/* Category Select from post category  */}
                {loadingGetCats ? (
                  <Loader />
                ) : errGetCats ? (
                  <Message variant="danger">{errGetCats.data.message}</Message>
                ) : (
                  cats.data && (
                    <Form.Group controlId="category" className="mb-2">
                      <Form.Label>Category</Form.Label>
                      <Form.Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option>Uncategorized</option>
                        {cats.data.map((cat) => (
                          <option key={cat._id} value={cat._id}>
                            {cat.title}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  )
                )}
              </Col>

              <Col md={6}>
                <Form.Group controlId="premium" className="my-2">
                  <Form.Label>Is premium content</Form.Label>
                  <Form.Check
                    type="switch"
                    checked={isPremium}
                    onChange={(e) => setIsPremium(e.target.checked)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="description" className="my-2">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="body" className="my-2">
              <Form.Label>Content</Form.Label>
              {/* <Editor value={body} onChange={setBody} /> */}
              <Editor
                content={body}
                onDataChange={(data) => setBody(data)}
                editable
              />
              {/* <Form.Control
                as="textarea"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              /> */}
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
