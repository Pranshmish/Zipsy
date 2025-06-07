import React from 'react';
import { FaHeart, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { handleAddItemCart } from '../store/cartSlice';

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist?.items || []);
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = (productId) => {
    // TODO: Implement remove from wishlist functionality
  };

  const handleAddToCart = (product) => {
    dispatch(handleAddItemCart({
      productId: product.id,
      outletId: product.outletId
    }));
  };

  if (wishlist.length === 0) {
    return (
      <div className="text-center py-8">
        <FaHeart className="mx-auto text-gray-400 text-4xl mb-4" />
        <h3 className="text-lg font-medium text-gray-900">Your wishlist is empty</h3>
        <p className="text-gray-500">Save items you love for later</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {wishlist.map((item) => (
        <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <button
              onClick={() => handleRemoveFromWishlist(item.id)}
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50"
            >
              <FaTrash className="text-red-500" />
            </button>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
            <p className="text-gray-500 text-sm mb-2">{item.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-green-600">
                ${item.price.toFixed(2)}
              </span>
              <button
                onClick={() => handleAddToCart(item)}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wishlist; 