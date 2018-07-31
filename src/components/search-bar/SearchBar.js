import React, { Component } from 'react';
import logoMl from '../../assets/logo-ml.png';

const SearchBar = ({onSearch=f=>f,value=''}) => {
    let _query;
    const submit = e => {
        e.preventDefault()
        onSearch(_query.value);
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light p-0 brand-color-background">
            <div className="container">
                <div className="navbar-brand col-md-1" href="#">
                    <img src={logoMl}></img>
                </div>
                <div className="collapse navbar-collapse col-md-11" id="navbarSupportedContent">
                    <form onSubmit={submit} className="form-inline col-md-12 my-lg-0 p-0">
                        <div className="input-group col-md-12 p-0">
                            <input ref={input => _query = input} type="text" className="form-control" placeholder="Nunca dejes de buscar"/>
                            <span className="input-group-append">
                                <button className="btn" type="submit">
                                    <i className="fa fa-search"></i>
                                </button>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </nav>
    );

};

export default SearchBar;