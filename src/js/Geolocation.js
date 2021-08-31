/* eslint-disable prefer-destructuring */

export default class Geolocation {
  constructor() {
    this.latitude = null;
    this.longitude = null;
    this.sendGPS = this.sendGPS.bind(this);
    this.error = null;
    this.result = false;
  }

  static checkGPS(value) {
    const errors = {
      gps: [/^\[{0,}-{0,1}\d{1,3}\.\d{5},\s{0,}-{0,1}\d{1,3}\.\d{5}\]{0,}$/, "Mismatch pattern"],
    };
    const constraint = errors.gps[0];
    if (constraint.test(value)) {
      return true;
    }
    return false;
  }

  sendGPS(value) {
    if (!Geolocation.checkGPS(value)) return false;

    const reg = /-{0,1}\d{1,3}\.\d{5}/g;
    this.latitude = value.match(reg)[0];
    this.longitude = value.match(reg)[1];
    return true;
  }

  sendResult() {
    Geolocation.getLocation()
      .then((position) => {
        this.latitude = position.coords.latitude.toFixed(5);
        this.longitude = position.coords.longitude.toFixed(5);
        this.error = null;
      }).catch((e) => {
        this.error = e;
      });
  }

  static getLocation(options) {
    return new Promise((resolve, posError) => {
      navigator.geolocation.getCurrentPosition(resolve, posError, options);
    });
  }

  getLocationValue() {
    return {
      latitude: this.latitude,
      longitude: this.longitude,
    };
  }
}
