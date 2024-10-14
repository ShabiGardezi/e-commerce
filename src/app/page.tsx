"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Products {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function Home() {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
    }
    fetchProducts();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Ecommerce Store</h1>
      <div style={styles.productGrid}>
        {products.map((product) => (
          <div key={product.id} style={styles.productCard}>
            <img
              src={product.image}
              style={styles.productImage}
              alt={product.title}
            />
            <h2 style={styles.productTitle}>{product.title}</h2>
            <p style={styles.productPrice}>${product.price.toFixed(2)}</p>
            <Link href={`/product/${product.id}`} style={styles.viewLink}>
              View Product
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "40px",
    color: "#333",
  },
  productGrid: {
    display: "grid",
    gap: "20px",
    justifyItems: "center",
  },
  productCard: {
    width: "100%",
    maxWidth: "300px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "15px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s",
    textAlign: "center",
    cursor: "pointer",
  },

  productImage: {
    width: "100%",
    height: "auto",
    objectFit: "cover",
    marginBottom: "15px",
    borderRadius: "10px",
  },
  productTitle: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  },
  productPrice: {
    fontSize: "1.15rem",
    color: "#0070f3",
    marginBottom: "15px",
  },
  viewLink: {
    padding: "10px 20px",
    borderRadius: "5px",
    backgroundColor: "#0070f3",
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
  },
};
