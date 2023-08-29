let card = document.getElementsByClassName("card").length;
if (card.length == 1) {
  document.getElementById("update").innerHTML = card.toString() + " Item Found";
} else {
  document.getElementById("update").innerHTML =
    card.toString() + " Items Found";
}

let button_up = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    button_up.style.display = "block";
  } else {
    button_up.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
button_up.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function Check(country) {
  var country_check = document.getElementsByName("country");
  console.log(country_check);
  console.log(country);
  for (let i = 0; i < country_check.length; i++) {
    if (
      country_check[i].parentNode.parentNode.parentNode.style.display == "none"
    ) {
      if (country == country_check[i].innerText) {
        console.log(country);
        country_check[i].parentNode.parentNode.parentNode.style.display =
          "block";
      }
    } else if (
      country_check[i].parentNode.parentNode.parentNode.style.display == "block"
    ) {
      if (country != country_check[i].innerText) {
        console.log(country + "Not Correct");
        country_check[i].parentNode.parentNode.parentNode.style.display =
          "none";
      }
    }
  }
  card = document.getElementsByClassName("card");
  let count = 0;
  for (let i = 0; i < card.length; i++) {
    if (card[i].style.display == "block") {
      count += 1;
    }
  }
  if (count == 1) {
    document.getElementById("update").innerHTML =
      count.toString() + " Item Found";
  } else {
    document.getElementById("update").innerHTML =
      count.toString() + " Items Found.";
  }
  document.getElementsByClassName("country")[0].innerHTML = country;
}

function ShowAll() {
  card = document.getElementsByClassName("card");
  for (let i = 0; i < card.length; i++) {
    if (card[i].style.display == "none") {
      console.log("display all");
      card[i].style.display = "block";
    }
  }
  if (card.length == 1) {
    document.getElementById("update").innerHTML =
      card.length.toString() + " Item Found";
  } else {
    document.getElementById("update").innerHTML =
      card.length.toString() + " Items Found.";
  }
  document.getElementsByClassName("country")[0].innerHTML = "Region Filter";
}
