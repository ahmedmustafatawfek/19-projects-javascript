const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data =[];
getRandomUser()
getRandomUser()
getRandomUser()

// fetch random user and  add money
async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();

    const user = data.results[0]

    const newUser ={
        name: `${user.name.first} ${user.name.last}`,
        money : Math.floor(Math.random() * 10000000)
    };
    addData(newUser)
};

// Double Money function
doubleMoney = () => {
    data = data.map((user)=>{
        return{...user, money: user.money*2}
    })

    updateDOM();
} 

// sort users by richest
sortByRichest=()=>{
    data.sort( (a,b)=>b.money - a.money)
    updateDOM();
}

// show only millionaire 
showMillionaires = () =>{
    data = data.filter( item =>item.money >= 1000000);
    updateDOM()
}

// calculate entire wealth 
calculateWealth =()=>{
     const wealth = data.reduce((acc, user) => ( acc += user.money ), 0 );

     const wealthEl=document.createElement('div');
     wealthEl.innerHTML = `<h3>Total Wealth :<strong>${formatMoney(wealth)}</stron></h3>`
     main.appendChild(wealthEl)
     //  updateDOM();
}



// add new obj to data arr
addData =(obj)=>{
    data.push(obj);
    updateDOM();
}

// update DOM
updateDOM=(providedData = data)=>{
    // clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div')
        element.classList.add('person')
        element.innerHTML = 
        `<strong>${item.name}</strong><span>${formatMoney(item.money)}</span>`;
        main.appendChild(element)
    });
}

// format number as money
formatMoney=(number)=>{
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event Listener
addUserBtn.addEventListener('click' , getRandomUser)
doubleBtn.addEventListener('click' , doubleMoney )
sortBtn.addEventListener('click' , sortByRichest )
showMillionairesBtn.addEventListener('click' , showMillionaires )
calculateWealthBtn.addEventListener('click' , calculateWealth )
