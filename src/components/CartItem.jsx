import React from "react";

const CartItem = ({ item }) => {
  console.log("item: ", item);
  return (
    <div
      key={item.id}
      className="flex justify-between items-center rounded-md border border-slate-900 mb-3 p-2"
    >
      <div className="flex items-center space-x-2">
        <img className="w-20 h-24 rounded-md" src={item.img} alt="Item image" />
        <div className="text-lg">{item.itemName}</div>
      </div>
      <div>₦‎{item.price}</div>
    </div>
  );
};

export default CartItem;
