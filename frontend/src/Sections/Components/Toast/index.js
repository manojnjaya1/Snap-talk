import React from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function PopUpMessage({ show, setShow, message }) {
    return (
        <>
            <ToastContainer
                position="bottom-end" className="p-3" style={{ zIndex: 1 }}>
                <Toast 
                    bg='danger'
                    onClose={() => setShow(false)} 
                    show={show} 
                    delay={3000} 
                    autohide
                >
                    <Toast.Header>
                        <strong className="me-auto">Error*</strong>
                    </Toast.Header>
                    <Toast.Body
                        className='text-white'
                    >{message}!</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
}

export default PopUpMessage;