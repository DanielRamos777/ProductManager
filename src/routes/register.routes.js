// archivo src/routes/register.routes.js
import { Router } from "express";
import multer from "multer";
import userModel from "../dao/models/user.model.js";

const router = Router();

// Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Ruta GET para renderizar el formulario de registro
router.get("/", (req, res) => {
  res.render("register");
});

// Ruta POST para procesar el formulario de registro
router.post("/", upload.single("thumbnail"), async (req, res) => {
  const { first_name, last_name, email } = req.body;

  if (!first_name || !last_name || !email) {
    return res.status(400).send({
      status: "error",
      message: "Valores incompletos",
    });
  }

  const filename = req.file ? req.file.filename : null;

  const user = {
    first_name,
    last_name,
    email,
    thumbnail: filename ? `http://localhost:8080/images/${filename}` : null,
  };

  try {
    const result = await userModel.create(user);
    res.send({
      status: "success",
      message: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "error",
      message: "Error interno del servidor",
    });
  }
});

export { router };
