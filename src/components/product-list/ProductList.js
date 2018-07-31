import React from 'react';
import ProductItem from '../product-item/ProductItem';
import Categories from '../categories/Categories';

const ProductList = ({items=[],categories,click=f=>f}) => {
    return (
        <div className="container">
            <Categories categories={categories}></Categories>
            <div className="list-group">
                {items.map((item,i)=>
                   <ProductItem data={item} key={i} click={click}></ProductItem>
                )}
            </div>
        </div>
    );
};

export default ProductList;