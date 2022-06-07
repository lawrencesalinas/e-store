import { Link } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { IoCart } from 'react-icons/io5'
import { useSelector, useDispatch } from 'react-redux'
import '../componentcss/Header.css'



function Header() {
    const { user } = useSelector((state) => state.auth)
    return (

        <header className='header' data-aos='fade-in'>
            <div className="logo">
                <Link to='/'>Tote.io</Link>
            </div>
            <div>
                <ul data-aos='fade-in'>
                    {user ? (
                        <>
                            <li>
                                <Link to='/profile'>              <FaUser /></Link>
                            </li>
                            <li>
                                <Link to='/cart'>              <IoCart /></Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to='/login'>              <FaUser /></Link>
                            </li>
                            <li>
                                <Link to='/cart'>              <IoCart /></Link>
                            </li>
                        </>)
                    }

                </ul>
            </div>
        </header>
    )
}

export default Header