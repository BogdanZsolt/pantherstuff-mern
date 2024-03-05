import { useState } from 'react';
import CommentForm from './CommentForm';
import { toast } from 'react-toastify';
import Comment from './Comment';
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from '../../slices/postsApiSlice';

const CommentsContainer = ({
  className,
  comments = [],
  slug,
  logginedUserId = '',
  refetch,
}) => {
  const [createComment] = useCreateCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [affectedComment, setAffectedComment] = useState(null);

  const addCommentHandler = async (
    value,
    parent = null,
    replyOnUser = null
  ) => {
    try {
      await createComment({
        slug: slug,
        description: value,
        parent: parent,
        replyOnUser: replyOnUser,
      });
      setAffectedComment(null);
      refetch;
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const updateCommentHandler = async (value, commentId) => {
    const comment = comments.find((comment) => comment._id === commentId);
    const updatedComment = {
      ...comment,
      description: value,
      commentId: commentId,
    };
    try {
      await updateComment(updatedComment);
      setAffectedComment(null);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const deleteCommentHandler = async (commentId) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteComment(commentId);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className={`${className}`}>
      <CommentForm
        btnLabel="Submit"
        formSubmitHandler={(value) => addCommentHandler(value)}
      />
      <div className="mt-4">
        {comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            logginedUserId={logginedUserId}
            affectedComment={affectedComment}
            setAffectedComment={setAffectedComment}
            addComment={addCommentHandler}
            updateComment={updateCommentHandler}
            deleteComment={deleteCommentHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsContainer;
