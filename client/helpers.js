Handlebars.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});
Handlebars.registerHelper('arrayify',function(obj){
    result = [];
    for (var key in obj) if(key !== "_id") result.push({name:key,value:obj[key]});
    return result;
});