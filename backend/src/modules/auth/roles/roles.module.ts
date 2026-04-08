// src/auth/roles/roles.module.ts
import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';

@Module({
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
