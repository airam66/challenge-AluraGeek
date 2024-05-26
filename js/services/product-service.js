const url = "http://localhost:3000/products";

async function productList() {
    try {
        const conection = await fetch(url, {
            method: "GET",
            headers: {
                accept: "application/json"
            }
        });

        return await conection.json();
    } catch (error) {
        console.error(error);

    }
}


async function createProduct(name, price, image) {
    try {
        const conection = await fetch(url, {
            method: "POST",
            headers: {
                accept: "application/json"
            },
            body: JSON.stringify({
                name,
                price,
                image,
            }),
        });

        if (!conection.ok) {
            throw new Error("No fue posible enviar el producto");
        }

        return await conection.json();
    } catch (error) {
        console.error(error);

    }
}


async function deleteProduct(id) {
    try {
        const conection = await fetch(`${url}/${id}`, {
            method: "DELETE",
            headers: {
                accept: "application/json"
            }
        })

        return await conection.json();

    } catch (error) {
        console.error(error);

    }

}


export const serviceProducts = {
    productList, createProduct, deleteProduct,
}

