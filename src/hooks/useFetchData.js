import { useState, useEffect, useCallback } from "react";
import initialData from "../data/data.json";

const useFetchData = () => {
    const [data, setData] = useState(() => {
        const localData = localStorage.getItem("commentsData");
        return localData ? JSON.parse(localData) : initialData;
    });
    const [largestId, setLargestId] = useState(0);

    const findLargestId = useCallback(() => {
        let largest = 0;
        for (let comment of data.comments) {
            if (comment.id > largest) {
                largest = comment.id;
            }
            for (let reply of comment.replies) {
                if (reply.id > largest) {
                    largest = reply.id;
                }
            }
        }
        setLargestId(largest);
    }, [data.comments]);

    useEffect(() => {
        localStorage.setItem("commentsData", JSON.stringify(data));
        findLargestId();
    }, [data, findLargestId]);

    const updateComments = useCallback((updatedComment) => {
        setData((prevData) => {
            const updatedComments = prevData.comments.map((comment) =>
                comment.id === updatedComment.id ? updatedComment : comment
            );
            return { ...prevData, comments: updatedComments };
        });
    }, []);

    const addComment = (newComment) => {
        setData((prevData) => {
            return {
                ...prevData,
                comments: [...prevData.comments, newComment]
            };
        });
    };

    const addReply = (commentId, newReply) => {
        setData((prevData) => {
            const updatedComments = prevData.comments.map((comment) => {
                if (comment.id === commentId) {
                    return { ...comment, replies: [...comment.replies, newReply] };
                }
                return comment;
            });
            return { ...prevData, comments: updatedComments };
        });
    };

    const updateCommentOrReply = (id, newContent) => {
        setData((prevData) => {
            const updatedComments = prevData.comments.map((comment) => {
                if (comment.id === id) {
                    return { ...comment, content: newContent };
                }
                const updatedReplies = comment.replies.map((reply) => {
                    if (reply.id === id) {
                        return { ...reply, content: newContent };
                    }
                    return reply;
                });
                return { ...comment, replies: updatedReplies };
            });
            return { ...prevData, comments: updatedComments };
        });
    };

    const deleteCommentOrReply = (id) => {
      setData((prevData) => {
          const updatedComments = prevData.comments
              .map((comment) => {
                  if (comment.id === id) {
                      return null;
                  }
  
                  const updatedReplies = comment.replies.filter(reply => reply.id !== id);
                  return { ...comment, replies: updatedReplies };
              })
              .filter(comment => comment !== null); 
  
          return { ...prevData, comments: updatedComments };
      });
  };
  

    return { data, updateComments, addComment, addReply, updateCommentOrReply, deleteCommentOrReply, largestId };
};

export default useFetchData;
