// plugin/src/withInstantAppConfig.ts
import { ConfigPlugin, WarningAggregator } from "@expo/config-plugins";
import getInstantAppConfigurations from './lib/getInstantAppConfigurations';

const withInstantAppConfig: ConfigPlugin<{ domain?: string }> = (config, { domain = 'www.example.com' }) => {
  if (!domain) {
    WarningAggregator.addWarningAndroid(
      'withInstantAppManifest',
      'No custom domain provided. Falling back to default www.example.com.',
    );
    domain = 'www.example.com';
  }
  config = getInstantAppConfigurations(config, {domain});
  return config;
};

export default withInstantAppConfig;
