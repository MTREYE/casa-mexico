


//--MENU FILTERS--//

//Select all the buttons with class "btn-filter"
let buttons = document.querySelectorAll(".btn-filter");

//Select all the cards with class "menu-card"
let cards = document.querySelectorAll(".menu-card");

if(buttons.length > 0 && cards.length > 0){

	//Apply function in loop to all the buttons
	buttons.forEach(function(button){

		//Declaring event: click
		button.addEventListener("click", function(){

			//Getting the custom data attributes from the clicked button
			let filter = this.getAttribute("data-filter");

			// remove active class
		    buttons.forEach(btn => btn.classList.remove("btn-active"));

	    	// activate current botón
	    	this.classList.add("btn-active");

			//Apply the same function to all the cards
			cards.forEach(function(card){
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

	// let firstFilter = document.querySelector(".btn-filter");
	// firstFilter.click();

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
			
			let now = new Date();
			let todayDate = now.toISOString().split("T")[0];
			
			$("#date").attr("min", todayDate);

			let currentMinutes = now.getHours() * 60 + now.getMinutes();



			if(name === ""){
				alert("Please enter yout name");
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
				alert("Is not allowed make bookings in the past")
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
