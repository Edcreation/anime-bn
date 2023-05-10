import { RESPONSE } from "../types"

const errorHandler = (fn: any) => (req: any, res: any) => {
    try {
        fn(req, res)
    } catch (error: any) {
        return res.status(500).json({
            code: 500,
            message: 'Internal Error',
            error: error.message,
        } as RESPONSE)
    }
}

export default errorHandler