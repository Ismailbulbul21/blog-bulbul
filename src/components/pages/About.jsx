import React from 'react';
import { Link } from 'react-router-dom';
import isma from '../../sawiro/isma.png'
import high from '../../sawiro/high.jpg'
import ismaan from '../../sawiro/ismaan.jpg'
const About = () => {
  const teamMembers = [
    {
      name: 'ismail mohamed osman', 
      role: 'Founder & Editor',
      image: isma,
      bio: 'Passionate about storytelling and digital journalism.'
    },
    {
        name: 'ismail mohamed osman', 
        role: ' Editor',
        image: high,
        bio: 'Social media manager and contenr creator.'
      },
   
      {
        name: 'ismail mohamed osman', 
        role: ' Editor',
        image: ismaan ,
        bio: 'Social media manager and contenr creator.'
      },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative bg-blue-600 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-blue-100">
              Dedicated to bringing you the best content and fostering meaningful conversations.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-24">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L80,112C160,128,320,160,480,160C640,160,800,128,960,112C1120,96,1280,96,1360,96L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2024, we've grown from a small personal blog to a platform that hosts diverse voices and perspectives. Our mission is to create a space where writers can share their thoughts and readers can discover new perspectives.
              </p>
              <p className="text-lg text-gray-600">
                We believe in the power of storytelling to connect people, share knowledge, and inspire change. Through our platform, we aim to foster meaningful discussions and build a community of engaged readers and writers.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Team collaboration"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:-translate-y-2">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-blue-600 mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Join Our Community</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Ready to be part of our story? Join our community of writers and readers.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About; 