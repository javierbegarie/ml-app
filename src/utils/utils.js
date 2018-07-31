export const formatPrice = (price=0) => price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");

export const UrlUtils = {

    getUrlParams: (paramsString) =>{
        let searchParams = new URLSearchParams(paramsString);
        let result = {};
        for (let p of searchParams) {
            result[p[0]] = p[1];
        }
        return result;
    },
    updateUrl : (newUrl) =>{
        history.pushState(null, null, newUrl);
    }
};
