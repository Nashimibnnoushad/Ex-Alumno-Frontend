
var url ="";
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    url = 'http://localhost:3000'
  } else {
    url = 'http://localhost:3000'
  }

export const BACKEND_URL = url 
