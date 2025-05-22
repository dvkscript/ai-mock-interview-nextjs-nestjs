import { QuestionType } from "../shared/enum/question-type";
import { GenerateTextContentDto } from "../shared/http/dto/generateTextContent.dto";
import { CreateJobRequestDto } from "./dto/create-job.request.dto";
import { GenerateFeedbackInputDto } from "./dto/input/generate-feedback.input.dto";

export const generateQuestionDefaultPrompt: GenerateTextContentDto[] = [
  {
    role: "user",
    parts: [
      {
        text: `
            Bạn là một chuyên gia tuyển dụng, có kinh nghiệm tạo bộ câu hỏi (có thể có những câu xã giao không phải câu hỏi) phỏng vấn chất lượng cao.

            Chỉ khi tôi gửi một JSON **đầy đủ đủ các trường sau**:
            {
              "yearsOfExperience": number,
              "position": "string",
              "description": "string",
              "username": "string"
            }
            Thì bạn mới bắt đầu tạo ra một mảng câu hỏi phỏng vấn đúng theo yêu cầu bên dưới. Nếu tôi chưa gửi JSON hoặc JSON thiếu trường, thì KHÔNG phản hồi gì cả.

            QUY TẮC TẠO CÂU HỎI:

            ---

            1. Nhóm câu hỏi (type):
            - "${QuestionType.TECHNICAL}": Câu hỏi kỹ thuật
            - "${QuestionType.SITUATION}": Tình huống thực tế
            - "${QuestionType.MINDSET}": Tư duy, teamwork
            - "${QuestionType.CULTURAL}": Phù hợp văn hóa, định hướng
            - "${QuestionType.CONVERSATIONAL}": Câu hỏi Kỹ năng giao tiếp

              **Quy tắc xác định "required":**
              - Nếu câu là **xã giao mở đầu hoặc kết thúc**, không phải câu hỏi → \`"required": false\` → luôn kết thúc bằng dấu \`"."\`
              - Nếu câu là **câu hỏi chính cần ứng viên trả lời**, thì luôn → \`"required": true\` → kết thúc bằng dấu \`"?"\`

            ---

            2. Quy tắc "required"
              Nếu là câu hỏi → required: true → kết thúc bằng "?"
              Nếu là câu nói xã giao, không cần trả lời → required: false → kết thúc bằng "."
              ❌ Không được có "required": false mà kết thúc bằng "?"
              ❌ Tuyệt đối không tạo các câu vô nghĩa hoặc không phù hợp ngữ cảnh tuyển dụng, như:
              "Bạn có khỏe không?", "Bạn ngủ ngon không?", "Bạn ăn gì chưa?", v.v.

            3. Số lượng câu hỏi và cách bố trí:
            - **Luôn bắt đầu bằng ít nhất 1–3 câu "${QuestionType.CONVERSATIONAL}"** để tạo bầu không khí tự nhiên.
              - VD:"Chào bạn, rất vui được gặp bạn qua buổi phỏng vấn hôm nay.", "Cảm ơn bạn đã tham gia buổi phỏng vấn hôm nay.", "Hy vọng bạn đang có một ngày tốt lành.",...
            - Với các nhóm: \`${QuestionType.TECHNICAL}\`, \`${QuestionType.SITUATION}\`, \`${QuestionType.MINDSET}\`, \`${QuestionType.CULTURAL}\`:
              - Số câu hỏi mỗi nhóm = \`2 + số năm kinh nghiệm\`
              - Ví dụ:
                - 0 năm kinh nghiệm → 2 câu hỏi mỗi nhóm → tổng ít nhất 9+ câu hỏi
                - 1 năm kinh nghiệm → 3 câu hỏi mỗi nhóm → tổng ít nhất 12+ câu hỏi
                - ...
            - Nhóm \`${QuestionType.CONVERSATIONAL}\` có thể có thêm 1–2 câu để kết thúc buổi phỏng vấn.
            - Tổng số câu có thể thay đổi linh hoạt, miễn đảm bảo đủ số lượng tối thiểu mỗi nhóm.

            ---

            4. Format mỗi câu hỏi:
            {
              "question": "string",
              "type": "${QuestionType.TECHNICAL} | ${QuestionType.SITUATION} | ${QuestionType.MINDSET} | ${QuestionType.CULTURAL} | ${QuestionType.CONVERSATIONAL}",
              "required": true | false,
              "index": number,
              "note": "optional"
            }

            ---

            5. Trình tự logic:
            - Tạo câu hỏi sao so người dùng cảm thấy liền mạch, không cảm thấy bị ngắt quãng kết hợp với index từ 1 đến hết
            - **Tuyệt đối không tạo các câu không phù hợp ngữ cảnh tuyển dụng như "Bạn có khỏe không?", "Bạn ngủ ngon không?", v.v.**

            ---

            6. **Chỉ xuất ra JSON array các câu hỏi**, không có mô tả hay tiêu đề nào khác.
        `
      }
    ]
  },
  {
    role: "model",
    parts: [
      {
        text: `
          \`\`\`json
            {
              \"yearsOfExperience\": 5,
              \"position\": \"Backend Engineer\",
              \"description\": \"Develop and maintain backend services using Python and Django. Must have experience with REST APIs, databases, and cloud deployment.\",
              \"username\": \"user123\"
            }
            \`\`\`
        `
      }
    ]
  }
]
export const generateQuestionPrompt = (
  { model, ...body }: CreateJobRequestDto
) => {
  return JSON.stringify(body);
}

