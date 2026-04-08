import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/config/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { RoleEnum } from '../auth/roles/role.enum';
import { Roles } from '../auth/roles/roles.decorator';

@ApiTags('Analytics & MIS (Báo cáo Quản trị)')
@Controller('analytics')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RoleEnum.ADMIN)
@ApiBearerAuth()
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('revenue')
  @ApiOperation({ summary: 'Báo cáo doanh thu theo tháng' })
  getRevenue() {
    return this.analyticsService.getMonthlyRevenue();
  }

  @Get('top-products')
  @ApiOperation({ summary: 'Danh sách 5 sản phẩm bán chạy nhất' })
  getTopProducts() {
    return this.analyticsService.getTopProducts();
  }

  @Get('ai-strategy')
  @ApiOperation({
    summary: 'AI phân tích chiến lược dựa trên dữ liệu thật (MIS + AI)',
  })
  getAiStrategy() {
    return this.analyticsService.getAiBusinessStrategy();
  }
  @Get('auto-restock/:productId')
  @ApiOperation({
    summary: 'AI nhập số lượng tồn kho',
  })
  getAiAuto(@Param('productId') productId: string) {
    return this.analyticsService.autoRestock(productId);
  }
  @Get('ai-dashboard')
  async dashboardAI() {
    const result = await this.analyticsService.dashboardAI();

    return {
      message: 'Phân tích AI dashboard',
      aiAnalysis: result,
    };
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Thống kê doanh thu theo ngày (MIS Feature)' })
  getStats() {
    return this.analyticsService.getStats();
  }
  @Get('stats/today')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Thống kê doanh thu theo ngày (MIS Feature)' })
  getStatToday() {
    return this.analyticsService.getStatToday();
  }
  @Get('stats/days')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Thống kê doanh thu theo ngày (MIS Feature)' })
  getStatdays() {
    return this.analyticsService.getStatdays();
  }
}
