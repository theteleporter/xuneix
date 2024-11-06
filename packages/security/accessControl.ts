interface AccessControlConfig {
  roles: string[];
  auditLog: boolean;
}

class AccessControl {
  private config: AccessControlConfig;
  private auditLogs: string[];

  constructor(config: AccessControlConfig) {
    this.config = config;
    this.auditLogs = [];
  }

  hasAccess(role: string, resource: string): boolean {
    if (this.config.roles.includes(role)) {
      this.logAccessAttempt(role, resource, true);
      return true;
    } else {
      this.logAccessAttempt(role, resource, false);
      return false;
    }
  }

  private logAccessAttempt(role: string, resource: string, success: boolean): void {
    if (this.config.auditLog) {
      const logEntry = `${new Date().toISOString()} - Role: ${role}, Resource: ${resource}, Success: ${success}`;
      this.auditLogs.push(logEntry);
      console.log(logEntry);
    }
  }

  getAuditLogs(): string[] {
    return this.auditLogs;
  }
}

export { AccessControl, AccessControlConfig };
