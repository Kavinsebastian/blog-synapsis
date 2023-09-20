// example params: { my_response_from: 'backend' } or { my_response_from: { backend_service: 'user' } } or you can try
// example output: { myResponseFrom: 'backend' } or { myResponseFrom: { backendService: 'user' } }
export const toMapCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) => toMapCamelCase(item));
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc: any, key: string) => {
      const camelKey = key.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
      acc[camelKey] = toMapCamelCase(obj[key]);
      return acc;
    }, {});
  } else {
    return obj;
  }
}

// example params: { myResponseFrom: 'backend' } or { myResponseFrom: { backendService: 'user' } }
// example output: { my_response_from: 'backend' } or { my_response_from: { backend_service: 'user' } } or you can try
export const toMapSnakeCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) => toMapSnakeCase(item));
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc: any, key) => {
      const snakeKey = key.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
      acc[snakeKey] = toMapSnakeCase(obj[key]);
      return acc;
    }, {});
  } else {
    return obj;
  }
}
