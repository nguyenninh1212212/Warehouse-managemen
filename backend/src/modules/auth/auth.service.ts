import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RoleEnum } from './roles/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async logout(userId: string) {
    const validatedUser = await this.usersService.findOne(userId);
    await this.usersService.updateRefreshToken(
      validatedUser.id.toString(),
      null,
    );
    return {
      message: 'User logged out successfully',
    };
  }
  async login(dto: LoginAuthDto) {
    const validatedUser = await this.usersService.validateUser(
      dto.email,
      dto.password,
    );
    const token = await this.signJwtToken(
      validatedUser._id.toString(),
      validatedUser.role,
    );
    await this.usersService.updateRefreshToken(
      validatedUser.id.toString(),
      token.refreshToken,
    );
    return {
      message: 'User logged in successfully',
      data: {
        token: token,
      },
    };
  }

  private async signJwtToken(userId: string, role: RoleEnum) {
    const acessToken = await this.jwtService.signAsync(
      {
        sub: userId,
        role: role,
      },
      {
        expiresIn: '24h',
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      { sub: userId },
      { expiresIn: '7d' },
    );
    return { accessToken: acessToken, refreshToken: refreshToken };
  }

  async refreshToken(refreshToken: string) {
    console.log(
      '🚀 ~ AuthService ~ refreshToken ~ refreshToken:',
      refreshToken,
    );
    const userId = this.jwtService.decode(refreshToken)['sub'];
    const user = await this.usersService.findOne(userId);
    const isRefreshTokenValid = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    if (!isRefreshTokenValid) {
      throw new NotFoundException('Could not find user.');
    }

    return {
      accessToken: await this.jwtService.signAsync(
        { sub: userId, role: user.role },
        { expiresIn: '24h' },
      ),
    };
  }
}
