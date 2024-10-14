"use client";
import { useState, useEffect } from "react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(items);
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p style={styles.emptyCartMessage}>No items in cart</p>
      ) : (
        <div style={styles.cartItems}>
          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.size}-${item.color}`}
              style={styles.cartItem}
            >
              <img
                src={item.image}
                alt={item.title}
                style={styles.productImage}
              />
              <div style={styles.itemDetails}>
                <h3 style={styles.itemTitle}>{item.title}</h3>
                <p style={styles.itemPrice}>Price: ${item.price.toFixed(2)}</p>
                <p style={styles.itemColor}>Selected Color: {item.color}</p>
                <p style={styles.itemSize}>Selected Size: {item.size}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Basic styles
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f8f9fa",
  },
  header: {
    fontSize: "2rem",
    textAlign: "center" as const,
    marginBottom: "30px",
  },
  emptyCartMessage: {
    textAlign: "center" as const,
    fontSize: "1.2rem",
    color: "#777",
  },
  cartItems: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "20px",
    alignItems: "center" as const,
  },
  cartItem: {
    display: "flex",
    width: "100%",
    maxWidth: "600px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#fff",
    padding: "15px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  productImage: {
    width: "120px",
    height: "auto",
    marginRight: "20px",
    borderRadius: "8px",
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: "1.2rem",
    marginBottom: "10px",
    color: "#333",
  },
  itemPrice: {
    fontSize: "1rem",
    color: "#28a745",
    marginBottom: "5px",
  },
  itemColor: {
    fontSize: "0.95rem",
    color: "#555",
    marginBottom: "5px",
  },
  itemSize: {
    fontSize: "0.95rem",
    color: "#555",
  },
};

