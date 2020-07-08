import React from "react"
import { Link } from "gatsby"
import formatPrice from "../utils/priceFormat"
import { StyledProducts } from "../styles/components"

export default function Products({ products }) {
  //console.log(products)
  return (
    <StyledProducts>
      <h2>Productos</h2>
      <section>
        {products.map((node) => {
          console.log(node.node)
          const price = formatPrice(node.node.unit_amount)
          return (
            <article key={node.node.id}>
              <img
                src={node.node.product.metadata.img}
                alt={node.node.product.name}
              />
              <p>{node.node.product.name}</p>
              <small>USD {price}</small>
              <Link to={`/${node.node.id}`}>Comprar ahora</Link>
            </article>
          )
        })}
      </section>
    </StyledProducts>
  )
}
