import React from 'react'
import { API } from '../../backend';

const ImageHelper = ({product}) => {
  const imageUrl = product
    ? `${API}/product/photo/${product._id}`
    : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fpicture%2Bnot%2Bfound&psig=AOvVaw1zhNN-lJ9Z34pT_XHORa2T&ust=1588502130773000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLCCu939lOkCFQAAAAAdAAAAABAD";
  return (
    <div className="rounded border border-success p-2">
      <img
        src={imageUrl}
        alt=""
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="mb-3 rounded"
      />
    </div>
  );
}

export default ImageHelper
