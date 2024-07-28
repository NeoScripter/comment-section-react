import React, { useState } from "react";
import useFetchData from "./hooks/useFetchData";
import Comment from "./components/Comment";
import AddComment from "./components/AddComment";

function App() {
    const { data, updateComments, updateCurrentUser } = useFetchData();
    const [newContent, setNewContent] = useState("");

    const currentUser = data.currentUser;
    return (
        <div className="select-none py-8 px-4 max-w-3xl mx-auto grid gap-4 sm:gap-5">
            {data.comments.map((comment) => (
                <React.Fragment key={comment.id}>
                    <Comment
                        key={comment.id}
                        user={comment.user}
                        creationDate={comment.createdAt}
                        content={comment.content}
                        score={comment.score}
                        currentUser={currentUser}
                    />
                    {(comment.replies.length !== 0) && (<div className="pl-4 sm:pl-10 sm:ml-10 comment-border border-l-2 grid gap-4 sm:gap-5">
                        {comment.replies.map((reply) => (
                            <Comment
                                key={reply.id}
                                user={reply.user}
                                creationDate={reply.createdAt}
                                content={comment.content}
                                score={reply.score}
                                currentUser={currentUser}
                            />
                        ))}
                    </div>)}
                </React.Fragment>
            ))}
            <AddComment currentUser={currentUser} />
        </div>
    );
}

export default App;
