import { menuArray } from "/data.js";

const payBtn = document.getElementById("pay-btn");

let selectedItems = [];

document.addEventListener("click", (e) => {
   if (e.target.dataset.item) {
      const selectedItem = menuArray.filter(
         (menu) => menu.uuid === e.target.dataset.item
      )[0];
      selectedItems.push(selectedItem);
   } else if (e.target.dataset.remove) {
      const removeIndex = selectedItems.findIndex(
         (item) => item.name === e.target.dataset.remove
      );
      if (removeIndex !== -1) {
         selectedItems.splice(removeIndex, 1); // Remove the specific item
      }
   } else if (e.target.dataset.complete) {
      document.getElementById("modal").style.display = "block";
   }

   render();
});

payBtn.addEventListener("click", (e) => {
   e.preventDefault();

   const inputs = document.querySelectorAll("#modal input");
   const allFilled = Array.from(inputs).every((input) => input.value.trim() !== "");

   if (allFilled) {
      document.getElementById("modal").style.display = "none";
      document.getElementById("order-complete").style.display = "block";
      selectedItems = [];
      render();
   } else {
      alert("Please fill in all required fields before paying.");
   }
});

function getOrderHtml() {
   let totalPrice = 0;
   let orderHtml = selectedItems
      .map((item) => {
         totalPrice += item.price;
         return `
        <div class="order-item">
               <div class="order-detail">
                  <h2>${item.name}</h2>
                  <span data-remove="${item.name}" class="grey-text">remove</span>
               </div>
               <p>$${item.price}</p>
        </div>
        `;
      })
      .join("");

   return `
            <h2>Your Order</h2>
            ${orderHtml}
            <div class="break-line"></div>
            <div class="order-item">
               <div class="order-detail">
                  <h2>Total Price:</h2>
               </div>
               <p>$${totalPrice}</p>
            </div>
            <button data-complete="complete" id="complete-btn">Complete Order</button>
    `;
}

function getMenuHtml() {
   return menuArray
      .map((menu) => {
         return `
            <div class="menu-item">
            <div class="item-detail">
                <div class="item-icon">${menu.emoji}</div>
                <div class="item-description">
                    <h2>${menu.name}</h2>
                    <p class="grey-text">${menu.ingredients}</p>
                    <p>$${menu.price}</p>
                </div>
            </div>
            <svg
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                data-item="${menu.uuid}"
            >
                <path
                    d="M24.8395 32.8068V19.0114H26.169V32.8068H24.8395ZM18.6122 26.5795V25.2386H32.3963V26.5795H18.6122Z"
                    fill="#3C3C3C"
                />
                <circle cx="25" cy="25" r="24.25" stroke="#DEDEDE" stroke-width="1.5" />
            </svg>
            </div>`;
      })
      .join("");
}

function render() {
   document.getElementById("menu").innerHTML = getMenuHtml();
   if (selectedItems.length > 0) {
      document.getElementById("order").style.display = "block";
      document.getElementById("order").innerHTML = getOrderHtml();
   } else {
      document.getElementById("order").style.display = "none";
   }
}

render();
