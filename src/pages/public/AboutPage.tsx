
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
        <img src="https://www.shutterstock.com/image-photo/young-smiling-happy-fun-successful-260nw-2311181029.jpghttps://www.shutterstock.com/image-photo/happy-woman-delivery-man-package-600nw-2304125563.jpg" alt="Parcel Delivery" className="rounded-lg shadow-lg" />
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
  <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">
    Meet Our Team
  </h2>

  <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
    {[
      {
        name: "Alice",
        role: "Frontend Developer",
        image:
          "https://media.istockphoto.com/id/1626853870/photo/a-focused-businessman-working-on-his-computer.jpg?s=612x612&w=0&k=20&c=b5thHA8HNgIM9_dixu6sSxjj4WiO1OWfroKXm2daSNU=",
      },
      {
        name: "Bob",
        role: "Backend Developer",
        image:
          "https://media.istockphoto.com/id/1211994283/photo/portrait-of-a-confident-young-businessman.jpg?s=612x612&w=0&k=20&c=AbFFRL9ukwLFluXNc0rq17stf7dgf3EHrpToM1CkY94=",
      },
      {
        name: "Charlie",
        role: "UI/UX Designer",
        image:
          "https://www.shutterstock.com/image-photo/professional-delivery-guy-employee-man-600nw-2265620153.jpg",
      },
      {
        name: "Diana",
        role: "Project Manager",
        image:
          "https://thumbs.dreamstime.com/b/portrait-happy-office-employee-working-laptop-looking-camera-109745321.jpg", 
      },
    ].map((member) => (
      <div
        key={member.name}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition"
      >
        <img
          src={member.image}
          alt={member.name}
          className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
        />
        <h3 className="text-center font-semibold">{member.name}</h3>
        <p className="text-center text-gray-500">{member.role}</p>
      </div>
    ))}
  </div>
</section>

    </div>
  );
}
