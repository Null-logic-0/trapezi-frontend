import BusinessCard from "./BusinessCard";
import FeaturedSpots from "./FeaturedSpots";

const FeaturedSection = () => {
  // Mock data - will be replaced with real data from database
  const featuredBusinesses = [
    {
      id: 1,
      name: "Café Gabriadze",
      category: "Cafe",
      rating: 4.8,
      reviews: 245,
      image:
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
      location: "Old Tbilisi",
      isOpen: true,
      isVIP: true,
    },
    {
      id: 2,
      name: "Shavi Lomi",
      category: "Restaurant",
      rating: 4.9,
      reviews: 387,
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
      location: "Vera",
      isOpen: true,
      isVIP: true,
    },
    {
      id: 3,
      name: "Fabrika",
      category: "Bar",
      rating: 4.7,
      reviews: 412,
      image:
        "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",
      location: "Fabrika",
      isOpen: true,
      isVIP: true,
    },
    {
      id: 4,
      name: "Entrée Bakery",
      category: "Bakery",
      rating: 4.6,
      reviews: 198,
      image:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
      location: "Vake",
      isOpen: true,
      isVIP: true,
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <FeaturedSpots businesses={featuredBusinesses} />
    </section>
  );
};

export default FeaturedSection;
