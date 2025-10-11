import forge from 'node-forge';

const today = Date.now();
const yesterday = new Date(today - (24 * 60 * 60 * 1000));
const tenYearsFromToday = new Date(today + (10 * 365 * 24 * 60 * 60 * 1000));

// Generate self-signed certificate
export async function generateCertificate() {
  const keyPair = forge.pki.rsa.generateKeyPair(4096, 65537);
  const privateKey = keyPair.privateKey;
  const publicKey = keyPair.publicKey;

  const cert = forge.pki.createCertificate();

  // Set the public and private key pair of the certificate
  cert.privateKey = privateKey;
  cert.publicKey = publicKey;

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
    privatePem: forge.pki.privateKeyToPem(privateKey),
    certificatePem: forge.pki.certificateToPem(cert),
  };
}
