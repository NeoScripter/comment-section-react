import { useState } from "react";

const useModalState = () => {
    const [openModals, setOpenModals] = useState([]);

    const handleOpenModal = (id) => {
        setOpenModals((prev) => [...prev, id]);
    };

    const handleCloseModal = (id) => {
        setOpenModals((prev) => prev.filter((prevId) => prevId !== id));
    };

    return { openModals, handleOpenModal, handleCloseModal };
};

export default useModalState;
