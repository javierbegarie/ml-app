import React, { Component } from 'react';
import {connect} from 'react-redux';
import SearchBar from './components/search-bar/SearchBar';
import ProductList from './components/product-list/ProductList';
import './App.css';
import { PrivateRoute } from 'react-router-with-props';
import ProductDetail from './components/product-detail/ProductDetail';
import {loadItems,loadItemDetail} from './actions/itemsActions';
import { withRouter } from 'react-router-dom';
import { UrlUtils } from './utils/utils';

class App extends Component {

  constructor(props,context){
    super(props,context)
    this.state= {
      canNavigateToItems : true,
      canNavigateToItemDetail : true
    }
    this.detailsPage = null;
    this.resultsPage = null;
  }

  toItemsPage(query){
    this.state.canNavigateToItems = true;
    this.resultsPage = query;
    this.search(query);
  }

  search(query){
    this.props.loadItems(query);
  }

  loadItem(id){
    this.state.canNavigateToItemDetail = true;
    this.detailsPage = id;
    this.props.loadItemDetail(id)
  }

  render() {
    return (
      <main className="grey-background">
        <SearchBar onSearch={this.toItemsPage.bind(this)}></SearchBar>
        <PrivateRoute path="/items" exact component={ProductList} 
                      authed={this.state.canNavigateToItems} 
                      redirectTo="/" {...this.props.items}
                      click={this.loadItem.bind(this)}/>
        <PrivateRoute path="/items/:id" component={ProductDetail}
                      authed={this.state.canNavigateToItemDetail} 
                      redirectTo="/" {...this.props.itemDetail}/>
      </main>
    );
  }

  componentDidUpdate(prevProps){
    if( this.resultsPage ){
      this.props.history.push(`/items?q=${this.resultsPage}`);
      this.resultsPage = null;
    }

    if( this.detailsPage ){
      this.props.history.push(`/items/${this.detailsPage}`);
      this.detailsPage = null;
    }
  }

  navigateItemsGuard(){
    let {search} = this.props.location;
    if(!search) return this.state.canNavigateToItems = false;
    let params = UrlUtils.getUrlParams(search);
    if(!params.q || params.q.length < 4){
      this.state.canNavigateToItems = false;
      return;
    }  
    this.state.canNavigateToItems = true;
    this.search(params.q);
  }

  navigateItemDetailGuard(){
    let {pathname} = this.props.location;
    if( pathname.indexOf('items/ML') >= 0 ){
      this.loadItem(pathname.split('items/')[1]);
    } 
    this.state.canNavigateToItemDetail = true;
    return
  }

  componentWillMount(){
    this.navigateItemDetailGuard();
    this.navigateItemsGuard();
  }
}

const mapStateToProps = state => 
  ({
    items: state.items,
    itemDetail: state.itemDetail
  })

const mapDispatchToProps = dispatch => 
  ({
    loadItems(query){
      dispatch(loadItems(query));
    },
    loadItemDetail(id){
      dispatch(loadItemDetail(id));
    }
  })

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));