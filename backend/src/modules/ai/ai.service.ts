import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
    this.model = this.genAI.getGenerativeModel({
      model: 'gemini-3-flash-preview',
    });
  }

  async generateResponse(prompt: string): Promise<string> {
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('AI Error:', error);
      return 'Xin lỗi, AI đang bận xử lý dữ liệu. Vui lòng thử lại sau.';
    }
  }

  /**
   * MIS: Phân tích chiến lược
   */
  async generateStrategy(context: string): Promise<string> {
    const finalPrompt = `
Bạn là chuyên gia ERP và MIS.

Dữ liệu:
${context}

Yêu cầu:
1. Nhận xét tình hình kinh doanh
2. Cảnh báo rủi ro (kho, doanh thu)
3. Đề xuất 3 hành động cụ thể

Trả lời ngắn gọn, tiếng Việt.
    `;
    return this.generateResponse(finalPrompt);
  }

  /**
   * 🔥 NEW: Phân tích tổng thể hệ thống
   */
  async analyzeBusiness(data: {
    orders: any[];
    products: any[];
  }): Promise<string> {
    const prompt = `
Dữ liệu hệ thống:
Orders: ${JSON.stringify(data.orders)}
Products: ${JSON.stringify(data.products)}

Phân tích:
- Top sản phẩm bán chạy
- Xu hướng doanh thu
- Vấn đề tồn kho

Trả lời ngắn gọn.
    `;

    return this.generateResponse(prompt);
  }

  /**
   * 🔥 NEW: Gợi ý nhập hàng
   */
  async suggestRestock(data: { product: any; orders: any[] }): Promise<string> {
    const prompt = `
Product:
${JSON.stringify(data.product)}

Lịch sử đơn hàng:
${JSON.stringify(data.orders)}

Câu hỏi:
- Có nên nhập thêm không?
- Nếu có, số lượng bao nhiêu?

Trả lời rõ ràng, có lý do.
    `;

    return this.generateResponse(prompt);
  }

  /**
   * 🔥 NEW: Tạo báo cáo từ dashboard
   */
  async generateReportFromData(data: any): Promise<string> {
    const prompt = `
Dữ liệu dashboard:
${JSON.stringify(data)}

Hãy viết báo cáo kinh doanh gồm:
- Tổng quan
- Điểm tốt
- Điểm cần cải thiện

Ngắn gọn, dễ hiểu.
    `;

    return this.generateResponse(prompt);
  }

  // async potentialCustomers (data:any):

  /**
   * 🔥 OPTIONAL: Parse quyết định từ AI (automation)
   */
  parseRestockDecision(aiText: string): {
    shouldRestock: boolean;
    suggestedQuantity: number;
  } {
    const shouldRestock = aiText.toLowerCase().includes('nên nhập');

    const match = aiText.match(/\d+/);
    const quantity = match ? parseInt(match[0], 10) : 0;

    return {
      shouldRestock,
      suggestedQuantity: quantity,
    };
  }
}
