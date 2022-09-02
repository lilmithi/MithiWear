document.addEventListener("DOMContentLoaded", () => {
  const brandNames = document.querySelectorAll("li.brandName");
  const inputSearch = document.getElementById("search");
  const company = document.getElementById("company");
  const shoes = document.querySelector("div.shoes");
  const backToTop = document.querySelector("div.back-to-top");
  const dropdown = document.getElementById("dropdown");
  const cartIcon = document.getElementById("cart-icon");
  const cartCount = document.getElementById("cart-count");
  let counter = 0;
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
  backToTop.addEventListener("click", () => {
    window.scrollTo(0, 0);
  });
  dropdown.style.display = "none";

  cartIcon.addEventListener("click", () => {
    if (dropdown.style.display === "none" && dropdown.childElementCount !== 0) {
      dropdown.style.display = "block";
    } else {
      dropdown.style.display = "none";
    }
  });

  async function getShoes(url) {
    const promise = await fetch(url);
    const resp = await promise.json();
    return resp;
  }

  getShoes("http://localhost:3000/products").then((products) => {
    products.forEach((product) => {
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
      addCart.addEventListener("click", () => {
        const dropDownContent = document.createElement("div");
        dropDownContent.className = "dropdown-content";
        const cartBrand = document.createElement("p");
        cartBrand.className = "cart-brand";
        const cartImg = document.createElement("img");
        const cartBtns = document.createElement("div");
        cartBtns.className = "cart-btns";
        const purchase = document.createElement("button");
        purchase.textContent = "Purchase";
        purchase.className = "purchase";
        const remove = document.createElement("button");
        remove.textContent = "Remove";
        remove.className = "remove";
        cartBrand.textContent = product.brandName;
        cartImg.src = `https://${product.imageUrl}`;
        cartBtns.appendChild(purchase);
        cartBtns.appendChild(remove);
        dropDownContent.appendChild(cartBrand);
        dropDownContent.appendChild(cartImg);
        dropDownContent.appendChild(cartBtns);
        dropdown.appendChild(dropDownContent);
        counter += 1;
        cartCount.textContent = counter;
        purchase.addEventListener("click", () => {
          purchase.textContent = "Purchased";
          purchase.style.color = "green";
        });

        //event to remove an item from cart
        remove.addEventListener("click", () => {
          dropDownContent.remove();
          counter -= 1;
          cartCount.textContent = counter;
          if (counter === 0) {
            dropdown.style.display = "none";
          }
        });
      });
    });
    const shoe = document.querySelectorAll("div.shoe");

    //code to filter shoes based on brand
    shoe.forEach((myShoe) => {
      brandNames.forEach((brand) => {
        brand.addEventListener("click", () => {
          if (
            !myShoe.childNodes[1].textContent
              .toLowerCase()
              .startsWith(brand.textContent.toLowerCase().slice(0, 4), 0)
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
            .startsWith(inputSearch.value.toLowerCase().slice(0, 4), 0)
        ) {
          myShoe.style.display = "none";
        } else {
          window.scrollTo(0, 0);
          myShoe.style.display = "block";
        }
      });
      company.addEventListener("click", () => {
        window.scrollTo(0, 0);
        myShoe.style.display = "block";
      });
    });
  });
});
