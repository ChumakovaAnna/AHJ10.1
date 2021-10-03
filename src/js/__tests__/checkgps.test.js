import checkGPS from "../checkGPS";

test("have space", () => {
  const value = "51.50851, -0.12572";
  expect(checkGPS(value)).toEqual(true);
});

test("haven`t space", () => {
  const value = "51.50851,-0.12572";
  expect(checkGPS(value)).toEqual(true);
});

test("have []", () => {
  const value = "[51.50851, -0.12572]";
  expect(checkGPS(value)).toEqual(true);
});

test("have letters", () => {
  const value = "sasfasfa, -0.12572]";
  expect(checkGPS(value)).toEqual(false);
});
