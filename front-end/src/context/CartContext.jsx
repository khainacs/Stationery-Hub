import PropTypes from "prop-types";
import { createContext, useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const defaultCart = [
        {
            id: 1,
            imagePath: "https://via.placeholder.com/150",
            title: "Bánh kem dâu tây",
            description: "Bánh kem vị dâu tây thơm ngon",
            price: 150000,
            quantity: 2,
        },
        {
            id: 2,
            imagePath: "https://via.placeholder.com/150",
            title: "Bánh tiramisu",
            description: "Bánh tiramisu hương vị Ý",
            price: 180000,
            quantity: 1,
        },
    ];
    // Khởi tạo `cart` từ `sessionStorage`
    const [cart, setCart] = useState(() => {
        try {
            const savedCart = sessionStorage.getItem("cart");
            return savedCart ? JSON.parse(savedCart) : defaultCart;
        } catch (error) {
            console.error("Error loading cart:", error);
            return [];
        }
    });
    console.log("heeh");
    console.log(cart);

    // Hàm lưu `cart` vào `sessionStorage` với debounce để tránh lưu liên tục
    const saveCartToSession = useCallback(
        debounce((cart) => {
            try {
                sessionStorage.setItem("cart", JSON.stringify(cart));
            } catch (error) {
                console.error("Error saving cart:", error);
            }
        }, 300),
        [],
    );

    // Gọi `saveCartToSession` mỗi khi `cart` thay đổi
    useEffect(() => {
        saveCartToSession(cart);
    }, [cart, saveCartToSession]);

    // Hàm thêm sản phẩm vào giỏ hàng
    const addToCart = useCallback((product) => {
        setCart((prevCart) => {
            const existingProductIndex = prevCart.findIndex((item) => item.id === product.id);
            if (existingProductIndex !== -1) {
                // Nếu sản phẩm đã tồn tại, tăng số lượng
                const updatedCart = [...prevCart];
                updatedCart[existingProductIndex].quantity += 1;
                return updatedCart;
            }
            // Nếu sản phẩm chưa tồn tại, thêm mới
            return [...prevCart, { ...product, quantity: 1 }];
        });
    }, []);

    // Hàm xóa sản phẩm khỏi giỏ hàng
    const removeFromCart = useCallback((id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    }, []);

    // Hàm cập nhật số lượng sản phẩm trong giỏ hàng
    const updateCartItemQuantity = useCallback((id, newQuantity) => {
        if (newQuantity < 1) return;
        setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)));
    }, []);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateCartItemQuantity,
                cartCount: cart.reduce((total, item) => total + item.quantity, 0),
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CartProvider;