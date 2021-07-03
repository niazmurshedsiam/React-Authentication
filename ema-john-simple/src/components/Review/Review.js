import React, { useEffect, useState } from "react";
import fakeData from "../../fakeData";
import {
  getDatabaseCart,
  removeFromDatabaseCart,
  processOrder
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";
import happyImage from "../../images/giphy.gif";
import { useHistory } from "react-router-dom";
const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const history = useHistory();
  useEffect(() => {
    const saveCart = getDatabaseCart();
    const productKeys = Object.keys(saveCart);
    const cartProducts = productKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = saveCart[key];
      return product;
    });
    setCart(cartProducts);
  }, []);
  const handleProceedCheckout = ()=>{
    history.push('/shipment');

  }
  const removeProduct = (productKey) => {
    console.log("Remove Product", productKey);
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };
  let thankyou;
  if (orderPlaced){
    thankyou = <img src={happyImage} alt="Image"/>
  }
  
  return (
    <div className="twin-container">
      {/* <h1>This is Review {cart.length}</h1> */}
      <div className="product-container">
        {cart.map((product) => (
          <ReviewItem
            product={product}
            removeProduct={removeProduct}
            key={product.key}
          ></ReviewItem>
        ))}
        {thankyou}
      </div>
      <div className="cart-container">
          <Cart cart={cart}>
            <button onClick={handleProceedCheckout} className="main-button">Proceed Checkout</button>
          </Cart>
      </div>
    </div>
  );
};

export default Review;
