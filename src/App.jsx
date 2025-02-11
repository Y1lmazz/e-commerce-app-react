import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Container from '@mui/material/Container';
import ProductList from './components/ProductList';
import { BrowserRouter } from 'react-router-dom';
import RouterConfig from './config/RouterConfig';
import Loading from './components/Loading';
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { RiCloseLargeFill } from "react-icons/ri";
import { red } from '@mui/material/colors';
import { addToBasket, calculateTotalPrice, removeFromBasket, setDrawer } from './redux/slices/basketSlice';
import Alert from '@mui/material/Alert';


function App() {

  const { products, drawer, totalPrice } = useSelector((store) => store.basket)
  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(calculateTotalPrice());
  }, []);

  const [showAlert, setShowAlert] = useState(false);
  const [key, setKey] = useState(0);

  const removeBasket = () => {
    setShowAlert(true)
    setKey(key + 1)
  }

  return (
    <>
      {
        showAlert && (
          <Alert key={key} className='alert' variant="filled" severity="error">Ürün sepetten çıkarıldı!</Alert>
        )
      }
      <Container maxWidth="lg" >
        <Header />
        <RouterConfig />
        <Loading />
        <Drawer open={drawer} onClose={() => dispatch(setDrawer())} anchor='right'>
          {
            products && products.length > 0 ? (
              products.map((product) => (
                <div key={product.id} className='drawer-wrapper'>
                  <img className='drawer-img' src={product.image} alt={"product" + product.id} />
                  <p className='drawer-title'>{product.title} - {product.number} Adet</p>
                  <p className='drawer-price'>{product.price}TL</p>
                  <RiCloseLargeFill onClick={() => {
                    dispatch(removeFromBasket({ id: product.id }))
                    removeBasket()
                    dispatch(calculateTotalPrice());
                  }} className='remove-btn' />
                </div>
              ))
            ) : (
              <div className="empty-drawer-message">
                <h2 style={{ textAlign: 'center', margin: 30, width: 400 }} >Sepetiniz boş!</h2>
              </div>
            )
          }
          <div>
            <h2 style={{ margin: 20, fontSize: 22 }}>
              Toplam Tutar : {totalPrice.toFixed(2)} TL
            </h2>
          </div>
        </Drawer>

      </Container >
    </>
  )
}

export default App