export type QuestionDataPrompt = ({
  question: string;
  type: QuestionType;
  required: boolean;
  index: number;
  note?: string;
}[]);

export const generateFeedbackPrompt = ({ model, questions, ...body }: GenerateFeedbackInputDto) => {
  return `
  Tôi muốn bạn đóng vai là một **chuyên gia tuyển dụng**, có kinh nghiệm xây dựng bộ câu hỏi phỏng vấn chất lượng cao và đánh giá ứng viên theo tiêu chí rõ ràng.

  Ở trên là cuộc đàm thoại của tôi và bạn về cuộc phỏng vấn với các thông tin như sau:
  - Thông tin về cuộc trò chuyện ở trên:
  -- Câu hỏi phỏng vấn hỏi xoay quanh về vị trí và mô tả công việc dựa trên số năm kinh nghiệm:
  ***Vị trí công việc***: ${body.position}
  ***Mô tả công việc***: ${body.description}
  ***Số năm kinh nghiệm***: ${body.yearsOfExperience} 
  -- Người dùng sẽ trả lời các câu hỏi đề ra với kinh nghiệm tối thiểu là ${body.yearsOfExperience} năm. (nếu có kinh nghiệm nhiều hơn thì sẽ là điểm cộng)

  - Định dạng câu hỏi và câu trả lời ở trên:
  -- Câu hỏi của bạn ở trên có dạng: "[(loại câu hỏi/tiêu trí)-(có bắt buộc trả lời không)]: câu hỏi"
  --- Loại câu hỏi/tiêu trí gồm: 
  ---- "${QuestionType.TECHNICAL}": Câu hỏi chuyên môn / kỹ thuật
  ---- "${QuestionType.SITUATION}": Câu hỏi xử lý tình huống hoặc thực tế công việc
  ---- "${QuestionType.MINDSET}": Câu hỏi về tư duy, cách tiếp cận vấn đề, làm việc nhóm
  ---- "${QuestionType.CULTURAL}": Câu hỏi về định hướng phát triển cá nhân hoặc sự phù hợp với văn hóa công ty
  ---- "${QuestionType.CONVERSATIONAL}": Câu nói, câu hỏi xã giao.
  --- Có bắt buộc trả lời không: 
  ---- true: Bắt buộc có câu trả lời.
  ---- false: Không bắt buộc có câu trả lời.
  -- Câu trả lời của tôi ở trên có dạng: "câu trả lời"
  
    Yêu cầu bắt buộc:
    - Mỗi nhóm ${QuestionType.TECHNICAL}, ${QuestionType.SITUATION}, ${QuestionType.MINDSET}, ${QuestionType.CULTURAL}, ${QuestionType.CONVERSATIONAL} nên có ít nhất 1 câu hỏi để đánh giá
    - Không được lặp lại nội dung câu hỏi trong phần đánh giá (summary).
    - Nếu (câu trả lời) không liên quan đến công việc (Vị trí công việc), phải cho điểm 0.
    - Không trừ điểm nếu câu hỏi là loại "không bắt buộc có câu trả lời". 

    QUY TẮC TẠO ĐÁNH GIÁ:

    1. Format đánh giá:
    {
      "strengths": ["..."],
      "weaknesses": ["..."],
      "evaluationByCriteria": [
          "type": "${QuestionType.TECHNICAL}" | "${QuestionType.SITUATION}" | "${QuestionType.MINDSET}" | "${QuestionType.CULTURAL}" | "${QuestionType.CONVERSATIONAL}"
          "score": 0,
          "summary": "...",
          "improvementSuggestions": ["..."]
        ]
      },
      "overallComment": "..."
    }
    2. Giải thích các trường trong JSON:
    - "strengths": Danh sách các điểm mạnh nổi bật của ứng viên, dựa trên câu trả lời phỏng vấn. Viết ngắn gọn, rõ ràng, tối đa 5 mục.
    - "weaknesses": Danh sách các điểm yếu hoặc kỹ năng còn hạn chế của ứng viên. Viết tích cực, mang tính xây dựng. Tránh từ ngữ tiêu cực như "kém", "tệ", v.v.
    - "evaluationByCriteria": Danh sách đánh giá chi tiết theo từng nhóm tiêu chí:
      -- "type": là nhóm tiêu chí gồm:
        --- "${QuestionType.TECHNICAL}": Kỹ năng chuyên môn / kỹ thuật.
        --- "${QuestionType.SITUATION}": Khả năng xử lý tình huống và kinh nghiệm thực tế.
        --- "${QuestionType.MINDSET}": Tư duy logic, cách tiếp cận vấn đề, làm việc nhóm.
        --- "${QuestionType.CULTURAL}": Sự phù hợp với văn hóa công ty và định hướng phát triển.
        --- "${QuestionType.CONVERSATIONAL}": Kỹ năng giao tiếp xã giao.
      -- "score":
      --- Điểm số các tiêu trí, điểm số từ 0 đến 10 (Người dùng có trả lời cố ý nhập lung tung, không liên quan tới ví trí công việc sẽ cho 0 điểm).
      --- Nếu câu hỏi là loại không bắt buộc trả lời thì có thể cho phép người dùng không trả lời nhưng nếu nhập lung tung sẽ trừ điểm họ.
      -- "summary": Nhận xét ngắn gọn, nêu rõ mức độ thể hiện của ứng viên.
      -- "improvementSuggestions": Các gợi ý cụ thể để cải thiện năng lực ở tiêu chí đó.
    - "overallComment": Nhận xét tổng quan về ứng viên, tóm tắt ấn tượng chung sau buổi phỏng vấn. Trình bày lịch sự, tích cực, định hướng rõ ràng (có thể có cách ký tự xuống dòng và các icon trang trí cho đẹp).
    3. Chú ý khi đánh giá câu trả lời:
    - Người dùng hoàn toàn có khả năng nhập câu trả lời là bất cứ thứ gì nên hãy đánh giá họ 0 điểm (score) nếu câu trả lời không liên quan tới công việc.
    - Đánh giá kỹ năng giao tiếp xã giao thông qua các câu trả lời thuộc nhiều loại câu hỏi mà không chỉ riêng loại câu hỏi ${QuestionType.CONVERSATIONAL}
    4. Ví dụ các cụm từ nên dùng trong đánh giá:
    - Điểm mạnh: "Hiểu rõ...", "Thể hiện tư duy...", "Có kinh nghiệm xử lý..."
    - Gợi ý cải thiện: "Nên chủ động học thêm về...", "Có thể rèn luyện thêm kỹ năng...", "Khuyến khích thử sức với..."

    Hãy bắt đầu tạo đánh giá với các câu hỏi và câu trả lời ở trên và áp dụng luôn yêu cầu của tôi.
  `
}


export class FeedBackDataPrompt {
  strengths: string[];
  weaknesses: string[];
  evaluationByCriteria: ({
    type: QuestionType;
    score: number;
    summary: string;
    improvementSuggestions: string[];
  })[];
  overallComment: string;
} 