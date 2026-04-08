// src/auth/roles/roles.service.ts
import { Injectable, ForbiddenException } from '@nestjs/common';
import { RoleEnum } from './role.enum';

@Injectable()
export class RolesService {
  /**
   * Kiểm tra xem người dùng có quyền thực hiện hành động dựa trên danh sách Role yêu cầu
   * @param userRole Vai trò hiện tại của người dùng lấy từ JWT
   * @param requiredRoles Danh sách các vai trò được phép truy cập API
   */
  async validateRole(
    userRole: RoleEnum,
    requiredRoles: RoleEnum[],
  ): Promise<boolean> {
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }
    const hasPermission = requiredRoles.includes(userRole);
    if (!hasPermission) {
      throw new ForbiddenException(
        'Bạn không có quyền thực hiện hành động này',
      );
    }

    return true;
  }

  isAdmin(role: RoleEnum): boolean {
    return role === RoleEnum.ADMIN;
  }
}
