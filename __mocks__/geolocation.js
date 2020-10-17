const mockGeoLocation = {
  getCurrentPosition(successCallback) {
    successCallback({
      coords: {
        latitude: Math.random() * 10,
        longitude: Math.random() * 100,
      },
    });
  },
};

Object.defineProperty(global.navigator, 'geolocation', {
  value: mockGeoLocation, writable: true, configurable: true,
});
