import fs from 'fs';
import path from 'path';
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

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const R2_URLS = {
  smart_city_hanoi: "https://pub-a2f157c1253e4420830c52887b0f6bce.r2.dev/articles/1782925549397-smart_city_hanoi.png",
  high_speed_train: "https://pub-a2f157c1253e4420830c52887b0f6bce.r2.dev/articles/1782925550189-high_speed_train.png",
  flood_prevention: "https://pub-a2f157c1253e4420830c52887b0f6bce.r2.dev/articles/1782925550604-flood_prevention.png",
  hanoi_traffic: "https://pub-a2f157c1253e4420830c52887b0f6bce.r2.dev/articles/1782925550968-hanoi_traffic.png",
  ai_agent_office: "https://pub-a2f157c1253e4420830c52887b0f6bce.r2.dev/articles/1782925551293-ai_agent_office.png",
  ar_glasses: "https://pub-a2f157c1253e4420830c52887b0f6bce.r2.dev/articles/1782925551606-ar_glasses.png",
  semiconductor_2nm: "https://pub-a2f157c1253e4420830c52887b0f6bce.r2.dev/articles/1782925551860-semiconductor_2nm.png",
  autonomous_ev: "https://pub-a2f157c1253e4420830c52887b0f6bce.r2.dev/articles/1782925552263-autonomous_ev.png",
  soccer_academy: "https://pub-a2f157c1253e4420830c52887b0f6bce.r2.dev/articles/1782925552450-soccer_academy.png",
  hanoi_marathon: "https://pub-a2f157c1253e4420830c52887b0f6bce.r2.dev/articles/1782925552821-hanoi_marathon.png",
  esports_stadium: "https://pub-a2f157c1253e4420830c52887b0f6bce.r2.dev/articles/1782925553037-esports_stadium.png",
  film_festival: "https://pub-a2f157c1253e4420830c52887b0f6bce.r2.dev/articles/1782925553354-film_festival.png",
  dan_bau_pop: "https://pub-a2f157c1253e4420830c52887b0f6bce.r2.dev/articles/1782925553678-dan_bau_pop.png",
  cooking_show: "https://pub-a2f157c1253e4420830c52887b0f6bce.r2.dev/articles/1782925554180-cooking_show.png",
  music_festival: "https://pub-a2f157c1253e4420830c52887b0f6bce.r2.dev/articles/1782925554903-music_festival.png",
  livestream_ecom: "https://pub-a2f157c1253e4420830c52887b0f6bce.r2.dev/articles/1782925555388-livestream_ecom.png"
};

