let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputbtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-El");
const deletebtn = document.getElementById("delete-btn");
const leadsfromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabbtn = document.getElementById("tab-btn");

if (leadsfromLocalStorage) {
  myLeads = leadsfromLocalStorage;
  render(myLeads);
}

tabbtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

deletebtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

inputbtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  console.log(myLeads);
  inputEl.value = " ";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});

function render(leads) {
  let listItems = " ";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
    <li>
        <a target='_blank' href='${leads[i]}'>${leads[i]}</a>
    </li>
    `;
  }
  ulEl.innerHTML = listItems;
}
