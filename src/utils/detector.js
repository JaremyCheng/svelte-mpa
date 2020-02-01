export function isNull(data) {
  return data === null;
}

export function isNaN(data) {
  return Number.isNaN(data);
}

export function getTypeByToString(data) {
  return Object.prototype.toString.call(data);
}
