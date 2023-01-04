import bcrypt from 'bcrypt';
/**
 * Implementation Bcrypt
 */
class bcryptPasswordSecurity implements PasswordSecurityInterface {

  async setPasswordSecurity(password: string): Promise<string> {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  }

  async comparePassword(securityPassword: string, inputPassword: string): Promise<boolean> {
    const comparePassword: boolean = await bcrypt.compare(inputPassword, securityPassword);
    return comparePassword;
  }
}

export {bcryptPasswordSecurity}