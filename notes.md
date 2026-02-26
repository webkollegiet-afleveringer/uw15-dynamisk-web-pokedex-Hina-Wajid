pokemonUrl.match(/\/(\d+)\/?$/)[1];
 
 return pokemonUrl.slice(0, -1).split("/").pop()
  return pokemonUrl.split("/").filter(Boolean).pop();