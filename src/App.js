import React, { useState, useEffect } from "react";
import useFetchData from "./hooks/useFetchData";
import Comment from "./components/Comment";
import AddComment from "./components/AddComment";

function App() {
    const { data, updateComments, addComment, addReply, updateCommentOrReply, deleteCommentOrReply, largestId } =
        useFetchData();
    const [openReplyModals, setOpenReplyModals] = useState([]);
    const currentUser = data.currentUser;

    function handleModalsUpdate(id) {
        setOpenReplyModals((prev) => [...prev, id]);
    }

    function handleModalsClose(id) {
        setOpenReplyModals((prev) => prev.filter((prevId) => prevId !== id));
    }

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

    function handleNewReply(id, newReply) {
        if (newReply.length > 0) {
            const newReplies = {
                id: largestId + 1,
                content: newReply,
                createdAt: new Date().getTime(),
                score: 0,
                user: currentUser,
                replies: []
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
                        id={comment.id}
                        userId={comment.user.userId}
                        image={comment.user.image.webp}
                        username={comment.user.username}
                        creationDate={comment.createdAt}
                        content={comment.content}
                        score={comment.score}
                        currentUser={currentUser}
                        handleModalsUpdate={handleModalsUpdate}
                        handleDelete={handleDelete}
                    />
                    {openReplyModals.includes(comment.id) && (
                        <AddComment
                            currentUser={currentUser}
                            onClick={handleNewReply}
                            commentId={comment.id}
                            modalId={comment.id}
                            handleModalsClose={handleModalsClose}
                        />
                    )}
                    {comment.replies.length !== 0 && (
                        <div className="pl-4 sm:pl-10 sm:ml-10 comment-border border-l-2 grid gap-4 sm:gap-5">
                            {comment.replies.map((reply) => (
                                <React.Fragment key={reply.id}>
                                    <Comment
                                        key={reply.id}
                                        id={reply.id}
                                        userId={reply.user.userId}
                                        image={reply.user.image.webp}
                                        username={reply.user.username}
                                        creationDate={reply.createdAt}
                                        content={reply.content}
                                        score={reply.score}
                                        currentUser={currentUser}
                                        handleModalsUpdate={handleModalsUpdate}
                                        handleDelete={handleDelete}
                                    />
                                    {openReplyModals.includes(reply.id) && (
                                        <AddComment
                                            currentUser={currentUser}
                                            onClick={handleNewReply}
                                            commentId={comment.id}
                                            modalId={reply.id}
                                            handleModalsClose={handleModalsClose}
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
