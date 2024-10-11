const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema(
  {
    providerID: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    providerType: {
      type: String,
      enum: [
        "R-Electric",
        "R-Painters",
        "R-Carpenters",
        "R-Alometetal",
        "R-Air conditioning technician",
        "R-Plumber",
        "HW-Standerd",
        "HW-Deep",
        "HW-Cleaning",
        "HW-HouseKeeper",
        "HW-Car wash",
        "HW-Dry cleaning",
        "F-Restaurants",
        "M-Supermarket",
        "M-miqla",
        "HC-Pharmacies",
        "HC-Clinics",
      ],
      required: true,
      trim: true,
      index: true,
    },
    id: [
      {
        type: String,
        trim: true,
        match: /\.(jpg|jpeg|png|gif)$/,
      },
    ],
    criminalRecord: {
      type: String,
      trim: true,
      match: /\.(jpg|jpeg|png|pdf)$/,
    },
    lastPhotoAt: {
      type: Date,
      default: Date.now,
    },

    subscriptionType: {
      type: String,
      enum: ["monthly", "percentage"],
      required: true,
    },

    subscriptionStartDate: {
      type: Date,
      default: Date.now,
    },
    subscriptionEndDate: {
      type: Date,
      validate: {
        validator: function (v) {
          return v >= this.subscriptionStartDate;
        },
        message: "Subscription end date must be after start date.",
      },
    },
    subscriptionPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: function () {
        return this.subscriptionEndDate
          ? this.subscriptionEndDate > Date.now()
          : true;
      },
    },

    locations: {
      coordinates: {
        type: {
          type: String,
          enum: ["Point"],
          default: "Point",
        },
        coordinates: {
          type: [Number], // [longitude, latitude]
          required: true,
        },
      },
    },
    posts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Post", 
        required: true,
      },
    ],
  }
  ,
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

providerSchema.index({ "locations.coordinates": "2dsphere" });


providerSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "provider",
  localField: "_id",
});




const Provider = mongoose.model("Provider", providerSchema);
module.exports = Provider;
