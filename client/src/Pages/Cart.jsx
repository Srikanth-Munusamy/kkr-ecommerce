import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import Navbar from "../Components/Navbar";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      const uid = localStorage.getItem("UID");
      if (!uid) {
        setLoading(false);
        return;
      }

      try {
        const cartRef = doc(db, "Carts", uid);
        const cartSnapshot = await getDoc(cartRef);

        if (cartSnapshot.exists()) {
          const { products } = cartSnapshot.data();

          const updatedCartItems = [];

          // Iterate through each product ID in the cart
          for (const productIdObj of products) {
            let productId = productIdObj.id || productIdObj; // handle object ID

            // Fetch product details from Firestore
            const productRef = doc(db, "products", productId);
            const productSnapshot = await getDoc(productRef);

            if (productSnapshot.exists()) {
              const productData = productSnapshot.data();

              // Find quantity for this product in the cart
              let cartQuantity = 1; // Default quantity if not found
              if (typeof productIdObj === "object" && productIdObj.quantity) {
                cartQuantity = productIdObj.quantity;
              }

              // Convert price to a number to ensure totalPrice calculations are numeric
              const price = Number(productData.price);

              const cartItem = {
                id: productSnapshot.id,
                ...productData,
                cartQuantity: cartQuantity,
                totalPrice: price * cartQuantity, // Calculate total price
              };

              updatedCartItems.push(cartItem);
            } else {
              console.log(`Product with ID ${productId} does not exist.`);
            }
          }

          setCartItems(updatedCartItems);
        } else {
          console.log("No cart found for user:", uid);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveItem = async (itemId) => {
    try {
      const uid = localStorage.getItem("UID");
      if (!uid) {
        console.error("User ID not found in localStorage.");
        return;
      }

      const cartRef = doc(db, "Carts", uid);
      const cartSnapshot = await getDoc(cartRef);

      if (cartSnapshot.exists()) {
        const { products } = cartSnapshot.data();

        const updatedProducts = products.filter(
          (productId) =>
            productId !== itemId && (!productId.id || productId.id !== itemId)
        );

        await updateDoc(cartRef, { products: updatedProducts });

        setCartItems((prevItems) =>
          prevItems.filter((item) => item.id !== itemId)
        );
      } else {
        console.log("No cart found for user:", uid);
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      const productRef = doc(db, "products", itemId);
      const productSnapshot = await getDoc(productRef);

      if (productSnapshot.exists()) {
        const { stock, price } = productSnapshot.data();

        if (newQuantity >= 1 && newQuantity <= stock) {
          setCartItems((prevItems) =>
            prevItems.map((item) =>
              item.id === itemId
                ? {
                    ...item,
                    cartQuantity: newQuantity,
                    totalPrice: price * newQuantity,
                  }
                : item
            )
          );

          const uid = localStorage.getItem("UID");
          if (uid) {
            const cartRef = doc(db, "Carts", uid);
            const cartSnapshot = await getDoc(cartRef);

            if (cartSnapshot.exists()) {
              const { products } = cartSnapshot.data();

              const updatedProducts = products.map((productId) =>
                productId === itemId ||
                (typeof productId === "object" && productId.id === itemId)
                  ? { id: itemId, quantity: newQuantity }
                  : productId
              );

              await updateDoc(cartRef, { products: updatedProducts });
            }
          }
        } else {
          alert("Quantity exceeds available stock or is invalid");
        }
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  if (loading) {
    return <div>Loading cart...</div>;
  }

  return (
    <>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Shopping Cart
          </h2>

          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {cartItems.length === 0 ? (
                  <div className="text-center text-gray-500">
                    Your cart is empty.
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                    >
                      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <a href="#" className="shrink-0 md:order-1">
                          <img
                            className="h-20 w-20 dark:hidden"
                            src={item.imageUrl}
                            alt={item.productName}
                          />
                        </a>

                        <label
                          htmlFor={`counter-input-${item.id}`}
                          className="sr-only"
                        >
                          Choose quantity:
                        </label>
                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                          <div className="flex items-center">
                            <button
                              type="button"
                              onClick={() =>
                                handleQuantityChange(
                                  item.id,
                                  item.cartQuantity - 1
                                )
                              }
                              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                            >
                              -
                            </button>
                            <input
                              type="text"
                              id={`counter-input-${item.id}`}
                              className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                              placeholder=""
                              value={item.cartQuantity}
                              readOnly
                              required
                            />
                            <button
                              type="button"
                              onClick={() =>
                                handleQuantityChange(
                                  item.id,
                                  item.cartQuantity + 1
                                )
                              }
                              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                            >
                              +
                            </button>
                          </div>
                          <div className="text-end md:order-4 md:w-32">
                            <p className="text-base font-bold text-gray-900 dark:text-white">
                              ₹{" "}
                              {typeof item.totalPrice === "number"
                                ? item.totalPrice.toFixed(2)
                                : "Error"}
                            </p>
                          </div>
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <a
                            href="#"
                            className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                          >
                            {item.productName}
                          </a>

                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(item.id)}
                              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
