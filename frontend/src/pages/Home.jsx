import './pagecss/Home.css'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAdminProducts, reset } from '../features/product/productSlice'
import ProductItem from '../components/products/ProductItem'
import Header from '../components/layouts/Header'
import Spinner from '../components/shared/Spinner'
import NavBar from '../components/layouts/NavBar'


function Home() {
    const shoesImg = 'https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    const techImg = 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1021&q=80'
    const clothImg = 'https://images.unsplash.com/photo-1604272490759-7c465473958a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDl8fGNsb3RoaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60'

    const { products, isLoading, isSuccess } = useSelector((state) => state.products)


    const dispatch = useDispatch()

    // clear sttate on unmount
    useEffect(() => {
        return () => {
            if (isSuccess) {
                dispatch(reset())
            }
        }
    }, [isSuccess, dispatch])

    useEffect(() => {
        dispatch(getAdminProducts())
    }, [dispatch])


    if (isLoading) {
        return <Spinner />
    }
    return (
        <div className="Home">
            <div className="header-home">
                <Header linkcolor='#fff' />
            </div>

            <div className='banner'>
                <img src="https://images.unsplash.com/photo-1431068799455-80bae0caf685?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" />
                <div className="banner-text">
                    <h1 data-aos='fade-right' data-aos-delat='400'>DISCOVER TECHNOLOGY FOR YOU</h1>
                    <Link to='/category/tech'>  <button data-aos='fade-right' data-aos-delat='400'>SHOP TECH</button></Link>
                </div>
            </div>
            <div className='banner2'>
                <img src="https://images.unsplash.com/photo-1608403890696-0f18a2960153?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="" />
                <div className="banner-text">
                    <h1 data-aos='fade-right' data-aos-delat='400'>DISCOVER TECHNOLOGY FOR YOU</h1>
                    <Link to='/category/tech'>  <button data-aos='fade-right' data-aos-delat='400'>SHOP TECH</button></Link>
                </div>
            </div>
            <NavBar />
            <h1>Essentials</h1>
            <hr />
            <div className="categories">

                <div className="category-img" data-aos='fade-right' data-aos-delay='70'>
                    <Link to="/category/shoes">
                        <img src={shoesImg} alt="" className='main-image' />
                    </Link>
                    <h5>SHOES</h5>
                </div>
                <div className="category-img" data-aos='fade-right' data-aos-delay='150'>
                    <Link to='/category/tech'>
                        <img src={techImg} alt="" className='main-image' />
                    </Link>
                    <h5>TECH</h5>
                </div>
                <div className="category-img" data-aos='fade-right' data-aos-delay='250'>
                    <Link to='/category/clothes'>
                        <img src={clothImg} alt="" className='main-image' />
                    </Link>
                    <h5>CLOTHES</h5>
                </div>
            </div>



            {products && products.length > 0 ? (
                <h1 >Featured Products</h1>) : <></>}


            <div className="products">
                {products && products.length > 0 ? (
                    products.map((product, index) => (
                        <ProductItem product={product} key={index} />
                    ))
                ) : <></>}
            </div>

            {/* <div className='second-banner'>
                <img src="https://digitalassets-shop.tesla.com/image/upload/f_auto,q_auto/v1/content/dam/tesla/teslaweb/homepage/Lifestyle_web.jpg" alt="" />
            </div> */}


        </div >

    )
}

export default Home