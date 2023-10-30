import usedCars from "./usedCars.js";

// DOM elements
const makeDropdown = document.getElementById("make");
const colorDropdown = document.getElementById("color");
const yearInput = document.getElementById("year");
const mileageInput = document.getElementById("mileage");
const minPriceInput = document.getElementById("min-price");
const maxPriceInput = document.getElementById("max-price");
const carsList = document.querySelector(".cars-list");
const filterButton = document.getElementById("filter-button");

// Utility functions
const populateDropdown = (dropdown, values) => {
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.innerText = value;
    dropdown.appendChild(option);
  });
};

const renderCarCard = (car) => {
  return `
        <div class="car-card">
        <img src="${car.img}" style="width:100%" >
            <h2>${car.make} ${car.model}</h2>
            <p>Year: ${car.year}</p>
            <p>Mileage: ${car.mileage}</p>
            <p>Price: $${car.price}</p>
            <p>Color: ${car.color}</p>
            <p>Gas Mileage: ${car.gasMileage}</p>
        </div>
    `;
};

// Populate dropdowns
const makes = [...new Set(usedCars.map((car) => car.make))];
const colors = [...new Set(usedCars.map((car) => car.color))];

populateDropdown(makeDropdown, makes);
populateDropdown(colorDropdown, colors);

// Initial car list rendering
carsList.innerHTML = usedCars.map((car) => renderCarCard(car)).join("");

// Filter functionality
filterButton.addEventListener("click", () => {
  const selectedMake = makeDropdown.value;
  const selectedColor = colorDropdown.value;
  const selectedYear = Number(yearInput.value);
  const selectedMileage = Number(mileageInput.value);
  const selectedMinPrice = Number(minPriceInput.value);
  const selectedMaxPrice = Number(maxPriceInput.value);

  const filteredCars = usedCars.filter((car) => {
    return (
      (!selectedMake || car.make === selectedMake) &&
      (!selectedColor || car.color === selectedColor) &&
      (!selectedYear || car.year === selectedYear) &&
      (!selectedMileage || car.mileage <= selectedMileage) &&
      (!selectedMinPrice || car.price >= selectedMinPrice) &&
      (!selectedMaxPrice || car.price <= selectedMaxPrice)
    );
  });
  usedCars = filteredCars;

  if (filteredCars.length === 0) {
    carsList.innerHTML = "<p>No cars match the criteria.</p>";
  } else {
    carsList.innerHTML = usedCars.map((car) => renderCarCard(car)).join("");
  }
});

document.addEventListener("DOMContentLoaded", (event) => {});
