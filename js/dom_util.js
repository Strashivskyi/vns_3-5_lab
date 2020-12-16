const nameInput = document.getElementById("name_input");
const clientNumberInput = document.getElementById("client_number_input");
const creditNumberInput = document.getElementById("credit_number_input");
const itemsContainer = document.getElementById("items_container");

export const EDIT_BUTTON_PREFIX = 'edit-button-';
export const DELETE_BUTTON_PREFIX = 'delete-button-'

export const getInputValues = () => {
  return {
    name: nameInput.value,
    client_number: clientNumberInput.value,
    credit_number: creditNumberInput.value,
  };
};

export const clearInputs = () => {
  nameInput.value = "";
  clientNumberInput.value = "";
  creditNumberInput.value = "";
};

export const clearInputForCredit = () => {
  creditNumberInput.value = "";
};


export const addItemToPage = ({ id, name, client_number, credit_number }, onEditItem, onRemoveItem) => {
      itemsContainer.insertAdjacentHTML(
       "afterbegin",
       itemTemplate({ id, name, client_number, credit_number })
     ); 
     const editButton = document.getElementById(`${EDIT_BUTTON_PREFIX}${id}`);
     editButton.addEventListener("click", onEditItem);
     editButton.onmousedown = e => e.stopPropagation(); 
     const deleteButton = document.getElementById(`${DELETE_BUTTON_PREFIX}${id}`);
     deleteButton.addEventListener("click", onRemoveItem);
    };


const itemTemplate = ({ id, name, client_number, credit_number }) => `
<li id="${id}" class="card mb-3 item-card">
   <img
    src="./assets/bank_image.png"
    class="item-container__image card-img-top" alt="card">
  <div class="card-body">
    <h5 class="card-title">${name}</h5>
    <p class="card-text">
    <div>${client_number}</div>
    <div>${credit_number}</div>
    </p>
    <button id="${EDIT_BUTTON_PREFIX}${id}" type="button" class="btn btn-info">Edit</button>
    <button id="${DELETE_BUTTON_PREFIX}${id}" type="button" class="btn btn-info">Delete</button>

  </div>
</li>`;

export const renderItemsList = (items, onEditItem, onRemoveItem) => {
  itemsContainer.innerHTML = "";
  for (let i = 0; i < items.length; i++) {
    addItemToPage(items[i], onEditItem, onRemoveItem);
  }
};

