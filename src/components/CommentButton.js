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

export default CommentButton;