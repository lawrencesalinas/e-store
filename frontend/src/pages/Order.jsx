import './pagecss/ShoppingBag.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getShoppingBag, deleteShoppingBagItem, reset } from '../features/shoppingBag/shoppingBagSlice'
import Header from '../components/layouts/Header';
import ShoppingBagItem from '../components/products/ShoppingBagItem';
import Spinner from '../components/shared/Spinner'
import { toast } from 'react-toastify'
import NavBar from '../components/layouts/NavBar';
import { getOrder } from '../features/order/orderSlice';
import PayButton from '../components/shared/PayButton';

function Order() {
    const { user } = useSelector(state => state.auth)
    const { order } = useSelector(state => state.orders)
    const { shoppingBag, isLoading, isError, isSuccess, message } = useSelector(state => state.shoppingBag)

    const [formData, setFormData] = useState({
        address: '',
        city: '',
        postalCode: '',
        country: ''
    })



    const { address, city, postalCode, country } = formData

    const onChange = (e) => {
        setFormData((prevState) => (
            {
                ...prevState,
                [e.target.name]: e.target.value
            }
        ))
    }

    const onSubmit = (e) => {
        e.preventDefualt()

    }

    const orderData = { products: order.products }

    const checkout = async (e) => {

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },

            }
            const response = await axios.post('http://localhost:8000/api/payments', orderData, config)
            console.log(response);
            return response.data

        } catch (error) {
            console.error(error)

        }
    }



    const numberOfItems = shoppingBag.length

    const totalPrice = shoppingBag.reduce((acc, item) => acc + item.shoppingBagItem.quantity * item.price, 0).toFixed(2)
    const totalItems = shoppingBag.reduce((acc, item) => acc + item.shoppingBagItem.quantity, 0)

    const dispatch = useDispatch()
    const { id } = useParams()

    // useEffect(() => {
    //     if (isError) {
    //         toast.error(message)
    //     }
    //     dispatch(getShoppingBag())
    //     dispatch(reset())
    // }, [dispatch, isSuccess, message, isError])

    useEffect(() => {
        dispatch(getOrder(id))
    }, [dispatch])

    console.log(order);

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <Header linkcolor='#fff' bgcolor='#181818' />
            <NavBar />
            <div className="shoppingbag">
                <div className="bag-container">
                    <div className="bag-information">
                        <h2>Review and Pay</h2>
                        <div className="shoppingBag-items">
                            {order.products && order.products.length > 0 ? (

                                order.products.map((product) => (
                                    <ShoppingBagItem product={product} quantity={product.orderItem.quantity} key={product.id} handleDeleteItem={null} />
                                ))
                            ) :
                                <div className="shoppingbag-item-container">
                                    <h2 className='empty-cart'>Your shopping bag is empty. Go back</h2>
                                    <Link to={'/'}>
                                        <button className='signupbtn '>Continue Shopping</button>
                                    </Link>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="bag-total">

                        <h3 className='price-info'>Order Summarry</h3>
                        <h4>Guest Chheckout</h4>
                        <h4 className='price-info'>{user.name}</h4>
                        <h4 className='price-info order-info' >{user.email}</h4>
                        <h4>Shipping Address</h4>
                        <h4 className='price-info'>{user.name}</h4>
                        <h4 className='price-info order-info border'>255 jamaica avenue</h4>

                        <h4>Shipping:  <span className='free'>free</span> </h4>
                        <h4>Subtotal ({totalItems}) Items</h4>

                        <h3 className='price-info'>Total Due:  <span className='total-price'>${totalPrice}</span></h3>

                        {/* <h3 className='price-info card'>Card</h3> */}

                        {/* <form className='form' onSubmit={onSubmit}>
                            <div className="form-group">
                                <label htmlFor="address">Name on Card</label>
                                <input className='emailInput' type="text" name='address' id='address' value={address} onChange={onChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">Card Number</label>
                                <input className='emailInput' type="text" name='city' id='city' value={city} onChange={onChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="postalCode">Expiration Month</label>
                                <input className='emailInput' type="text" name='postalCode' id='postalCode' value={postalCode} onChange={onChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="country">Expiration Year</label>
                                <input className='emailInput' type="text" name='country' id='country' value={country} onChange={onChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="country">CVV</label>
                                <input className='emailInput' type="text" name='country' id='country' value={country} onChange={onChange} required />
                            </div>
                        </form> */}
                        <PayButton orderItems={order.products} email={user.email} />
                        {/* <button type='button' className='signupbtn ' onClick={checkout} >Place Order</button> */}



                    </div>
                </div>
            </div>
        </>

    )
}

export default Order