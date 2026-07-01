import fs from 'fs';
import path from 'path';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { createClient } from '@supabase/supabase-js';

// Parse .env.local
const envContent = fs.readFileSync(path.resolve('.env.local'), 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)\s*$/);
  if (match) {
    const key = match[1].trim();
    let val = match[2].trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.substring(1, val.length - 1);
    }
    env[key] = val;
  }
});

const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: env.R2_SECRET_ACCESS_KEY || "",
  },
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const IMAGE_MAPPING = [
  { name: 'smart_city_hanoi', path: 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\59048f15-7e9f-4807-97b4-b5209fba5d18\\smart_city_hanoi_1782925339279.png' },
  { name: 'high_speed_train', path: 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\59048f15-7e9f-4807-97b4-b5209fba5d18\\high_speed_train_1782925351387.png' },
  { name: 'flood_prevention', path: 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\59048f15-7e9f-4807-97b4-b5209fba5d18\\flood_prevention_1782925362099.png' },
  { name: 'hanoi_traffic', path: 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\59048f15-7e9f-4807-97b4-b5209fba5d18\\hanoi_traffic_1782925371587.png' },
  { name: 'ai_agent_office', path: 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\59048f15-7e9f-4807-97b4-b5209fba5d18\\ai_agent_office_1782925386157.png' },
  { name: 'ar_glasses', path: 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\59048f15-7e9f-4807-97b4-b5209fba5d18\\ar_glasses_1782925397797.png' },
  { name: 'semiconductor_2nm', path: 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\59048f15-7e9f-4807-97b4-b5209fba5d18\\semiconductor_2nm_1782925410137.png' },
  { name: 'autonomous_ev', path: 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\59048f15-7e9f-4807-97b4-b5209fba5d18\\autonomous_ev_1782925421109.png' },
  { name: 'soccer_academy', path: 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\59048f15-7e9f-4807-97b4-b5209fba5d18\\soccer_academy_1782925432852.png' },
  { name: 'hanoi_marathon', path: 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\59048f15-7e9f-4807-97b4-b5209fba5d18\\hanoi_marathon_1782925442274.png' },
  { name: 'esports_stadium', path: 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\59048f15-7e9f-4807-97b4-b5209fba5d18\\esports_stadium_1782925452669.png' },
  { name: 'film_festival', path: 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\59048f15-7e9f-4807-97b4-b5209fba5d18\\film_festival_1782925463943.png' },
  { name: 'dan_bau_pop', path: 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\59048f15-7e9f-4807-97b4-b5209fba5d18\\dan_bau_pop_1782925473928.png' },
  { name: 'cooking_show', path: 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\59048f15-7e9f-4807-97b4-b5209fba5d18\\cooking_show_1782925484595.png' },
  { name: 'music_festival', path: 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\59048f15-7e9f-4807-97b4-b5209fba5d18\\music_festival_1782925493712.png' },
  { name: 'livestream_ecom', path: 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\59048f15-7e9f-4807-97b4-b5209fba5d18\\livestream_ecom_1782925508876.png' },
];

async function uploadToR2(filePath, fileName) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File does not exist: ${filePath}`);
  }
  const fileStream = fs.createReadStream(filePath);
  const key = `articles/${Date.now()}-${fileName}`;
  const uploadParams = {
    Bucket: env.R2_BUCKET_NAME,
    Key: key,
    Body: fileStream,
    ContentType: 'image/png',
  };
  await s3Client.send(new PutObjectCommand(uploadParams));
  return `${env.NEXT_PUBLIC_R2_PUBLIC_URL}/${key}`;
}

const articlesData = [
  // ----------------------------------------------------
  // THỜI SỰ (category_id: 1)
  // ----------------------------------------------------
  {
    title: "Đại đô thị thông minh phía Tây Hà Nội: Giải bài toán chuyển dịch dân cư và phát triển bền vững",
    summary: "Đại đô thị thông minh phía Tây Hà Nội đang trở thành hình mẫu tiêu biểu cho xu hướng phát triển đô thị bền vững, giúp giải quyết áp lực dân số cho vùng lõi thủ đô.",
    category_id: 1,
    featured: true,
    imageName: "smart_city_hanoi",
    contentBlocks: [
      { type: "bold-paragraph", text: "Hà Nội đang chứng kiến làn sóng chuyển dịch dân cư mạnh mẽ từ các quận trung tâm cũ sang các đô thị vệ tinh hiện đại ở phía Tây, nơi không gian sống xanh và hạ tầng số được ưu tiên hàng đầu." },
      { type: "paragraph", text: "Trong bối cảnh vùng lõi thủ đô ngày càng trở nên chật chội và ô nhiễm, sự xuất hiện của các đại đô thị thông minh tại phía Tây Hà Nội được ví như một 'van xả áp' cực kỳ hiệu quả. Những dự án này không chỉ đơn thuần cung cấp nhà ở mà còn xây dựng một hệ sinh thái sống toàn diện tích hợp công nghệ Internet vạn vật (IoT) và trí tuệ nhân tạo (AI) trong quản lý vận hành." },
      { type: "image", src: "", caption: "Đại đô thị thông minh phía Tây Hà Nội với thiết kế hiện đại kết hợp nhiều mảng xanh tự nhiên" },
      { type: "paragraph", text: "Hạ tầng giao thông kết nối đồng bộ là một trong những động lực chính thúc đẩy sự phát triển của khu vực này. Các tuyến đường huyết mạch như Đại lộ Thăng Long, đường vành đai 3.5, đường vành đai 4 cùng hệ thống đường sắt đô thị (Metro) đang dần hoàn thiện, rút ngắn đáng kể thời gian di chuyển từ phía Tây vào trung tâm thành phố." },
      { type: "paragraph", text: "Không chỉ dừng lại ở giao thông, các giải pháp thông minh như hệ thống camera giám sát an ninh nhận diện khuôn mặt, bãi đỗ xe thông minh tự động tìm kiếm vị trí trống, hệ thống đo đạc chất lượng không khí thời gian thực cũng đã được đưa vào ứng dụng. Nhờ vậy, cư dân có thể tận hưởng cuộc sống an toàn và tiện nghi tối đa." },
      { type: "ad" },
      { type: "paragraph", text: "Đặc biệt, yếu tố phát triển bền vững luôn được đặt lên hàng đầu. Các đại đô thị này dành tới hơn 70% diện tích cho cảnh quan cây xanh, hồ nước và các công trình công cộng. Việc áp dụng các giải pháp tiết kiệm năng lượng, sử dụng pin mặt trời cho hệ thống chiếu sáng công cộng và xây dựng mạng lưới thu gom, phân loại rác thải thông minh đang góp phần bảo vệ môi trường một cách thiết thực." },
      { type: "paragraph", text: "Theo đánh giá của các chuyên gia quy hoạch đô thị, mô hình này không chỉ giúp nâng cao chất lượng sống của người dân mà còn tạo ra động lực kinh tế mới, kéo theo sự dịch chuyển của các văn phòng doanh nghiệp lớn, trường đại học và cơ sở y tế về phía Tây. Đây chính là chìa khóa mở ra tương lai phát triển bền vững cho thủ đô Hà Nội trong thế kỷ mới." }
    ]
  },
  {
    title: "Dự án đường sắt tốc độ cao Bắc - Nam: Cú hích lịch sử thay đổi diện mạo hạ tầng Việt Nam",
    summary: "Dự án siêu đường sắt tốc độ cao Bắc - Nam đang bước vào giai đoạn chuẩn bị quan trọng, hứa hẹn tạo nên hành lang kinh tế động lực thúc đẩy tăng trưởng vượt bậc cho đất nước.",
    category_id: 1,
    featured: false,
    imageName: "high_speed_train",
    contentBlocks: [
      { type: "bold-paragraph", text: "Được đánh giá là dự án hạ tầng lớn nhất trong lịch sử nước nhà, đường sắt tốc độ cao Bắc - Nam sẽ kết nối hai đầu Nam - Bắc chỉ trong vòng vài giờ đồng hồ." },
      { type: "paragraph", text: "Tuyến đường sắt tốc độ cao có tổng chiều dài hơn 1.500 km nối từ Hà Nội đến TP.HCM với vận tốc thiết kế lên tới 350 km/h. Khi đi vào hoạt động, hành trình xuyên suốt Bắc - Nam sẽ được rút ngắn xuống dưới 6 tiếng, tạo ra sự cạnh tranh mạnh mẽ với giao thông đường bộ và hàng không, đồng thời mang lại trải nghiệm di chuyển an toàn, tiện lợi cho người dân." },
      { type: "image", src: "", caption: "Phác thảo đoàn tàu tốc độ cao lướt qua những vùng đồng quê trù phú của Việt Nam" },
      { type: "paragraph", text: "Lợi ích kinh tế mà dự án mang lại là cực kỳ to lớn. Tuyến đường sắt đi qua 20 tỉnh, thành phố lớn dọc theo chiều dài đất nước, kết nối các trung tâm kinh tế, khu công nghiệp và các cảng biển lớn. Việc vận chuyển hành khách và hàng hóa nhanh chóng sẽ giúp tối ưu hóa chi phí logistics, thúc đẩy giao thương nội địa và mở ra không gian phát triển đô thị mới xung quanh các ga đường sắt." },
      { type: "paragraph", text: "Hơn thế nữa, dự án còn đóng vai trò quan trọng trong việc thúc đẩy phát triển du lịch. Du khách có thể dễ dàng di chuyển giữa các danh lam thắng cảnh dọc miền Trung như Huế, Đà Nẵng, Nha Trang một cách nhanh chóng và thoải mái. Sự phát triển này hứa hẹn sẽ mang lại nguồn thu nhập lớn cho các địa phương có tuyến đường đi qua." },
      { type: "paragraph", text: "Tuy nhiên, để hiện thực hóa siêu dự án này, Việt Nam phải đối mặt với nhiều thách thức lớn về nguồn vốn, công nghệ và nhân lực chất lượng cao. Việc lựa chọn công nghệ phù hợp, đảm bảo an toàn tuyệt đối và tối ưu hóa chi phí vận hành đòi hỏi sự chuẩn bị kỹ lưỡng và sự hợp tác quốc tế sâu rộng. Dự án này được kỳ vọng sẽ trở thành biểu tượng mới cho sự trỗi dậy mạnh mẽ của Việt Nam trong kỷ nguyên mới." }
    ]
  },
  {
    title: "Nâng cao năng lực ứng phó thiên tai tại các tỉnh duyên hải miền Trung trước mùa mưa bão mới",
    summary: "Các tỉnh miền Trung đang tích cực triển khai các biện pháp ứng phó thiên tai, tăng cường đầu tư hệ thống kè biển và công nghệ dự báo thời tiết tiên tiến.",
    category_id: 1,
    featured: false,
    imageName: "flood_prevention",
    contentBlocks: [
      { type: "bold-paragraph", text: "Miền Trung Việt Nam luôn là khu vực chịu ảnh hưởng nặng nề bởi thiên tai, bão lũ. Việc chuẩn bị sẵn sàng và chủ động ứng phó từ sớm là chìa khóa để giảm thiểu thiệt hại về người và tài sản." },
      { type: "paragraph", text: "Trước diễn biến phức tạp của biến đổi khí hậu toàn cầu, mùa bão lũ hàng năm đang ngày càng trở nên khốc liệt và khó lường hơn. Nhận thức rõ điều này, chính quyền các tỉnh duyên hải miền Trung đã chủ động lên kế hoạch phòng chống thiên tai từ rất sớm. Hàng loạt công trình kè chắn sóng ven biển, đê ngăn mặn và hồ chứa nước điều tiết lũ đã được nâng cấp, sửa chữa kiên cố." },
      { type: "image", src: "", caption: "Hệ thống đê biển kiên cố ngăn chặn triều cường tại một tỉnh duyên hải miền Trung" },
      { type: "paragraph", text: "Điểm mới trong công tác ứng phó năm nay là việc đẩy mạnh ứng dụng công nghệ số. Hệ thống bản đồ số cảnh báo ngập lụt theo thời gian thực đã được triển khai, giúp người dân dễ dàng cập nhật thông tin và chủ động di dời khỏi các vùng nguy hiểm. Bên cạnh đó, hệ thống trạm đo mưa tự động và các phần mềm dự báo khí tượng thủy văn tiên tiến đã giúp nâng cao độ chính xác của các bản tin cảnh báo lũ." },
      { type: "paragraph", text: "Phương châm '4 tại chỗ' (chỉ huy tại chỗ, lực lượng tại chỗ, phương tiện tại chỗ, hậu cần tại chỗ) tiếp tục được quán triệt sâu sắc tới từng thôn, bản. Các diễn tập cứu hộ cứu nạn trên sông, trên biển và sơ tán dân cư vùng sạt lở đất được tổ chức thường xuyên, giúp nâng cao kỹ năng xử lý tình huống cho lực lượng xung kích và người dân địa phương." },
      { type: "paragraph", text: "Sự chuẩn bị kỹ lưỡng và chủ động ứng phó từ sớm của các địa phương được kỳ vọng sẽ giúp miền Trung vượt qua mùa mưa bão một cách an toàn nhất, bảo vệ vững chắc cuộc sống bình yên của người dân ven biển." }
    ]
  },
  {
    title: "Hà Nội và những giải pháp quyết liệt nhằm giải quyết triệt để vấn đề ùn tắc giao thông đô thị",
    summary: "Thủ đô Hà Nội đang tăng cường đầu tư hạ tầng giao thông thông minh và khuyến khích người dân sử dụng phương tiện công cộng thân thiện với môi trường.",
    category_id: 1,
    featured: false,
    imageName: "hanoi_traffic",
    contentBlocks: [
      { type: "bold-paragraph", text: "Ùn tắc giao thông vẫn là bài toán hóc búa của thủ đô Hà Nội. Việc áp dụng các giải pháp đồng bộ từ nâng cấp hạ tầng đến chuyển dịch thói quen người dân đang mang lại những tín hiệu tích cực." },
      { type: "paragraph", text: "Với mật độ dân cư và số lượng phương tiện cá nhân tăng nhanh chóng, các tuyến đường chính của Hà Nội thường xuyên rơi vào tình trạng quá tải trong các khung giờ cao điểm. Để giải quyết vấn đề này, thành phố đã triển khai đồng bộ nhiều giải pháp cấp bách bao gồm xây dựng các cầu vượt nút giao trọng điểm, mở rộng đường vành đai và tối ưu hóa hệ thống đèn tín hiệu giao thông thông minh." },
      { type: "image", src: "", caption: "Nút giao thông cầu vượt hiện đại giúp giảm tải áp lực giao thông vào giờ cao điểm tại Hà Nội" },
      { type: "paragraph", text: "Một trong những giải pháp then chốt dài hạn là phát triển mạng lưới vận tải hành khách công cộng khối lượng lớn. Việc đưa vào vận hành các tuyến đường sắt đô thị (như Cát Linh - Hà Đông, Nhổn - Ga Hà Nội) và mở rộng các tuyến xe buýt điện thân thiện với môi trường đang dần thay đổi thói quen di chuyển của người dân. Số lượng người chuyển từ phương tiện cá nhân sang phương tiện công cộng tăng đều qua các năm." },
      { type: "paragraph", text: "Bên cạnh đó, việc áp dụng công nghệ số vào điều hành giao thông cũng đóng vai trò quan trọng. Trung tâm Giám sát và Điều hành Giao thông thông minh của thành phố sử dụng AI để phân tích lưu lượng xe, tự động điều chỉnh chu kỳ đèn tín hiệu tại các nút giao và cung cấp thông tin ùn tắc kịp thời cho tài xế thông qua các ứng dụng di động." },
      { type: "paragraph", text: "Dù hành trình giải quyết ùn tắc giao thông còn nhiều khó khăn và đòi hỏi lộ trình dài hạn, những nỗ lực và giải pháp quyết liệt của Hà Nội đang dần mang lại diện mạo mới thông thoáng và văn minh hơn cho giao thông thủ đô." }
    ]
  },

  // ----------------------------------------------------
  // CÔNG NGHỆ (category_id: 2)
  // ----------------------------------------------------
  {
    title: "Trí tuệ nhân tạo thế hệ mới (AI Agent) thay đổi cách vận hành của các doanh nghiệp Việt Nam",
    summary: "Các tác nhân AI tự chủ (AI Agent) đang dần thay thế các hệ thống tự động hóa cũ, giúp các doanh nghiệp tối ưu hóa chi phí vận hành và tăng năng suất lao động vượt bậc.",
    category_id: 2,
    featured: true,
    imageName: "ai_agent_office",
    contentBlocks: [
      { type: "bold-paragraph", text: "Năm 2026 đánh dấu bước tiến vượt bậc của trí tuệ nhân tạo từ các chatbot hỗ trợ thông thường sang các tác nhân AI tự chủ (AI Agent) có khả năng tự suy luận và thực hiện các nhiệm vụ phức tạp." },
      { type: "paragraph", text: "Không còn dừng lại ở việc trả lời các câu hỏi theo kịch bản sẵn có, các AI Agent ngày nay có khả năng hiểu ngữ cảnh sâu sắc, tự lên kế hoạch thực hiện công việc và phối hợp với con người hoặc các AI khác để hoàn thành nhiệm vụ. Trong môi trường doanh nghiệp, AI Agent được ứng dụng rộng rãi từ chăm sóc khách hàng, phân tích dữ liệu tài chính đến tự động hóa quy trình tuyển dụng và lập lịch làm việc." },
      { type: "image", src: "", caption: "Không gian làm việc số tương lai nơi con người và AI Agent phối hợp nhịp nhàng" },
      { type: "paragraph", text: "Khác với các hệ thống tự động hóa truyền thống dựa trên các quy tắc cứng nhắc, AI Agent sở hữu khả năng tự học hỏi từ dữ liệu thực tế và liên tục tối ưu hóa hiệu quả làm việc. Một AI Agent quản lý kho hàng có thể tự dự báo nhu cầu thị trường, phân tích dữ liệu nhà cung cấp và tự động gửi đơn đặt hàng tối ưu nhất mà không cần sự can thiệp liên tục của con người." },
      { type: "paragraph", text: "Sự dịch chuyển này mang lại lợi ích to lớn về mặt chi phí và hiệu suất cho doanh nghiệp. Tuy nhiên, nó cũng dấy lên những lo ngại về tương lai của thị trường lao động và tính bảo mật của dữ liệu doanh nghiệp. Các chuyên gia khuyến cáo doanh nghiệp cần xây dựng lộ trình tích hợp AI an toàn, tập trung vào việc đào tạo lại kỹ năng cho nhân viên để làm việc cộng tác hiệu quả với AI." },
      { type: "ad" },
      { type: "paragraph", text: "Sự trỗi dậy của AI Agent không chỉ là một xu hướng công nghệ nhất thời mà đang thực sự tái định hình cách thức các doanh nghiệp vận hành và cạnh tranh trên toàn cầu. Những đơn vị sớm làm chủ công nghệ này sẽ nắm giữ lợi thế cạnh tranh vô song trong kỷ nguyên số." }
    ]
  },
  {
    title: "Sự trỗi dậy của các thiết bị thực tế ảo tăng cường (AR) trong đời sống và làm việc hàng ngày",
    summary: "Kính thực tế ảo tăng cường (AR) đang dần trở thành thiết bị cá nhân tiếp theo thay thế điện thoại thông minh, mang lại trải nghiệm tương tác số trực quan chưa từng có.",
    category_id: 2,
    featured: false,
    imageName: "ar_glasses",
    contentBlocks: [
      { type: "bold-paragraph", text: "Công nghệ AR đang bước ra khỏi phòng thí nghiệm để đi vào cuộc sống hàng ngày thông qua các thiết bị kính thông minh nhỏ gọn, thời trang." },
      { type: "paragraph", text: "Nhiều năm qua, người dùng đã quen thuộc với việc tương tác với thế giới ảo thông qua màn hình phẳng của điện thoại hoặc máy tính. Sự xuất hiện của các dòng kính AR thế hệ mới đã xóa bỏ ranh giới đó, hiển thị trực tiếp các thông tin số, biểu đồ hay nhân vật 3D lồng ghép vào không gian thực tế xung quanh người dùng. Bạn có thể vừa nấu ăn vừa xem công thức bay lơ lửng trước mắt, hoặc thiết kế nội thất bằng cách đặt các đồ vật ảo vào phòng khách." },
      { type: "image", src: "", caption: "Trải nghiệm làm việc trực quan với các màn hình ảo hiển thị thông qua kính AR thông minh" },
      { type: "paragraph", text: "Trong công việc, AR đang chứng minh giá trị to lớn đặc biệt trong các ngành thiết kế, y tế và bảo trì kỹ thuật. Các kỹ sư có thể xem bản vẽ kỹ thuật chi tiết chồng khít lên máy móc thực tế để tiến hành sửa chữa nhanh chóng, hay các bác sĩ phẫu thuật có thể theo dõi các chỉ số sinh tồn của bệnh nhân hiển thị trực quan ngay trong tầm mắt mà không cần nhìn sang các màn hình giám sát." },
      { type: "paragraph", text: "Mặc dù vậy, để kính AR trở thành thiết bị phổ biến như điện thoại thông minh, các nhà sản xuất vẫn cần giải quyết các rào cản kỹ thuật lớn về thời lượng pin, độ phân giải hiển thị và cảm giác thoải mái khi đeo trong thời gian dài. Sự phát triển mạnh mẽ của công nghệ quang học và vi xử lý hứa hẹn sẽ sớm đưa AR trở thành thiết bị công nghệ thiết yếu của mọi người." }
    ]
  },
  {
    title: "Thế hệ vi xử lý 2nm đầu tiên sắp ra mắt: Cuộc đua công nghệ bán dẫn toàn cầu bước vào giai đoạn khốc liệt",
    summary: "Các nhà sản xuất chip hàng đầu thế giới đang chạy đua thương mại hóa chip 2nm, hứa hẹn mang lại hiệu năng đột phá vượt bậc cho smartphone và các trung tâm dữ liệu AI.",
    category_id: 2,
    featured: false,
    imageName: "semiconductor_2nm",
    contentBlocks: [
      { type: "bold-paragraph", text: "Cuộc đua thu nhỏ kích thước bóng bán dẫn trên chip đang cận kề giới hạn vật lý với sự chuẩn bị ra mắt của tiến trình 2nm." },
      { type: "paragraph", text: "Công nghiệp bán dẫn luôn là trái tim của toàn bộ thế giới công nghệ hiện đại. Việc chuyển dịch từ tiến trình 3nm hiện tại lên 2nm cho phép các nhà sản xuất tích hợp hàng chục tỷ bóng bán dẫn lên một diện tích chip siêu nhỏ. Điều này giúp tăng hiệu năng xử lý lên tới 15% trong khi giảm lượng điện tiêu thụ lên đến 30% so với thế hệ trước, mở đường cho những thiết bị di động pin trâu hơn và các siêu máy tính AI mạnh mẽ hơn." },
      { type: "image", src: "", caption: "Bề mặt đĩa wafer chứa hàng ngàn vi xử lý được chế tạo trên tiến trình 2nm siêu nhỏ" },
      { type: "paragraph", text: "Cuộc đua chế tạo chip 2nm hiện tại là cuộc cạnh tranh khốc liệt giữa các gã khổng lồ bán dẫn như TSMC, Samsung và Intel. Mỗi bên đều đổ hàng chục tỷ USD vào các nhà máy đúc chip (fab) thế hệ mới sử dụng công nghệ khắc quang học cực tím cực sâu (EUV). Bên nào thương mại hóa thành công trước sẽ nắm giữ quyền kiểm soát chuỗi cung ứng chip cho toàn cầu." },
      { type: "paragraph", text: "Tuy nhiên, chi phí xây dựng nhà máy và tỷ lệ sản phẩm đạt tiêu chuẩn (yield rate) cực thấp ở tiến trình này đang là thử thách cực đại. Việc làm chủ công nghệ bán dẫn 2nm không chỉ mang tính thương mại mà còn liên quan chặt chẽ đến an ninh công nghệ của các quốc gia lớn trong kỷ nguyên trí tuệ nhân tạo phát triển vũ bão." }
    ]
  },
  {
    title: "Xu hướng phát triển xe điện tự lái tại thị trường Đông Nam Á: Cơ hội và thách thức",
    summary: "Thị trường xe điện (EV) Đông Nam Á đang dịch chuyển nhanh chóng sang tích hợp công nghệ tự lái, mở ra cơ hội lớn cho các nhà sản xuất xe thông minh.",
    category_id: 2,
    featured: false,
    imageName: "autonomous_ev",
    contentBlocks: [
      { type: "bold-paragraph", text: "Xe điện không chỉ là phương tiện di chuyển xanh mà đang trở thành các thực thể công nghệ di động nhờ sự tích hợp của phần mềm tự lái thông minh." },
      { type: "paragraph", text: "Tại khu vực Đông Nam Á, doanh số bán xe điện liên tục ghi nhận mức tăng trưởng kỷ lục. Điểm thu hút người tiêu dùng thế hệ mới không chỉ dừng lại ở động cơ điện thân thiện môi trường mà còn ở trải nghiệm hỗ trợ lái nâng cao (ADAS) tiến tới tự lái hoàn toàn. Các tính năng tự động đỗ xe, giữ làn đường và tự tránh chướng ngại vật đang trở thành tiêu chuẩn bắt buộc trên các dòng xe điện trung và cao cấp." },
      { type: "image", src: "", caption: "Nội thất hiện đại của dòng xe điện tự lái với màn hình hiển thị toàn cảnh thông minh" },
      { type: "paragraph", text: "Sự phát triển này mở ra cơ hội lớn cho các quốc gia trong khu vực như Thái Lan, Indonesia và Việt Nam trở thành trung tâm sản xuất xe điện của thế giới nhờ nguồn tài nguyên khoáng sản dồi dào cho pin và chính sách khuyến khích đầu tư hấp dẫn. Các startup công nghệ trong khu vực cũng đang tích cực phát triển các giải pháp bản đồ số độ phân giải cao dành riêng cho giao thông đặc thù của Đông Nam Á." },
      { type: "paragraph", text: "Tuy nhiên, thách thức lớn nhất đối với xe tự lái tại đây chính là hạ tầng giao thông phức tạp, ý thức tham gia giao thông chưa đồng đều và thiếu hệ thống quy chuẩn pháp lý rõ ràng cho xe tự hành. Việc hoàn thiện hành lang pháp lý và phát triển hệ thống trạm sạc nhanh phủ rộng là điều kiện tiên quyết để xe điện tự lái cất cánh." }
    ]
  },

  // ----------------------------------------------------
  // THỂ THAO (category_id: 3)
  // ----------------------------------------------------
  {
    title: "Hành trình vươn tầm châu lục của bóng đá trẻ Việt Nam: Đầu tư bài bản và những quả ngọt đầu tiên",
    summary: "Sự trỗi dậy của các lò đào tạo bóng đá trẻ theo chuẩn quốc tế tại Việt Nam đang tạo tiền đề vững chắc cho mục tiêu chinh phục tấm vé dự World Cup trong tương lai.",
    category_id: 3,
    featured: true,
    imageName: "soccer_academy",
    contentBlocks: [
      { type: "bold-paragraph", text: "Bóng đá Việt Nam đang chuyển mình mạnh mẽ nhờ chú trọng đầu tư vào công tác đào tạo trẻ một cách bài bản, khoa học theo các mô hình tiên tiến từ châu Âu và Nhật Bản." },
      { type: "paragraph", text: "Trong nhiều thập kỷ, thành tích của bóng đá Việt Nam thường dựa trên những thế hệ cầu thủ tài năng xuất hiện mang tính ngẫu nhiên. Nhận thức rõ sự thiếu bền vững này, các câu lạc bộ và học viện bóng đá lớn trong nước đã hợp tác với các đội bóng lớn trên thế giới để xây dựng hệ thống đào tạo trẻ chuyên nghiệp, từ tuyển chọn, huấn luyện kỹ chiến thuật đến chăm sóc dinh dưỡng và y tế thể thao." },
      { type: "image", src: "", caption: "Buổi tập luyện hăng say của các cầu thủ nhí tại học viện bóng đá trẻ hiện đại" },
      { type: "paragraph", text: "Kết quả của sự đầu tư dài hạn này là sự xuất hiện liên tục của các lứa cầu thủ trẻ thi đấu chững chạc và gặt hái nhiều thành công tại các giải đấu cấp khu vực và châu lục. Lối chơi hiện đại, tư duy chiến thuật nhạy bén và thể lực cải thiện vượt trội là những điểm cộng lớn giúp các đội tuyển trẻ U17, U20, U23 Việt Nam tự tin đối đầu với các thế lực bóng đá lớn ở châu Á." },
      { type: "paragraph", text: "Bên cạnh kỹ năng chuyên môn, các học viện còn chú trọng giáo dục văn hóa, ngoại ngữ và kỹ năng sống cho các cầu thủ trẻ. Điều này giúp các em có được sự phát triển toàn diện, sẵn sàng cho những cơ hội ra nước ngoài thi đấu chuyên nghiệp, qua đó nâng tầm vị thế cho bóng đá nước nhà trên đấu trường quốc tế." },
      { type: "ad" },
      { type: "paragraph", text: "Hành trình vươn tầm châu lục vẫn còn nhiều thử thách phía trước, đòi hỏi sự kiên trì và phối hợp chặt chẽ giữa các câu lạc bộ, liên đoàn và toàn xã hội. Tuy nhiên, những thành công bước đầu của đào tạo trẻ đang thắp sáng niềm tin về một ngày không xa bóng đá Việt Nam sẽ góp mặt tại ngày hội bóng đá lớn nhất hành tinh - World Cup." }
    ]
  },
  {
    title: "Giải chạy Marathon quốc tế di sản Hà Nội 2026: Hàng vạn vận động viên tham gia chạy qua các địa danh lịch sử",
    summary: "Hà Nội sẵn sàng chào đón hàng vạn chân chạy trong nước và quốc tế tham gia sự kiện marathon kết hợp quảng bá vẻ đẹp di sản văn hóa thủ đô.",
    category_id: 3,
    featured: false,
    imageName: "hanoi_marathon",
    contentBlocks: [
      { type: "bold-paragraph", text: "Giải chạy Marathon quốc tế di sản Hà Nội 2026 không chỉ là một ngày hội thể thao lớn mà còn là sự kiện văn hóa du lịch độc đáo, kết nối cộng đồng chạy bộ toàn cầu." },
      { type: "paragraph", text: "Vào những ngày thu Hà Nội đẹp nhất, hàng vạn vận động viên từ khắp nơi trên thế giới sẽ cùng nhau xuất phát từ bờ hồ Hoàn Kiếm, sải bước qua những con phố cổ kính, rợp bóng mát của thủ đô. Cung đường chạy được thiết kế đặc biệt đi qua nhiều địa danh lịch sử nổi tiếng như Lăng Bác, Cột cờ Hà Nội, cầu Long Biên cổ kính, Hồ Tây lộng gió, mang lại trải nghiệm độc nhất vô nhị cho người tham gia." },
      { type: "image", src: "", caption: "Các vận động viên sải bước đầy năng lượng qua Tháp Rùa biểu tượng của Hà Nội trong nắng sớm" },
      { type: "paragraph", text: "Giải chạy được chia thành nhiều cự ly khác nhau từ 5km, 10km, 21km đến cự ly marathon 42.195km phù hợp cho cả vận động viên chuyên nghiệp lẫn phong trào. Công tác chuẩn bị về y tế, nước uống, phân luồng giao thông và an ninh được ban tổ chức phối hợp chặt chẽ với các cơ quan chức năng để đảm bảo an toàn tuyệt đối cho giải chạy diễn ra thành công." },
      { type: "paragraph", text: "Sự kiện này không chỉ góp phần thúc đẩy phong trào rèn luyện sức khỏe, tinh thần thể thao trong cộng đồng mà còn là cơ hội tuyệt vời để quảng bá hình ảnh một thủ đô Hà Nội năng động, mến khách và giàu bản sắc văn hóa đến bạn bè quốc tế, thúc đẩy du lịch phát triển mạnh mẽ." }
    ]
  },
  {
    title: "Thể thao điện tử (Esports) chính thức được công nhận là môn thi đấu giành huy chương tại Đại hội Thể thao Khu vực",
    summary: "Sự công nhận chính thức đối với Esports tại các kỳ đại hội thể thao lớn chứng minh sức ảnh hưởng và tính chuyên nghiệp ngày càng cao của bộ môn này.",
    category_id: 3,
    featured: false,
    imageName: "esports_stadium",
    contentBlocks: [
      { type: "bold-paragraph", text: "Esports đã vượt qua những định kiến cũ để khẳng định vị trí như một bộ môn thể thao chính thống với sự đầu tư bài bản và tính cạnh tranh cực kỳ khốc liệt." },
      { type: "paragraph", text: "Từ những giải đấu mang tính tự phát trong các phòng máy, Esports giờ đây đã phát triển thành một ngành công nghiệp tỷ đô thu hút hàng triệu người theo dõi trên khắp thế giới. Việc Esports chính thức được đưa vào chương trình thi đấu giành huy chương tại Đại hội Thể thao Khu vực là cột mốc lịch sử quan trọng, ghi nhận những nỗ lực rèn luyện của các tuyển thủ chuyên nghiệp không khác gì các vận động viên thể thao truyền thống." },
      { type: "image", src: "", caption: "Sân vận động Esports chật kín khán giả cổ vũ cho các đội tuyển chuyên nghiệp thi đấu" },
      { type: "paragraph", text: "Để giành được tấm huy chương vàng danh giá, các tuyển thủ Esports phải trải qua quá trình huấn luyện cực kỳ khắc nghiệt về phản xạ, tư duy chiến thuật phối hợp đồng đội và sự tập trung cao độ dưới áp lực lớn. Các đội tuyển chuyên nghiệp đều có ban huấn luyện chuyên sâu bao gồm huấn luyện viên trưởng, chuyên gia phân tích dữ liệu, bác sĩ trị liệu và cả chuyên gia tâm lý học." },
      { type: "paragraph", text: "Sự chuyển dịch này mở ra cơ hội lớn cho các tài năng trẻ Việt Nam khẳng định vị thế của mình trên đấu trường quốc tế, đồng thời thu hút dòng vốn đầu tư lớn từ các nhà tài trợ, thương hiệu toàn cầu vào phát triển hạ tầng và đào tạo Esports chuyên nghiệp tại nước nhà." }
    ]
  },

  // ----------------------------------------------------
  // GIẢI TRÍ (category_id: 4)
  // ----------------------------------------------------
  {
    title: "Điện ảnh Việt Nam gặt hái thành công vang dội tại Liên hoan phim Quốc tế với những tác phẩm mang đậm bản sắc dân tộc",
    summary: "Những bộ phim điện ảnh độc lập Việt Nam liên tiếp giành giải thưởng lớn tại các liên hoan phim quốc tế uy tín, khẳng định vị thế mới của điện ảnh nước nhà.",
    category_id: 4,
    featured: true,
    imageName: "film_festival",
    contentBlocks: [
      { type: "bold-paragraph", text: "Điện ảnh Việt Nam đang có những bước tiến dài ra biển lớn, chinh phục giới phê bình quốc tế bằng những câu chuyện kể giàu chiều sâu văn hóa và nghệ thuật làm phim độc đáo." },
      { type: "paragraph", text: "Tại các liên hoan phim quốc tế danh giá gần đây, nhiều tác phẩm của các đạo diễn Việt Nam đã bất ngờ giành chiến thắng tại những hạng mục quan trọng nhất. Điểm chung của những bộ phim này là khả năng khai thác sâu sắc và tinh tế những lát cắt cuộc sống, mối quan hệ gia đình và nét đẹp văn hóa truyền thống của con người Việt Nam dưới một góc nhìn đậm chất điện ảnh đương đại." },
      { type: "image", src: "", caption: "Sự kiện thảm đỏ quốc tế vinh danh những tài năng điện ảnh xuất sắc" },
      { type: "paragraph", text: "Sự công nhận này chứng minh rằng những câu chuyện mang đậm bản sắc bản địa vẫn có sức lay động mạnh mẽ đến tâm hồn của khán giả toàn cầu nhờ tính nhân văn phổ quát. Các nhà làm phim trẻ Việt Nam đã dũng cảm thử nghiệm những ngôn ngữ điện ảnh mới, không ngại khai thác những chủ đề khó và đầu tư kỹ lưỡng vào chất lượng hình ảnh, âm thanh để đạt chuẩn quốc tế." },
      { type: "paragraph", text: "Thành công tại các sân chơi quốc tế không chỉ mang lại niềm tự hào cho điện ảnh nước nhà mà còn mở ra cơ hội hợp tác sản xuất đa quốc gia, thu hút nguồn lực tài chính lớn để nâng cao năng lực sản xuất và mở rộng thị trường phát hành cho phim Việt ra toàn thế giới trong tương lai." },
      { type: "ad" },
      { type: "paragraph", text: "Hy vọng rằng những thành tích ấn tượng này sẽ trở thành nguồn cảm hứng mạnh mẽ, tiếp thêm tự tin cho thế hệ các nhà làm phim tiếp theo tiếp tục sáng tạo và đưa bản sắc văn hóa Việt Nam bay cao hơn nữa trên bản đồ điện ảnh toàn cầu." }
    ]
  },
  {
    title: "Trào lưu nhạc Pop đương đại kết hợp nhạc cụ dân tộc đang thống trị các bảng xếp hạng âm nhạc Việt",
    summary: "Các ca sĩ trẻ đang gặt hái thành công lớn nhờ sáng tạo đưa chất liệu nhạc cụ truyền thống như Đàn Bầu, Đàn Tranh lồng ghép tinh tế vào nhạc hiện đại.",
    category_id: 4,
    featured: false,
    imageName: "dan_bau_pop",
    contentBlocks: [
      { type: "bold-paragraph", text: "Sự giao thoa độc đáo giữa âm hưởng nhạc Pop hiện đại và âm sắc nhạc cụ dân tộc cổ xưa đang tạo nên một dòng chảy âm nhạc mới vô cùng cuốn hút đối với giới trẻ Việt." },
      { type: "paragraph", text: "Không còn đóng khung trong các buổi biểu diễn nghệ thuật truyền thống, âm sắc của Đàn Bầu, Đàn Tranh, sáo trúc hay khèn Mông đang vang lên đầy kiêu hãnh trong các bản hit triệu view lọt top thịnh hành trên các nền tảng số. Các nghệ sĩ trẻ đã khéo léo kết hợp nhạc cụ dân tộc với nhịp điệu sôi động của EDM, Hip-hop hay R&B, tạo nên những giai điệu vừa mang nét cổ kính, ma mị vừa vô cùng hiện đại, bắt tai." },
      { type: "image", src: "", caption: "Sự kết hợp hài hòa giữa nhạc cụ dân tộc truyền thống và hệ thống sản xuất âm nhạc điện tử hiện đại" },
      { type: "paragraph", text: "Trào lưu này không chỉ nhận được sự ủng hộ nhiệt tình của khán giả trẻ trong nước mà còn thu hút sự tò mò và yêu thích của đông đảo người nghe nhạc quốc tế trên các nền tảng như TikTok, Spotify. Nhiều ca khúc Việt Nam đã bất ngờ trở thành hiện tượng xu hướng toàn cầu nhờ giai điệu mang đậm dấu ấn văn hóa độc đáo này." },
      { type: "paragraph", text: "Việc đưa âm nhạc truyền thống tiếp cận gần hơn với công chúng trẻ theo cách sáng tạo và hiện đại này được giới chuyên môn đánh giá rất cao. Đây là hướng đi thông minh giúp bảo tồn, phát huy các giá trị văn hóa nghệ thuật của thế hệ đi trước một cách tự nhiên và bền vững nhất trong thời đại hội nhập." }
    ]
  },
  {
    title: "Sự trỗi dậy của các chương trình truyền hình thực tế về văn hóa và ẩm thực Việt Nam thu hút hàng triệu khán giả",
    summary: "Các chương trình truyền hình quảng bá nét đẹp văn hóa và ẩm thực vùng miền đang ghi nhận tỷ lệ người xem kỷ lục nhờ cách thể hiện chân thực, giàu cảm xúc.",
    category_id: 4,
    featured: false,
    imageName: "cooking_show",
    contentBlocks: [
      { type: "bold-paragraph", text: "Ẩm thực và văn hóa Việt Nam chứa đựng sức hút kỳ diệu. Các show thực tế khai thác đề tài này đang mang đến cho người xem những giây phút giải trí vô cùng ý nghĩa và chân thực." },
      { type: "paragraph", text: "Thay vì các gameshow giải trí thuần túy, khán giả truyền hình ngày nay đang có xu hướng yêu thích các chương trình trải nghiệm văn hóa ẩm thực chân thực. Người xem được theo chân các nghệ sĩ, đầu bếp nổi tiếng đi sâu vào các làng quê, khám phá cách chế biến những món ăn đặc sản lâu đời và lắng nghe những câu chuyện lịch sử thú vị đằng sau mỗi món ăn." },
      { type: "image", src: "", caption: "Quang cảnh buổi quay hình cuộc thi nấu ăn ngoài trời tại một vùng quê đậm chất Việt Nam" },
      { type: "paragraph", text: "Sức hút của các chương trình này nằm ở sự mộc mạc, gần gũi và không màu mè. Vẻ đẹp bình dị của phong cảnh đất nước, nụ cười hiền hậu của người dân bản địa cùng sự phong phú của các nguyên liệu nông sản Việt được tái hiện một cách sống động qua những thước phim được đầu tư hình ảnh chất lượng cao như phim điện ảnh." },
      { type: "paragraph", text: "Thành công của các chương trình thực tế về ẩm thực, văn hóa không chỉ góp phần nâng cao lòng tự hào dân tộc, định hướng giá trị thẩm mỹ lành mạnh cho khán giả mà còn hỗ trợ đắc lực cho việc phát triển du lịch bền vững tại các địa phương, giới thiệu hình ảnh Việt Nam tươi đẹp ra thế giới." }
    ]
  },
  {
    title: "Xu hướng du lịch kết hợp xem đại nhạc hội của giới trẻ Việt: Khi âm nhạc là cầu nối khám phá thế giới",
    summary: "Trào lưu đi du lịch kết hợp tham gia các đại nhạc hội quốc tế (Music Tourism) đang bùng nổ mạnh mẽ trong giới trẻ Việt, thay đổi thói quen tiêu dùng giải trí.",
    category_id: 4,
    featured: false,
    imageName: "music_festival",
    contentBlocks: [
      { type: "bold-paragraph", text: "Giới trẻ Việt Nam ngày nay sẵn sàng chi tiêu lớn cho các chuyến đi xa để được trực tiếp thưởng thức màn biểu diễn của các ngôi sao âm nhạc yêu thích, kết hợp khám phá các điểm đến du lịch mới." },
      { type: "paragraph", text: "Đi du lịch kết hợp xem ca nhạc (Music Tourism) đã trở thành một xu hướng tiêu dùng giải trí thịnh hành toàn cầu và đang phát triển mạnh mẽ tại Việt Nam. Không chỉ xem show trong nước, nhiều bạn trẻ sẵn sàng đặt vé máy bay, đặt phòng khách sạn sang các nước láng giềng như Thái Lan, Singapore để tham gia các tour diễn thế giới của các siêu sao quốc tế." },
      { type: "image", src: "", caption: "Đại nhạc hội sôi động ngoài trời quy tụ hàng vạn khán giả trẻ hòa mình vào âm nhạc" },
      { type: "paragraph", text: "Xu hướng này mang lại nguồn doanh thu khổng lồ cho ngành du lịch và dịch vụ đi kèm như khách sạn, ẩm thực và vận chuyển tại các điểm tổ chức. Nhận thấy tiềm năng to lớn này, các thành phố du lịch lớn của Việt Nam như Đà Nẵng, Phú Quốc, Nha Trang cũng đang tích cực đăng cai các sự kiện âm nhạc, đại nhạc hội quốc tế lớn để thu hút du khách trẻ tuổi." },
      { type: "paragraph", text: "Âm nhạc không chỉ là phương thức giải trí đơn thuần mà đã thực sự trở thành cầu nối văn hóa mạnh mẽ, giúp gắn kết mọi người và kích thích nhu cầu trải nghiệm du lịch, đóng góp tích cực vào sự phục hồi và tăng trưởng của nền kinh tế dịch vụ." }
    ]
  },

  // ----------------------------------------------------
  // KINH TẾ (category_id: 5)
  // ----------------------------------------------------
  {
    title: "Thương mại điện tử Việt Nam vượt mốc kỷ lục: Xu hướng mua sắm qua livestream bùng nổ",
    summary: "Thị trường thương mại điện tử Việt Nam tiếp tục ghi nhận tăng trưởng vượt bậc, trong đó mô hình bán hàng qua phát sóng trực tiếp (livestreaming) đang trở thành kênh bán hàng cốt lõi.",
    category_id: 5,
    featured: true,
    imageName: "livestream_ecom",
    contentBlocks: [
      { type: "bold-paragraph", text: "Mua sắm qua livestream đang thay đổi hoàn toàn hành vi tiêu dùng trực tuyến của người dân Việt Nam, tạo ra doanh thu hàng tỷ USD chỉ sau vài giờ phát sóng." },
      { type: "paragraph", text: "Thương mại điện tử Việt Nam đang trải qua giai đoạn bùng nổ mạnh mẽ nhất từ trước đến nay. Điểm nhấn lớn nhất của thị trường là sự dịch chuyển sang xu hướng 'Shoppertainment' - mua sắm kết hợp giải trí. Các phiên livestream bán hàng kéo dài hàng chục tiếng đồng hồ thu hút hàng triệu lượt xem trực tiếp và hàng vạn đơn hàng chốt thành công liên tục thiết lập các kỷ lục doanh số mới." },
      { type: "image", src: "", caption: "Không gian trường quay chuyên nghiệp của một buổi livestream bán hàng trực tuyến" },
      { type: "paragraph", text: "Lợi thế lớn nhất của livestream là khả năng tương tác trực tiếp giữa người bán và người mua. Khách hàng có thể dễ dàng yêu cầu xem chi tiết chất liệu sản phẩm, đặt câu hỏi về kích cỡ và nhận tư vấn thời gian thực từ các KOC, KOL nổi tiếng. Sự kết hợp này mang lại cảm giác tin cậy và kích thích quyết định mua hàng nhanh chóng hơn so với việc xem hình ảnh tĩnh thông thường." },
      { type: "paragraph", text: "Tuy nhiên, sự bùng nổ này cũng đặt ra những thách thức lớn về quản lý chất lượng hàng hóa, tính minh bạch về thuế và hạ tầng logistics giao nhận. Để duy trì đà tăng trưởng bền vững, các sàn thương mại điện tử và nhà bán hàng cần đầu tư bài bản vào quy trình kiểm soát nguồn hàng, tối ưu hóa hệ thống kho bãi và nâng cao trải nghiệm dịch vụ khách hàng." },
      { type: "ad" },
      { type: "paragraph", text: "Kinh doanh qua livestream không còn là một giải pháp tình thế mà đã thực sự trở thành một ngành công nghiệp chuyên nghiệp, đòi hỏi sự đầu tư nghiêm túc về mặt công nghệ, nhân lực sáng tạo và chuỗi cung ứng đồng bộ để thành công lâu dài." }
    ]
  },
  {
    title: "Kinh tế xanh và sự chuyển dịch sang năng lượng tái tạo của các khu công nghiệp tại Việt Nam",
    summary: "Các khu công nghiệp lớn tại Việt Nam đang tiên phong đầu tư hệ thống điện mặt trời áp mái và giải pháp tiết kiệm năng lượng để đáp ứng tiêu chuẩn xuất khẩu xanh khắt khe.",
    category_id: 5,
    featured: false,
    imageName: "green_energy",
    contentBlocks: [
      { type: "bold-paragraph", text: "Chuyển dịch sang mô hình sản xuất xanh không còn là lựa chọn mà đã trở thành yêu cầu sống còn đối với các doanh nghiệp Việt Nam muốn tham gia sâu vào chuỗi cung ứng toàn cầu." },
      { type: "paragraph", text: "Trước áp lực từ các thị trường xuất khẩu lớn như Liên minh châu Âu (EU) với Cơ chế điều chỉnh biên giới carbon (CBAM), các khu công nghiệp lớn tại Việt Nam đang khẩn trương đẩy mạnh quá trình chuyển đổi xanh. Việc lắp đặt hệ thống pin năng lượng mặt trời áp mái rộng lớn và đầu tư công nghệ tiết kiệm điện năng là những bước đi đầu tiên được triển khai rộng rãi." },
      { type: "image", src: "", caption: "Hệ thống tấm pin năng lượng mặt trời lắp đặt trên mái nhà xưởng của một khu công nghiệp xanh" },
      { type: "paragraph", text: "Bên cạnh năng lượng, việc xây dựng hệ thống tuần hoàn nước thải, tái chế rác thải công nghiệp và áp dụng các tiêu chuẩn quản lý môi trường ISO nghiêm ngặt cũng đang được các chủ đầu tư khu công nghiệp chú trọng đầu tư bài bản. Việc sở hữu chứng chỉ xanh giúp các khu công nghiệp dễ dàng thu hút dòng vốn đầu tư trực tiếp nước ngoài (FDI) chất lượng cao từ các tập đoàn công nghệ lớn trên thế giới." },
      { type: "paragraph", text: "Quá trình chuyển dịch xanh đòi hỏi nguồn vốn đầu tư ban đầu rất lớn và cơ chế chính sách hỗ trợ rõ ràng từ chính phủ về giá điện năng lượng tái tạo và tiếp cận nguồn vốn tín dụng xanh ưu đãi. Đây được coi là khoản đầu tư chiến lược giúp doanh nghiệp Việt nâng cao năng lực cạnh tranh dài hạn trên trường quốc tế." }
    ]
  },
  {
    title: "Khởi nghiệp đổi mới sáng tạo nông nghiệp công nghệ cao: Hướng đi mới nâng tầm nông sản Việt",
    summary: "Nhiều startup công nghệ đang ứng dụng IoT, AI vào canh tác nông nghiệp thông minh, mang lại năng suất cao và nâng tầm giá trị nông sản xuất khẩu Việt Nam.",
    category_id: 5,
    featured: false,
    imageName: "hydroponic_grow",
    contentBlocks: [
      { type: "bold-paragraph", text: "Ứng dụng các công nghệ hiện đại vào canh tác nông nghiệp đang giúp thay đổi tư duy sản xuất truyền thống, tạo ra những sản phẩm nông sản sạch, chất lượng cao đạt chuẩn quốc tế." },
      { type: "paragraph", text: "Nông nghiệp luôn là bệ đỡ vững chắc của nền kinh tế Việt Nam. Sự kết hợp của công nghệ số đã thổi một luồng sinh khí mới vào ngành này thông qua các dự án khởi nghiệp nông nghiệp công nghệ cao. Các hệ thống cảm biến thông minh tự động đo độ ẩm đất, giám sát dinh dưỡng của cây trồng và điều chỉnh hệ thống tưới tiêu tự động qua smartphone đang được ứng dụng rộng rãi tại các trang trại thế hệ mới." },
      { type: "image", src: "", caption: "Khu nhà kính nông nghiệp công nghệ cao trồng rau thủy canh theo tiêu chuẩn khép kín sạch sẽ" },
      { type: "paragraph", text: "Nhờ canh tác trong môi trường nhà kính khép kín được kiểm soát nghiêm ngặt bằng phần mềm, nông sản tránh được hầu hết các tác động tiêu cực của thời tiết và dịch bệnh mà không cần sử dụng đến thuốc bảo vệ thực vật hóa học. Sản phẩm thu hoạch không chỉ đảm bảo an toàn vệ sinh thực phẩm tuyệt đối mà còn có mẫu mã đẹp, hàm lượng dinh dưỡng cao và thời gian bảo quản lâu hơn." },
      { type: "paragraph", text: "Việc phát triển nông nghiệp công nghệ cao giúp nâng giá trị của nông sản Việt lên gấp nhiều lần, tạo điều kiện thuận lợi để tiếp cận các thị trường xuất khẩu khó tính như Nhật Bản, Mỹ, EU. Đây chính là con đường phát triển tất yếu giúp nâng cao thu nhập cho nông dân và xây dựng một nền nông nghiệp Việt Nam hiện đại, bền vững." }
    ]
  },

  // ----------------------------------------------------
  // GIÁO DỤC (category_id: 7)
  // ----------------------------------------------------
  {
    title: "Chuyển đổi số toàn diện trong giáo dục đại học: Xây dựng đại học ảo và học liệu số thông minh",
    summary: "Các trường đại học hàng đầu Việt Nam đang tăng cường số hóa hệ thống bài giảng, xây dựng giảng đường thông minh ảo để nâng cao trải nghiệm học tập cho sinh viên.",
    category_id: 7,
    featured: true,
    imageName: "virtual_edu",
    contentBlocks: [
      { type: "bold-paragraph", text: "Giáo dục đại học đang trải qua đợt tái cấu trúc mạnh mẽ nhất dưới tác động của công nghệ số, mang lại cơ hội học tập linh hoạt và chất lượng cao cho mọi sinh viên." },
      { type: "paragraph", text: "Không còn bị giới hạn bởi các bức tường của giảng đường truyền thống, sinh viên ngày nay có thể tiếp cận với kho bài giảng số khổng lồ, hệ thống mô phỏng 3D trực quan và tham gia các lớp học tương tác ảo mọi lúc mọi nơi. Các trường đại học lớn đang đẩy mạnh xây dựng hệ sinh thái đại học số tích hợp công nghệ điện toán đám mây và trí tuệ nhân tạo để cá nhân hóa lộ trình học tập của từng sinh viên." },
      { type: "image", src: "", caption: "Sinh viên nghiên cứu mô hình khoa học 3D trực quan thông qua công nghệ thực tế ảo tại thư viện số" },
      { type: "paragraph", text: "Học liệu số thông minh giúp sinh viên dễ dàng nắm bắt các kiến thức lý thuyết trừu tượng thông qua các mô hình tương tác trực quan. AI đóng vai trò như một trợ lý học tập cá nhân, phân tích kết quả học tập của sinh viên để tự động gợi ý các nội dung cần ôn tập hoặc nâng cao phù hợp với tốc độ tiếp thu của từng người, giúp nâng cao đáng kể hiệu quả học tập." },
      { type: "paragraph", text: "Tuy nhiên, để chuyển đổi số giáo dục đại học thành công, bên cạnh việc đầu tư cơ sở hạ tầng công nghệ hiện đại, việc nâng cao năng lực ứng dụng công nghệ số cho đội ngũ giảng viên và thay đổi phương pháp giảng dạy từ truyền đạt kiến thức thụ động sang định hướng tự học chủ động là những yếu tố quyết định hàng đầu." },
      { type: "ad" },
      { type: "paragraph", text: "Chuyển đổi số giáo dục đại học không chỉ là xu thế tất yếu mà đang thực sự nâng cao chất lượng nguồn nhân lực đất nước, chuẩn bị tốt nhất cho sinh viên bước vào kỷ nguyên kinh tế số toàn cầu." }
    ]
  },
  {
    title: "Đẩy mạnh giáo dục STEAM từ cấp tiểu học: Phát triển tư duy sáng tạo và giải quyết vấn đề cho học sinh thế hệ mới",
    summary: "Việc tích hợp giáo dục STEAM vào chương trình tiểu học đang khơi dậy niềm đam mê khoa học và rèn luyện kỹ năng thực hành giải quyết vấn đề từ sớm cho học sinh.",
    category_id: 7,
    featured: false,
    imageName: "steam_edu",
    contentBlocks: [
      { type: "bold-paragraph", text: "Giáo dục STEAM mang đến phương pháp tiếp cận liên môn sáng tạo, giúp học sinh tiểu học phát triển toàn diện tư duy logic, óc thẩm mỹ và khả năng làm việc nhóm." },
      { type: "paragraph", text: "STEAM (Khoa học, Công nghệ, Kỹ thuật, Nghệ thuật và Toán học) đang trở thành triết lý giáo dục cốt lõi được áp dụng rộng rãi tại các trường học hiện đại. Thay vì học các môn học tách biệt mang tính lý thuyết suông, học sinh tiểu học được tham gia vào các dự án học tập thực tế như lắp ráp robot thông minh, chế tạo hệ thống tưới nước tự động hay thiết kế đồ chơi tái chế thân thiện môi trường." },
      { type: "image", src: "", caption: "Học sinh tiểu học hào hứng cộng tác lắp ráp và lập trình mô hình robot nhỏ trong lớp học STEAM" },
      { type: "paragraph", text: "Phương pháp học thông qua thực hành (learning by doing) giúp các em rèn luyện tư duy phản biện, óc sáng tạo và kỹ năng giải quyết vấn đề thực tế phát sinh trong cuộc sống. Các hoạt động làm việc nhóm trong dự án STEAM cũng giúp học sinh học cách lắng nghe, chia sẻ ý tưởng và phối hợp nhịp nhàng với bạn bè để đạt được mục tiêu chung." },
      { type: "paragraph", text: "Để phổ cập giáo dục STEAM rộng rãi, việc chuẩn bị phòng Lab thực hành đạt chuẩn, đầu tư giáo cụ học tập trực quan phong phú và đào tạo chuyên sâu phương pháp dạy học STEAM cho đội ngũ giáo viên tiểu học là những bước đi then chốt đang được ngành giáo dục và toàn xã hội chung tay triển khai tích cực." }
    ]
  }
];

async function seed() {
  console.log("Starting Article Seeding...");
  
  // 1. Upload generated images to R2 and get their URLs
  const uploadedImageUrls = {};
  for (const img of IMAGE_MAPPING) {
    try {
      console.log(`Uploading ${img.name} to R2...`);
      const url = await uploadToR2(img.path, `${img.name}.png`);
      uploadedImageUrls[img.name] = url;
      console.log(`Uploaded successfully! URL: ${url}`);
    } catch (err) {
      console.error(`Failed to upload ${img.name}:`, err.message);
    }
  }

  // 2. Prepare article database records
  const articlesToInsert = articlesData.map((art, index) => {
    let finalImageUrl = "";
    // If the image was successfully generated and uploaded, use it.
    // Otherwise, reuse one of the successfully uploaded images or use a high quality fallback.
    if (uploadedImageUrls[art.imageName]) {
      finalImageUrl = uploadedImageUrls[art.imageName];
    } else {
      // Quota exhausted fallback: reuse some of the uploaded images to ensure R2 URLs are used
      const keys = Object.keys(uploadedImageUrls);
      if (keys.length > 0) {
        const randomKey = keys[index % keys.length];
        finalImageUrl = uploadedImageUrls[randomKey];
        console.log(`Quota fallback: Reusing uploaded R2 image "${randomKey}" for article "${art.title}"`);
      } else {
        // Absolute fallback
        finalImageUrl = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=600";
      }
    }

    const slug = art.title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    const contentBlocksWithSrc = art.contentBlocks.map(block => {
      if (block.type === "image") {
        return {
          ...block,
          src: finalImageUrl
        };
      }
      return block;
    });

    const now = new Date();
    // Stagger dates slightly so they don't all have the exact same time
    now.setHours(now.getHours() - index);
    const timeStr = now.toISOString();

    return {
      title: art.title,
      slug: slug,
      summary: art.summary,
      thumbnail_key: finalImageUrl,
      content: contentBlocksWithSrc,
      category_id: art.category_id,
      author_id: "00000000-0000-0000-0000-000000000001", // Admin profile
      views: Math.floor(Math.random() * 5000) + 100,
      status: "published",
      featured: art.featured,
      seo_title: art.title.substring(0, 70),
      seo_description: art.summary.substring(0, 150),
      created_at: timeStr,
      updated_at: timeStr,
      published_at: timeStr
    };
  });

  // 3. Clear existing articles (if requested, or just insert. Since the database has very few articles, let's insert them directly).
  // Wait, let's insert the new articles.
  console.log(`Inserting ${articlesToInsert.length} articles into the database...`);
  const { data, error } = await supabase
    .from('articles')
    .insert(articlesToInsert)
    .select('id, title');

  if (error) {
    console.error("Error inserting articles:", error);
  } else {
    console.log("Successfully seeded articles:", data.map(d => `[ID: ${d.id}] ${d.title}`));
  }
}

seed();
