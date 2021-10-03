/* eslint-disable consistent-return */
export default function getGeolocation() {
  if (navigator.geolocation) {
    return new Promise((resolve, posError) => {
      navigator.geolocation.getCurrentPosition(resolve, posError);
    });
  }
}
