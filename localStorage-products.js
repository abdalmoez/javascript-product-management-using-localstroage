/**
 * loadSamples
 */
function loadSamples() {
    localStorage.setItem('products', '[{"Id":0,"Available":"Available","Name":"Almond Toe Court Shoes, Patent Black","Category":"Womens Footwear","Price":99,"Stock":5},{"Id":1,"Available":"Not available","Name":"Suede Shoes, Blue","Category":"Womens Footwear","Price":42,"Stock":4},{"Id":2,"Available":"Available","Name":"Leather Driver Saddle Loafers, Tan","Category":"Mens Footwear","Price":34,"Stock":12},{"Id":3,"Available":"Not available","Name":"Flip Flops, Red","Category":"Mens Footwear","Price":19,"Stock":6},{"Id":4,"Available":"Not available","Name":"Flip Flops, Blue","Category":"Mens Footwear","Price":19,"Stock":0},{"Id":5,"Available":"Not available","Name":"Gold Button Cardigan, Black","Category":"Womens Casualwear","Price":167,"Stock":6},{"Id":6,"Available":"Available","Name":"Cotton Shorts, Medium Red","Category":"Womens Casualwear","Price":30,"Stock":5},{"Id":7,"Available":"Available","Name":"Fine Stripe Short Sleeve Shirt, Green","Category":"Mens Casualwear","Price":49.99,"Stock":9},{"Id":8,"Available":"Not available","Name":"Sharkskin Waistcoat, Charcoal","Category":"Mens Formalwear","Price":75,"Stock":2},{"Id":9,"Available":"Available","Name":"Lightweight Patch PocketBlazer, Deer","Category":"Mens Formalwear","Price":175.5,"Stock":1},{"Id":10,"Available":"Available","Name":"Bird Print Dress, Black","Category":"Womens Formalwear","Price":270,"Stock":10},{"Id":11,"Available":"Not available","Name":"Mid Twist Cut-Out Dress, Pink","Category":"Womens Formalwear","Price":540,"Stock":5},{"Id":12,"Available":"Available","Name":"Fine Stripe Short Sleeve Shirt, Grey","Category":"Mens Casualwear","Price":49.99,"Stock":9}]');
    loadProducts();
}

/**
 * addProduct
 */
function addProduct() {
    var products = JSON.parse(localStorage.getItem('products') || '[]');
    var newId = 0;
    (products).forEach(p => {
        if (p.Id > newId)
            newId = p.Id;
    });

    var form = document.forms['addproduct'];
    var pd = {
        Id: ++newId,
        Name: form['pdname'].value,
        Category: form['pdcategory'].value,
        Price: form['pdprice'].value,
        Available: form['pdavailable'].value,
        Stock: form['pdstock'].value,
    };

    products.push(pd);
    localStorage.setItem('products', JSON.stringify(products));
    loadProducts();
}

/**
 * loadProducts
 */
function loadProducts() {
    var products = JSON.parse(localStorage.getItem('products') || '[]');
    displayProducts(products);
}

/**
 * displayProducts
 * @param {Array of product to display} products 
 */
function displayProducts(products) {
    hideEditForm();
    var numrows = products.length;
    if(numrows==0)
    {
        document.getElementById('productslist').innerHTML = '<div class="pt-5 col-md-12" style="position:absolute">There is no products available for the moment</div>';
        return;
    }
    var newEl = document.createElement('table');
    newEl.className = 'table table-striped table-hover';

    var headers = ['Id', 'Name', 'Category', 'Price', 'Available', 'Stock', 'Action'];

    var row = newEl.insertRow();
    for (var idx = 0; idx < headers.length; idx++) {
        var headerCell = document.createElement("th");
        headerCell.textContent = headers[idx];
        row.appendChild(headerCell);
    }

    for (var idx = 0; idx < numrows; idx++) {
        row = newEl.insertRow();
        row.insertCell().textContent = products[idx].Id;
        row.insertCell().innerHTML   =  products[idx].Name;
        row.insertCell().textContent = products[idx].Category;
        row.insertCell().textContent = "$ " + products[idx].Price;
        row.insertCell().textContent = products[idx].Available;
        row.insertCell().textContent = products[idx].Stock;
        row.insertCell().innerHTML   =
            `<input class="btn btn-warning" type="button" onClick="editProduct(${products[idx].Id})" value="Edit">
            <input class="btn btn-danger" type="button" onClick="removeProduct(${idx})" value="Delete">`;

    }
    document.getElementById('productslist').innerHTML = '';
    document.getElementById('productslist').appendChild(newEl);

}
/**
 * updateProduct
 */
function updateProduct() {
    var idx = localStorage.getItem('editid');
    var form = document.forms['editproduct'];

    var products = JSON.parse(localStorage.getItem('products') || '[]');
    (products).forEach(p => {
        if (p.Id == idx) {
                p.Name = form['pdname'].value,
                p.Category = form['pdcategory'].value,
                p.Price = form['pdprice'].value,
                p.Available = form['pdavailable'].value,
                p.Stock = form['pdstock'].value
        }
    });

    localStorage.removeItem('editid');
    localStorage.setItem('products', JSON.stringify(products));
    loadProducts();
}
/**
 * editProduct
 * @param {product ID in array} productId 
 */
function editProduct(productId) {
    showEditForm();
    var products = JSON.parse(localStorage.getItem('products') || '[]');
    var form = document.forms['editproduct'];
    localStorage.setItem('editid', productId);
  
    products.forEach(p => {
        if (p.Id == productId) {
            form['pdname'].value = p.Name;
            form['pdcategory'].value = p.Category;
            form['pdprice'].value = p.Price;
            form['pdavailable'].value = p.Available;
            form['pdstock'].value = p.Stock;
        }
    });
}
/**
 * 
 * @param {Remove product with the index 'idx' in the array} idx 
 */
function removeProduct(idx) {
    var products = JSON.parse(localStorage.getItem('products') || '[]');

    if (idx >= products.length || idx < 0)
        return;
    products.splice(idx, 1);
    localStorage.setItem('products', JSON.stringify(products));
    loadProducts();
}

/**
 * searchForProduct
 */
function searchForProduct()
{
    var searchinput=document.getElementById('searchinput').value;
    var products = JSON.parse(localStorage.getItem('products') || '[]');
    if(searchinput!='')
    products=products.filter(product=>
    {
        if(product.Name.toUpperCase().indexOf(searchinput.toUpperCase())!=-1)
            return true;

        if(product.Category.toUpperCase().indexOf(searchinput.toUpperCase())!=-1)
            return true;

        return false;
    });
    displayProducts(products);
}
/**
 * showEditForm
 */
function showEditForm()
{
    document.getElementById('addProductForm').setAttribute('hidden', '');
    document.getElementById('editProductForm').removeAttribute('hidden');
}

/**
 * hideEditForm
 */
function hideEditForm()
{
    document.getElementById('editProductForm').setAttribute('hidden', '');
    document.getElementById('addProductForm').removeAttribute('hidden');
}
