import Stripe from "stripe";
import { STRIPE_KEY } from "../config.js"

const stripe = new Stripe(STRIPE_KEY);

const crearSesionPago = async (req, res) => {
    const sesion = await stripe.checkout.sessions.create({
        line_items:[ //aqui se pondrian tdos los productos del carrito de compras
            {
                price_data:{ //no se cambia es para la pasarela
                    product_data:{ //no se cambia es para pasarela
                        name:`laptop`, //se puede cambiar unicamente el nombre y la descripcion ya que es del prodecto
                        description: `Gamer Laptop`,
                    },
                    currency: `mxn`, //que moneda se va a usar
                    unit_amount: 1000, //esta cantidad se da en centavos
                },
                quantity: 2, //se pone la cantidad de cuanto se va a comprar
                  
            }, //primer producto
            {
                price_data:{
                    product_data:{ 
                        name:`Refrigerador LG`, 
                        description: `Inverter 14 pies`,
                    },
                    currency: `mxn`, 
                    unit_amount: 2000, 
                },
                quantity: 1,
            }//segundo producto
        ],
        mode: "payment", //hay tres tipos de pagos, payment que es de una sola exivicion y exibicion que es para suscribciones
        success_url: `http://localhost:4000/exito`,
        cancel_url: `http://localhost:4000/cancelado`
    });
    res.json(sesion);
};

export default crearSesionPago;