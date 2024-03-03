export const validateRole = (...roles) => {
    return (req, res, next) => {
        if(!req.user) {
            return res.status(500).json({
                msg:"You want to verify a ROLE without FIRST validating the TOKEN"
            })
        }

        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                msg: `User NOT AUTHORIZED - Has a role ${req.user.role}, 
                      authorized roles are only ${ roles }`
            });
        }

        next();
    }
}