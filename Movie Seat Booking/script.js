const container = document.querySelector(".container");
const seats =document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.querySelector("#count");
const total = document.querySelector("#total");
const movieSelect = document.querySelector("#movie");
var selectedSeats;
var selectedSeatCount;
let ticketPrice = +movieSelect.value;

// save selected Movie index and price
setMovieData=(movieIndex , moviePrice)=>{
    localStorage.setItem('selectedMovieIndex' , movieIndex);
    localStorage.setItem('selectedMoviePrice' , moviePrice);    
}


// Update total and count
updateSelectedCount=()=>{
   selectedSeats = document.querySelectorAll('.row .seat.selected')
    
    const seatsIndexs = [...selectedSeats].map(seat=>[...seats].indexOf(seat))
    
    localStorage.setItem('selectedSeats' , JSON.stringify(seatsIndexs));
    
    selectedSeatCount = selectedSeats.length;
    
    count.innerText = selectedSeatCount ;
    total.innerText = selectedSeatCount * ticketPrice;
}


// get data from localstorage and populate UI
populateUI=()=>{
    var selectedSeats= JSON.parse(localStorage.getItem('selectedSeats'));
    
    if(selectedSeats !== null && selectedSeats.length> 0 ){
        seats.forEach(( seat , index)=>{
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected')
            }
        })
    }
    
    const selectedMovieIndex =localStorage.getItem('selectedMovieIndex');   
    
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex
    }
    const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');
    if(selectedMoviePrice !== null){
        // total.innerText =  ;   
        console.log( selectedMoviePrice * selectedSeats )
    }
}
populateUI();

// movie select event
movieSelect.addEventListener('click', (e)=>{
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex ,e.target.value);
    updateSelectedCount();
})


// seat click event
container.addEventListener('click' , (e)=>{
   if(e.target.classList.contains('seat')
   && !e.target.classList.contains('occupied')
   )
   {
        e.target.classList.toggle('selected')

        updateSelectedCount();
   }
});


// initial count and total set
updateSelectedCount()