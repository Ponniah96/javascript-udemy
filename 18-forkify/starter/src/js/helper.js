// Handle API Calls and Timeout Functions
import { TIMEOUT_SEC } from './config.js';

export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(
        new Error(
          `Request took too long! Timeout after ${s} second${s > 1 ? 's' : ''}`,
        ),
      );
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    //const res = await fetch(url);
    // Use Promise.race to implement timeout functionality.
    // Reason for using Promise.race is that it will reject the promise if the API call takes longer than the specified timeout duration.
    const fetchPro = fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

    if (!res.ok)
      throw new Error(`Failed to fetch data from API (${res.status})`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    if (!res.ok)
      throw new Error(`Failed to fetch data from API (${res.status})`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};
