import React, { useState, useEffect } from "react"
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry from "react-masonry-css";
import Modal from "../Modal/Modal"

import { createApi } from "unsplash-js";

import "./Home.css"


const api = createApi({
    // Don't forget to set your access token here!
    // See https://unsplash.com/developers
    accessKey: "BE1lkEqCStnQ146IpuaUabcy8OBPfCAL-8GMzUdJm2s"
});

const Home = () => {

    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [imageClicked, setImageClicked] = useState(false)
    const [currentImage, setCurrentImage] = useState("")
    const [currentIndex, setCurrentIndex] = useState(null)

    useEffect(() => {
        api.photos.getRandom({count: 15})
        .then(data => {
            setResults(data.response)
            console.log(30,data.response)
        })
        // fetch("https://jsonplaceholder.typicode.com/photos")
        // .then(data => data.json())
        // .then(json => setResults(json))
    }, []);

    const fetchMoreData = () => {
        if(!loading) {
            setLoading(true)
            api.photos.getRandom({count: 15})
            .then(data => {
                setLoading(false)
                setResults(results.concat(data.response))
                console.log(43,data.response)
            })
            // fetch("https://jsonplaceholder.typicode.com/photos")
            // .then(data => data.json())
            // .then(json => {
            //     setLoading(false)
            //     setResults(results.concat(json))
            // })
        }
    }

    const handleImageClick = index => {
        setImageClicked(true)
        console.log(55,results[index])
        setCurrentImage(results[index])
        setCurrentIndex(index)
    }

    const closeModal = () => {
        setImageClicked(false)
    }

    return (
        <div>
            <div>
                <InfiniteScroll 
                    dataLength = {results.length}
                    next = {fetchMoreData}
                    hasMore = {true}
                    loader = {<h4>Loading...</h4>}
                    className={"images-box "+ (imageClicked ? "grey-out" : "")}
                >
                    {/* <Masonry
                        breakpointCols={3}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column"> */}
                            <div className="photos-group">
                                {results.map((item, index) =>  {
                                    return (
                                        <div key={index} onClick={() => handleImageClick(index)}>
                                            <img src={item.urls.regular} alt={item.alt_description} className="single-photo"/>
                                            {/* <img src={item.url} alt={item.title} className="single-photo"/> */}
                                        </div>
                                    )
                                }
                                )}
                            </div>
                    {/* </Masonry> */}
                </InfiniteScroll>
                {imageClicked && <Modal results={results} currentImage={currentImage} currentIndex={currentIndex} closeModal={closeModal}/>}
            </div>
        </div>
    )
}

export default Home;