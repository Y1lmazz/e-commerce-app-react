import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../redux/slices/productSlice';
import Product from '../components/Product';
import '../css/Product.css'

function ProductList() {

    //* Productların çağırılıp gösterildiği component
    const dispatch = useDispatch();
    const { products } = useSelector((store) => store.product);

    useEffect(() => {
        dispatch(getAllProducts())

    }, [])

    return (
        <>
            <div className='product-wrapper'>
                {
                    products && products.map((product) => (
                        <Product key={product.id} product={product} />
                    ))
                }
            </div>
        </>
    )
}

export default ProductList