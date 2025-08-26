
export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">About Our Parcel Delivery Service</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We provide fast, secure, and reliable parcel delivery for everyone. Our mission is to connect people and businesses with seamless delivery experiences.
        </p>
      </header>

      {/* Mission Section */}
      <section className="grid md:grid-cols-2 gap-10 items-center mb-12">
        <img src="https://source.unsplash.com/600x400/?delivery,courier" alt="Parcel Delivery" className="rounded-lg shadow-lg" />
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            To make parcel delivery simple, fast, and reliable. We strive to ensure that every shipment is delivered on time and tracked seamlessly for peace of mind.
          </p>
          <p className="text-gray-700">
            With our technology-driven solutions, users can send, receive, and track parcels with ease anywhere in the country.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section>
        <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">Meet Our Team</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {["Alice", "Bob", "Charlie", "Diana"].map((name) => (
            <div key={name} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition">
              <img
                src={`https://source.unsplash.com/100x100/?person,face&${name}`}
                alt={name}
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h3 className="text-center font-semibold">{name}</h3>
              <p className="text-center text-gray-500">Team Member</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
