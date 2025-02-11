import React from 'react'
import '../css/Product.css'
import { useNavigate } from 'react-router-dom'

function Products({ product }) {

    const navigate = useNavigate()

    const { id, price, image, title, description } = product

    return (
        <>
            {
                <div className="card">
                    <img width={170} height={200} src={image} alt="product" />
                    <div className='card-info'>
                        <h5>{title}</h5>
                        <b> {price} TL</b>
                    </div>
                    <div>
                        <button onClick={() => navigate("product-details/" + id)} className='detail-btn'>Ürün Detayı...</button >
                    </div>
                </div>
            }
        </>

    )
}

export default Products