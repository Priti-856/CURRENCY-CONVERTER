const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

for(let select of dropdown){
    for(currcode in countryList){
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value =currcode;
        if(select.name === "from" && currcode =="USD"){
            newoption.selected = "selected";
        }
        else if(select.name === "to" && currcode =="INR"){
            newoption.selected = "selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change", (evt)=>{
        updateflag(evt.target);
    });
}

const updateflag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
  
    let img = element.parentElement.querySelector("img");
    if (img) {
        img.src = newSrc; // Pass variable newSrc, not the string "newSrc"
     } 
    
};


btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    await updatexchangerate();
    
});


const updatexchangerate = async()=>{
      let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  let fromval = fromCurr.value.toLowerCase();
  let toval =  toCurr.value.toLowerCase()
  const URL = `${BASE_URL}/${fromval}.json`;
  let response = await fetch(URL);   //async function return a promise and we will wait till it fetches the exchange rate value
  let data = await response.json();

console.log(data);

  let rate = data[fromval][toval];

  let finalAmount = amtVal * rate;

  console.log(`${amtVal} ${fromval.toUpperCase()} = ${finalAmount} ${toval.toUpperCase()}`);
  let msg = document.querySelector(".msg");
   msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};
