import React from "react"
import { SEO } from "../components"
import { Button, Purchase } from "../styles/components"
import { Link } from "gatsby"

export default function gracias() {
  return (
    <div>
      <SEO title="Compra cancelada" />
      <Purchase>
        <h2>Compra Cancelada!</h2>
        <p>Lamentamos que canceles tu compra</p>
        <p>¡Pero recueda que siempre estaremos para ti!</p>
        <span rol="img" aria-label="emoji">
          {" "}
          💚{" "}
        </span>
        <Link to="/">
          <Button> Volver al catalogo</Button>
        </Link>
      </Purchase>
    </div>
  )
}
