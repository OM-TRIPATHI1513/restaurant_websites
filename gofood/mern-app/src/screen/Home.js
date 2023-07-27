import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Home() {
    const [search, setsearch] = useState('');
    const [food_cat, setfood_cat] = useState([]);
    const [food_items, setfood_items] = useState([]);
    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        response = await response.json();
        setfood_items(response[0]);
        setfood_cat(response[1]);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <div>
                {" "}
                <Navbar />
            </div>
            <div>
                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                    <div className="carousel-inner" id='crousel'>
                        <div className='carousel-caption d-none d-md-block' style={{ "zIndex": 10 }}>
                            <div className="d-flex justify-content-center">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setsearch(e.target.value) }} />
                                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60/?burger" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60/?dhosa" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60/?pizza" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div >
            </div>
            <div className="container">
                {food_cat !== []
                    ? food_cat.map((data) => {
                        return (
                            <div key={data.CategoryName} className="row mb-3">
                                <div key={data._id} className="fs-3 m-3">
                                    {data.CategoryName}
                                </div>
                                <hr />
                                {food_items !== [] ? (
                                    food_items
                                        .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                                        .map((filterItems) => {
                                            return (
                                                <div key={filterItems._id} className=" col-12 col-md-6 col-lg-3 ">
                                                    <Card foodItems={filterItems}
                                                        options={filterItems.options[0]}
                                                    />
                                                </div>
                                            );
                                        })
                                ) : (
                                    <div>No such data Found</div>
                                )}
                            </div>
                        );
                    })
                    : " "}
            </div>
            <div>
                <Footer />
            </div>
        </>
    );
}

export default Home;
