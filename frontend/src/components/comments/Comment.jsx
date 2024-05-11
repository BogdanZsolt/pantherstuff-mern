import { Row, Col } from 'react-bootstrap';
import { RiMessageLine, RiEditLine, RiDeleteBin6Line } from 'react-icons/ri';
import CommentForm from './CommentForm';

const Comment = ({
  comment,
  logginedUserId,
  affectedComment,
  setAffectedComment,
  addComment,
  parentId = null,
  updateComment,
  deleteComment,
}) => {
  const isUserLoggined = Boolean(logginedUserId);
  const commentBelongToUser = logginedUserId === comment?.user?._id;
  const isReplying =
    affectedComment &&
    affectedComment.type === 'replying' &&
    affectedComment._id === comment._id;
  const isEditing =
    affectedComment &&
    affectedComment.type === 'editing' &&
    affectedComment._id === comment._id;
  const repliedCommentId = parentId ? parentId : comment._id;
  const replyOnUserId = comment?.user?._id;

  return (
    <Row
      className="d-flex flex-nowrap align-items-start px-3 pt-3 rounded border-5 bg-secondary"
      style={{ '--bs-bg-opacity': '0.15' }}
    >
      <Col xs={2} sm={1}>
        <img
          src="/images/profile.webp"
          alt="user profile"
          className="rounded-circle border-5"
          style={{ width: '30px', height: '30px' }}
        />
      </Col>
      <Col xs={10} sm={11} className="d-flex flex-column">
        <span className="font-cursive d-inline-block text-secondary fw-bold fs-6 ">
          {comment?.user?.name}
        </span>
        <span style={{ fontSize: '0.875rem' }}>
          {new Date(comment.createdAt).toLocaleDateString('hu-HU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
        {!isEditing && <p className="lead mt-2">{comment.description}</p>}
        {isEditing && (
          <CommentForm
            btnLabel="Update"
            formSubmitHandler={(value) => updateComment(value, comment._id)}
            formCancelHandler={() => setAffectedComment(null)}
            initialText={comment.description}
          />
        )}
        <div className="d-flex align-items-center flex-row gap-2 gap-md-3 scrollto">
          {isUserLoggined && (
            <button
              onClick={() =>
                setAffectedComment({ type: 'replying', _id: comment.id })
              }
              className="bg-transparent text-secondary border-0 d-flex align-items-center fs-6 gap-1"
            >
              <RiMessageLine />
              Reply
            </button>
          )}
          {commentBelongToUser && (
            <>
              <button
                className="bg-transparent text-secondary border-0 d-flex align-items-center fs-6 gap-1"
                onClick={() =>
                  setAffectedComment({ type: 'editing', _id: comment._id })
                }
              >
                <RiEditLine />
                Edit
              </button>
              <button
                className="bg-transparent text-secondary border-0 d-flex align-items-center fs-6 gap-1"
                onClick={() => deleteComment(comment._id)}
              >
                <RiDeleteBin6Line />
                Delete
              </button>
            </>
          )}
        </div>
        {isReplying && (
          <CommentForm
            btnLabel="Reply"
            formSubmitHandler={(value) =>
              addComment(value, repliedCommentId, replyOnUserId)
            }
            formCancelHandler={() => setAffectedComment(null)}
          />
        )}
        {comment?.replies?.length > 0 && (
          <div>
            {comment.replies.map((reply) => (
              <Comment
                key={reply._id}
                comment={reply}
                addComment={addComment}
                affectedComment={affectedComment}
                setAffectedComment={setAffectedComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                logginedUserId={logginedUserId}
                parentId={comment._id}
              />
            ))}
          </div>
        )}
      </Col>
      {/* {comment.replies.lenght > 0 && (
        <>
          <div>
            {comment.replies.map((reply) => (
              <Comment
                key={reply._id}
                comment={reply}
                addComment={addComment}
                affectedComment={affectedComment}
                setAffectedComment={setAffectedComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                logginedUserId={logginedUserId}
                parentId={comment._id}
              />
            ))}
          </div>
        </>
      )} */}
    </Row>
  );
};

export default Comment;
