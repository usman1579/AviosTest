/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@/components': './src/components',
          '@/navigation': './src/navigation',
          '@/screens': './src/screens',
          '@/store': './src/store',
          '@/utils': './src/utils',
          '@/lib': './src/lib',
          '@/slices': './src/slices',
          '@/mock-api': './src/mock-api',
          '@/config': './src/config',
          '@/services': './src/services',
        },
      },
    ],
  ],
};
