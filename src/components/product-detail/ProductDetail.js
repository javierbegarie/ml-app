import React, { Component } from 'react';
import './ProductDetail.scss';
import Categories from '../categories/Categories';
import {formatPrice} from '../../utils/utils';

const ProductDetail = ({item={price:{}},categories=[]}) => {
    return (
        <div className="container">
            <Categories categories={categories}></Categories>
            <article className="product-detail-container">
                <div className="row p-4">
                    <div className="product-detail-column col-9 d-flex flex-column justify-content-between">
                        <figure className="d-flex flex-row justify-content-center">
                            <img className="product-detail-image" src={item.picture}/>
                        </figure>
                        <h5 className="pt-5">Descripcion del producto</h5>
                        <p className="product-detail-description flex-stretch px-0"> {item.description} </p>
                    </div>
                    <div className="product-detail-column col-3 d-inline-flex flex-column justify-content-start">
                        <div className="flex-stretch">
                            <small>{item.condition} - {item.sold_quantity} vendidos</small>
                        </div>
                        <strong className="product-details-name">{item.title}</strong>
                        <div className="product-price mt-3">$ {formatPrice(item.price.amount)}<sup>{item.price.decimals}</sup></div>
                        <button type="button" className="btn btn-primary flex-stretch mt-5" onClick={()=>window.open(item.permalink)}>Comprar</button>
                    </div>                
                </div>
            </article>
        </div>
    );
};

export default ProductDetail;