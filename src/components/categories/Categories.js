import React from 'react';
import './Categories.scss';

const Categories = ({categories=[]}) => {
    return (
        <div className="d-flex flex-row my-3 categories-list">
            {categories.map( (cat,i,arr)=>
                (i !== arr.length-1)?
                <span key={i}>{cat}&nbsp;>&nbsp;</span>
                :<span key={i}>{cat}</span>
            )}
        </div>
    );
};

export default Categories;