const articlesData = [
  // GIẢI TRÍ (ID: 4) - Cần thêm 1 bài để đạt 6
  {
    title: "Sự trở lại ngoạn mục của nhạc Rock Việt: Khi những giai điệu rực lửa chinh phục thế hệ Z",
    summary: "Nhạc Rock Việt đang trỗi dậy mạnh mẽ sau nhiều năm im ắng, thu hút lượng lớn khán giả trẻ nhờ sự kết hợp các thể loại nhạc điện tử hiện đại.",
    category_id: 4,
    imageUrl: R2_URLS.music_festival,
    contentBlocks: [
      { type: "bold-paragraph", text: "Sau khoảng thời gian dài nhường sân khấu cho ballad và rap, nhạc Rock Việt đang quay trở lại đầy kiêu hãnh với những ban nhạc trẻ đầy nhiệt huyết và sáng tạo." },
      { type: "paragraph", text: "Từ các đêm nhạc nhỏ tại các quán cafe đến các sân vận động chật kín hàng vạn khán giả, âm hưởng sôi động và ngập tràn năng lượng của Rock đang làm nóng bầu không khí âm nhạc nước nhà. Sự trỗi dậy này không chỉ là sự tái sinh của các giá trị cũ mà là sự lột xác với những thử nghiệm âm thanh hoàn toàn mới, tích hợp các chất liệu synth-wave, indie rock và pop-punk thời thượng." },
      { type: "image", src: R2_URLS.music_festival, caption: "Hàng vạn khán giả trẻ cuồng nhiệt hòa mình vào giai điệu rock mạnh mẽ tại đại nhạc hội ngoài trời" },
      { type: "paragraph", text: "Các ban nhạc rock thế hệ mới đang chứng tỏ khả năng sáng tác và trình diễn vô cùng chuyên nghiệp. Lời bài hát không chỉ dừng lại ở những chủ đề quen thuộc mà đi sâu phản ánh những trăn trở, khát vọng và góc nhìn cuộc sống của thế hệ Z. Điều này giúp Rock Việt dễ dàng tìm được sự đồng cảm sâu sắc từ công chúng trẻ tuổi." },
      { type: "paragraph", text: "Các liveshow tự tổ chức liên tục 'cháy vé' chỉ trong vài phút mở bán chính là minh chứng rõ ràng nhất cho sức hút của dòng nhạc này. Đây là tín hiệu vô cùng đáng mừng, hứa hẹn một tương lai đa sắc màu và phát triển bền vững cho nền âm nhạc Việt Nam." }
    ]
  },

  // THỂ THAO (ID: 3) - Cần thêm 2 bài để đạt 6
  {
    title: "Thể thao học đường Việt Nam: Nền tảng xây dựng lối sống lành mạnh và phát hiện tài năng trẻ từ sớm",
    summary: "Việc đẩy mạnh phong trào thể thao học đường đang giúp học sinh phát triển thể chất toàn diện, đồng thời là cái nôi phát hiện các hạt giống thể thao cho quốc gia.",
    category_id: 3,
    imageUrl: R2_URLS.soccer_academy,
    contentBlocks: [
      { type: "bold-paragraph", text: "Giáo dục thể chất thông qua các hoạt động thể thao học đường ngày càng được các trường học chú trọng đầu tư bài bản, góp phần nâng cao tầm vóc Việt." },
      { type: "paragraph", text: "Không chỉ dừng lại ở các tiết học thể dục bắt buộc, phong trào thể thao học đường tại Việt Nam đang phát triển mạnh mẽ thông qua hệ thống các câu lạc bộ bóng đá, bóng rổ, cầu lông và bơi lội hoạt động ngoài giờ. Học sinh được khuyến khích tham gia luyện tập thường xuyên, giúp giải tỏa áp lực học tập và xây dựng lối sống năng động, lành mạnh." },
      { type: "image", src: R2_URLS.soccer_academy, caption: "Học sinh tham gia tập luyện thể thao hăng say trên sân cỏ nhà trường" },
      { type: "paragraph", text: "Từ các giải đấu học đường quy mô trường, quận đến cấp thành phố và quốc gia, nhiều tài năng thể thao xuất sắc đã được phát hiện và bồi dưỡng kịp thời để đưa vào các tuyến năng khiếu chuyên nghiệp. Sự phối hợp chặt chẽ giữa nhà trường, gia đình và các câu lạc bộ chuyên nghiệp đang tạo ra hành lang phát triển vững chắc cho các em." },
      { type: "paragraph", text: "Việc đầu tư cơ sở vật chất sân bãi, dụng cụ tập luyện và đổi mới giáo trình thể chất theo hướng vui nhộn, lôi cuốn được kỳ vọng sẽ tiếp tục thu hút đông đảo học sinh tham gia, tạo nền tảng vững chắc cho thể thao nước nhà cất cánh." }
    ]
  },
  {
    title: "Sức hút của môn quần vợt (Tennis) phong trào tại Việt Nam: Khi rèn luyện sức khỏe kết hợp giao lưu kết nối",
    summary: "Phong trào chơi quần vợt đang bùng nổ mạnh mẽ tại các đô thị lớn, thu hút đông đảo người dân tham gia luyện tập hằng ngày.",
    category_id: 3,
    imageUrl: R2_URLS.hanoi_marathon,
    contentBlocks: [
      { type: "bold-paragraph", text: "Quần vợt không còn là bộ môn thể thao xa xỉ mà đã trở thành món ăn tinh thần phổ biến, giúp nâng cao sức khỏe và kết nối cộng đồng năng động." },
      { type: "paragraph", text: "Tại các thành phố lớn như Hà Nội, TP.HCM, các sân quần vợt luôn kín chỗ từ sáng sớm đến tối muộn. Người chơi thuộc nhiều lứa tuổi, ngành nghề khác nhau cùng chia sẻ niềm đam mê với những cú giao bóng mạnh mẽ và những đường bóng kịch tính trên sân đất nện hoặc sân cứng." },
      { type: "image", src: R2_URLS.hanoi_marathon, caption: "Hoạt động rèn luyện thể thao đầy nhiệt huyết của người dân tại sân chơi đô thị" },
      { type: "paragraph", text: "Tennis phong trào phát triển mạnh mẽ nhờ sự xuất hiện của các hội nhóm, câu lạc bộ tự phát hoạt động vô cùng sôi nổi. Đây không chỉ là nơi rèn luyện thể lực bền bỉ, cải thiện hệ tim mạch mà còn là không gian tuyệt vời để giao lưu kết nối bạn bè, đối tác kinh doanh trong bầu không khí vui vẻ, thân thiện." },
      { type: "paragraph", text: "Các giải đấu giao hữu phong trào được tổ chức thường niên với quy mô ngày càng chuyên nghiệp đã góp phần thúc đẩy tinh thần luyện tập thể thao, nâng cao chất lượng cuộc sống lành mạnh cho người dân đô thị." }
    ]
  },

  // KINH TẾ (ID: 5) - Cần thêm 2 bài để đạt 6
  {
    title: "Đầu tư hạ tầng Logistics hàng không tại Việt Nam: Chìa khóa thúc đẩy xuất khẩu chuỗi cung ứng toàn cầu",
    summary: "Việc nâng cấp các nhà ga hàng hóa sân bay và kết nối giao thông đồng bộ giúp tối ưu hóa thời gian vận chuyển, nâng cao năng lực cạnh tranh xuất khẩu cho hàng hóa Việt.",
    category_id: 5,
    imageUrl: R2_URLS.high_speed_train,
    contentBlocks: [
      { type: "bold-paragraph", text: "Logistics hàng không đóng vai trò huyết mạch trong chuỗi cung ứng quốc tế. Việt Nam đang tăng cường đầu tư mạnh mẽ vào lĩnh vực này để đón đầu làn sóng dịch chuyển sản xuất toàn cầu." },
      { type: "paragraph", text: "Với kim ngạch xuất nhập khẩu liên tục tăng trưởng, nhu cầu vận chuyển hàng hóa bằng đường hàng không tại Việt Nam đang quá tải tại các sân bay lớn như Nội Bài và Tân Sơn Nhất. Để đáp ứng yêu cầu vận chuyển nhanh chóng các mặt hàng công nghệ cao, linh kiện điện tử và nông sản tươi sống, việc đầu tư nâng cấp các nhà ga hàng hóa chuyên dụng hiện đại là vô cùng cấp bách." },
      { type: "image", src: R2_URLS.high_speed_train, caption: "Hạ tầng kết nối giao thông hiện đại hỗ trợ đắc lực cho hoạt động luân chuyển hàng hóa logistics" },
      { type: "paragraph", text: "Nhiều dự án xây dựng cảng hàng không quốc tế mới và mở rộng nhà ga hàng hóa hiện hữu đang được triển khai khẩn trương. Việc áp dụng công nghệ số vào quản lý kho bãi, thông quan tự động và tối ưu hóa quy trình bốc xếp giúp rút ngắn thời gian xử lý hàng hóa từ vài ngày xuống còn vài giờ, mang lại lợi ích to lớn về chi phí cho doanh nghiệp." },
      { type: "paragraph", text: "Phát triển logistics hàng không đồng bộ kết hợp đường bộ và đường biển sẽ giúp Việt Nam khẳng định vị thế trung tâm trung chuyển hàng hóa quan trọng của khu vực Đông Nam Á, thu hút thêm dòng vốn đầu tư FDI chất lượng cao." }
    ]
  },
  {
    title: "Xu hướng thanh toán không tiền mặt và sự lên ngôi của các ứng dụng ngân hàng số thông minh",
    summary: "Thói quen thanh toán bằng quét mã QR và ví điện tử đang phổ cập nhanh chóng từ thành thị đến nông thôn, thúc đẩy kinh tế số phát triển vượt bậc.",
    category_id: 5,
    imageUrl: R2_URLS.livestream_ecom,
    contentBlocks: [
      { type: "bold-paragraph", text: "Thanh toán không dùng tiền mặt đã trở thành thói quen hằng ngày của đại đa số người dân Việt Nam nhờ sự tiện lợi, an toàn và nhanh chóng." },
      { type: "paragraph", text: "Chỉ với một chiếc điện thoại thông minh cài ứng dụng ngân hàng hoặc ví điện tử, người tiêu dùng có thể dễ dàng thanh toán từ cốc trà đá vỉa hè đến các hóa đơn mua sắm giá trị lớn thông qua quét mã QR. Các giao dịch chuyển khoản nhanh 24/7 đã thay thế hầu hết việc sử dụng tiền mặt truyền thống, mang lại trải nghiệm tiêu dùng thông minh và hiện đại." },
      { type: "image", src: R2_URLS.livestream_ecom, caption: "Ứng dụng thanh toán số thông minh kết nối tiện lợi mọi giao dịch mua sắm" },
      { type: "paragraph", text: "Các ngân hàng thương mại đang chạy đua phát triển các tính năng ngân hàng số thông minh tích hợp AI để tối ưu hóa trải nghiệm người dùng. Hệ thống tự động phân tích chi tiêu cá nhân, gợi ý tiết kiệm và bảo mật đa lớp sinh trắc học nhận diện khuôn mặt giúp bảo vệ an toàn tuyệt đối tài khoản của khách hàng trước các nguy cơ lừa đảo công nghệ cao." },
      { type: "paragraph", text: "Sự phổ cập nhanh chóng của thanh toán không tiền mặt không chỉ giúp tiết kiệm chi phí in ấn và luân chuyển tiền tệ cho xã hội mà còn thúc đẩy tính minh bạch tài chính, tạo động lực mạnh mẽ cho nền kinh tế số Việt Nam cất cánh." }
    ]
  },

  // GIÁO DỤC (ID: 7) - Cần thêm 4 bài để đạt 6
  {
    title: "Phát triển mô hình trường học xanh: Đưa thiên nhiên vào lớp học và giáo dục bảo vệ môi trường",
    summary: "Mô hình trường học xanh đang được nhân rộng tại Việt Nam, giúp học sinh học tập trong không gian trong lành và hình thành ý thức bảo vệ thiên nhiên từ sớm.",
    category_id: 7,
    imageUrl: R2_URLS.green_energy,
    contentBlocks: [
      { type: "bold-paragraph", text: "Xây dựng môi trường giáo dục thân thiện với thiên nhiên là giải pháp bền vững giúp cải thiện sức khỏe tinh thần và thể chất cho học sinh trong thời đại đô thị hóa." },
      { type: "paragraph", text: "Trường học xanh không chỉ đơn thuần là trồng nhiều cây xanh trong khuôn viên trường mà là việc thiết kế các phòng học tận dụng tối đa ánh sáng và gió tự nhiên, áp dụng các giải pháp tiết kiệm năng lượng, thu gom nước mưa và tái chế rác thải hữu cơ ngay tại trường. Học sinh được trực tiếp tham gia chăm sóc các vườn rau nhỏ, vườn hoa tạo sự kết nối gần gũi với thiên nhiên." },
      { type: "image", src: R2_URLS.green_energy, caption: "Mô hình không gian học đường xanh mát kết hợp sử dụng nguồn năng lượng sạch thân thiện môi trường" },
      { type: "paragraph", text: "Thông qua các hoạt động thực tế này, các bài học về bảo vệ môi trường, biến đổi khí hậu và phát triển bền vững trở nên trực quan và dễ hiểu hơn bao giờ hết. Học sinh tự ý thức được việc tiết kiệm điện nước, hạn chế rác thải nhựa và yêu quý thiên nhiên xung quanh mình." },
      { type: "paragraph", text: "Việc phát triển trường học xanh đang nhận được sự ủng hộ nhiệt tình từ các bậc phụ huynh và xã hội, hướng tới xây dựng một thế hệ trẻ sống văn minh, có trách nhiệm với tương lai của hành tinh xanh." }
    ]
  },
  {
    title: "Phương pháp học tập chủ động (Active Learning): Cách thay đổi vai trò của học sinh từ thụ động sang chủ thể sáng tạo",
    summary: "Áp dụng phương pháp học tập chủ động giúp học sinh phát triển tư duy phản biện, khả năng tự nghiên cứu và tự tin thể hiện quan điểm cá nhân.",
    category_id: 7,
    imageUrl: R2_URLS.virtual_edu,
    contentBlocks: [
      { type: "bold-paragraph", text: "Chuyển dịch từ phương pháp đọc chép truyền thống sang học tập chủ động đang mang lại những thay đổi tích cực trong việc khơi dậy tiềm năng sáng tạo của học sinh." },
      { type: "paragraph", text: "Trong lớp học áp dụng Active Learning, giáo viên không còn là người truyền đạt kiến thức một chiều mà đóng vai trò người định hướng, gợi mở vấn đề. Học sinh được chia nhóm để thảo luận, thực hiện các dự án nghiên cứu nhỏ, tranh biện về các chủ đề học tập và tự trình bày kết quả trước lớp học." },
      { type: "image", src: R2_URLS.virtual_edu, caption: "Học sinh hào hứng thảo luận nhóm và chủ động nghiên cứu tài liệu học tập số hóa" },
      { type: "paragraph", text: "Phương pháp này kích thích tư duy độc lập, buộc học sinh phải chủ động tìm kiếm thông tin, phân tích dữ liệu và tìm ra giải pháp cho vấn đề thay vì chờ đợi câu trả lời có sẵn. Nhờ đó, các em ghi nhớ kiến thức sâu sắc hơn và rèn luyện được kỹ năng giao tiếp, thuyết trình tự tin." },
      { type: "paragraph", text: "Dù đòi hỏi sự chuẩn bị bài giảng công phu hơn từ phía giáo viên, học tập chủ động đang khẳng định là phương pháp giáo dục hiện đại, chuẩn bị tốt nhất hành trang kỹ năng cho học sinh trong kỷ nguyên tri thức mới." }
    ]
  },
  {
    title: "Đào tạo kỹ năng số và an toàn mạng cho học sinh: Trang bị lá chắn bảo vệ trẻ em trên không gian mạng",
    summary: "Việc đưa giáo dục an toàn mạng vào trường học giúp học sinh nhận biết các nguy cơ rủi ro trực tuyến và biết cách tự bảo vệ bản thân khi sử dụng internet.",
    category_id: 7,
    imageUrl: R2_URLS.ar_glasses,
    contentBlocks: [
      { type: "bold-paragraph", text: "Internet mở ra kho tàng tri thức khổng lồ nhưng cũng ẩn chứa nhiều cạm bẫy đối với trẻ em. Đào tạo kỹ năng số an toàn là nhiệm vụ cấp thiết của gia đình và nhà trường." },
      { type: "paragraph", text: "Trẻ em ngày nay tiếp xúc với máy tính, điện thoại thông minh từ rất sớm để học tập và giải trí trực tuyến. Thiếu kỹ năng bảo mật thông tin cá nhân và nhận diện thông tin độc hại khiến các em dễ trở thành mục tiêu của lừa đảo mạng, bắt nạt trực tuyến và tiếp cận các nội dung không phù hợp với lứa tuổi." },
      { type: "image", src: R2_URLS.ar_glasses, caption: "Học sinh được trang bị kiến thức bảo mật thông tin khi tương tác trên không gian mạng số" },
      { type: "paragraph", text: "Các chương trình đào tạo an toàn mạng hướng dẫn học sinh cách đặt mật khẩu mạnh, bảo mật tài khoản cá nhân, nhận biết các email/tin nhắn lừa đảo và cách hành xử văn minh khi tham gia mạng xã hội. Các em cũng được khuyến khích chia sẻ ngay với cha mẹ, thầy cô khi gặp phải các tình huống khó xử hoặc cảm thấy không an toàn trực tuyến." },
      { type: "paragraph", text: "Trang bị kỹ năng số vững vàng từ sớm giống như việc trao cho các em một chiếc lá chắn bảo vệ, giúp trẻ tự tin khám phá thế giới số một cách thông minh, lành mạnh và an toàn." }
    ]
  },
  {
    title: "Hướng nghiệp sớm từ cấp trung học: Giải bài toán chọn ngành chọn nghề đúng năng lực và nhu cầu xã hội",
    summary: "Triển khai hoạt động hướng nghiệp từ sớm giúp học sinh nhận thức rõ thế mạnh cá nhân, tìm hiểu thực tế nghề nghiệp để đưa ra lựa chọn ngành học phù hợp.",
    category_id: 7,
    imageUrl: R2_URLS.steam_edu,
    contentBlocks: [
      { type: "bold-paragraph", text: "Chọn sai ngành học dẫn đến lãng phí thời gian và nguồn lực xã hội. Hướng nghiệp sớm từ cấp trung học là giải pháp then chốt khắc phục vấn đề này." },
      { type: "paragraph", text: "Thay vì đợi đến kỳ thi tốt nghiệp THPT mới vội vã chọn trường chọn ngành theo xu hướng đám đông, học sinh trung học ngày nay được tiếp cận các hoạt động hướng nghiệp bài bản từ sớm. Các em được tham gia các bài trắc nghiệm tính cách, năng lực nghề nghiệp và tham gia các buổi tham quan thực tế doanh nghiệp để hiểu rõ công việc thực tế của từng ngành nghề." },
      { type: "image", src: R2_URLS.steam_edu, caption: "Học sinh được định hướng nghề nghiệp dựa trên các hoạt động thực hành thực tế bổ ích" },
      { type: "paragraph", text: "Bên cạnh đó, nhà trường còn phối hợp với các chuyên gia nhân sự tổ chức các buổi tọa đàm chia sẻ về xu hướng thị trường lao động, những kỹ năng cần thiết cho tương lai và nhu cầu tuyển dụng thực tế của xã hội. Điều này giúp học sinh có cái nhìn thực tế và chuẩn xác hơn khi đưa ra quyết định chọn trường." },
      { type: "paragraph", text: "Sự chuẩn bị kỹ lưỡng và định hướng nghề nghiệp từ sớm giúp các em học sinh có thêm động lực học tập rõ ràng, tự tin theo đuổi đam mê và dễ dàng gặt hái thành công trên con đường sự nghiệp tương lai." }
    ]
  }
];

