import {
  addItemToPage,
  clearInputs,
  clearInputForCredit,
  renderItemsList,
  getInputValues,
  EDIT_BUTTON_PREFIX,
  DELETE_BUTTON_PREFIX
} from "./dom_util.js";
import {getAllBanks, postBank, updateBank, deleteBank} from "./api.js";

const submitButton = document.getElementById("submit_button");
const findButton = document.getElementById("find_button");
const cancelFindButton = document.getElementById("cancel_find_button");
const findInput = document.getElementById("find_input");
const findTotal = document.getElementById("find_total");
const sortButton = document.getElementById("sort_button")




let banks = [];

const onEditItem = async (e) => {
  const itemId = e.target.id.replace(EDIT_BUTTON_PREFIX, "");

  await updateBank(itemId, getInputValues())

  clearInputs();
  
  fetchAllBanks();
};

const onRemoveItem = async (e) => {
  const itemId = e.target.id.replace(DELETE_BUTTON_PREFIX, "");

  await deleteBank(itemId)

  fetchAllBanks();
};


submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  const { name, client_number, credit_number } = getInputValues();
  if(Number.isInteger(parseInt(credit_number))){
    clearInputs();
    postBank({
      name,
      client_number,
      credit_number,
    }).then(fetchAllBanks);
   }
    else {
    clearInputForCredit();
    alertNotNumerical();
  }



});


export const fetchAllBanks = async () => {
  const allBanks = await getAllBanks();
  banks=allBanks;
  renderItemsList(allBanks, onEditItem, onRemoveItem);
};

sortButton.addEventListener("click", () => {
  
  const sortedBanks = banks.sort(compare);

  renderItemsList(sortedBanks, onEditItem, onRemoveItem);
});


findButton.addEventListener("click", () => {
  const foundBanks = banks.filter(bank => bank.name.search(findInput.value) !== -1);

  renderItemsList(foundBanks, onEditItem, onRemoveItem);
});


cancelFindButton.addEventListener("click", () => {
  renderItemsList(banks, onEditItem, onRemoveItem);

  findInput.value = "";
});

function compare(a, b) {
  if (a.client_number < b.client_number) return 1;
  if (b.client_number > a.client_number) return -1;
  return 0;
};

function alertNotNumerical(){
  alert("Please, enter a number in credit number field");
}

findTotal.addEventListener("click", () =>{
  var el = document.getElementById('findButton');
  if(el){
     el.addEventListener('click', () => {banks=findButton.foundBanks});
  };

  let credits = banks.map(bank => parseInt(bank.credit_number));
  document.getElementById("demo").innerHTML = credits.reduce((total, amount) => parseInt(total) + parseInt(amount));
});


fetchAllBanks();
getAllBanks().then(console.log)
