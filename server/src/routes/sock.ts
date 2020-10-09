import express,{Request,Response } from "express";
const router = express.Router();

router.get('/user' , async (req:Request, res:Response) => {
  res.json({message:'hey'})
});


export default module.exports = router;