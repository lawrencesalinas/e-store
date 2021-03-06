import '../componentcss/ShoppingBagItem.css'
import { FaTrash } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { deleteShoppingBagItem } from '../../features/shoppingBag/shoppingBagSlice'

function ShoppingBagItem({ product, quantity, handleDeleteItem }) {
    const { title, imgUrl1, price, id } = product

    return (
        <div className="shoppingbag-item-container">
            <div className="shoppingbag-item">
                <img src={imgUrl1} alt="" />
                <p className='bag-info'>{title}</p>
                <p className='bag-info price-info'>${price}</p>
                <p className='bag-info'>qty: <span className='price-info'>{quantity}</span></p>
                {handleDeleteItem === null ? null :
                    <p className='trash-info' onClick={() => handleDeleteItem(id)}><FaTrash /></p>}
            </div>


        </div>
    )
}

export default ShoppingBagItem