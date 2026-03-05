pokemonUrl.match(/\/(\d+)\/?$/)[1];
 
 return pokemonUrl.slice(0, -1).split("/").pop()
  return pokemonUrl.split("/").filter(Boolean).pop();




  const listItemsString = /*html*/`<ul> ${pokemonInfoData.types.map((thistype) => `<li>${thistype.type.name}</li>`).join("")}</ul>`
  
    pokemonInfoData.types.map((element) => {
        `<li>${element.type.name}</li>`
    })
