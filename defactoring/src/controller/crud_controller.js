
const post = (Model) => async (req,res) =>{
    try{
        const item = await Model.create(req.body);
        return res.status(201).send(item);
    }
    catch(e){
        return res.status(500).json({message: e.message , status:"failed"})
    }
}
module.exports = { post }



//put this line each controller for POST method 

const crudController = required("./crud_controller");

router.post("",crudController.post(Model))


//Author , Book, Section => Model