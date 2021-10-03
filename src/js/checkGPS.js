export default function checkGPS(value) {
  const errors = {
    gps: [/^\[{0,}-{0,1}\d{1,3}\.\d{5},\s{0,}-{0,1}\d{1,3}\.\d{5}\]{0,}$/, "Mismatch pattern"],
  };
  const constraint = errors.gps[0];
  if (constraint.test(value)) {
    return true;
  }
  return false;
}
