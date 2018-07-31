const express = require('express');
const app = express();
const httpGet = require('./httpGet');

const mlBaseEndPoint = 'https://api.mercadolibre.com';

const author = {name: 'Javier', lastname:'Begarie'};

const MAX = 4;
// Allow CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get(`/api/items/:id`, function (req, res) {
    console.log(req.params);
    if( ! req.params.id ){
        return  res.status(400).send('Invalid or undefined arguments');
    }
    let itemQuery = `${mlBaseEndPoint}/items/${req.params.id}`;
    let itemDescriptionQuery = `${mlBaseEndPoint}/items/${req.params.id}/description`;
    console.log(itemQuery);
    Promise.all([
        httpGet(itemQuery),
        httpGet(itemDescriptionQuery)
    ]).then( ([item,description]) => {
        getCategories(item).then( (categories) => {
            res.send( getItemByIdResponse( item, categories, description ) );
        });
    }, err => {
        res.status(400).send(err.message);
    });
});

app.get(`/api/items`, function (req, res) {
    
    if( ! req.query.q || req.query.q.length < 4 ){
        return  res.status(400).send('Invalid or undefined arguments');
    }
    let max = req.query.max || MAX;
    let itemsQuery = `${mlBaseEndPoint}/sites/MLA/search?q=${req.query.q}`;
    console.log(itemsQuery);
    httpGet(itemsQuery).then( result => {
        getCategories(result).then( (categories) => {
            res.send( getItemsResponse( result, categories, max ) );
        });
    }, err => {
        res.status(400).send(err.message);
    });
});


let getItemsResponse = (rawJSON,categories, max) => {
   return {
        author: author,
        categories: categories,
        items: filterItems(rawJSON.results).slice(0,max)
    }
};

let getItemByIdResponse = (rawJSON,categories,description) => {
    return {
         author: author,
         categories: categories,
         item: {
             ...filterItems([rawJSON]).pop(),
             sold_quantity: rawJSON.sold_quantity,
             description: description.plain_text
         }
     }
 };

let getCategories = (rawJSON) => {
    let isCategory = f => f.id === 'category';
    let categoryValues = arr => arr.filter(isCategory)[0].values[0];
    let getPathFromRoot = val => val.path_from_root.map( c => c.name );

    let filters = rawJSON.filters || [];
    let avFilters = rawJSON.available_filters || [];

    let prom = new Promise( (resolve,reject)=>{
        let categories = null;
        if( filters.length > 0 ) {
            categories = getPathFromRoot( categoryValues(filters) );
            resolve(categories);
        }else{
            // Get categories path from available filters
            let categoryId = rawJSON.category_id || categoryValues( avFilters ).id;
            httpGet(`${mlBaseEndPoint}/categories/${categoryId}`)
            .then( (response) => {
                categories = getPathFromRoot( response );
                resolve(categories);
            });
        }
    });
    return prom;
};

let filterItems = (rawItems) => {

    let splitNumber = (n,i=0) => parseInt(n.toString().split('.')[i]);
    let integer = n => splitNumber(n);
    let decimal = n => splitNumber(n,1)||0;
    let picture = item => item.pictures? item.pictures[0].url : item.thumbnail;
    let address = item => item.address?  item.address.state_name : null;
    let condition = c => c === 'new'? 'Nuevo' : 'Usado';

    return rawItems.map( 
        item => ({
        id: item.id,
        title: item.title,
        price: {
            currency: item.currency_id,
            amount: integer(item.price),
            decimals: decimal(item.price)
        },
        picture: picture(item),
        condition: condition(item.condition),
        free_shipping: item.shipping.free_shipping,
        address: address(item)
    }) );
};

app.listen(3000, function () {
    console.log('ML API Listening Port 3000');
});