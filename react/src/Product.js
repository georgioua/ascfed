import React from 'react';
import './App.css';
import Benefit from './Benefit';

function Product({ product, currentProductSelected, handleClick }) {
  return (
    <div className="w-2/5 rounded border rounded-md p-2">
      <div className="px-2 py-2">
        <div className="text-gray-500 text-xl mb-2 font-medium">
          {product.name}
        </div>
        <p className="text-2xl font-extrabold">{product.price}</p>
        <div className="flex-wrap">
          <div className="leading-none text-gray-500 text-xs font-medium">
            Per {product.interval}
          </div>
          <div className="leading-none text-gray-500 text-xs font-medium mt-1">
            Billed {product.billed}
          </div>
        </div>
        {product.benefits.map((benefit) => {
              return (
                <Benefit
                  benefit={benefit}
                />
              );
            })}

        <div className="flex justify-center mt-6">
          {currentProductSelected ? (
            <button
              className="hover:bg-white outline-none hover:text-gray-500 hover:border hover:border-black text-white focus:bg-white focus:text-pasha font-light py-2 px-4 rounded-lg"
              type="submit"
            >
              <div className="w-auto -mx-2 md:mx-0">Selected</div>
            </button>
          ) : (
            <button
              onClick={() => handleClick(product.key)}
              className="bg-blue-600 hover:bg-white outline-none hover:text-gray-500 hover:border hover:border-black text-white focus:bg-white focus:text-pasha font-light py-2 px-4 rounded-lg"
              type="submit"
            >
              <div className="w-auto -mx-2 md:mx-0">Select</div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
