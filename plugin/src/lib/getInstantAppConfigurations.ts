// plugin/src/lib/getInstantAppConfigurations.ts
import { ConfigPlugin, WarningAggregator } from "@expo/config-plugins";
import withInstantAppManifest from './withInstantAppManifest';
import withInstantAppGradle from './withInstantAppGradle';

const getInstantAppConfigurations: ConfigPlugin<{ domain?: string }> = (config, { domain = 'www.example.com' }) => {
  if (!domain) {
    WarningAggregator.addWarningAndroid(
      'withInstantAppManifest',
      'No custom domain provided. Falling back to default www.example.com.',
    );
    domain = 'www.example.com';
  }
  config = withInstantAppGradle(config);
  config = withInstantAppManifest(config, {domain});
  return config;
};

export default getInstantAppConfigurations;

