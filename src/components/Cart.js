import React, { useContext, useEffect, useState } from "react"
import { Link } from "gatsby"
import { Button, StyledCart } from "../styles/components"
import priceFormat from "../utils/priceFormat"
import { CartContext } from "../Context"

export default function Cart() {
  const { cart } = useContext(CartContext)
  const [total, setTotal] = useState(0)
  const [stripe, setStripe] = useState()

  const getTotal = () => {
    setTotal(
      cart.reduce(
        (acc, current) => acc + current.unit_amount * current.quantity,
        0
      )
    )
  }
  useEffect(() => {
    setStripe(window.Stripe(process.env.GATSBY_STRIPE_PK))
    getTotal()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { error } = await stripe.redirectToCheckout({
      lineItems: cart.map(({ id, quantity }) => ({ price: id, quantity })),
      mode: "payment",
      successUrl: process.env.GATSBY_SUCCESS_REDIRECT,
      cancelUrl: process.env.GATSBY_CANCEL_REDIRECT,
    })
    if (error) {
      throw error
    }
  }
  console.log(`process env es: ${JSON.stringify(process.env)}`)
  return (
    <StyledCart>
      <h2>Carrito de compras</h2>
      <table>
        <tbody>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Total</th>
          </tr>
          {cart.map((swag) => (
            <tr key={swag.sku}>
              <td>
                <img src={swag.metadata.img} alt={swag.name} />
                {swag.name}
              </td>
              <td>USD {priceFormat(swag.unit_amount)}</td>
              <td>{swag.quantity}</td>
              <td>{priceFormat(swag.quantity * swag.unit_amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <div>
          <h3>Subtotal:</h3>
          <small> USD {priceFormat(total)}</small>
        </div>
        <div>
          <Link to="/">
            <Button type="outline"> Volver </Button>
          </Link>
          <Button onClick={handleSubmit} disabled={cart.length === 0}>
            Comprar
          </Button>
        </div>
      </nav>
    </StyledCart>
  )
}
