import { Request, Response, NextFunction } from "express"
const auth = (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.headers;
    if (token === "Authenticated") next()
    else res.status(400).json({ msg: "Error de autenticacións" })
}
export default auth;