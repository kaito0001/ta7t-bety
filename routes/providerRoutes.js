const express = require("express");
const providerController = require("../controllers/providerController");
const router = express.Router();
const authController = require("./../controllers/authController");

router
  .route("/")
  .get(providerController.getAllProviders)
  .post(authController.protect ,providerController.createProvider);

router
  .route("/:id")
  .get(providerController.getProviderById)
  .patch(providerController.updateProvider)
  .delete(providerController.deleteProvider);


  // For Admin Only
router
  .route("/:id/subscriptionPercentage")
  .put(
    authController.protect,
    authController.restrictTo("admin"),
    providerController.setSubscriptionPresentage
  );

router
  .route("/:id/uploadID")
  .patch(
    providerController.uploadProviderId,
    providerController.resizeProviderImages,
    providerController.updateProvider
  );  
router
  .route("/:id/uploadCriminalRecord")
  .patch(
    providerController.uploadCriminalRecord,
    providerController.resizeProviderImages,
    providerController.updateProvider
  );  

module.exports = router;
