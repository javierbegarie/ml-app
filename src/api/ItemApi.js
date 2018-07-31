class ItemApi {
    
    constructor(){
        this.itemQueryUrl = 'http://localhost:3000/api/items';
        this.apiOptions = {mode:'cors',credentials:'omit'};
    }

    buildSearchQuery(query,max){
        let q = `${this.itemQueryUrl}?q=${encodeURI(query)}`;
        return max? q.concat(`&max=${max}`) : q;
    }

    _searchItems(query){
        let prom = new Promise( (resolve,reject) =>{
            let items = this.buildSearchQuery(query);
            fetch(items,this.apiOptions).then( 
                resp => resp.json()
            ).then( items => {
                resolve(items);
            }, reject);
        });
        return prom;
    }

    _findItemById(id){
        let prom = new Promise( (resolve,reject) =>{
            fetch(`${this.itemQueryUrl}/${id}`,this.apiOptions).then( 
                resp => resp.json()
            ).then( items => {
                resolve(items);
            }, reject);
        });
        return prom;
    }

    searchItems(query){
        return this._searchItems(query);
        //return this.memoizeSearch(query);
    }

    findItemById(id){
        return this._findItemById(id);
        //return this.memoizeFindById(id);
    }
}

export default (new ItemApi());