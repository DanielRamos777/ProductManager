// archivo src\routes\users.routes.js
import { Router } from "express";
import userModel from "../dao/models/user.model.js";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Obtener todos los usuarios
router.get("/usuarios", async (req, res) => {
  try {
    const users = await userModel.find();
    res.render("users", { isAdmin: true, message: users });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "error",
      message: "Error interno del servidor",
    });
  }
});

// Obtener un usuario por ID
router.get("/usuarios/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send({
        status: "error",
        message: "Usuario no encontrado",
      });
    }

    res.send({
      status: "success",
      message: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "error",
      message: "Error interno del servidor",
    });
  }
});

// Crear un nuevo usuario
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

// Eliminar un usuario por ID
router.delete("/:uid", async (req, res) => {
  const id = req.params.uid;

  try {
    const result = await userModel.findByIdAndDelete(id);
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

// Actualizar un usuario por ID
router.put("/:uid", async (req, res) => {
  const id = req.params.uid;
  const { first_name, last_name, email } = req.body;

  const updateuser = {
    first_name,
    last_name,
    email,
  };

  try {
    const result = await userModel.findByIdAndUpdate(id, updateuser, { new: true });
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

export { router as userRouter };
