import React, { useState, useEffect } from 'react';

const initialServices = [
  {
    id: 1,
    name: "General Checkup",
    description: "A comprehensive checkup to assess overall health.",
    price: "₹500"
  },
  {
    id: 2,
    name: "Blood Test",
    description: "A basic blood test to check various health parameters.",
    price: "₹300"
  },
  {
    id: 3,
    name: "X-Ray",
    description: "An X-ray scan to view internal body structures.",
    price: "₹800"
  },
  {
    id: 4,
    name: "Dental Cleaning",
    description: "A thorough cleaning of the teeth by a dental professional.",
    price: "₹1000"
  }
];

const HealthcareServices = () => {
  const [services, setServices] = useState(initialServices);
  const [newService, setNewService] = useState({ name: '', description: '', price: '' });
  const [editingService, setEditingService] = useState(null);
  const [setError] = useState('');

  // Add New Service
  const handleAddService = (e) => {
    e.preventDefault();
    if (!newService.name || !newService.description || !newService.price) {
      setError("All fields are required!");
      return;
    }

    const newServiceEntry = { ...newService, id: services.length + 1 };
    setServices([...services, newServiceEntry]);
    setNewService({ name: '', description: '', price: '' });
    setError('');
  };

  // Delete Service
  const handleDeleteService = (id) => {
    setServices(services.filter(service => service.id !== id));
  };

  // Update Service
  const handleUpdateService = (id) => {
    const updatedServices = services.map(service => 
      service.id === id ? editingService : service
    );
    setServices(updatedServices);
    setEditingService(null);
  };

  return (
    <div className= "body">
      <h2 id="Heading">Services</h2>

      <ul>
        {services.map(service => (
          <li key={service.id} style={{ marginBottom: "20px" }}>
            {editingService && editingService.id === service.id ? (
              <>
                <input
                  type="text"
                  value={editingService.name}
                  onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                />
                <input
                  type="text"
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                />
                <input
                  type="text"
                  value={editingService.price}
                  onChange={(e) => setEditingService({ ...editingService, price: e.target.value })}
                />
                <button onClick={() => handleUpdateService(service.id)}>Update</button>
                <button onClick={() => setEditingService(null)}>Cancel</button>
              </>
            ) : (
              <>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <p><strong>Price:</strong> {service.price}</p>
                <button onClick={() => setEditingService(service)}>Edit</button>
                <button onClick={() => handleDeleteService(service.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>

      <form className="ADD" onSubmit={handleAddService}>
        <input
          type="text"
          placeholder="Service Name"
          value={newService.name}
          onChange={(e) => setNewService({ ...newService, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Service Description"
          value={newService.description}
          onChange={(e) => setNewService({ ...newService, description: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Service Price"
          value={newService.price}
          onChange={(e) => setNewService({ ...newService, price: e.target.value })}
          required
        />
        <button type="submit">Add Service</button>
      </form>
    </div>
  );
};

export default HealthcareServices;
