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
        // fetch("https://jsonplaceholder.typicode.com/photos")
        // .then(data => data.json())
        // .then(json => setResults(json))
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
                    {/* <Masonry
                        breakpointCols={3}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column"> */}
                        <Masonry
                            breakpointCols={breakpointColumnsObj}
                            className="masonry-grid"
                            columnClassName="masonry-grid_column"
                        >
                            {/* <div className="photos-group"> */}
                                {results.map((item, index) =>  {
                                    return (
                                        <div className="row" key={index} >
                                            <div className="col-md-12 px-0">
                                            <div className="rounded-lg overflow-hidden">
                                                <div onClick={() => handleImageClick(index)}>
                                                    <img src={item.urls.thumb} alt={item.alt_description} className="single-photo"/>
                                                {/* <img src={item.url} alt={item.title} className="single-photo"/> */}
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        )
                                    }
                                )}
                            {/* </div> */}
                        </Masonry>
                </InfiniteScroll>
                
                {imageClicked && <Modal results={results} currentImage={currentImage} currentIndex={currentIndex} closeModal={closeModal}/>}
            </div>
        </div>
    )
}

const FakeCard = (item, index,handleImageClick) => (
    <div key={index} onClick={() => handleImageClick(index)}>
        {/* <img src={item.urls.regular} alt={item.alt_description} className="single-photo"/> */}
        {/* {JSON.stringify(item.data.url)} */}
        <img src={item.data.url} alt={item.data.title} className="single-photo"/>
    </div>
)

export default Home;