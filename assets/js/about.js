
window.onload = (event) => {
		const params = new URLSearchParams(window.location.search);
	const SuperheroId = params.get('id');	
	if(SuperheroId === null)
	{
		location.href='index.html';
		return;
	} 
	if(SuperheroId == ""){
		alert("SuperHero Not Found please Select superhero");
		location.href="index.html";
		return;
	}else{
		loadFavorites();
		superheroById(SuperheroId);
	}
};

