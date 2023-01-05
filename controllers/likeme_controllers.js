const { addPost, obtenerPosts, addLike } = require("./consultas");
const ErrorResponse = require("../helper/errorResponse");

exports.createPost = async (req, res, next) => {
  const { titulo, url, descripcion } = req.body;

  try {
    await addPost(titulo, url, descripcion);

    res.status(200).json({
      status: 200,
      estado: "Generado exitósamente",
    });
  } catch (err) {
    next(
      new ErrorResponse(
        "Error, no ha sido posible generar la solicitud" + err.message + 404
      )
    );
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await obtenerPosts();

    return res.json(posts);
  } catch (err) {
    next(
      new ErrorResponse(
        "Error, no ha sido posible generar la solicitud" + err.message + 404
      )
    );
  }
};

exports.darLike = async (req, res, next) => {
  try {
    const { id } = req.params;

    await addLike(id);

    res.status(200).json({
      status: 200,
      estado: "Actualizado exitósamente",
    });
  } catch (err) {
    next(
      new ErrorResponse(
        " Error, no ha sido posible actualizar " + err.message + 404
      )
    );
  }
};
