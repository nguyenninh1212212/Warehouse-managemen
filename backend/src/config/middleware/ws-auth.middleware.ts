import { JwtUtil } from '../util/jwt.util';

export function wsAuthMiddleware(socket, next) {
  try {
    const token = socket.handshake.auth?.token;

    if (!token) {
      console.log('❌ Không tìm thấy Token trong auth');
      return next(new Error('Missing Token'));
    }

    JwtUtil.isValidAuthHeader(token);

    return next();
  } catch (error) {
    return next(new Error('Unauthorized socket'));
  }
}
