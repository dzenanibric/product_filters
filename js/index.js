async function getProducts() {
    const response = await fetch('https://fakestoreapi.com/products');
    const json = await response.json();

    return new Promise((resolve, reject) => {
        if (typeof (json) == 'object') {
            resolve(json);
        }
        else {
            reject('Porblem with fetching data...');
        }
    });
}

getProducts().then(response => {
    const products_field = document.querySelector('.container__body__products');

    for (let i = 0; i < response.length; i++) {
        const product = document.createElement('div');
        const image = document.createElement('img');
        const title = document.createElement('h2');
        const price = document.createElement('p');

        image.src = response[i].image;
        title.innerText = response[i].title;
        price.innerText = response[i].price + 'EUR';

        product.setAttribute('id', 'product');
        product.setAttribute('class', response[i].category);
        title.setAttribute('id', 'title');

        product.append(image, title, price);
        products_field.append(product);
    }

    const checkboxes = document.querySelectorAll('input[name=checkbox]');
    const products = document.querySelectorAll('#product');

    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener('change', (event) => {
            event.preventDefault();

            if (event.target.checked) {
                const filter = event.target.dataset.filter;

                products.forEach(product => {
                    if(product.classList.contains(filter)){
                        product.style.display = 'block';
                    }
                    else{
                        product.style.display = 'none';
                    }
                });
            }
            else {
                products.forEach(product => {
                    product.style.display = 'block';
                });
            }
        });
    }

    const search = document.getElementById('search');
    const btn = document.getElementById('btn');
    const products_titles = document.querySelectorAll('#title');

    btn.addEventListener('click', ()=>{
        for(let i = 0; i < products.length; i++){
            if(products_titles[i].textContent.toLowerCase().includes(search.value.toLowerCase())){
                products[i].style.display = 'block';
            }
            else{
                products[i].style.display = 'none';
            }
        }
    });
});