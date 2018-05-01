let backendHost;
const apiVersion = 'v1';

const hostname = window && window.location && window.location.hostname;

console.log(hostname);
if(hostname === 'larayb.com') {
  backendHost = 'http://larayb.com/api';

} else if(hostname === 'staging.larayb.com') {
  backendHost = 'https://staging.api.larayb.com';
} else if(/^qa/.test(hostname)) {
  backendHost = `https://api.${hostname}`;
} else {
  backendHost = process.env.REACT_APP_BACKEND_HOST || 'http://localhost:8000';
}

export const API_ROOT = backendHost;
