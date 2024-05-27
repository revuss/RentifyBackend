const Properties = require("../models/Propertymodel");
const User = require("../models/Usermodel");

const getPropertyById = async (req, res) => {
  try {
    const propertyId = req.params.id;

    const property = await Properties.findById(propertyId).populate(
      "createdBy"
    );

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const user = {
      _id: property.createdBy._id,
      firstname: property.createdBy.firstname,
      lastname: property.createdBy.lastname,
      email: property.createdBy.email,
      phonenumber: property.createdBy.phonenumber,
    };

    res.json({
      property: {
        propertyId: property.propertyId,
        propertyArea: property.propertyArea,
        propertyBathrooms: property.propertyBathrooms,
        propertyBedrooms: property.propertyBedrooms,
        hospitalsNearby: property.hospitalsNearby,
        collegesNearby: property.collegesNearby,
        createdAt: property.createdAt,
      },
      createdBy: user,
    });
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getPropertyById;
