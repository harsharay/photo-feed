import React, { useState, useEffect } from "react"
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry from "react-masonry-css";
import Modal from "../Modal/Modal";
// import {
//     CellMeasurer,
//     CellMeasurerCache,
//     createMasonryCellPositioner,
//     Masonry,
// } from 'react-virtualized';


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

    // const cache = new CellMeasurerCache({
    //     defaultHeight: 250,
    //     defaultWidth: 200,
    //     fixedWidth: true,
    //   });

    // const cellPositioner = createMasonryCellPositioner({
    //     cellMeasurerCache: cache,
    //     columnCount: 5,
    //     columnWidth: 200,
    //     spacer: 10,
    // });
    
    // function cellRenderer({index, key, parent, style}) {
    //     const datum = results[index];
      
    //     return (
    //       <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
    //         <div style={style}>
    //           <img
    //             src={datum.urls.regular}
    //             style={{
    //               height: datum.imageHeight,
    //               width: datum.imageWidth,
    //             }}
    //             alt="imag"
    //           />
    //           {/* <h4>{datum.caption}</h4> */}
    //         </div>
    //       </CellMeasurer>
    //     );
    //   }
    

    useEffect(() => {
        api.photos.getRandom({count: 25})
        .then(data => {
            setResults(data.response)
            console.log(30,data.response)
        })
    }, []);

    const fetchMoreData = () => {
        if(!loading) {
            setLoading(true)
            api.photos.getRandom({count: 20})
            .then(data => {
                setLoading(false)
                setResults(results.concat(data.response))
                console.log(43,data.response)
            })
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

    
  const breakpointColumnsObj = {
    default: 6,
    576: 6,
  };

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
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="masonry-grid"
                        columnClassName="masonry-grid_column"
                    >
                            {results.map((item, index) =>  {
                                return (
                                    <div className="row" key={index} >
                                        <div className="col-md-12 px-0">
                                        <div className="rounded-lg overflow-hidden">
                                            <div onClick={() => handleImageClick(index)}>
                                                <img src={item.urls.thumb} alt={item.alt_description} className="single-photo"/>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    )
                                }
                            )}
                    </Masonry>
                </InfiniteScroll>
                
                {imageClicked && <Modal results={results} currentImage={currentImage} currentIndex={currentIndex} closeModal={closeModal}/>}
            </div>
        </div>
    )
}

export default Home;