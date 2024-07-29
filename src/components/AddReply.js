import React, { useState } from "react";

function AddReply({ currentUser, onClick, commentId, modalId, handleCloseModal, replyTo }) {
    const [newContent, setNewContent] = useState("");

    return (
        <div className="p-4 sm:p-6 bg-white flex gap-4 flex-wrap justify-between items-center">
            <img className="w-8 h-8 sm:w-10 sm:h-10" src={currentUser.image.webp} alt={currentUser.username} />
            <textarea
                onChange={(e) => setNewContent(e.target.value)}
                className="resize-none order-first sm:order-none w-full sm:w-auto flex-grow comment-border border-2 rounded-lg px-4 py-2 input-hover"
                placeholder="Add a comment..."
            ></textarea>
            <button
                onClick={() => {
                    onClick(commentId, newContent, replyTo);
                    setNewContent(''); 
                    handleCloseModal(modalId);
                }} 
                className="text-base ff-medium px-8 py-3 dark-blue-bg rounded-lg text-white uppercase cursor-pointer transition ease-in-out duration-300 hover:opacity-70"
            >
                Send
            </button>
        </div>
    );
}

export default AddReply;
