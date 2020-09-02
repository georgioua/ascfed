import React from 'react';

import Product from './Product';

const products = [
  { 
    key: 0, 
    price: '$25.00',
    name: 'Basic Membership', 
    value: 'price_1H9QbxIHls7iQOHV4z6ADz28',
    interval: 'year',
    billed: 'yearly',
    category: 'Individual'

  },
  { key: 1,
    price: '$100.00',
    name: 'Premium Membership', 
    value: 'price_1H9QXkIHls7iQOHVxTkcgsQ4',
    interval: 'year',
    billed: 'yearly',
    category: 'Individual'
  },
  { 
    key: 2, 
    price: '$150.00',
    name: 'Elite Membership', 
    value: 'price_1H9QRyIHls7iQOHVkfrnnoUC',
    interval: 'year',
    billed: 'yearly',
    category: 'Individual'
   },
  { 
    key: 3, 
    price: '$150.00',
    name: ' Basic Membership',
    value: 'price_1H9QkGIHls7iQOHV04rsE0u6', 
    interval: 'year',
    billed: 'yearly',
    category: 'School/Group/Club'
  },
  { 
    key: 4, 
    price: '$250.00',
    name: 'School/Group/Club Premium Membership', 
    value: 'price_1H9QmMIHls7iQOHVaAQygEyO',
    interval: 'year',
    billed: 'yearly',
    category: 'School/Group/Club'
   },
  { 
    key: 5, 
    price: '$300.00',
    name: 'School/Group/Club Elite Membership', 
    value: 'price_1H9QnWIHls7iQOHVh1WUCBh2',
    interval: 'year',
    billed: 'yearly',
    category: 'School/Group/Club'
   }

];

function ProductDisplay(props) {
  function handleClick(key) {
    console.log(key);
    props.setShowPreviewInvoiceConfirmation(true);
    //setProduct(products[key]);
  }

  return (
    <div className="flex justify-between mt-8 mb-8">
      {products.map((product, index) => {
        console.log(product);
        return (
          <Product key={index} product={product}  handleClick={handleClick} />
        );
      })}
    </div>
  );
}

export default ProductDisplay;
