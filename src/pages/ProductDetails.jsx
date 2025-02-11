import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { setSelectedProduct } from '../redux/slices/productSlice'
import '../css/ProductDetails.css'
import { colors } from '@mui/material'
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { addToBasket, calculateTotalPrice } from '../redux/slices/basketSlice'
import Alert from '@mui/material/Alert';
import { IoIosArrowBack } from "react-icons/io";


function ProductDetails() {

    const { id } = useParams()
    const { products, selectedProduct } = useSelector((store) => store.product)
    const { price, image, title, description } = selectedProduct

    const dispatch = useDispatch();

    const navigate = useNavigate()

    useEffect(() => {
        getProductById()
    }, [])

    const getProductById = () => {
        products && products.map((product) => {
            if (product.id == id) {
                dispatch(setSelectedProduct(product))
            }
        })
    }

    //* Counter 
    const [number, setNumber] = useState(0)
    const increase = () => {
        if (number >= 0) {
            setNumber(number + 1)
        }
    }
    const decrease = () => {
        if (number > 0) {
            setNumber(number - 1)
        }
        else {
            alert("Çıkarılacak eşya bulunamadı!")
        }
    }

    const addBasket = () => {
        const payload = {
            id,
            price,
            image,
            title,
            description,
            number
        }
        dispatch(addToBasket(payload));
        setShowAlert(true)
        setKey(key + 1)
        dispatch(calculateTotalPrice())
    }

    const [showAlert, setShowAlert] = useState(false);
    const [key, setKey] = useState(0);

    return (
        <div className='wrapper'>
            {
                showAlert && (
                    <Alert key={key} className='alert' variant="filled" severity="success">Ürün sepete eklendi!</Alert>
                )
            }
            <div>
                <button onClick={() => navigate("/")} className='back-btn'>
                    <IoIosArrowBack />
                </button>
            </div>
            <div>
                <img src={image} alt={"product" + id} />
            </div>
            <div className="detail-section">
                <h2 className='title'>{title}</h2>
                <p className='description'> {description} </p>
                <h3 className='price' > {price} TL</h3>
                <div className="counter-wrapper">
                    <CiCircleMinus onClick={() => decrease()} className='counter-icons' />
                    <span className='counted-num'>{number}</span>
                    <CiCirclePlus onClick={() => increase()} className='counter-icons' />
                </div>

                <div className='btn-wrapper'>
                    <button onClick={addBasket} className='add-btn' >Sepete Ekle</button>
                </div>

            </div>

        </div>
    )
}

export default ProductDetails