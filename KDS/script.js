"use strict";

import data from "./data.js";

const orders = data.orders;

orders.forEach((data) => {
  const tableId = data.table.tableId;
  const staff = data.staff.name;
  const time = data.timeStamp;
  const orderId = data.orderId;
  const status = data.status;

  if (!tableId && !staff && !time) return;
  if (!data.items) return;

  const html = `
        <div class="order">
          <div class="order-header">
            <p>Table: <span class="table-id">${tableId}</span></p>
            <p class="staff-name">${staff}</p>
            <p class="time">${time}</p>
            <p class="order-id">${orderId}</p>
          </div>
          <div class="order-details">
            <ul>
              ${data.items
                .map((item) => {
                  const quantity = item.quantity;
                  const menuItem = item.menuItem;
                  const specialInstructions = item.specialInstructions;

                  const list = `
                  <li>
                    <span><span class="order-quantity">${quantity}</span><b>x</b></span>
                    <span class="menu-item">${menuItem}</span>
                    <p>
                      Special Instruction:
                      <span class="special-instruction">${specialInstructions}</span>
                    </p>
                  </li>
                `;

                  console.log(item);
                  return list;
                })
                .join("")}
              <li>
                <p>Status: <span class="status">${status}</span></p>
                <button class="done">Done</button>
              </li>
            </ul>
          </div>
        </div>
  `;

  document
    .querySelector(".orders-container")
    .insertAdjacentHTML("beforeend", html);

  console.log(tableId, staff, time, data.items);
});

console.log(document.querySelector(".done"));

document.querySelectorAll(".done").forEach(function (button) {
  button.addEventListener("click", function () {
    const orderEl = this.parentNode.parentNode.parentNode.parentNode;
    const orderId = orderEl.querySelector(".order-id").textContent;

    orderEl.querySelector(".status").textContent = "Done";
    document.querySelector(".done").classList.add("hide");

    setTimeout(() => orderEl.remove(), 10000);
  });
});

window.setTimeout(function () {
  window.location.reload();
}, 30000);
