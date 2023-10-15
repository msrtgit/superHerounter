/***************************
 * This Functions Will Handle the Favourites Adding, 
 * addToFavorites(id) --- Adds the Item to favourites List
 * isFavorite(superhero) -- Checks superHero already Exist or not in Favouties
 * saveFavorites() -- Saves superHero to Favourites List
 * loadFavorites() -- Loads the Favourite Superhero's List from LocalStorage
 * removeItemFromFavorites -- Removes SuperHero Id From favorites array if Exist
 * removeFavorites -- Saves Updated favorites to Local Storage and Display Message
 * getSuperheroById(id) -- Fetches SuperHero By Id
 * superhero -- Display Favourite Super Hero in Favourites List
*****************************/ 
	
	// Constant variables 
	let favorites = [];
	const publicKey = 'fcd75a988e6684fc91707cac78d526d0';
	const privateKey = 'f314d02526878ea22986f85e5b9f68afc429c54a';
	// Create a timestamp for the request
	const timestamp = Date.now();
	// Generate a hash for the request
	const hash = CryptoJS.MD5(timestamp + privateKey + publicKey).toString();
	const baseUrl = 'https://gateway.marvel.com/v1/public/characters';

	function addToFavoritesById(id){
		addToFavorites(id);
		location.reload();
	}

	function addToFavorites(id) {
		const superhero = id;
	    if (!isFavorite(superhero)) {
	        favorites.push(superhero);
	        saveFavorites();
	        alert("SuperHero Added to Favourites successFully !");
	        }else{
	    	 alert("Super Hero already Exist in Favourites !");
	    }
	}

	function isFavorite(superhero) {
	    return favorites.some(fav => fav === superhero);
	}

	function saveFavorites() {
		localStorage.setItem('favorites', JSON.stringify(favorites)); 
	}

	function loadFavorites() {
		const storedFavorites = localStorage.getItem('favorites');
	    if (storedFavorites) {
	        favorites.push(...JSON.parse(storedFavorites));
	    }
	}

	function removeItemFromFavorites(array, itemToRemove) {
 		 return array.filter(item => item !== itemToRemove);
	}

	function removeFavorites(id){
		favorites = removeItemFromFavorites(favorites,id);
		saveFavorites();
		alert("SuperHero Removed From Favourites successFully !");
		location.reload();
	}
	function superhero(id){
		const characterId = id;
		const url = `${baseUrl}/${characterId}?apikey=${publicKey}&ts=${timestamp}&hash=${hash}`;
		const favStatus = isFavorite(id);
		fetch(url)
		  .then(response => response.json())
		  .then(data => {
		   
		    const superherosCount = data.data.results.length;
			const superheroCharacter = data.data.results;
			const targetElement = document.getElementById('FavouritesSuperheros');
			let characterInfo = targetElement.innerHTML;

			if(superherosCount > 0){
			    let character = superheroCharacter[0];
		        const description = character.description ? character.description : "No description";
				characterInfo = `
					<div class="col-md-4 mt-2 text-center bg-transparent">
						<div class="card">
							<div class="card-body pl-0 pr-0 pt-0">
							  <img src='${character.thumbnail.path+'.'+character.thumbnail.extension}' alt='superhero image' width="100%" style="min-height:400px;"/>
							    <h4 class="card-title mt-2">${character.name}</h4>
							    <a href="Javascript:void(0);" class="btn btn-primary" onclick="removeFavorites('${character.id}')">Remove From Favourites</a>
							    <a href="Javascript:void(0);" class="btn btn-primary" onclick="location.href='about.html?id=${character.id}'">Know More</a>
							 </div>
						</div>
					</div>
				`;
				
			}else{
		        characterInfo = `
				<div class="col-12 mt-2 text-center bg-transparent" id="messageInfo">
					<div class="card">
						  <div class="card-body">
						    <h4 class="card-title m-0">No Super Hero Found !</h4>
						 </div>
					</div>
				</div>	`;
			}

			targetElement.innerHTML  += characterInfo;
		  })
		  .catch(error => {
		  	alert("Failed to Load the Superhero Details");
		  	console.error('Error:', error);
		  });
	}
	function superheroById(id){
		const characterId = id;
		const url = `${baseUrl}/${characterId}?apikey=${publicKey}&ts=${timestamp}&hash=${hash}`;
		const favStatus = isFavorite(id);
		fetch(url)
		  .then(response => response.json())
		  .then(data => {
		   
		    const superherosCount = data.data.results.length;
			const superheroCharacter = data.data.results;
			const targetElement = document.getElementById('superheroDetails');
			let characterInfo = "";

			if(superherosCount > 0){
			    let character = superheroCharacter[0];
		        const description = character.description ? character.description : "No description";
				characterInfo = `<div class="col-12 mt-2 text-center bg-transparent">
					<div class="card">
						<div class="card-body p-0">
						 	<div class="row">
						 		<div class="col-md-5">
						 		<img src='${character.thumbnail.path+'.'+character.thumbnail.extension}' alt='superhero image' width="100%" style="min-height:400px;"/>
							 	</div>
							 	<div class="col-md-7">
							 		<div class="container-fluid text-left">
							 			<h4 class="text-center mt-3">Super Hero Info</h4>
							 			<p class="card-title pt-4"><b>NAME :</b> ${character.name}</p>
								    	<p class="text-justify"><b>Description : </b> ${character.description ? character.description : " No Description"}</p>
								    	<p><b>Comic Available : </b> ${character.comics.available}</p>
								    	<p><b>Events Available : </b> ${character.events.available}</p>
								    	<p><b>Series Available : </b> ${character.series.available}</p>
								    	<p><b>Stories Available : </b> ${character.stories.available}</p>
								    	${favStatus ? `<a href="#" class="btn btn-primary mb-2" onclick="removeFavorites('${character.id}')">Remove From Favourites</a>` : `<a href="#" class="btn btn-primary mb-2" onclick="addToFavoritesById('${character.id}')">Add to Favourites</a>`}
							 		</div>
							 	</div>
						 	</div>
						 </div>
					</div>
				</div>`;
				
			}else{
		        characterInfo = `
				<div class="col-12 mt-2 text-center bg-transparent" id="messageInfo">
					<div class="card">
						  <div class="card-body">
						    <h4 class="card-title m-0">No Super Hero Found !</h4>
						 </div>
					</div>
				</div>	`;
			}

			targetElement.innerHTML  = characterInfo;
		  })
		  .catch(error => {
		  	alert("Failed to Load the Superhero Details");
		  	console.error('Error:', error);
		  });
	}
	