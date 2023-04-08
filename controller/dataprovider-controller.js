
const { Dataprovider } = require('../models');


module.exports = dataproviderController = {

  addDatapro:  async (req, res)=>{
  
      const ntickers =  await  Dataprovider.create({
        name: "appha dfdf io",
        createdAt: new Date(),
        updatedAt: new Date(),
      }) 
      res.status(200).json(ntickers);
      }
  }
