const sampleListings = [
  {
    title: "Cozy PG Room in Andheri West",
    description:
      "Well-furnished PG room in the heart of Andheri West. Perfect for working professionals and students. Includes AC, Wi-Fi, and 24/7 security.",
    image: "https://img.staticmb.com/mbphoto/pg/grd2/cropped_images/2024/Aug/22/Photo_h400_w540/GR2-459029-2228821_400_540.jpeg",
    price: 12000,
    location: "Andheri West",
    country: "India",
  },
  {
    title: "Budget-Friendly PG near IIT Delhi",
    description:
      "Clean and comfortable PG accommodation just 5 minutes walk from IIT Delhi. Ideal for students with study environment and mess facility.",
    image: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cm9vbSUyMGludGVyaW9yfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 8000,
    location: "Hauz Khas",
    country: "India",
  },
  {
    title: "Modern PG in Koramangala",
    description:
      "Luxury PG room in prime Koramangala location. Fully furnished with attached bathroom, AC, and premium amenities. Walking distance to restaurants and cafes.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cm9vbSUyMGludGVyaW9yfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 15000,
    location: "Koramangala",
    country: "India",
  },
  {
    title: "Girls PG in Bandra West",
    description:
      "Safe and secure PG accommodation for working women in Bandra West. 24/7 female security, CCTV surveillance, and power backup.",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cm9vbSUyMGludGVyaW9yfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 14000,
    location: "Bandra West",
    country: "India",
  },
  {
    title: "Student PG near VIT Vellore",
    description:
      "Affordable PG for VIT students with mess facility, laundry service, and 24/7 Wi-Fi. Study tables and quiet environment provided.",
    image: "https://content.jdmagicbox.com/v2/comp/sonepat/n9/9999px130.x130.230604161820.u1n9/catalogue/radhe-radhe-pg-rooms-kundli-sonepat-sonepat-paying-guest-accommodations-u72wpgwv0o-250.jpg?w=640&q=75",
    price: 7000,
    location: "Katpadi",
    country: "India",
  },
  {
    title: "Professional PG in CP",
    description:
      "Premium PG accommodation in Connaught Place for working professionals. Metro connectivity, high-speed internet, and housekeeping services.",
    image:"https://img.staticmb.com/mbphoto/pg/grd2/cropped_images/2025/Oct/29/Photo_h400_w540/GR2-513867-2616061_400_540.jpeg",
      price: 18000,
    location: "Connaught Place",
    country: "India",
  },
  {
    title: "Cozy PG Room in Pune Camp",
    description:
      "Well-maintained PG in Pune Camp area. Perfect for IT professionals working in Hinjewadi. Includes breakfast and dinner in mess.",
    image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cm9vbSUyMGludGVyaW9yfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 10000,
    location: "Camp",
    country: "India",
  },
  {
    title: "Luxury PG in Banjara Hills",
    description:
      "Upscale PG accommodation in Banjara Hills with AC, private bathroom, and balcony. Ideal for corporate professionals with premium lifestyle.",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cm9vbSUyMGludGVyaW9yfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 16000,
    location: "Banjara Hills",
    country: "India",
  },
  {
    title: "Budget PG in Sector 15",
    description:
      "Economical PG option in Sector 15, Noida. Close to Metro station, IT companies, and shopping malls. Basic amenities included.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJvb20lMjBpbnRlcmlvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 6500,
    location: "Sector 15",
    country: "India",
  },
  {
    title: "Girls PG in Indiranagar",
    description:
      "Safe and secure accommodation for female professionals in Indiranagar. CCTV monitoring, biometric access, and female staff only.",
    image: "https://img.staticmb.com/mbphoto/pg/grd2/cropped_images/2021/Sep/23/Photo_h400_w540/GR2-236707-1116123_400_540.jpg",
    price: 13000,
    location: "Indiranagar",
    country: "India",
  },
  {
    title: "Student PG near Manipal University",
    description:
      "Student-friendly PG near Manipal University with mess facility, laundry service, and 24/7 Wi-Fi. Perfect for medical students.",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHJvb20lMjBpbnRlcmlvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 7500,
    location: "Manipal",
    country: "India",
  },
  {
    title: "Executive PG in Powai",
    description:
      "Premium PG accommodation in Powai for corporate professionals. Near IIT Bombay and major IT companies. Includes gym and recreational facilities.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJvb20lMjBpbnRlcmlvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 17000,
    location: "Powai",
    country: "India",
  },
  {
    title: "Shared PG Room in MG Road",
    description:
      "Economical shared accommodation in MG Road, Gurgaon. Walking distance to Metro and major corporate offices. Shared kitchen and common area.",
    image: "https://img.staticmb.com/mbphoto/pg/grd2/cropped_images/2024/Apr/06/Photo_h400_w540/GR2-356613-2095865_400_540.jpeg",
    price: 5500,
    location: "MG Road",
    country: "India",
  },
  {
    title: "Professional PG in Gachibowli",
    description:
      "Modern PG in Gachibowli for IT professionals. High-speed internet, backup power, and close to major tech companies and metro.",
    image: "https://i.pinimg.com/originals/22/e0/17/22e01709e94867cffcdf8baf83acd52a.jpg",
    price: 13500,
    location: "Gachibowli",
    country: "India",
  },
  {
    title: "Cozy PG in Kharadi",
    description:
      "Comfortable PG accommodation in Kharadi, Pune. Perfect for IT professionals working in EON IT Park. Includes breakfast and Wi-Fi.",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHJvb218ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 11000,
    location: "Kharadi",
    country: "India",
  },
  {
    title: "Girls PG in Alwarpet",
    description:
      "Safe and secure girls PG in Alwarpet, Chennai. 24/7 security, CCTV, and female caretaker. Close to educational institutions and IT companies.",
    image: "https://img.staticmb.com/mbphoto/pg/grd2/cropped_images/2025/Oct/19/Photo_h400_w540/GR2-512855-2610201_400_540.jpg",
    price: 9500,
    location: "Alwarpet",
    country: "India",
  },
  {
    title: "Student PG in Rajeev Chowk",
    description:
      "Budget-friendly student accommodation in Rajeev Chowk, Delhi. Walking distance to DU North Campus and metro connectivity.",
    image: "https://i.pinimg.com/originals/7a/15/5c/7a155c73ac916989ba9297bdc7d5b786.jpg",
    price: 6000,
    location: "Rajeev Chowk",
    country: "India",
  },
  {
    title: "Executive PG in Sarjapur",
    description:
      "Luxury PG in Sarjapur Road for working professionals. AC room, private bathroom, and premium amenities. Near major IT companies.",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fHJvb218ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 14500,
    location: "Sarjapur Road",
    country: "India",
  },
  {
    title: "Budget PG in Vile Parle",
    description:
      "Affordable PG option in Vile Parle East. Basic amenities, shared bathroom, and mess facility. Perfect for students and entry-level professionals.",
    image: "https://img.staticmb.com/mbphoto/pg/grd2/cropped_images/2025/Nov/24/Photo_h400_w540/GR2-517265-2640091_400_540.jpeg",
    price: 7000,
    location: "Vile Parle East",
    country: "India",
  },
  {
    title: "Professional PG in Lavelle Road",
    description:
      "Premium PG accommodation in Lavelle Road for corporate professionals. Central location, premium amenities, and housekeeping services.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fHJvb218ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 19000,
    location: "Lavelle Road",
    country: "India",
  },
  {
    title: "Shared PG Room in Rajajinagar",
    description:
      "Economical shared accommodation in Rajajinagar, Bangalore. Close to metro and major IT companies. Includes basic furniture and mess facility.",
    image: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fHJvb218ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 8000,
    location: "Rajajinagar",
    country: "India",
  },
  {
    title: "Cozy PG in Kankurgachi",
    description:
      "Well-maintained PG in Kankurgachi, Kolkata. Perfect for students and professionals. Walking distance to Salt Lake and IT hub.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fHJvb218ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 6500,
    location: "Kankurgachi",
    country: "India",
  },

  {
    title: "Executive PG in Aerocity",
    description:
      "Luxury PG in Aerocity near Delhi Airport. Perfect for frequent travelers and corporate professionals. Premium amenities and connectivity.",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fHJvb218ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 16000,
    location: "Aerocity",
    country: "India",
  },

  {
    title: "Professional PG in DLF Phase 3",
    description:
      "Modern PG in DLF Phase 3, Gurgaon. High-speed Wi-Fi, backup power, and close to major corporate offices. Premium location and amenities.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fHJvb218ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 14000,
    location: "DLF Phase 3",
    country: "India",
  },
  {
    title: "Cozy PG in Jubilee Hills",
    description:
      "Upscale PG accommodation in Jubilee Hills. Premium location with AC, private bathroom, and balcony. Ideal for senior professionals.",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fHJvb218ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 17500,
    location: "Jubilee Hills",
    country: "India",
  },

  {
    title: "Girls PG in Safdarjung Enclave",
    description:
      "Secure and comfortable PG for working women in Safdarjung Enclave. 24/7 security, CCTV, and female staff. Premium South Delhi location.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fHJvb218ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 15000,
    location: "Safdarjung Enclave",
    country: "India",
  }
];

module.exports = { data: sampleListings };
