export const LANGS = [
  { id: "vi", label: "Tiếng Việt", short: "VI" },
  { id: "en", label: "English", short: "EN" },
  { id: "zh", label: "中文", short: "中文" },
  { id: "ko", label: "한국어", short: "한국어" },
];

const S = (vi, en, zh, ko) => ({ vi, en, zh, ko });

const UI = {
  nav_explore: S("Khám phá", "Explore", "探索", "탐험"),
  nav_plan: S("Tạo lịch trình", "Plan a trip", "制定行程", "일정 만들기"),
  nav_mine: S("Lịch trình của tôi", "My trips", "我的行程", "내 일정"),
  collection: S("Bộ sưu tập", "Favourites", "收藏", "즐겨찾기"),

  hero_eyebrow: S("BẢN ĐỒ TRI THỨC DU LỊCH VIỆT NAM", "VIỆT NAM TRAVEL KNOWLEDGE MAP", "越南旅游知识地图", "베트남 여행 지식 지도"),
  hero_a: S("Khám phá không chỉ là", "Exploring is not only about", "探索不只是", "탐험은 단순히"),
  hero_a_em: S("đi đến.", "arriving.", "抵达。", "도착이 아니라"),
  hero_b: S("Mà là", "It is about", "而是", ""),
  hero_b_em: S("hiểu sâu.", "understanding.", "读懂。", "깊이 이해하는 것입니다."),
  hero_sub: S(
    "Mỗi vùng đất là một mạng lưới sống động của con người, văn hóa, ẩm thực và những câu chuyện được trao truyền qua nhiều thế hệ.",
    "Every region is a living web of people, culture, food and stories passed down through generations.",
    "每一片土地都是由人、文化、美食和代代相传的故事织成的鲜活网络。",
    "각 지역은 사람, 문화, 음식, 대대로 전해진 이야기가 엮인 살아 있는 그물망입니다."
  ),

  search_ph: S("Tìm điểm đến, món ăn, di sản...", "Search places, food, heritage…", "搜索目的地、美食、遗产…", "여행지, 음식, 유산 검색…"),
  no_result: S("Không tìm thấy kết quả phù hợp.", "No matching results.", "没有找到匹配的结果。", "일치하는 결과가 없습니다."),
  search_results: S("Kết quả tìm kiếm", "Search results", "搜索结果", "검색 결과"),
  btn_plan: S("Tạo lịch trình khám phá", "Create an exploration itinerary", "创建探索行程", "탐험 일정 만들기"),
  btn_plan_sub: S("Gợi ý thời điểm đẹp và số ngày", "Best season and days suggested", "推荐最佳时间与天数", "최적 시기와 일수 추천"),
  btn_mine: S("Lịch trình đã lưu", "Saved itineraries", "已保存的行程", "저장된 일정"),
  featured: S("Điểm đến nổi bật", "Featured destinations", "热门目的地", "추천 여행지"),
  only_saved: S("Chỉ hiện mục đã lưu", "Show favourites only", "仅显示收藏", "즐겨찾기만 보기"),

  panel_empty_title: S("Chọn một địa điểm trên bản đồ", "Pick a place on the map", "在地图上选择一个地点", "지도에서 장소를 선택하세요"),
  panel_empty_text: S(
    "Bấm vào một điểm đánh dấu để mở các lớp tri thức: lịch sử, di sản, văn hóa, ẩm thực, du lịch và câu chuyện.",
    "Click a marker to open its knowledge layers: history, heritage, culture, cuisine, travel and stories.",
    "点击地图上的标记，即可打开各层知识：历史、遗产、文化、美食、旅游和故事。",
    "마커를 누르면 역사, 유산, 문화, 음식, 여행, 이야기 등 지식 레이어가 열립니다."
  ),
  layers_title: S("Lớp tri thức", "Knowledge layers", "知识层", "지식 레이어"),
  layers_hint: S("Chọn một lớp để xem, hoặc xem tất cả", "Choose one layer, or view them all", "选择一层查看，或查看全部", "레이어를 선택하거나 전체를 보세요"),
  all_layers: S("Xem tất cả các lớp", "View all layers", "查看全部层", "모든 레이어 보기"),
  back: S("Quay lại", "Back", "返回", "뒤로"),
  back_layers: S("Các lớp tri thức", "Knowledge layers", "知识层", "지식 레이어"),
  sources: S("Nguồn tham khảo", "References", "参考来源", "참고 자료"),
  sources_note: S("Nội dung được tổng hợp và viết lại từ các nguồn trên.", "Content is summarised and rewritten from the sources above.", "内容根据以上来源整理并改写。", "위 자료를 바탕으로 요약·재작성한 내용입니다."),
  photo: S("Ảnh: Wikipedia", "Photo: Wikipedia", "图片：维基百科", "사진: 위키백과"),
  best_time: S("Thời điểm đẹp", "Best time", "最佳时间", "최적 시기"),
  suggested: S("Gợi ý", "Suggested", "建议", "추천"),
  save_fav: S("Lưu vào bộ sưu tập", "Add to favourites", "加入收藏", "즐겨찾기에 추가"),
  plan_here: S("Lập lịch trình cho nơi này", "Plan a trip here", "为此地制定行程", "이곳 일정 만들기"),
  close: S("Đóng", "Close", "关闭", "닫기"),

  // Itinerary builder
  ib_title: S("Tạo lịch trình khám phá", "Create an exploration itinerary", "创建探索行程", "탐험 일정 만들기"),
  ib_s1: S("Điểm đến và thời gian", "Destination & dates", "目的地与时间", "여행지와 시기"),
  ib_s2: S("Chọn địa điểm", "Choose places", "选择地点", "장소 선택"),
  ib_s3: S("Lịch trình", "Itinerary", "行程", "일정"),
  ib_pick_dest: S("Bạn muốn khám phá nơi nào?", "Where would you like to explore?", "你想探索哪里？", "어디를 탐험하고 싶으세요?"),
  ib_month: S("Tháng khởi hành", "Month of travel", "出行月份", "여행 월"),
  ib_month_hint: S("Chạm vào một tháng để chọn. Màu thể hiện mức thuận lợi (khí hậu, mưa, mùa lễ hội).", "Tap a month to choose it. Colour shows how favourable it is (climate, rain, festivals).", "点击月份即可选择。颜色表示适宜程度（气候、降雨、节庆）。", "월을 눌러 선택하세요. 색상은 기후·강수·축제 등을 고려한 적합도입니다."),
  lg_great: S("Rất đẹp", "Great", "极佳", "아주 좋음"),
  lg_ok: S("Ổn", "Fair", "尚可", "무난함"),
  lg_poor: S("Kém thuận lợi", "Less ideal", "较不理想", "비추천"),
  msg_great: S("Tháng này rất thích hợp để đi.", "This month is a great time to go.", "这个月非常适合出行。", "이 달은 여행하기 아주 좋습니다."),
  msg_ok: S("Tháng này đi được, thời tiết ở mức ổn.", "This month works; the weather is acceptable.", "这个月可以出行，天气尚可。", "이 달도 여행할 수 있으며 날씨는 무난합니다."),
  msg_poor: S("Tháng này kém thuận lợi (nóng hoặc mưa nhiều). Hãy cân nhắc tháng khác hoặc chuẩn bị kỹ.", "This month is less ideal (hot or rainy). Consider another month or prepare well.", "这个月较不理想（炎热或多雨）。建议考虑其他月份或做好准备。", "이 달은 덥거나 비가 많아 비추천입니다. 다른 달을 고려하거나 충분히 준비하세요."),
  ib_days: S("Số ngày đi", "Number of days", "出行天数", "여행 일수"),
  ib_people: S("Số người đi", "Number of travellers", "出行人数", "여행 인원"),
  ib_people_hint: S("Nhóm đông sẽ được xếp lịch thưa hơn mỗi ngày.", "Larger groups get a lighter schedule each day.", "人数较多时，每天的行程会安排得更宽松。", "인원이 많으면 하루 일정을 더 여유 있게 짭니다."),
  ib_interest: S("Bạn muốn khám phá điều gì?", "What would you like to explore?", "你想探索什么？", "무엇을 탐험하고 싶으세요?"),
  ib_interest_hint: S("Chọn một hoặc nhiều. Bỏ trống để hệ thống gợi ý cân bằng.", "Pick one or more. Leave empty for a balanced suggestion.", "可多选；不选则由系统给出均衡推荐。", "하나 이상 선택하세요. 비워 두면 균형 있게 추천합니다."),
  ib_match: S("Hợp sở thích", "Matches your interests", "符合你的兴趣", "관심사와 일치"),
  ib_group_tip: S("Nhóm đông: nên đặt bàn ăn, xe và vé trước, và để thêm thời gian di chuyển.", "Large group: book tables, transport and tickets ahead and allow extra travel time.", "人数较多：建议提前预订餐位、车辆和门票，并预留更多交通时间。", "인원이 많으니 식당·차량·입장권을 미리 예약하고 이동 시간을 넉넉히 잡으세요."),
  ib_suggest: S("Hệ thống gợi ý", "Suggested", "系统建议", "추천"),
  ib_next: S("Tiếp tục", "Continue", "继续", "다음"),
  ib_prev: S("Quay lại", "Back", "返回", "이전"),
  ib_auto: S("Chọn theo gợi ý của hệ thống", "Use the system’s picks", "使用系统推荐", "시스템 추천 선택"),
  ib_clear: S("Bỏ chọn tất cả", "Clear all", "全部取消", "모두 해제"),
  f_all: S("Tất cả", "All", "全部", "전체"),
  k_heritage: S("Di sản", "Heritage", "遗产", "유산"),
  k_culture: S("Văn hóa", "Culture", "文化", "문화"),
  k_food: S("Ẩm thực", "Food", "美食", "음식"),
  k_fun: S("Vui chơi & trải nghiệm", "Fun & experiences", "休闲与体验", "즐길 거리"),
  slot_morning: S("Sáng", "Morning", "上午", "오전"),
  slot_afternoon: S("Chiều", "Afternoon", "下午", "오후"),
  slot_evening: S("Tối", "Evening", "晚上", "저녁"),
  ib_recommended: S("Nên đi", "Must-see", "必去", "추천"),
  ib_over: S("Quá dày cho số ngày đã chọn. Hãy bỏ bớt địa điểm hoặc tăng số ngày.", "Too packed for the chosen days. Remove a place or add a day.", "所选天数安排过满。请减少地点或增加天数。", "선택한 일수에 비해 일정이 빡빡합니다. 장소를 줄이거나 일수를 늘리세요."),
  ib_fit: S("Khối lượng phù hợp với số ngày đã chọn.", "The workload fits your chosen days.", "行程量与所选天数相符。", "선택한 일수에 알맞은 일정량입니다."),
  ib_need_pick: S("Hãy chọn ít nhất 1 địa điểm để tiếp tục.", "Pick at least one place to continue.", "请至少选择一个地点再继续。", "계속하려면 장소를 하나 이상 선택하세요."),
  ib_move: S("Chuyển sang", "Move to", "移到", "이동"),
  ib_remove: S("Xóa khỏi lịch trình", "Remove from itinerary", "从行程中移除", "일정에서 삭제"),
  ib_regen: S("Sắp xếp lại tự động", "Re-arrange automatically", "自动重新安排", "자동 재배치"),
  ib_name: S("Tên lịch trình", "Itinerary name", "行程名称", "일정 이름"),
  ib_notes: S("Ghi chú", "Notes", "备注", "메모"),
  ib_notes_ph: S("Ví dụ: muốn đi chậm hơn, thêm một buổi cà phê...", "e.g. slower pace, add a café stop…", "例如：节奏放慢、增加咖啡店…", "예: 더 느긋하게, 카페 한 곳 추가…"),
  ib_save: S("Lưu lịch trình", "Save itinerary", "保存行程", "일정 저장"),
  ib_update: S("Cập nhật lịch trình", "Update itinerary", "更新行程", "일정 업데이트"),
  ib_saved: S("Đã lưu! Bạn có thể xem lại trong “Lịch trình của tôi”.", "Saved! Find it in “My trips” anytime.", "已保存！可随时在“我的行程”中查看。", "저장했습니다! ‘내 일정’에서 언제든 볼 수 있어요."),
  ib_view_saved: S("Xem lịch trình của tôi", "View my trips", "查看我的行程", "내 일정 보기"),
  ib_time_note: S("Giờ chỉ mang tính gợi ý; hãy kiểm tra giờ mở cửa thực tế.", "Times are suggestions; check real opening hours.", "时间仅供参考，请核对实际开放时间。", "시간은 참고용입니다. 실제 운영 시간을 확인하세요."),
  hours: S("giờ", "h", "小时", "시간"),

  // Saved trips
  sv_title: S("Lịch trình của tôi", "My trips", "我的行程", "내 일정"),
  sv_empty: S("Bạn chưa lưu lịch trình nào. Hãy tạo lịch trình đầu tiên!", "No saved trips yet. Create your first one!", "还没有保存的行程，来创建第一个吧！", "저장된 일정이 없습니다. 첫 일정을 만들어 보세요!"),
  sv_pick: S("Chọn một lịch trình để xem", "Select an itinerary to view", "选择一个行程查看", "일정을 선택하세요"),
  sv_edit: S("Chỉnh sửa", "Edit", "编辑", "수정"),
  sv_copy: S("Nhân bản để cải tiến", "Duplicate to improve", "复制并改进", "복제해서 개선"),
  sv_delete: S("Xóa", "Delete", "删除", "삭제"),
  sv_confirm: S("Xóa lịch trình này?", "Delete this itinerary?", "删除这个行程？", "이 일정을 삭제할까요?"),
  sv_notes: S("Ghi chú và rút kinh nghiệm", "Notes & lessons learned", "备注与心得", "메모와 개선점"),
  sv_notes_ph: S("Điều gì tốt? Điều gì cần cải thiện cho lần sau?", "What worked? What would you change next time?", "哪些不错？下次想改进什么？", "좋았던 점과 다음에 바꾸고 싶은 점은?"),
  sv_rating: S("Đánh giá chuyến đi", "Rate this trip", "为行程评分", "여행 평가"),
  sv_created: S("Tạo ngày", "Created", "创建于", "생성일"),
  sv_autosave: S("Tự động lưu", "Autosaved", "自动保存", "자동 저장"),
  sv_copy_suffix: S("(bản cải tiến)", "(improved copy)", "（改进版）", "(개선본)"),

  // Map labels
  g_laos: S("LÀO", "LAOS", "老挝", "라오스"),
  g_cambodia: S("CAMPUCHIA", "CAMBODIA", "柬埔寨", "캄보디아"),
  g_thailand: S("THÁI LAN", "THAILAND", "泰国", "태국"),
  g_china: S("TRUNG QUỐC", "CHINA", "中国", "중국"),
  g_east_sea: S("BIỂN ĐÔNG", "BIỂN ĐÔNG (East Sea)", "Biển Đông（南海）", "Biển Đông(남중국해)"),
  g_tonkin: S("Vịnh Bắc Bộ", "Gulf of Tonkin", "北部湾", "통킹만"),
  g_thai_gulf: S("Vịnh Thái Lan", "Gulf of Thailand", "泰国湾", "타이만"),
  g_hoang_sa: S("Quần đảo Hoàng Sa (Đà Nẵng, Việt Nam)", "Hoàng Sa (Paracel) Islands – Việt Nam", "Hoàng Sa群岛（越南）", "호앙사 군도 (베트남)"),
  g_truong_sa: S("Quần đảo Trường Sa (Khánh Hòa, Việt Nam)", "Trường Sa (Spratly) Islands – Việt Nam", "Trường Sa群岛（越南）", "쯔엉사 군도 (베트남)"),
  map_mode_map: S("Bản đồ", "Map", "地图", "지도"),
  map_mode_sat: S("Vệ tinh", "Satellite", "卫星", "위성"),
  map_credit: S("Ranh giới: Natural Earth (phạm vi công cộng). Vị trí các quần đảo mang tính minh họa.", "Boundaries: Natural Earth (public domain). Island positions are schematic.", "边界数据：Natural Earth（公有领域）。群岛位置仅为示意。", "경계: Natural Earth(퍼블릭 도메인). 군도 위치는 개략적 표시입니다."),

  // Người kể chuyện (Storyteller)
  story_btn: S("Nghe kể chuyện", "Hear the story", "听故事", "이야기 듣기"),
  story_btn_sub: S("Chữ chuyển động và giọng đọc", "Animated text and narration", "动态文字与语音", "움직이는 글과 음성"),
  story_random: S("Kể cho tôi nghe một câu chuyện", "Tell me a story", "给我讲个故事", "이야기 하나 들려줘"),
  story_random_hint: S("Hệ thống chọn ngẫu nhiên một địa danh", "We pick a place at random", "系统随机选择一个地点", "장소를 무작위로 골라 드려요"),
  story_title: S("Người kể chuyện", "Storyteller", "故事讲述者", "스토리텔러"),
  story_mode_short: S("Kể nhanh", "Quick tale", "快速讲述", "빠른 이야기"),
  story_mode_full: S("Kể đầy đủ", "Full story", "完整讲述", "전체 이야기"),
  story_play: S("Phát", "Play", "播放", "재생"),
  story_pause: S("Tạm dừng", "Pause", "暂停", "일시정지"),
  story_prev: S("Câu trước", "Previous", "上一句", "이전 문장"),
  story_next: S("Câu sau", "Next", "下一句", "다음 문장"),
  story_voice_on: S("Đang đọc thành tiếng. Bấm để tắt tiếng", "Narration on. Click to mute", "语音已开启，点击静音", "음성 켜짐. 눌러서 끄기"),
  story_voice_off: S("Đang tắt tiếng, chỉ hiện chữ. Bấm để bật giọng đọc", "Muted, text only. Click to turn narration on", "已静音，仅显示文字，点击开启语音", "음소거 상태(글만 표시). 눌러서 음성 켜기"),
  story_speed: S("Tốc độ", "Speed", "语速", "속도"),
  story_close: S("Đóng", "Close", "关闭", "닫기"),
  story_replay: S("Nghe lại từ đầu", "Replay", "重新开始", "처음부터 다시"),
  story_end_title: S("Hết rồi. Bạn muốn đi tiếp đâu?", "That's the story. Where next?", "故事讲完了。接下来去哪里？", "이야기가 끝났어요. 다음은 어디로 갈까요?"),
  story_end_layers: S("Xem các lớp tri thức", "Browse knowledge layers", "查看知识层", "지식 레이어 보기"),
  story_novoice: S("Máy của bạn chưa có giọng đọc cho ngôn ngữ này nên chỉ hiện chữ.", "Your device has no narration voice for this language, so only text is shown.", "你的设备没有此语言的语音，因此仅显示文字。", "이 기기에는 해당 언어의 음성이 없어 글만 표시합니다."),
  story_file: S("Đang phát file thuyết minh có sẵn", "Playing the prepared audio guide", "正在播放预制讲解音频", "준비된 오디오 가이드를 재생 중"),
  story_disclaimer: S("Lời kể được ghép từ nội dung có nguồn trong ứng dụng, không tự thêm dữ kiện.", "The story is assembled from the app's sourced content; no facts are added.", "讲述内容取自应用内有出处的资料，不会自行添加事实。", "이야기는 앱 안의 출처 있는 내용으로만 구성되며 사실을 임의로 더하지 않습니다."),
  story_intro_label: S("Mở đầu", "Opening", "开场", "시작"),
  story_outro_label: S("Lời kết", "Closing", "结语", "맺음"),
  story_about: S("khoảng", "about", "约", "약"),
  story_chapters: S("Chương", "Chapters", "章节", "챕터"),
};

