import React from "react";
import WishStore from "../../store/WishStore";

const WishSubmitButton = (props) => {
  let { isWishSubmit } = WishStore();
  if (isWishSubmit === false) {
    return (
      <button onClick={props.onClick} type="submit" className={props.className}>
        {props.text}
      </button>
    );
  } else {
    return (
      <button disabled={true} className={props.className}>
        <div className="spinner-border spinner-border-sm" role="status"></div>
        Processing...
      </button>
    );
  }
};
export default WishSubmitButton;
