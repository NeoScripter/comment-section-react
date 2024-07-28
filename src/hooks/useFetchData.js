import { useState, useEffect } from "react";
import initialData from "../data/data.json";

const useFetchData = () => {
    const [data, setData] = useState(() => {
        const localData = localStorage.getItem("commentsData");
        return localData ? JSON.parse(localData) : initialData;
    });

    useEffect(() => {
        localStorage.setItem("commentsData", JSON.stringify(data));
    }, [data]);

    const updateComments = (updatedComment) => {
      setData((prevData) => {
        const updatedComments = prevData.comments.map(comment => 
          comment.id = updatedComment.id ? updatedComment : comment
        );
        return { ...prevData, comments: updatedComments }
      })
    };

    const updateCurrentUser = (updatedUser) => {
      setData((prevData) => ({ ...prevData, currentUser: updatedUser }))
    }

    return  { data, updateComments, updateCurrentUser }
};

export default useFetchData;
