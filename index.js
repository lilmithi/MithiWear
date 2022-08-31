document.addEventListener("DOMContentLoaded", () => {
  const brandNames = document.querySelectorAll("li.brandName");
  const inputSearch = document.getElementById("search");
  const greeting = document.getElementById("greeting");
  const day = new Date();
  const hr = day.getHours();

  //code to display greeting
  if (hr >= 0 && hr < 12) {
    greeting.childNodes[0].textContent = "Good Morning";
    greeting.childNodes[1].textContent = "partly_cloudy_day";
  } else if (hr >= 12 && hr < 15) {
    greeting.childNodes[0].textContent = "Good Afternoon";
    greeting.childNodes[1].textContent = "sunny";
  } else if (hr >= 15 && hr < 18) {
    greeting.childNodes[0].textContent = "Good Evening";
    greeting.childNodes[1].textContent = "wb_twilight";
  } else if (hr >= 18 && hr <= 23) {
    greeting.childNodes[0].textContent = "Good Night";
    greeting.childNodes[1].textContent = "bedtime";
  }

  const shoes = document.querySelector("div.shoes");
  async function getShoes(url) {
    const promise = await fetch(url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "a47ef9d23cmsh89c966b75a30debp170ca9jsnaa11d077ac0a",
        "X-RapidAPI-Host": "asos2.p.rapidapi.com",
      },
    });
    const resp = await promise.json();
    return resp;
  }
  getShoes(
    "https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=4209&limit=48&country=US&sort=freshness&currency=USD&sizeSchema=US&lang=en-US"
  ).then((products) => {
    console.log(products);
    products.products.forEach((product) => {
      const shoe = document.createElement("div");
      const shoeImage = document.createElement("div");
      const shoeDescription = document.createElement("div");
      const shoePrice = document.createElement("div");
      const addCart = document.createElement("div");
      shoe.id = product.id;
      shoe.className = "shoe";
      shoeImage.className = "shoe-image";
      shoeImage.style.backgroundImage = `url(https://${product.imageUrl})`;
      shoeDescription.textContent = product.name;
      shoeDescription.className = "shoe-description";
      shoePrice.textContent = `$${product.price.current.value}`;
      shoePrice.className = "shoe-price";
      addCart.textContent = "Add to cart";
      addCart.className = "add-cart";
      shoe.appendChild(shoeImage);
      shoe.appendChild(shoeDescription);
      shoe.appendChild(shoePrice);
      shoe.appendChild(addCart);
      shoes.appendChild(shoe);
    });
    const shoe = document.querySelectorAll("div.shoe");
    shoe.forEach((myShoe) => {
      brandNames.forEach((brand) => {
        brand.addEventListener("click", () => {
          if (
            !myShoe.childNodes[1].textContent
              .toLowerCase()
              .startsWith(brand.textContent.toLowerCase().slice(0, 4))
          ) {
            myShoe.style.display = "none";
          } else {
            myShoe.style.display = "block";
          }
        });
      });
      inputSearch.addEventListener("keyup", () => {
        if (
          !myShoe.childNodes[1].textContent
            .toLowerCase()
            .startsWith(inputSearch.value.toLowerCase().slice(0, 4))
        ) {
          myShoe.style.display = "none";
        } else {
          myShoe.style.display = "block";
        }
      });
    });
  });
});
