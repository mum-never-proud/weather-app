export default function accessLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(pos), (err) => reject(Error(err.message)),
    );
  });
}
