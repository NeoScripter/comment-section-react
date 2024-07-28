import React from "react";

function DeleteModal({ id, handleDelete, handleShowModal}) {
    return (
        <div className="fixed z-20 inset-0 bg-opacity-70 bg-black flex items-center justify-center p-4">
            <div className="bg-white w-full sm:w-96 p-8 rounded">
                <h3 className="ff-bold text-2xl mb-4">Delete comment</h3>
                <p className="grey-font-color mb-5">
                    Are you sure you want to delete this comment? This will remove the comment and can’t be undone.
                </p>
                <div className="flex justify-center items-center gap-4">
                    <button
                        onClick={() => handleShowModal()}
                        className="text-base ff-medium px-5 py-3 rounded-lg text-white uppercase cursor-pointer transition ease-in-out duration-300 hover:opacity-70"
                        style={{ backgroundColor: "#67727E" }}
                    >
                        NO, CANCEL
                    </button>
                    <button
                        onClick={() => handleDelete(id)}
                        className="text-base ff-medium px-5 py-3 rounded-lg text-white uppercase cursor-pointer transition ease-in-out duration-300 hover:opacity-70"
                        style={{ backgroundColor: "#ED6368" }}
                    >
                        YES, DELETE
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;
