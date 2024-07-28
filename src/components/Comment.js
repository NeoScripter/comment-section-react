import React from "react";
import Minus from "../assets/images/icon-minus.svg";
import Plus from "../assets/images/icon-plus.svg";
import Reply from "../assets/images/icon-reply.svg";
import Delete from "../assets/images/icon-delete.svg";
import Edit from "../assets/images/icon-edit.svg";

function Comment({ id, userId, image, username, creationDate, content, score, currentUser, handleModalsUpdate, handleDelete }) {
    const isCurrentUser = currentUser.userId === userId;
    return (
        <div className="p-4 sm:p-6 bg-white relative flex flex-col gap-4 sm:flex-row rounded-lg">
            <div>
                <div className="flex items-center gap-4 sm:gap-8 mb-4">
                    <img src={image} alt={username} className="w-8 h-8" />
                    <div className="black-font-color ff-bold">{username}</div>
                    {isCurrentUser && <div className="ff-medium text-white dark-blue-bg text-sm rounded px-1">you</div>}
                    <div className="grey-font-color">{creationDate}</div>
                </div>
                <p className="light-grey-font-color">{content}</p>
            </div>
            <div className="flex items-center justify-between sm:block sm:order-first">
                <div className="light-blue-bg dark-blue ff-bold grid grid-cols-3 sm:grid-cols-1 w-24 sm:w-10 h-10 sm:h-24 rounded-lg">
                    <div className="grid place-content-center cursor-pointer">
                        <img src={Plus} alt="plus sign" />
                    </div>
                    <div className="grid place-content-center">{score}</div>
                    <div className="grid place-content-center cursor-pointer">
                        <img src={Minus} alt="minus sign" />
                    </div>
                </div>
                <div className="flex items-center gap-4 sm:gap-6 sm:absolute top-6 right-7">
                    {isCurrentUser ? (
                        <>
                        <CommentButton colorClass={"red"} content={"Delete"} imageSrc={Delete} onClick={() => handleDelete(id)} />
                        <CommentButton colorClass={"dark-blue"} content={"Edit"} imageSrc={Edit} />
                        </>
                    ) : (
                        <CommentButton onClick={() => handleModalsUpdate(id)} colorClass={"dark-blue"} content={"Reply"} imageSrc={Reply} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Comment;

function CommentButton({ colorClass, content, imageSrc, onClick }) {
    return (
        <button onClick={onClick} className={`${colorClass} flex items-center gap-2 ff-bold cursor-pointer transition ease-in-out duration-300 hover:opacity-70`}>
            <img src={imageSrc} alt="blue arrow" className="w-3.5 h-3.5" />
            {content}
        </button>
    );
}
