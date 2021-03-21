import React, { useEffect, useState } from "react"

import "./Modal.css"


const Modal = (props) => {

    const [currentIndexModal, setCurrentIndexModal] = useState(props.currentIndex)
    // const [currentImageToDisplay, setCurrentImageToDisplay] = useState(props.currentImage)

    // useEffect(() => {
    //     console.log(props)
    // },[currentIndexModal])

    const handleNavigation = e => {
        const {name} = e.target

        if(name === "left"){
            setCurrentIndexModal(currentIndexModal-1)
        } else {
            setCurrentIndexModal(currentIndexModal+1)
        }
    }


    return (
        <div className="modal-root">
            <div className="modal-content">
                {/* {JSON.stringify(props.results[currentIndexModal])} */}
                {/* <p>{props.results[currentIndexModal].alt_description}</p> */}
                <p onClick={() => props.closeModal()}>Close</p>
                <img src={props.results[currentIndexModal].urls.regular} alt={props.results[currentIndexModal].alt_description}/>
                <div className="modal-navigation">
                    {currentIndexModal >0 && <button onClick={handleNavigation} name="left">Previous</button>}
                    {currentIndexModal <= props.results.length && <button onClick={handleNavigation} name="right">Next</button>}
                </div>
            </div>
        </div>
    )
}

export default Modal;