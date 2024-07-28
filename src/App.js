import React, { useState } from "react";
import useFetchData from "./hooks/useFetchData";
import Comment from "./components/Comment";
import Delete from "./assets/images/icon-delete.svg";
import Edit from "./assets/images/icon-edit.svg";

function App() {
    const { data, updateComments, updateCurrentUser } = useFetchData();
    const [newContent, setNewContent] = useState("");

    return (
        <div className="py-8 px-4 max-w-3xl mx-auto grid gap-4">
            {data.comments.map((comment) => (
                <Comment 
                  key={comment.id} 
                  image={comment.user.image.webp} 
                  username={comment.user.username}
                  creationDate={comment.createdAt}
                  content={comment.content}
                  score={comment.score}
                />
            ))}
        </div>
    );
}

export default App;
