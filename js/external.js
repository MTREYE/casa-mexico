

//================================//
//------ MENU FILTER SYSTEM ------//
//================================//


//APROACH: (Conditional Statement)

// If (FILTER === CATEGORY OF FOOD) {display the card} else {hide it}.





//Select all the buttons and cards from html using the classes.

let buttons = document.querySelectorAll(".btn-filter");
let cards = document.querySelectorAll(".menu-card");



/*To avoid conflicts with some pages, because I'm using JavaScript
and jQuery in the same file, I opted to use this conditional to check
if it will be used on this page before running it.*/

if(buttons.length > 0 && cards.length > 0){ //<-- to avoid conflicts with JQuery



	//Loop the next through every button.

	buttons.forEach(function(button){

		

		button.addEventListener("click", function(){ //<-- event click



			/*Every time the user clicks a button, this dinamic variable will
			take the value from the clicked button*/ 

			let filter = this.getAttribute("data-filter");



			//visual detail
			// remove the active class from all buttons and add it only to the selected
		    buttons.forEach(btn => btn.classList.remove("btn-active"));
	    	this.classList.add("btn-active");



			//Loop this through every cards

			cards.forEach(function(card){



				// Gets its data-category and store it in the variable "category".

				let category = card.getAttribute("data-category"); //<--data attributes


				//conditional
				if(filter === category){
					card.parentElement.style.display = "block";
				}else{
					card.parentElement.style.display = "none";
				}
			});
		});
	});


	// detect category from URL

	let params = new URLSearchParams(window.location.search);
	let categoryURL = params.get("category");

	if(categoryURL){

	let targetButton = document.querySelector(`[data-filter="${categoryURL}"]`);

	if(targetButton){
	    targetButton.click();
	}

	}else{

	// default starters
	document.querySelector(".btn-filter").click();

	}


	//--CARDS MODALS--//	

	//Apply the same function to all the cards
	cards.forEach(function(card){

		//Declaring event: click
		card.addEventListener("click", function(){
			
			//Getting the custom data attributes from the HTML
			let title = this.getAttribute("data-title"); //<--get title
			let description = this.getAttribute("data-description"); //<--get description
			let image = this.getAttribute("data-image"); //<--get image

			//Inserting info into the modal
			document.getElementById("modalTitle").innerHTML = title;
			document.getElementById("modalDescription").innerHTML = description;
			document.getElementById("modalImage").src = image;

			//Creating a modal with bootstrap
			let modal = new bootstrap.Modal(
			document.getElementById("menuModal"));

			modal.show(); //<--open modal
		});
	});

}






//--BOOKING SECTION--//

if(typeof $ !== "undefined"){

	$(document).ready(function(){

		let now = new Date();
		let todayDate = now.toISOString().split("T")[0];

		$("#date").attr("min", todayDate);

		$("#bookingForm").submit(function(e){

			let name = $("#name").val();
			let email = $("#email").val();
			let date = $("#date").val();
			let time = $("#time").val();
			let people = $("#people").val();

			let selectedDate = new Date(date);
			let day = selectedDate.getDay();

			let [hour, minutes] = time.split(":").map(Number);
			let totalMinutes = hour * 60 + minutes;

			let today = new Date();
			today.setHours(0,0,0,0);

			let currentMinutes = now.getHours() * 60 + now.getMinutes();



			if(name === ""){
				alert("Please enter your name");
				e.preventDefault();
				return;
			}

			if (email === "") {
				alert("Please enter your email");
				e.preventDefault();
				return;
			}

			let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

			if(!emailPattern.test(email)){
				alert("Please enter a valid email");
				e.preventDefault();
				return;
			}

			if(date === ""){
				alert("Please select a date");
				e.preventDefault();
				return;
			}

			if (time === ""){
				alert("Please select a time");
				e.preventDefault();
				return;
			}




			if(selectedDate < today) {
				alert("Is not allowed to make bookings in the past")
				e.preventDefault();
				return;
			}
			if(date === todayDate){
				if(totalMinutes < currentMinutes){
					alert("You cannot select a past time");
					e.preventDefault();
					return;
				}
			}
			//--SUNDAY--//
			if (day === 0){
				if (totalMinutes < (13*60) || totalMinutes > (19*60)){
					alert("Sunday bookings are from 13:00 to 19:00");
					e.preventDefault();
					return;
				}
			}
			//--MONDAY-THURSDAY--//
			if(day >= 1 && day <=4){
				if(totalMinutes < (12*60) || totalMinutes > (20*60)){
					alert("Bookings from Monday to Thursday are from 12:00 to 20:00");
					e.preventDefault();
					return;
				}
			}
			//--FRIDAY-SATURDAY--//
			if(day === 5 || day === 6){
				if(totalMinutes < (12 * 60) || totalMinutes > (21 * 60)){
					alert("Bookings on Friday and Saturday are from 12:00 to 21:00");
					e.preventDefault();
					return;
				}
			}


			if(people < 1 || people > 20){
				alert("Number of people must be between 1 and 20")
				e.preventDefault();
				return;
			}

			// successful submission
			alert("Booking successful");

		});
	});
}
