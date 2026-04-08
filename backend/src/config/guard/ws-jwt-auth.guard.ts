import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class WsJwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const client = context.switchToWs().getClient();
    const token = client.handshake.auth?.token;

    // Tạo request ảo để Passport đọc token
    return {
      headers: {
        authorization: token,
      },
    };
  }

  // --- THÊM ĐOẠN NÀY VÀO ---
  handleRequest(err, user, info, context: ExecutionContext) {
    if (err || !user) {
      return null;
    }
    const client = context.switchToWs().getClient();
    client.user = user;
    return user;
  }
}
