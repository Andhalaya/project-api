const { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('../config/firebase');

// Controlador para iniciar sesión
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const { uid } = userCredential.user;
    req.session.uid = uid; 
    res.json('succesfully logged in');
  } catch (error) {
    console.error('Error de inicio de sesión:', error);
    res.send('Error de inicio de sesión');
  }
};

const logout = async (req, res) => {
    try {
      await new Promise((resolve, reject) => {
        req.session.destroy(err => {
          if (err) {
            console.error('Error al cerrar sesión:', err);
            reject(err);
          } else {
            resolve();
          }
        });
      });
      res.send(`
      <h1>Logout exitoso</h1>
    `);
    } catch (error) {
      res.status(500).send('Error al cerrar sesión');
    }
};

async function registerUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
      return res.status(422).json({
      error: "Email and password are required",
      });
  }
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    res.send(`
        <h1>Registro exitoso</h1>
        <p>Usuario registrado correctamente.</p>
      `);
  } catch (error) {
    res.status(500).render('register', { errorMessage: "Error durante el registro. Datos de usuario no válidos" });
  }
};

module.exports = {
    login,
    logout,
    registerUser,
}