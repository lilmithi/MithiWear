const shoeImg = document.getElementById("shoeimage1");
shoeImg.style.backgroundImage =
  'url("https://images.asos-media.com/products/nike-renew-retaliation-4-sneakers-in-white/202419148-1-white")';
document.addEventListener("DOMContentLoaded", () => {
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

  // async function getShoes(url) {
  //   const response = await fetch(url, {
  //     method: "GET",
  //     headers: {
  //       "X-RapidAPI-Key": "a47ef9d23cmsh89c966b75a30debp170ca9jsnaa11d077ac0a",
  //       "X-RapidAPI-Host": "asos2.p.rapidapi.com",
  //     },
  //   });
  //   const resp = await response.json();
  //   return resp;
  // }
  // getShoes(
  //   "https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=4209&limit=48&country=US&sort=freshness&currency=USD&sizeSchema=US&lang=en-US"
  // ).then((shoes) => {
  //   shoes.products.forEach((shoe) => {
  //     console.log(shoe.name);
  //   });
  // });
});
