import { sign, SignOptions } from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';

/**
 * generates JWT used for local testing
 */
export function generateToken() {
  // information to be encoded in the JWT
  const payload = {
    name: 'Andrés Reales',
    userId: 123,
    accessTypes: [
      'getTeams',
      'addTeams',
      'updateTeams',
      'deleteTeams'
    ]
  };
  // read private key value
  const privateKey = fs.readFileSync(path.join(__dirname, './../../../private.key'));

  const signInOptions: SignOptions = {
    // RS256 uses a public/private key pair. The API provides the private key
    // to generate the JWT. The client gets a public key to validate the
    // signature
    algorithm: 'RS256',
    expiresIn: '1h'
  };

  // generate JWT
  return sign(payload, privateKey, signInOptions);
};