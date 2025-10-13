interface LicenseState {
  email: string;
  username: string;
  expiryDate: string;
  setEmail: (email: string) => void;
  setUsername: (username: string) => void;
  setExpiryDate: (expiryDate: string) => void;
}
