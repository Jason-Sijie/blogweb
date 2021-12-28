export const hashCode = (str) => {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash += str.charCodeAt(i);
  }
  return hash;
}