// "khoảng 1 phút" / "about 1 min" / "约1分钟" / "약 1분"
export function approxMinutes(lang, ms) {
  const m = Math.max(1, Math.round(ms / 60000));
  if (lang === "vi") return `khoảng ${m} phút`;
  if (lang === "zh") return `约${m}分钟`;
  if (lang === "ko") return `약 ${m}분`;
  return `about ${m} min`;
}

export function tr(lang, key) {
  const e = UI[key];
  if (!e) return key;
  return e[lang] ?? e.vi;
}

// Lấy chuỗi theo ngôn ngữ từ đối tượng {vi,en,zh,ko}
export function pick(obj, lang) {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return obj[lang] || obj.vi || obj.en || "";
}

export function dayWord(lang, n) {
  if (lang === "vi") return `${n} ngày`;
  if (lang === "zh") return `${n}天`;
  if (lang === "ko") return `${n}일`;
  return n === 1 ? "1 day" : `${n} days`;
}

export function peopleWord(lang, n) {
  if (lang === "vi") return `${n} người`;
  if (lang === "zh") return `${n}人`;
  if (lang === "ko") return `${n}명`;
  return n === 1 ? "1 person" : `${n} people`;
}

export function dayLabel(lang, n) {
  if (lang === "vi") return `Ngày ${n}`;
  if (lang === "zh") return `第${n}天`;
  if (lang === "ko") return `${n}일차`;
  return `Day ${n}`;
}

export function monthLabel(lang, m) {
  if (lang === "vi") return `Th${m}`;
  if (lang === "zh") return `${m}月`;
  if (lang === "ko") return `${m}월`;
  return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][m - 1];
}

export function monthFull(lang, m) {
  if (lang === "vi") return `tháng ${m}`;
  if (lang === "zh") return `${m}月`;
  if (lang === "ko") return `${m}월`;
  return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][m - 1];
}

export function placesCount(lang, n) {
  if (lang === "vi") return `${n} địa điểm`;
  if (lang === "zh") return `${n}个地点`;
  if (lang === "ko") return `${n}곳`;
  return n === 1 ? "1 place" : `${n} places`;
}

export function itemsCount(lang, n) {
  if (lang === "vi") return `${n} mục`;
  if (lang === "zh") return `${n}项`;
  if (lang === "ko") return `${n}개`;
  return n === 1 ? "1 item" : `${n} items`;
}

// Chuẩn hóa chuỗi để tìm kiếm không dấu
export function norm(s = "") {
  return String(s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}
