import Appartment from "../models/Appartment.js";
import Room from "../models/rooms.js";

export const createAppartment = async (req, res, next) => {
  const newappartment = new Appartment(req.body);

  try {
    const savedappartment = await newappartment.save();
    res.status(200).json(savedappartment);
  } catch (err) {
    next(err);
  }
};

export const updateAppartment = async (req, res, next) => {
  try {
    const updateappartment = await Appartment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateappartment);
  } catch (err) {
    next(err);
  }
};

export const deleteAppartment = async (req, res, next) => {
  try {
    await Appartment.findByIdAndDelete(req.params.id);
    res.status(200).json("Appartment has been Deleted");
  } catch (err) {
    next(err);
  }
};

export const getAppartment = async (req, res, next) => {
  try {
    const appartment = await Appartment.findById(req.params.id);
    res.status(200).json(appartment);
  } catch (err) {
    next(err);
  }
};

export const getAppartments = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const appartments = await Appartment.find({
      ...others,
      price: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(appartments);
  } catch (err) {
    next(err);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Appartment.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const appartmentCount = await Appartment.countDocuments({
      type: "appartment",
    });
    const roomCount = await Appartment.countDocuments({ type: "room" });
    const resortCount = await Appartment.countDocuments({ type: "resort" });
    const villaCount = await Appartment.countDocuments({ type: "villa" });
    const cabinCount = await Appartment.countDocuments({ type: "cabin" });
    res.status(200).json([
      { type: "appartment", count: appartmentCount },
      { type: "room", count: roomCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
      { type: "cabin", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getAppartmentRooms = async (req, res, next) => {
  try {
    const appartment = await Appartment.findById(req.params.id);
    const list = await Promise.all(
      appartment.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
