import express from 'express';
import productModel from '../models/product';
import multer from 'multer';
import mongoose from 'mongoose';
import auth from '../auth/auth';

const router = express.Router();

// Image Uploading
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, './images/');
  },
  filename: function (_req, file, cb) {
    const parts = file.mimetype.split('/');
    cb(null, `${file.fieldname}-${Date.now()}.${parts[1]}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: (_req, file, cb) => {
    const parts = file.mimetype.split('/');
    if (parts[1] === 'jpeg' || parts[1] === 'png' || parts[1] === 'jpg') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

router.get('/', async (_req, res) => {
  try {
    const prod = await productModel.find().select('name price imageUrl _id');
    if (prod.length == 0) {
      res.status(404).json({ message: 'data not found' });
    } else {
      res.status(200).json({
        count: prod.length,
        products: prod,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message, error: err });
  }
});

router.post('/', auth, upload.single('prodImage'), async (req: express.Request, res) => {
  try {
    const product = new productModel({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
      imageUrl: req.file.path,
    });
    const prod = await product.save();
    res.status(201).json(prod);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message, error: err });
  }
});

router.get('/:prodId', auth, async (req, res) => {
  const prodID = req.params.prodId;
  try {
    const prod = await productModel.findById(prodID).select('name imageUrl price _id');
    if (prod) {
      res.status(200).json(prod);
    } else {
      res.status(404).json({ message: 'data not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message, error: err });
  }
});

router.patch('/:prodId', auth, async (req, res) => {
  const prodID = req.params.prodId;
  try {
    const updated: any = {};
    for (let i of req.body) {
      if (i.method == 'price') {
      }
      updated[i.method] = i.data;
    }
    await productModel.updateOne({ _id: prodID }, { $set: updated });
    res.status(200).json({
      message: `PRODUCT ${prodID} updated`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message, error: err });
  }
});

router.delete('/:prodId', auth, async (req, res) => {
  const prodID = req.params.prodId;
  try {
    const prod = await productModel.deleteOne({ _id: prodID });
    if (prod.n == 1) {
      res.status(200).json({
        message: `PRODUCT ${prodID} deleted`,
      });
    } else {
      res.status(404).json({ message: 'data not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message, error: err });
  }
});

export default module.exports = router;
