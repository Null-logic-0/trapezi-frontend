import DiscoverPlaces from "./DiscoverPlaces";

const DiscoverSection = () => {
  const businesses = [
    {
      id: 5,
      name: "Keto & Kote",
      category: "Restaurant",
      rating: 4.5,
      reviews: 156,
      image:
        "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80",
      location: "Sololaki",
      isOpen: true,
    },
    {
      id: 6,
      name: "Stamba Coffee",
      category: "Cafe",
      rating: 4.7,
      reviews: 203,
      image:
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80",
      location: "Stamba Hotel",
      isOpen: true,
    },
    {
      id: 7,
      name: "Wine Underground",
      category: "Bar",
      rating: 4.4,
      reviews: 189,
      image:
        "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80",
      location: "Rustaveli",
      isOpen: false,
    },
    {
      id: 8,
      name: "Sweet Corner",
      category: "Pastry Shop",
      rating: 4.6,
      reviews: 127,
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
      location: "Saburtalo",
      isOpen: true,
    },
    {
      id: 9,
      name: "Barbarestan",
      category: "Restaurant",
      rating: 4.9,
      reviews: 421,
      image:
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
      location: "Sololaki",
      isOpen: true,
    },
    {
      id: 10,
      name: "Linville Coffee",
      category: "Cafe",
      rating: 4.5,
      reviews: 178,
      image:
        "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80",
      location: "Vake",
      isOpen: true,
    },
  ];

  return (
    <section id="discover" className="py-16 px-4 sm:px-6 lg:px-8 ">
      <DiscoverPlaces businesses={businesses} />
    </section>
  );
};

export default DiscoverSection;
