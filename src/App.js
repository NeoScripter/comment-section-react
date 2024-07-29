import React, { useState, useEffect } from "react";
import useFetchData from "./hooks/useFetchData";
import Comment from "./components/Comment";
import AddReply from "./components/AddReply";
import AddComment from "./components/AddComment";

function App() {
    const { data, addComment, addReply, updateCommentOrReply, deleteCommentOrReply, updateScore, largestId } =
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

    function calculateDate(date) {
      const minute = 1000 * 60;
      const hour = minute * 60;
      const day = hour * 24;
      const now = new Date().getTime();
      const difference = now - date; 
      const differenceInDays = Math.floor(difference / day);
  
      const currentDate = new Date(now);
      const pastDate = new Date(date);
      const differenceInMonths =
          (currentDate.getFullYear() - pastDate.getFullYear()) * 12 +
          (currentDate.getMonth() - pastDate.getMonth());
  
      let result;
      if (differenceInMonths > 0) {
          result = `${differenceInMonths} months ago`;
      } else if (differenceInDays > 0) {
          result = `${differenceInDays} days ago`;
      } else {
          const differenceInHours = Math.floor(difference / hour);
          result = `${differenceInHours} hours ago`;
      }
      return result;
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
                        replyTo={null}
                        username={comment.user.username}
                        creationDate={calculateDate(comment.createdAt)}
                        content={comment.content}
                        score={comment.score}
                        currentUser={currentUser}
                        handleModalsUpdate={handleModalsUpdate}
                        handleDelete={handleDelete}
                        updateComment={updateCommentOrReply}
                        updateScore={updateScore}
                    />
                    {openReplyModals.includes(comment.id) && (
                        <AddReply
                            currentUser={currentUser}
                            onClick={handleNewReply}
                            commentId={comment.id}
                            modalId={comment.id}
                            handleModalsClose={handleModalsClose}
                            replyTo={comment.user.username}
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
                                        replyTo={reply.replyingTo}
                                        username={reply.user.username}
                                        creationDate={calculateDate(reply.createdAt)}
                                        content={reply.content}
                                        score={reply.score}
                                        currentUser={currentUser}
                                        handleModalsUpdate={handleModalsUpdate}
                                        handleDelete={handleDelete}
                                        updateComment={updateCommentOrReply}
                                        updateScore={updateScore}
                                    />
                                    {openReplyModals.includes(reply.id) && (
                                        <AddReply
                                            currentUser={currentUser}
                                            onClick={handleNewReply}
                                            commentId={comment.id}
                                            modalId={reply.id}
                                            handleModalsClose={handleModalsClose}
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
