"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const sizes = ["S", "M", "L"];
const colors = ["red", "yellow", "green"];

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [product, setProduct] = useState<any>(null);
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // Fetch product details
  useEffect(() => {
    async function fetchProduct() {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${params.id}`
      );
      setProduct(response.data);
      setLoading(false);
    }
    fetchProduct();
  }, [params.id]);

  const addToCart = () => {
    if (!size || !color) {
      alert("Please select color and size to proceed");
      return;
    } else {
      const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");

      // Check if the product with the same size and color already exists
      const existingItem = cartItems.find(
        (item: any) =>
          item.id === product.id && item.size === size && item.color === color
      );

      // If the item does not exist in the cart, add it
      if (!existingItem) {
        cartItems.push({ ...product, size, color });
        localStorage.setItem("cart", JSON.stringify(cartItems));
        router.push("/cart");
      } else {
        alert(
          "This product with the selected size and color is already in the cart."
        );
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{product.title}</h1>
      <img src={product.image} alt={product.title} style={styles.image} />
      <p style={styles.price}>${product.price}</p>

      <div style={styles.options}>
        <h3>Select Size:</h3>
        <div style={styles.buttonGroup}>
          {sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              style={{
                ...styles.optionButton,
                backgroundColor: size === s ? "blue" : "#f0f0f0",
                color: size === s ? "white" : "black",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.options}>
        <h3>Select Color:</h3>
        <div style={styles.buttonGroup}>
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              style={{
                ...styles.optionButton,
                backgroundColor: color === c ? "green" : "#f0f0f0",
                color: color === c ? "white" : "black",
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <button style={styles.addToCartButton} onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
    textAlign: "center" ,
  },
  image: {
    display: "block",
    width: "100%",
    maxWidth: "300px",
    margin: "0 auto",
    borderRadius: "8px",
  },
  price: {
    fontSize: "1.5rem",
    color: "#28a745",
    textAlign: "center" ,
    marginTop: "10px",
  },
  options: {
    marginTop: "20px",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    justifyContent: "center" ,
    marginTop: "10px",
  },
  optionButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  addToCartButton: {
    display: "block",
    width: "100%",
    padding: "15px",
    backgroundColor: "blue",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1.2rem",
    cursor: "pointer",
    marginTop: "30px",
  },
};
