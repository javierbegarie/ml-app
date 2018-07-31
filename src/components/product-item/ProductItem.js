import React from 'react';
import './ProductItem.scss';
import freeShippingIcon from '../../assets/ic_shipping.png';
import {formatPrice} from '../../utils/utils';

const ProductItem = ({data, click=f=>f}) => {
    return (
        <a onClick={()=>click(data.id)} className="list-group-item d-flex flex-row justify-content-start p-3 border-0">
            <img className="rounded product-item-image-size" src={data.picture} />
            <div className="d-flex flex-column p-3 col-7">
                <h5 className="mb-2">
                    $ {formatPrice(data.price.amount)}
                    {data.free_shipping && <figure className="product-item-shipping-icon"><img src={freeShippingIcon}/></figure> }
                </h5>
                <p className="mb-1">{data.title}</p>
            </div>
            <div className="d-flex flex-column flex-fill">
                <small className="text-muted align-self-center pt-4">{data.address}</small>
            </div>
        </a>
    );
};

export default ProductItem;