const nanoid = require ('nanoid')

const generateUniqueTicket = async () =>{
    try{
    
      ticket= `TKT-${nanoid(10)}`.toUpperCase()
     
    }
  catch(error){
    console.error({error:error.message})
  }
}

  module.exports = generateUniqueTicket