async function seed() {
  console.log("Starting Seeding of Additional Articles...");
  
  const articlesToInsert = articlesData.map((art, index) => {
    const slug = art.title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    const now = new Date();
    // Stagger dates slightly so they don't all have the exact same time
    now.setHours(now.getHours() - index - 50); // Set them earlier than the first batch
    const timeStr = now.toISOString();

    return {
      title: art.title,
      slug: slug,
      summary: art.summary,
      thumbnail_key: art.imageUrl,
      content: art.contentBlocks,
      category_id: art.category_id,
      author_id: "00000000-0000-0000-0000-000000000001", // Admin profile
      views: Math.floor(Math.random() * 3000) + 50,
      status: "published",
      featured: false,
      seo_title: art.title.substring(0, 70),
      seo_description: art.summary.substring(0, 150),
      created_at: timeStr,
      updated_at: timeStr,
      published_at: timeStr
    };
  });

  console.log(`Inserting ${articlesToInsert.length} additional articles into the database...`);
  const { data, error } = await supabase
    .from('articles')
    .insert(articlesToInsert)
    .select('id, title, category_id');

  if (error) {
    console.error("Error inserting articles:", error);
  } else {
    console.log("Successfully seeded additional articles:", data.map(d => `[ID: ${d.id}, Cat ID: ${d.category_id}] ${d.title}`));
  }
}

seed();
