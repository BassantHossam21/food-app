import React from "react";
import noDataImg from "../../../assets/images/nodata.png";
export default function DeleteConfirmation({deleteItem,itemName}) {
  return (
    <>
      <div className="text-center p-3">
        <img src={noDataImg} alt="" />
        <h2 className="my-2">Delete This {deleteItem} {itemName} ?</h2>
        <p>
          are you sure you want to delete this item ? if you are sure just click
          on delete it
        </p>
      </div>
    </>
  );
}
