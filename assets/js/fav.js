window.onload = (event) => {
	displayFavourites();
}

//displayFavourites -- Display Favourite Super Heros List in Favourites Page
function displayFavourites() {
	loadFavorites();
	let targetElement = document.getElementById('FavouritesSuperheros');
	if(favorites.length > 0){
		favorites.map(item =>(superhero(item)));
	}else{
	targetElement.innerHTML = `<div class="col-12 mt-2 text-center bg-transparent" id="messageInfo">
		<div class="card">
			<div class="card-body">
		    	<h4 class="card-title m-0">Favourites List is Empty!</h4>
		 	</div>
		</div>
	</div>	`;
	}
}