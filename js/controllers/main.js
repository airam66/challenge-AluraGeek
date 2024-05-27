import { serviceProducts } from "../services/product-service.js";

 import isImage from "./validateImage.js";
import { typeError, messages } from "./customErrors.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");
const fieldsForm = document.querySelectorAll("[required]");

const btnDelete = document.getElementsByName("btn-delete");


function createItem(name, price, image, id) {
    const item = document.createElement("li");
    item.className = "content__list__item";

    item.innerHTML = `
    <figure>
       <img src="${image}" alt="${name}" class="item__img">
       <h3>${name}</h3>
    </figure>

    <div class="content__list__item__info">
        <p>$ ${price}</p>
        <button data-id="${id}" type="button" name="btn-delete" ><span class="material-icons md-24 btn__delete">delete</span></button>
    </div>`;

    return item;
}

async function render() {
    try {
        const listProduct = await serviceProducts.productList();
        listProduct.forEach(product => {
            productContainer.appendChild(
                createItem(
                    product.name,
                    product.price,
                    product.image,
                    product.id
                )
            )

        });

    
        // Eliminar un producto
        btnDelete.forEach(function (button) {
            button.addEventListener("click", function() {
                deleteProduct(button.getAttribute("data-id")); 
            });
        });

    } catch (error) {
        console.log(error);
        productContainer.innerHTML = `<h2>No fue posible cargar la lista de productos</h2>`;
    }

}

async function createProduct(event) {

    event.preventDefault();


    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    try {
        await serviceProducts.createProduct(name, price, image);
      
    return;
       
      
    } catch (error) {
    }
}

async function deleteProduct(id) {
    try {
        const listProduct = await serviceProducts.deleteProduct(id);
    } catch (error) {
        
    }
}

  

render();
form.addEventListener("submit", event => createProduct(event));

// validacion de formulario
fieldsForm.forEach((field) => {
    field.addEventListener("blur", () => verifyField(field));
    /* caputar evento invalid */
    field.addEventListener("invalid", (event) => event.preventDefault());
  });

  function verifyField(field) {
    let message = "";
    field.setCustomValidity("");
  
     if (field.name == "image" && field.value != "") {
       isImage(field);
    } 
    if (field.name == "price" && field.value != "") {
     
    }
    //fields validity
    typeError.forEach((error) => {
      if (field.validity[error]) {
        message = messages[field.name][error];
      }
    });
  
    const messageError = field.parentNode.querySelector(".message-error");
    const validarInputCheck = field.checkValidity();
  
    if (!validarInputCheck) {
      messageError.textContent = message;
    } else {
      messageError.textContent = "";
    }
  }
  