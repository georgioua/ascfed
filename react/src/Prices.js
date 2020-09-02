import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import TopNavigationBar from './TopNavigationBar';
import StripeSampleFooter from './StripeSampleFooter';
import PaymentForm from './PaymentForm';
import Product from './Product';

const products = [
  { 
    key: 0, 
    price: '$25.00',
    name: 'Basic Membership', 
    value: 'price_1H9QbxIHls7iQOHV4z6ADz28',
    interval: 'year',
    billed: 'yearly',
    category: 'Individual',
    benefits: [
        { key: "Basic ASCF Member Insurance",  value: "Yes" },
        { key: "Access to Electronic Newsletter", value: "Yes" },
        { key: "Membership Number", value: "Yes" },
        { key: "WCF Passport", value: "N/A" },
        { key: "National Ranking for Competitions", value: "N/A" },
        { key: "Event Advertising", value: "N/A" },
        { key: "Access to Subsidised Services and Sponsorship", value: "N/A" },
        { key: "Club Support", value: "N/A" },
        { key: "Access to Referee Courses", value: "N/A" },
        { key: "Access to National & International Competitions", value: "N/A" },
        { key: "International Ranking in WCF Competitions", value: "N/A" },
        { key: "Competitor Insurance Cover for National ASCF Competitions", value: "Full Fees Apply"      },
        { key: "Support for National and International Level Individual Competitors", value: "Full Fees Apply" }
      ]
  },
  { key: 1,
    price: '$100.00',
    name: 'Premium Membership', 
    value: 'price_1H9QXkIHls7iQOHVxTkcgsQ4',
    interval: 'year',
    billed: 'yearly',
    category: 'Individual', 
    benefits: [
      { key: "Basic ASCF Member Insurance",  value: "Yes" },
      { key: "Access to Electronic Newsletter", value: "Yes" },
      { key: "Membership Number", value: "Yes" },
      { key: "WCF Passport", value: "Yes" },
      { key: "National Ranking for Competitions", value: "Yes" },
      { key: "Event Advertising", value: "N/A" },
      { key: "Access to Subsidised Services and Sponsorship", value: "Limited" },
      { key: "Club Support", value: "N/A" },
      { key: "Access to Referee Courses", value: "Discount" },
      { key: "Access to National & International Competitions", value: "Discount" },
      { key: "International Ranking in WCF Competitions", value: "N/A" },
      { key: "Competitor Insurance Cover for National ASCF Competitions", value: "Discount" },
      { key: "Support for National and International Level Individual Competitors", value: "Discount" }
    ]
  },
  { 
    key: 2, 
    price: '$150.00',
    name: 'Elite Membership', 
    value: 'price_1H9QRyIHls7iQOHVkfrnnoUC',
    interval: 'year',
    billed: 'yearly',
    category: 'Individual',
    benefits: [
      { key: "Basic ASCF Member Insurance",  value: "Yes" },
      { key: "Access to Electronic Newsletter", value: "Yes" },
      { key: "Membership Number", value: "Yes" },
      { key: "WCF Passport", value: "Yes" },
      { key: "National Ranking for Competitions", value: "Yes" },
      { key: "Event Advertising", value: "N/A" },
      { key: "Access to Subsidised Services and Sponsorship", value: "Limited" },
      { key: "Club Support", value: "N/A" },
      { key: "Access to Referee Courses", value: "Discount" },
      { key: "Access to National & International Competitions", value: "Discount" },
      { key: "International Ranking in WCF Competitions", value: "N/A" },
      { key: "Competitor Insurance Cover for National ASCF Competitions", value: "(1 x Free 20-minute mentor consultation)" },
      { key: "Support for National and International Level Individual Competitors", value: "Discount" }
    ]
   },
  { 
    key: 3, 
    price: '$150.00',
    name: ' Basic Membership',
    value: 'price_1H9QkGIHls7iQOHV04rsE0u6', 
    interval: 'year',
    billed: 'yearly',
    category: 'School/Group/Club',
    benefits: [
      { key: "Basic ASCF Member Insurance",  value: "Yes" },
      { key: "Access to Electronic Newsletter", value: "Yes" },
      { key: "Membership Number", value: "Yes" },
      { key: "WCF Passport", value: "N/A" },
      { key: "National Ranking for Competitions", value: "N/A" },
      { key: "Event Advertising", value: "N/A" },
      { key: "Access to Subsidised Services and Sponsorship", value: "N/A" },
      { key: "Club Support", value: "N/A" },
      { key: "Access to Referee Courses", value: "N/A" },
      { key: "Access to National & International Competitions", value: "N/A" },
      { key: "International Ranking in WCF Competitions", value: "N/A" },
      { key: "Competitor Insurance Cover for National ASCF Competitions", value: "Full Fees Apply"      },
      { key: "Support for National and International Level Individual Competitors", value: "Full Fees Apply" }
    ]
  },
  { 
    key: 4, 
    price: '$250.00',
    name: 'Premium Membership', 
    value: 'price_1H9QmMIHls7iQOHVaAQygEyO',
    interval: 'year',
    billed: 'yearly',
    category: 'School/Group/Club',
    benefits: [
      { key: "Basic ASCF Member Insurance",  value: "Yes" },
      { key: "Access to Electronic Newsletter", value: "Yes" },
      { key: "Membership Number", value: "Yes" },
      { key: "WCF Passport", value: "Yes" },
      { key: "National Ranking for Competitions", value: "Yes" },
      { key: "Event Advertising", value: "N/A" },
      { key: "Access to Subsidised Services and Sponsorship", value: "Limited" },
      { key: "Club Support", value: "N/A" },
      { key: "Access to Referee Courses", value: "Discount" },
      { key: "Access to National & International Competitions", value: "Discount" },
      { key: "International Ranking in WCF Competitions", value: "N/A" },
      { key: "Competitor Insurance Cover for National ASCF Competitions", value: "Discount" },
      { key: "Support for National and International Level Individual Competitors", value: "Discount" }
    ]
   },
  { 
    key: 5, 
    price: '$300.00',
    name: 'Elite Membership', 
    value: 'price_1H9QnWIHls7iQOHVh1WUCBh2',
    interval: 'year',
    billed: 'yearly',
    category: 'School/Group/Club',
    benefits: [
      { key: "Basic ASCF Member Insurance",  value: "Yes" },
      { key: "Access to Electronic Newsletter", value: "Yes" },
      { key: "Membership Number", vavalueule: "Yes" },
      { key: "WCF Passport", value: "Yes" },
      { key: "National Ranking for Competitions", value: "Yes" },
      { key: "Event Advertising", value: "N/A" },
      { key: "Access to Subsidised Services and Sponsorship", value: "Limited" },
      { key: "Club Support", value: "N/A" },
      { key: "Access to Referee Courses", value: "Discount" },
      { key: "Access to National & International Competitions", value: "Discount" },
      { key: "International Ranking in WCF Competitions", value: "N/A" },
      { key: "Competitor Insurance Cover for National ASCF Competitions", value: "Discount" },
      { key: "Support for National and International Level Individual Competitors", value: "Discount" }
    ]
   }

];

