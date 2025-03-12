const dummyProducts = [
    {
        id: 1,
        imagePath: "https://via.placeholder.com/150",
        title: "Bánh kem dâu tây",
        description: "Bánh kem vị dâu tây thơm ngon",
        price: 150000,
        quantity: 1,
    },
    {
        id: 2,
        imagePath: "https://via.placeholder.com/150",
        title: "Bánh tiramisu",
        description: "Bánh tiramisu hương vị Ý",
        price: 180000,
        quantity: 1,
    },
    {
        id: 3,
        imagePath: "https://via.placeholder.com/150",
        title: "Bánh mousse chocolate",
        description: "Bánh mousse vị chocolate đậm đà",
        price: 200000,
        quantity: 1,
    },
];


export const useProducts = () => {
    return { popularProducts: dummyProducts };
};

export default useProducts;