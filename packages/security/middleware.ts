import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface MiddlewareConfig {
  composition: boolean;
  hooks: {
    beforeTokenGeneration: () => void;
    afterTokenVerification: () => void;
  };
}

class Middleware {
  private config: MiddlewareConfig;

  constructor(config: MiddlewareConfig) {
    this.config = config;
  }

  async handleRequest(request: NextRequest) {
    const { pathname, searchParams } = request.nextUrl;
    const token = searchParams.get('token');

    if (this.config.hooks.beforeTokenGeneration) {
      this.config.hooks.beforeTokenGeneration();
    }

    // Token verification logic
    const validToken = 'your-valid-token'; // Replace with actual token retrieval logic
    if (token === validToken) {
      if (this.config.hooks.afterTokenVerification) {
        this.config.hooks.afterTokenVerification();
      }
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
}

export { Middleware, MiddlewareConfig };
