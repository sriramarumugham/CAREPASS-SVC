const cryptoModule = require('crypto');

// Function to encode and sign data
function encodeAndSign(data: string, sharedKey: string) {
  const hmac = cryptoModule.createHmac('sha256', sharedKey);
  const signature = hmac.update(data).digest('base64');
  const encodedData = Buffer.from(data).toString('base64');
  return `${encodedData}.${signature}`;
}

// Function to verify the encoded data
function verifyEncodedData(encodedData: string, sharedKey: string) {
  const [encoded, signature] = encodedData.split('.');
  const calculatedSignature = cryptoModule
    .createHmac('sha256', sharedKey)
    .update(encoded)
    .digest('base64');
  if (
    cryptoModule.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(calculatedSignature),
    )
  ) {
    return Buffer.from(encoded, 'base64').toString('utf-8');
  } else {
    // Handle verification failure
    console.error('Verification failed.');
    return null;
  }
}

export { encodeAndSign, verifyEncodedData };
