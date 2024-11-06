interface SecurityConfig {
  authTriggers: {
    failedLogin: boolean;
    unauthorizedRouteAccess: boolean;
  };
  tokenOptions: {
    length: number;
    type: 'hex' | 'base64';
    expiration: number;
  };
  emailSettings: {
    subject: string;
    sender: string;
    service: 'SMTP' | 'SendGrid';
    serviceConfig: any;
  };
  verification: {
    endpoint: string;
    onSuccess: () => void;
    onFailure: () => void;
  };
  securityEnhancements: {
    logIP: boolean;
    throttleAttempts: boolean;
    alertLevels: 'info' | 'warning' | 'critical';
    adminRecipients: string[];
  };
  notifications: {
    channels: ('email' | 'sms' | 'slack' | 'telegram')[];
    templates: {
      info: string;
      warning: string;
      critical: string;
    };
  };
  accessControl: {
    roles: string[];
    auditLog: boolean;
  };
  tokenSecurity: {
    autoExpiration: boolean;
    customExpiration: number;
    singleUse: boolean;
    encryption: boolean;
  };
  developerTools: {
    cli: boolean;
    debugMode: boolean;
  };
  middlewarePipeline: {
    composition: boolean;
    hooks: {
      beforeTokenGeneration: () => void;
      afterTokenVerification: () => void;
    };
  };
}

const defaultConfig: SecurityConfig = {
  authTriggers: {
    failedLogin: true,
    unauthorizedRouteAccess: true,
  },
  tokenOptions: {
    length: 64,
    type: 'hex',
    expiration: 3600,
  },
  emailSettings: {
    subject: 'Security Alert',
    sender: 'no-reply@example.com',
    service: 'SMTP',
    serviceConfig: {},
  },
  verification: {
    endpoint: '/verify-token',
    onSuccess: () => {
      console.log('Token verified successfully');
    },
    onFailure: () => {
      console.log('Token verification failed');
    },
  },
  securityEnhancements: {
    logIP: true,
    throttleAttempts: true,
    alertLevels: 'critical',
    adminRecipients: ['admin@example.com'],
  },
  notifications: {
    channels: ['email'],
    templates: {
      info: 'Info alert template',
      warning: 'Warning alert template',
      critical: 'Critical alert template',
    },
  },
  accessControl: {
    roles: ['admin', 'user'],
    auditLog: true,
  },
  tokenSecurity: {
    autoExpiration: true,
    customExpiration: 7200,
    singleUse: true,
    encryption: true,
  },
  developerTools: {
    cli: true,
    debugMode: true,
  },
  middlewarePipeline: {
    composition: true,
    hooks: {
      beforeTokenGeneration: () => {
        console.log('Before token generation');
      },
      afterTokenVerification: () => {
        console.log('After token verification');
      },
    },
  },
};

export { SecurityConfig, defaultConfig };
