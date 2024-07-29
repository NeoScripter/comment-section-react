import React, { useState, useRef } from "react";
import Minus from "../assets/images/icon-minus.svg";
import Plus from "../assets/images/icon-plus.svg";
import Reply from "../assets/images/icon-reply.svg";
import Delete from "../assets/images/icon-delete.svg";
import Edit from "../assets/images/icon-edit.svg";
import DeleteModal from "./DeleteModal";

function Comment({
    id,
    userId,
    image,
    replyTo,
    username,
    creationDate,
    content,
    score,
    currentUser,
    handleModalsUpdate,
    handleDelete,
    updateComment,
    updateScore
}) {
    const [isEdited, setIsEdited] = useState(false);
    const [newContent, setNewContent] = useState(content);
    const [showModal, setShowModal] = useState(false);
    const initialScore = useRef(score);
    const isCurrentUser = currentUser.userId === userId;

    function handleEditUpdate() {
        setIsEdited((prev) => !prev);
    }

    function handleShowModal() {
        setShowModal((prev) => !prev);
    }

    function incrementScore() {
        if (score <= initialScore.current) {
            updateScore(id, score + 1);
        }
    }

    function decrementScore() {
        if (score >= initialScore.current) {
            updateScore(id, score - 1);
        }
    }

    return (
        <>
        {showModal && <DeleteModal id={id} handleDelete={handleDelete} handleShowModal={handleShowModal}/>}
        <div className="p-4 sm:p-6 bg-white relative flex flex-col gap-4 sm:flex-row rounded-lg">
            <div className="w-full">
                <div className="flex items-center gap-4 sm:gap-8 mb-4">
                    <img src={image} alt={username} className="w-8 h-8" />
                    <div className="black-font-color ff-bold">{username}</div>
                    {isCurrentUser && <div className="ff-medium text-white dark-blue-bg text-sm rounded px-1">you</div>}
                    <div className="grey-font-color">{creationDate}</div>
                </div>
                {isEdited ? (
                    <textarea
                        onChange={(e) => setNewContent(e.target.value)}
                        value={newContent}
                        className="light-grey-font-color resize-none w-full input-hover rounded"
                    />
                ) : (
                    <p className="light-grey-font-color">
                        {replyTo && <span className="font-bold dark-blue">@{replyTo} </span>}
                        {newContent}
                    </p>
                )}
            </div>
            <div className="flex items-center justify-between sm:block sm:order-first">
                <div className="light-blue-bg dark-blue ff-bold grid grid-cols-3 sm:grid-cols-1 w-24 sm:w-10 h-10 sm:h-24 rounded-lg">
                    <div 
                        onClick={() => incrementScore()}
                        className="grid place-content-center cursor-pointer">
                        <img src={Plus} alt="plus sign" />
                    </div>
                    <div className="grid place-content-center">{score}</div>
                    <div 
                        onClick={() => decrementScore()}
                        className="grid place-content-center cursor-pointer">
                        <img src={Minus} alt="minus sign" />
                    </div>
                </div>
                <div className="flex items-center gap-4 sm:gap-6 sm:absolute top-6 right-7">
                    {isEdited ? (
                            <button
                                onClick={() => {
                                    updateComment(id, newContent);
                                    handleEditUpdate();
                                }}
                                className="text-base ff-medium px-8 py-3 dark-blue-bg rounded-lg text-white uppercase cursor-pointer transition ease-in-out duration-300 hover:opacity-70"
                            >
                                Update
                            </button>
                    ) : (isCurrentUser ? (
                        <>
                            <CommentButton
                                colorClass={"red"}
                                content={"Delete"}
                                imageSrc={Delete}
                                onClick={() => handleShowModal()}
                            />
                            <CommentButton
                                colorClass={"dark-blue"}
                                content={"Edit"}
                                imageSrc={Edit}
                                onClick={() => handleEditUpdate()}
                            />
                        </>
                    ) : (
                        <CommentButton
                            onClick={() => handleModalsUpdate(id)}
                            colorClass={"dark-blue"}
                            content={"Reply"}
                            imageSrc={Reply}
                        />
                    ))}
                </div>
            </div>
        </div>
        </>
    );
}

export default Comment;

function CommentButton({ colorClass, content, imageSrc, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`${colorClass} flex items-center gap-2 ff-bold cursor-pointer transition ease-in-out duration-300 hover:opacity-70`}
        >
            <img src={imageSrc} alt="blue arrow" className="w-3.5 h-3.5" />
            {content}
        </button>
    );
}
