// Contoh helper middleware untuk validasi token JWT concept.
const TOKEN_KEY = "userToken";
const SECRET = "FlavorDashJWTSecret";

const encodePart = (payload) => encodeURIComponent(JSON.stringify(payload));
const decodePart = (part) => JSON.parse(decodeURIComponent(part));

export const TOKEN_STORAGE_KEY = TOKEN_KEY;

// Buat token JWT sederhana dengan format Header.Payload.Signature.
export const createJwtToken = (username) => {
  const header = { alg: "HS256", typ: "JWT" };
  const payload = {
    username,
    role: "customer",
    exp: Date.now() + 1000 * 60 * 60,
  };

  const signature = `${SECRET}-signature`;
  return `${encodePart(header)}.${encodePart(payload)}.${encodeURIComponent(signature)}`;
};

// Validasi token minimal dengan memeriksa format dan masa berlaku.
export const validateToken = (token) => {
  if (!token || typeof token !== "string") {
    return false;
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    return false;
  }

  try {
    const payload = decodePart(parts[1]);
    return payload.exp && payload.exp > Date.now();
  } catch (error) {
    return false;
  }
};

// Ambil data payload dari token untuk ditampilkan di UI.
export const decodeJwt = (token) => {
  if (!token) return null;
  try {
    const parts = token.split(".");
    return decodePart(parts[1]);
  } catch (error) {
    return null;
  }
};

// Default export placeholder untuk mencegah Expo Router menganggap file ini sebagai route tanpa komponen.
export default function AuthPlaceholder() {
  return null;
}
