const express = require("express");
const bodyParser = require("body-parser");
const { check, oneOf, validationResult } = require("express-validator");
const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
const port = 3000;
app.get("/", (req, res) => {
  res.render("person");
});

app.post(
  "/processamento",
  urlencodedParser,
  [
    check("name", "O nome deve ter mais de 5 caracteres")
      .exists()
      .isLength({ min: 5 }),
    check("email", "Preencha um e-mail válido").isEmail().normalizeEmail(),
    check("phone", "Preencha um número de no minimo 8 digitos").exists().isMobilePhone(),

    oneOf([
      check("cargo").exists(),
      check("cargo").exists(),
      check("cargo").exists(),
    ]),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const alert = errors.array();
      res.render("person", {
        alert,
      });
    } else {
      res.send(req.body);
    }
  }
);

app.listen(port, () => console.info(`Servidor iniciado ${port}`));
