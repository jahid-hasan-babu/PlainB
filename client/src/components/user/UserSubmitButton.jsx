import React from "react";
import UserStore from "../../store/UserStore";

const UserSubmitButton = (props) => {
  let { isFormSubmit } = UserStore();

  if (isFormSubmit === false) {
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
export default UserSubmitButton;
