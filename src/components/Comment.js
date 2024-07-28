import React from "react";
import Minus from "../assets/images/icon-minus.svg";
import Plus from "../assets/images/icon-plus.svg";
import Reply from "../assets/images/icon-reply.svg";

function Comment({ image, username, creationDate, content, score }) {
    return (
        <div className="p-4 sm:p-6 bg-white relative flex flex-col gap-4 sm:flex-row rounded-lg">
            <div>
                <div className="flex items-center gap-4 sm:gap-8 mb-4">
                    <img src={image} alt={username} className="w-8 h-8" />
                    <div className="black-font-color ff-bold">{username}</div>
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
                <button className="flex items-center gap-2 dark-blue ff-bold cursor-pointer sm:absolute top-6 right-7">
                    <img src={Reply} alt="blue arrow" className="w-3.5 h-3.5" />
                    Reply
                </button>
            </div>
        </div>
    );
}

export default Comment;
