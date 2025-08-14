
// enum USER_TYPE {
//     BUYER = "buyer",
//     SELLER = "seller"
// }
// export default USER_TYPE;


export function generateRandomInteger(min: number, max: number): number {
  // Use Math.ceil to include the min value and Math.floor to include the max value.
  min = Math.ceil(min);
  max = Math.floor(max);
  
  // Math.random() returns a float between 0 (inclusive) and 1 (exclusive).
  // Multiplying it by the range and adding the minimum value gives us a number in the desired range.
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
