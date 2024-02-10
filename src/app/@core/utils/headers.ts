import { HttpHeaders } from '@angular/common/http';

export let contentHeaders = new HttpHeaders();
contentHeaders = contentHeaders.append('Accept', 'application/json');
contentHeaders = contentHeaders.append('Content-Type', 'application/json');


export function createAuthorizationHeader(): HttpHeaders {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  });
  return headers;
}

export function createAuthorizationHeaderRaw(): HttpHeaders {
  const headers = new HttpHeaders({ 'Content-Type': 'text/plain',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  });
  return headers;
}
