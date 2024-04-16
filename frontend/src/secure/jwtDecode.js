function decodeJWT(token) {
  const parts = token.split(".");
  const decodedPayload = atob(parts[1]);
  const payload = JSON.parse(decodedPayload);
  const id = payload.id;
  return id;
}

export default decodeJWT;