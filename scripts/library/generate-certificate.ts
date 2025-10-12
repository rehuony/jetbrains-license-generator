import forge from 'node-forge';

const today = Date.now();
const yesterday = new Date(today - (24 * 60 * 60 * 1000));
const tenYearsFromToday = new Date(today + (10 * 365 * 24 * 60 * 60 * 1000));

// Convert BigInteger public key to a form that JavaScript BigInt can understand
function convertPublicKeyToForge(publicKey: forge.pki.PublicKey) {
  return forge.pki.publicKeyFromPem(forge.pki.publicKeyToPem(publicKey));
}

// Generate self-signed certificate
export async function generateCertificate() {
  const keyPair = forge.pki.rsa.generateKeyPair(4096, 65537);
  const publicKey = keyPair.publicKey;
  const privateKey = keyPair.privateKey;

  const cert = forge.pki.createCertificate();

  // Set the public and private key pair of the certificate
  cert.publicKey = publicKey;
  cert.privateKey = privateKey;

  // Set the validity period of the certificate
  cert.validity.notBefore = yesterday;
  cert.validity.notAfter = tenYearsFromToday;

  // Generate a random serial number for the certificate
  cert.serialNumber = forge.util.bytesToHex(forge.random.getBytesSync(20));

  cert.setSubject([
    {
      name: 'commonName',
      value: 'Novice-from-2024-01-19',
    },
  ]);

  cert.setIssuer([
    {
      name: 'commonName',
      value: 'JetProfile CA',
    },
  ]);

  cert.sign(privateKey, forge.md.sha256.create());

  return {
    publicPem: forge.pki.certificateToPem(cert),
    privatePem: forge.pki.privateKeyToPem(privateKey),
  };
}

export async function generateCertificateConf(
  rootPem: string,
  publicPem: string,
) {
  const rootCert = forge.pki.certificateFromPem(rootPem);
  const publicCert = forge.pki.certificateFromPem(publicPem);
  const signatureHex = forge.util.bytesToHex(publicCert.signature);

  const x = new forge.jsbn.BigInteger(signatureHex, 16);
  const y = new forge.jsbn.BigInteger('65537');
  const z = new forge.jsbn.BigInteger(convertPublicKeyToForge(rootCert.publicKey).n);

  const publicKeyForge = convertPublicKeyToForge(publicCert.publicKey);

  // Using forge's BigInteger class
  const r = x.modPow(publicKeyForge.e, publicKeyForge.n);
  const certificateConf = `EQUAL,${x.toString()},${y.toString()},${z.toString()}->${r.toString()}`;

  return certificateConf;
}
