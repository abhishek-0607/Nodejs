module.exports = function (permittedRoles){
    return function (req,res,next){

        user = req.user.user;
        isAllowed = false;

        user.roles.map((role)=>{
            if(permittedRoles.includes(role)) {
                isAllowed = true;
            }
        })

        if(!isAllowed) {
            return res.status(401).json({
                status:"failed",
                message: "you are not allowed to access this"
            })
        }
            
        next();
    }
}

