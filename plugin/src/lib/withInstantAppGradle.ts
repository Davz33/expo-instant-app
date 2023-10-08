import { ConfigPlugin, withAppBuildGradle } from "@expo/config-plugins";

const withInstantAppGradle: ConfigPlugin = (config) => {
  return withAppBuildGradle(config, (config) => {
    config.modResults.contents += `
      android {
        ...
        buildTypes {
          release {
            ...
            signingConfig signingConfigs.release
          }
        }
        ...
        flavorDimensions "instant"
        productFlavors {
          instant {
            dimension "instant"
          }
          installable {
            dimension "installable"
          }
        }
      }

      android.applicationVariants.all { variant ->
        if (variant.buildType.name == 'release' && variant.flavorName == 'instantRelease') {
          variant.buildConfigField "boolean", "IS_INSTANT_APP", "true"
        } else {
          variant.buildConfigField "boolean", "IS_INSTANT_APP", "false"
        }
      }
    `;
    return config;
  });
};

export default withInstantAppGradle;
