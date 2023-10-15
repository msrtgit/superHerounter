window.onload = (event) => {
			loadFavorites();
}
// Gets Matching SuperHeros 
function GetSuperheros(){
	// superhero name
	const superheroName = document.getElementById('search').value;
	if(!superheroName){
		alert("Please Enter SuperHero Name");
		return;
	}
	//make Api Call and get data
	let  apiUrl=`${baseUrl}?nameStartsWith=${superheroName}&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
	fetch(apiUrl) 
	.then(response => { 
		if (response.ok) { 
		return response.json(); // Parse the response data as JSON 
		} else { 
		throw new Error('API request failed'); 
		} 
	}) 
	.then(data => { 
		// Processing the response data  
		const superherosCount = data.data.results.length;
		const superHerosList = data.data.results;
		const targetElement = document.getElementById('superherosConatainer');
		console.log(superHerosList);
		//check SuperHero Exist or not if none display no super hero Found msg else display heros
		if(superherosCount == 0){
			const message = `
			<div class="col-12 mt-2 text-center bg-transparent" id="messageInfo">
				<div class="card">
					  <div class="card-body">
					    <h4 class="card-title m-0">No Super Hero Found with Name '${superheroName}' !</h4>
					 </div>
				</div>
			</div>	`;
			targetElement.innerHTML  = message;
		}else if(superherosCount > 0){
			let messageInfoDiv = targetElement.querySelector('.messageInfo');
			if (messageInfoDiv) {
				targetElement = "";
			}
			let superheroCards = "";
			superHerosList.forEach(function(superhero) {
						superheroCards +=`<div class="col-md-4 mt-2 text-center bg-transparent">
				<div class="card">
					<div class="card-body pl-0 pr-0 pt-0">
					  <img src='${superhero.thumbnail.path+'.'+superhero.thumbnail.extension}' alt='superhero image' width="100%" height='400'/>
					    <h4 class="card-title mt-2">${superhero.name}</h4>
					    <a href="Javascript:void(0);" class="btn btn-primary" onclick="addToFavorites('${superhero.id}')">Add to Favourites</a>
					    <a href="Javascript:void(0);" class="btn btn-primary" onclick="location.href='about.html?id=${superhero.id}'">Know More</a>

					 </div>
				</div>
			</div>`;
			});
			targetElement.innerHTML = superheroCards;
		}

	}) 
	.catch(error => { 
		// Handle any errors here 
		alert("Failed to Load the Superhero");
		throw new Error('Error Occured'); 
	});
}
