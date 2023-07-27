import React, { useState, useRef, useEffect } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';

function Card(props) {
    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();
    let options = props.options;
    let priceoption = Object.keys(options)
    const [qty, setqty] = useState(1)
    const [size, setsize] = useState("")
    const handleAddtoCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === props.foodItems._id) {
                food = item;

                break;
            }
        }
        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItems._id, price: finalPrice, qty: qty })
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: 'ADD', id: props.foodItems._id, name: props.foodItems.name, price: finalPrice, qty: qty, size: size })
                return
            }
            return
        }
        await dispatch({ type: 'ADD', id: props.foodItems._id, name: props.foodItems.name, price: finalPrice, qty: qty, size: size })
        // await console.log(data)
    }
    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setsize(priceRef.current.value)
    }, [])
    return (
        <div >
            <div>
                <div className="card mt-3 bg-light" style={{ "width": "16rem", "maxHeight": "440px" }}>
                    <img src={props.foodItems.img} alt='' style={{ height: "120px", objectFit: "fill" }} />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodItems.name}</h5>
                        <p className="card-text">{props.foodItems.description}</p>
                    </div>
                    <div className='container w-100%' >
                        <select className='m-2 h-100 bg-success rounded' onChange={(e) => setqty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (<option key={i + 1} value={i + 1}>{i + 1}</option>)
                            })}
                        </select>
                        <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setsize(e.target.value)}>
                            {priceoption.map((data) => {
                                return <option key={data} value={data}>{data}</option>
                            })}
                        </select>
                        <div className='d-inline h-100 fs-5'>
                            ₹{finalPrice}/-
                        </div>
                    </div>
                    <hr />
                    <button className='btn-sm btn-success justify-center ms-2' onClick={handleAddtoCart}>Add to Cart</button>
                </div >
            </div>
        </div >
    )
}

export default Card