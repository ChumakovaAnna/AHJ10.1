export default function checkGPS(value) {
  const reg = /-{0,1}\d{1,3}\.\d{5}/g;
  const latitude = value.match(reg)[0];
  const longitude = value.match(reg)[1];

  return { latitude, longitude };
}
