import React from 'react';
import './Modal.css'

const CustomModal = ({ setModalOpen }) => {
    // 모달 닫기 함수
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>안녕하세요</h2>
                <p>모달 내용은 어쩌고 저쩌고..</p>
                <button className="closeButton" onClick={closeModal}>닫기</button>

            </div>
        </div>
    );
};

export default CustomModal;
