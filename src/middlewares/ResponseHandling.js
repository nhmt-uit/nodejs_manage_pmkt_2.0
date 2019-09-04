export default ( req, res, next) => {
    // Define response format incase success
    res.jsonSuccess = ({...args}) => {
        return res.status(args.code || 200).json({
            success: true,
            message: args.message || null,
            data: args.data || null
        })
    }

    // Define response format incase error
    res.jsonError = ({...args}) => {
        return res.status(args.code || 404).json({
            success: false,
            message: args.message || null,
            errors: args.errors || null
        })
    }
    next()
}
