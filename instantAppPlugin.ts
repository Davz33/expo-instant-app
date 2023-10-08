
import { ConfigPlugin, AndroidConfig } from "@expo/config-plugins";

// These utility functions would need to be created and tailored for Android's requirements.
// import { withInstantAppConfig } from "./withInstantAppConfig";
// import { withInstantAppGradle } from "./withInstantAppGradle";
// import { withInstantAppManifest } from "./withInstantAppManifest";

const withInstantApp: ConfigPlugin<{
  name: string;
  // Additional parameters can be added based on the "Additional Parameters" section
}> = (
  config,
  {
    name = "InstantApp"
    // Additional parameters can be added here
  }
) => {
  // Construct necessary identifiers and settings for the Instant App
  // const applicationId = AndroidConfig.Package.getApplicationId(config);

  // Apply the utility functions in a specific order
  // config = withInstantAppConfig(config, { name });
  // config = withInstantAppGradle(config, { name });
  // config = withInstantAppManifest(config, { name });

  return config;
};

module.exports.withInstantApp = withInstantApp;
