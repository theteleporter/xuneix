import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import { AuthConfig, Auth } from './auth';
import { defaultConfig, SecurityConfig } from './config';

const program = new Command();

program
  .name('security-cli')
  .description('CLI tool for the security package')
  .version('1.0.0');

program
  .command('generate-config')
  .description('Generate a default configuration file')
  .action(() => {
    const configPath = path.join(process.cwd(), 'security.config.js');
    fs.writeFileSync(configPath, `module.exports = ${JSON.stringify(defaultConfig, null, 2)};`);
    console.log(`Configuration file generated at ${configPath}`);
  });

program
  .command('setup-keys')
  .description('Set up initial keys for the security package')
  .action(() => {
    const keysPath = path.join(process.cwd(), 'keys.json');
    const keys = {
      secretKey: Auth.generateToken(),
      publicKey: Auth.generateToken(),
    };
    fs.writeFileSync(keysPath, JSON.stringify(keys, null, 2));
    console.log(`Keys generated and saved at ${keysPath}`);
  });

program
  .command('test-alerts')
  .description('Test email alerts')
  .option('-e, --email <email>', 'Email address to send the test alert to')
  .action(async (options) => {
    const config: AuthConfig = {
      tokenLength: 64,
      tokenType: 'hex',
      tokenExpiration: 3600,
      emailSubject: 'Test Alert',
      emailSender: 'no-reply@example.com',
      emailService: 'SMTP',
      emailServiceConfig: {
        host: 'smtp.example.com',
        port: 587,
        auth: {
          user: 'user@example.com',
          pass: 'password',
        },
      },
    };

    const auth = new Auth(config);
    const token = auth.generateToken();
    await auth.sendEmail(options.email, token);
    console.log(`Test alert sent to ${options.email}`);
  });

program.parse(process.argv);
