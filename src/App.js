import React from "react";
import useFetchData from "./hooks/useFetchData";
import Comment from "./components/Comment";
import AddReply from "./components/AddReply";
import AddComment from "./components/AddComment";
import useModalState from "./hooks/useModalState";

function App() {
    const { data, addComment, addReply, updateCommentOrReply, deleteCommentOrReply, updateScore, largestId } =
        useFetchData();
    const { openModals, handleOpenModal, handleCloseModal } = useModalState();
    const currentUser = data.currentUser;

    function handleNewComment(id, newContent) {
        if (newContent.length > 0) {
            const newComment = {
                id: largestId + 1,
                content: newContent,
                createdAt: new Date().getTime(),
                score: 0,
                user: currentUser,
                replies: []
            };
            addComment(newComment);
        }
    }

    function handleNewReply(id, newReply, replyTo) {
        if (newReply.length > 0) {
            const newReplies = {
                id: largestId + 1,
                content: newReply,
                createdAt: new Date().getTime(),
                score: 0,
                user: currentUser,
                replyingTo: replyTo
            };
            addReply(id, newReplies);
        }
    }

    function handleDelete(id) {
        deleteCommentOrReply(id);
    }

    return (
        <div className="select-none py-8 px-4 max-w-3xl mx-auto grid gap-4 sm:gap-5">
            {data.comments.map((comment) => (
                <React.Fragment key={comment.id}>
                    <Comment
                        key={comment.id}
                        comment={comment}
                        currentUser={currentUser}
                        handleOpenModal={handleOpenModal}
                        handleDelete={handleDelete}
                        updateComment={updateCommentOrReply}
                        updateScore={updateScore}
                    />
                    {openModals.includes(comment.id) && (
                        <AddReply
                            currentUser={currentUser}
                            onClick={handleNewReply}
                            commentId={comment.id}
                            modalId={comment.id}
                            handleCloseModal={handleCloseModal}
                            replyTo={comment.user.username}
                        />
                    )}
                    {comment.replies.length !== 0 && (
                        <div className="pl-4 sm:pl-10 sm:ml-10 comment-border border-l-2 grid gap-4 sm:gap-5">
                            {comment.replies.map((reply) => (
                                <React.Fragment key={reply.id}>
                                    <Comment
                                        key={reply.id}
                                        comment={reply}
                                        currentUser={currentUser}
                                        handleOpenModal={handleOpenModal}
                                        handleDelete={handleDelete}
                                        updateComment={updateCommentOrReply}
                                        updateScore={updateScore}
                                    />
                                    {openModals.includes(reply.id) && (
                                        <AddReply
                                            currentUser={currentUser}
                                            onClick={handleNewReply}
                                            commentId={comment.id}
                                            modalId={reply.id}
                                            handleCloseModal={handleCloseModal}
                                            replyTo={reply.user.username}
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    )}
                </React.Fragment>
            ))}
            <AddComment currentUser={currentUser} onClick={handleNewComment} />
        </div>
    );
}

export default App;
