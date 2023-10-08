import { ExpoConfig } from '@expo/config-types';
import {
  AndroidConfig,
  AndroidManifest,
  ConfigPlugin,
  ExportedConfigWithProps,
  WarningAggregator,
  withAndroidManifest,
} from '@expo/config-plugins';

const withInstantAppManifest: ConfigPlugin<{ domain?: string }> = (config, { domain = 'www.example.com' }) => {
  if (!domain) {
    WarningAggregator.addWarningAndroid(
      'withInstantAppManifest',
      'No custom domain provided. Falling back to default www.example.com.',
    );
    domain = 'www.example.com';
  }
  return withAndroidManifest(config as ExportedConfigWithProps<AndroidManifest>, async config => {
    const mainApplication = AndroidConfig.Manifest.getMainApplicationOrThrow(config.modResults);

    // Add metadata items to the main application
    AndroidConfig.Manifest.addMetaDataItemToMainApplication(
      mainApplication,
      'com.google.android.gms.instantapps.API_KEY',
      'YOUR_API_KEY' // Replace with your actual API key
    );

    AndroidConfig.Manifest.addMetaDataItemToMainApplication(
      mainApplication,
      'com.google.android.gms.instantapps.VERSION_CODE',
      'YOUR_VERSION_CODE' // Replace with your actual version code
    );

    // Modify the main application attributes directly
    mainApplication.$['android:targetSandboxVersion'] = '2';

    // Set up the Instant App intent filter
    config.modResults = setInstantAppIntentFilter(
      config.modResults,
      domain, 
      '/instantapp'
    );

    return config;
  });
};

function setInstantAppIntentFilter(
  manifestDocument: AndroidManifest,
  host: string,
  pathPrefix: string
): AndroidManifest {
  if (!manifestDocument.manifest || !manifestDocument.manifest.application) {
    throw new Error('Invalid AndroidManifest format');
  }
  const mainActivity = manifestDocument.manifest.application[0]?.activity?.filter(
    (e) => e['$']['android:name'] === '.MainActivity'
  )[0];

  if (!mainActivity) {
    throw new Error('MainActivity not found in AndroidManifest');
  }

  if (!mainActivity['intent-filter']) {
    mainActivity['intent-filter'] = [];
  }

const instantAppIntentFilter = {
    $: { 'android:autoVerify': 'true' as const }, // Cast as a constant to match the StringBoolean type
    action: [{ $: { 'android:name': 'android.intent.action.VIEW' } }],
    category: [
      { $: { 'android:name': 'android.intent.category.DEFAULT' } },
      { $: { 'android:name': 'android.intent.category.BROWSABLE' } },
    ],
    data: [
      {
        $: {
          'android:scheme': 'https',
          'android:host': host,
          'android:pathPrefix': pathPrefix,
        },
      },
    ],
};


  mainActivity['intent-filter'].push(instantAppIntentFilter);

  return manifestDocument;
}

export default withInstantAppManifest;
