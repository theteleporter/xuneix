import { NextResponse } from 'next/server';

interface VerificationConfig {
  onSuccess: () => void;
  onFailure: () => void;
}

class Verification {
  private config: VerificationConfig;

  constructor(config: VerificationConfig) {
    this.config = config;
  }

  verifyToken(token: string, validToken: string): boolean {
    if (token === validToken) {
      this.config.onSuccess();
      return true;
    } else {
      this.config.onFailure();
      return false;
    }
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const validToken = 'your-valid-token'; // Replace with actual token retrieval logic

  const verification = new Verification({
    onSuccess: () => {
      console.log('Token verified successfully');
    },
    onFailure: () => {
      console.log('Token verification failed');
    },
  });

  if (verification.verifyToken(token, validToken)) {
    return NextResponse.json({ message: 'Token verified' });
  } else {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
}

export { Verification, VerificationConfig };
