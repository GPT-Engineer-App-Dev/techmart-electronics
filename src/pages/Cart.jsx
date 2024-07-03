import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const sampleCartItems = [
  {
    id: 1,
    name: "Sample Product 1",
    price: 100,
    quantity: 1,
    image: "/images/sample-product-1.jpg",
  },
  {
    id: 2,
    name: "Sample Product 2",
    price: 200,
    quantity: 2,
    image: "/images/sample-product-2.jpg",
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(sampleCartItems);

  const handleRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <div className="grid grid-cols-1 gap-4">
        {cartItems.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover mb-4" />
              <p className="text-lg font-semibold">${item.price}</p>
              <p className="text-sm">Quantity: {item.quantity}</p>
            </CardContent>
            <CardFooter>
              <Button variant="destructive" onClick={() => handleRemove(item.id)}>
                Remove
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold">Total: ${totalPrice}</h2>
        <Button className="mt-4">Proceed to Checkout</Button>
      </div>
    </div>
  );
};

export default Cart;