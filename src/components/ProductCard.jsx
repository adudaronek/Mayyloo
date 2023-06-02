import { NavLink } from "react-router-dom";

import { useData, useAuth, useWish, useCart } from "..";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

export default function ProductCard({ item, inWishlist }) {
  const { deleteWishListData } = useWish();
  const { getSingleProduct } = useData();
  const { addToCardFunction, isItemInCart } = useCart();
  const { token } = useAuth();
  const {
    _id,
    product_name,
    product_price,
    product_prevPrice,
    product_image,
    product_isBadge,
  } = item;

  return (
    <div className="ProductCard" key={_id}>
      <NavLink to={`/products/${_id}`}>
        <div
          onClick={() => {
            getSingleProduct(_id);
          }}
        >
          <img src={product_image} alt="exclusive jewelry by Shringaar" />
          <div className="cardTextContent">
            <h3>{product_name.slice(0, 15)}</h3>
            <p className="price">
              {product_prevPrice && (
                <span className="stikeThrough">$ {product_prevPrice}</span>
              )}
              <b> $ {product_price}</b>
            </p>
          </div>
          <span className="favorite" title= "Add to WishList">

          </span>
          <span title={product_isBadge} className="trendingIcon">
            {product_isBadge.length > 0 ? (
              <div className="ribbon ribbon-top-left">
                <span>{product_isBadge}</span>
              </div>
            ) : null}

          </span>
          <div className="buttons">
            <div className="addToCartButton" title= "Add to Cart">
              {isItemInCart(_id) ? (
                <span
                  title="Move to Cart"
                  className="moveToCart"
                  style={{ background: "#cb9fe3", borderRadius: "12px" }}
                >
                  <NavLink to="/cart">
                    <ShoppingCartCheckoutIcon />
                  </NavLink>
                </span>
              ) : (
                <AddShoppingCartIcon
                  onClick={(e) => {
                    e.preventDefault();
                    addToCardFunction(item, token);
                  }}
                />
              )}
            </div>

            {inWishlist ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  console.log(_id);
                  deleteWishListData(_id);
                }}
              >
                Remove from wishList
              </button>
            ) : null}
          </div>
        </div>
      </NavLink>
    </div>
  );
}
