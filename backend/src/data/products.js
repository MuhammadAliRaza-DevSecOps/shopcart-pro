const products = [
  {
    id: 1,
    name: "Wireless Noise-Canceling Headphones",
    price: 8999,
    category: "Electronics",
    rating: 4.7,
    stock: 12,
    image: "https://picsum.photos/seed/headphones1/600/400",
    description: "Premium wireless headphones with deep bass and long battery life."
  },
  {
    id: 2,
    name: "Gaming Mouse RGB Pro",
    price: 3499,
    category: "Accessories",
    rating: 4.5,
    stock: 20,
    image: "https://picsum.photos/seed/mouse1/600/400",
    description: "Ergonomic gaming mouse with RGB lighting and adjustable DPI."
  },
  {
    id: 3,
    name: "Smart Watch Series Fit",
    price: 7499,
    category: "Wearables",
    rating: 4.4,
    stock: 8,
    image: "https://picsum.photos/seed/watch1/600/400",
    description: "Smart watch with fitness tracking and notification support."
  },
  {
    id: 4,
    name: "Laptop Backpack Elite",
    price: 2599,
    category: "Fashion",
    rating: 4.6,
    stock: 30,
    image: "https://picsum.photos/seed/backpack1/600/400",
    description: "Stylish backpack with laptop compartment and travel comfort."
  },
  {
    id: 5,
    name: "Bluetooth Speaker Mini Max",
    price: 4299,
    category: "Electronics",
    rating: 4.3,
    stock: 15,
    image: "https://picsum.photos/seed/speaker1/600/400",
    description: "Portable Bluetooth speaker with powerful sound and compact body."
  },
  {
    id: 6,
    name: "Running Shoes Air Flex",
    price: 5999,
    category: "Fashion",
    rating: 4.8,
    stock: 18,
    image: "https://picsum.photos/seed/shoes1/600/400",
    description: "Lightweight running shoes with breathable design."
  },
  {
    id: 7,
    name: "Mechanical Keyboard TKL",
    price: 6999,
    category: "Accessories",
    rating: 4.7,
    stock: 14,
    image: "https://picsum.photos/seed/keyboard1/600/400",
    description: "Mechanical tenkeyless keyboard for gaming and typing."
  },
  {
    id: 8,
    name: "4K Monitor UltraView",
    price: 42999,
    category: "Electronics",
    rating: 4.9,
    stock: 6,
    image: "https://picsum.photos/seed/monitor1/600/400",
    description: "Large 4K display with clear visuals and slim bezels."
  },
  {
    id: 9,
    name: "USB-C Hub MultiPort",
    price: 2999,
    category: "Accessories",
    rating: 4.2,
    stock: 28,
    image: "https://picsum.photos/seed/hub1/600/400",
    description: "Multiport USB-C hub for laptops and tablets."
  },
  {
    id: 10,
    name: "Wireless Earbuds X",
    price: 4999,
    category: "Electronics",
    rating: 4.5,
    stock: 16,
    image: "https://picsum.photos/seed/earbuds1/600/400",
    description: "Compact wireless earbuds with charging case."
  },
  {
    id: 11,
    name: "Office Chair Comfort Plus",
    price: 18999,
    category: "Furniture",
    rating: 4.6,
    stock: 9,
    image: "https://picsum.photos/seed/chair1/600/400",
    description: "Comfortable office chair with lumbar support."
  },
  {
    id: 12,
    name: "LED Desk Lamp",
    price: 1999,
    category: "Home",
    rating: 4.3,
    stock: 25,
    image: "https://picsum.photos/seed/lamp1/600/400",
    description: "Modern desk lamp with adjustable brightness."
  },
  {
    id: 13,
    name: "Travel Suitcase Hard Shell",
    price: 10999,
    category: "Fashion",
    rating: 4.4,
    stock: 10,
    image: "https://picsum.photos/seed/suitcase1/600/400",
    description: "Durable travel suitcase with smooth wheels."
  },
  {
    id: 14,
    name: "Power Bank 20000mAh",
    price: 3799,
    category: "Electronics",
    rating: 4.6,
    stock: 22,
    image: "https://picsum.photos/seed/powerbank1/600/400",
    description: "High-capacity power bank for phones and tablets."
  },
  {
    id: 15,
    name: "Men's Casual Jacket",
    price: 5499,
    category: "Fashion",
    rating: 4.3,
    stock: 12,
    image: "https://picsum.photos/seed/jacket1/600/400",
    description: "Trendy casual jacket for everyday wear."
  },
  {
    id: 16,
    name: "Fitness Dumbbell Set",
    price: 8999,
    category: "Sports",
    rating: 4.7,
    stock: 11,
    image: "https://picsum.photos/seed/dumbbell1/600/400",
    description: "Adjustable dumbbell set for home workouts."
  },
  {
    id: 17,
    name: "Yoga Mat Premium",
    price: 2499,
    category: "Sports",
    rating: 4.5,
    stock: 19,
    image: "https://picsum.photos/seed/yogamat1/600/400",
    description: "Soft non-slip yoga mat with premium finish."
  },
  {
    id: 18,
    name: "Coffee Maker Smart Brew",
    price: 7999,
    category: "Home",
    rating: 4.4,
    stock: 7,
    image: "https://picsum.photos/seed/coffeemaker1/600/400",
    description: "Smart coffee maker for home and office."
  },
  {
    id: 19,
    name: "Men's Wrist Watch Classic",
    price: 6499,
    category: "Wearables",
    rating: 4.6,
    stock: 13,
    image: "https://picsum.photos/seed/watch2/600/400",
    description: "Elegant wrist watch with classic design."
  },
  {
    id: 20,
    name: "Tablet Stand Adjustable",
    price: 1499,
    category: "Accessories",
    rating: 4.2,
    stock: 27,
    image: "https://picsum.photos/seed/stand1/600/400",
    description: "Adjustable tablet stand for desk setup."
  },
  {
    id: 21,
    name: "Graphic T-Shirt Modern Fit",
    price: 1999,
    category: "Fashion",
    rating: 4.1,
    stock: 21,
    image: "https://picsum.photos/seed/tshirt1/600/400",
    description: "Soft cotton T-shirt with modern design."
  },
  {
    id: 22,
    name: "Portable SSD 1TB",
    price: 12999,
    category: "Electronics",
    rating: 4.8,
    stock: 10,
    image: "https://picsum.photos/seed/ssd1/600/400",
    description: "Fast and compact SSD for secure data storage."
  },
  {
    id: 23,
    name: "DSLR Camera Lens Kit",
    price: 23999,
    category: "Electronics",
    rating: 4.7,
    stock: 5,
    image: "https://picsum.photos/seed/camera1/600/400",
    description: "Professional lens kit for photography lovers."
  },
  {
    id: 24,
    name: "Kitchen Knife Set",
    price: 4599,
    category: "Home",
    rating: 4.5,
    stock: 17,
    image: "https://picsum.photos/seed/knife1/600/400",
    description: "Premium kitchen knife set with elegant holder."
  },
  {
    id: 25,
    name: "Men's Leather Wallet",
    price: 1799,
    category: "Fashion",
    rating: 4.4,
    stock: 24,
    image: "https://picsum.photos/seed/wallet1/600/400",
    description: "Classic leather wallet with multiple compartments."
  },
  {
    id: 26,
    name: "Women's Handbag Luxe",
    price: 5999,
    category: "Fashion",
    rating: 4.6,
    stock: 14,
    image: "https://picsum.photos/seed/handbag1/600/400",
    description: "Luxury handbag with spacious interior."
  },
  {
    id: 27,
    name: "Router Dual Band FastNet",
    price: 6999,
    category: "Electronics",
    rating: 4.3,
    stock: 8,
    image: "https://picsum.photos/seed/router1/600/400",
    description: "Fast dual-band router for strong internet coverage."
  },
  {
    id: 28,
    name: "Tripod Stand Pro",
    price: 3899,
    category: "Accessories",
    rating: 4.5,
    stock: 12,
    image: "https://picsum.photos/seed/tripod1/600/400",
    description: "Adjustable tripod stand for camera and phone."
  },
  {
    id: 29,
    name: "Electric Kettle QuickBoil",
    price: 2899,
    category: "Home",
    rating: 4.2,
    stock: 18,
    image: "https://picsum.photos/seed/kettle1/600/400",
    description: "Fast-boiling electric kettle with safe design."
  },
  {
    id: 30,
    name: "Mini Projector CinemaBox",
    price: 15999,
    category: "Electronics",
    rating: 4.7,
    stock: 6,
    image: "https://picsum.photos/seed/projector1/600/400",
    description: "Compact mini projector for movies and presentations."
  }
];

module.exports = products;