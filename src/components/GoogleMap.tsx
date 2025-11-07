interface GoogleMapProps {
  address: string;
  className?: string;
}

const GoogleMap = ({ address, className = "" }: GoogleMapProps) => {
  const encodedAddress = encodeURIComponent(address);

  return (
    <div className={className}>
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0, borderRadius: "0.75rem" }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodedAddress}`}
      />
    </div>
  );
};

export default GoogleMap;
