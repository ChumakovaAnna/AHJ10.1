import Geolocation from "../Geolocation";

const geo = new Geolocation();

test("have space", () => {
  const value = "51.50851, -0.12572";
  expect(geo.sendGPS(value)).toEqual(true);
});

test("haven`t space", () => {
  const value = "51.50851,-0.12572";
  expect(geo.sendGPS(value)).toEqual(true);
});

test("have []", () => {
  const value = "[51.50851, -0.12572]";
  expect(geo.sendGPS(value)).toEqual(true);
});

test("have letters", () => {
  const value = "sasfasfa, -0.12572]";
  expect(geo.sendGPS(value)).toEqual(false);
});