function Prices({ location }) {
  const [productSelected, setProduct] = useState(null);
  const [customer] = useState(location.state.customer);

  function handleClick(key) {
    setProduct(products[key]);
  }

  return (
    <div className="p-6">
      <TopNavigationBar />
      <div className="flex flex-wrap justify-center">
        <div className="md:w-1/3 w-full mr-4 md:mb-8">
          <div className="text-center font-bold text-2xl mt-4 mb-6">
            Subscribe to a plan
          </div>

          <div className="flex justify-between mb-8">

            {products.filter(product => product.category === 'Individual').map((product, index) => {
              return (
                <Product
                  key={index}
                  product={product}
                  handleClick={handleClick}
                />
              );
            })}
          </div>
          <div className="text-center font-bold text-1xl mt-4 mb-6">
            School/Group/Club
          </div>
          <div className="flex justify-between mb-8">
                {products.filter(product => product.category === 'School/Group/Club').map((product, index) => {
                    return (
                      <Product
                        key={index}
                        product={product}
                        handleClick={handleClick}
                      />
                    );
                  })}
          </div>
          {productSelected ? (
            <PaymentForm
              productSelected={productSelected}
              customer={customer}
            />
          ) : null}
        </div>
      </div>

      <StripeSampleFooter />
    </div>
  );
}

export default withRouter(Prices);
