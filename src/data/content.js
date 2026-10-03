// Dữ liệu nội dung: 3 địa danh tiêu biểu của 3 miền, 6 lớp tri thức, 4 ngôn ngữ (vi, en, zh, ko).
// Nội dung được tổng hợp và viết lại bằng lời của nhóm từ các nguồn ghi ở mục "sources".
// L(vi, en, zh, ko) tạo ra đối tượng đa ngôn ngữ.
const L = (vi, en, zh, ko) => ({ vi, en, zh, ko });

export const LAYERS = [
  { id: "history", icon: "◷", color: "#8a6d3b", name: L("Lịch sử hình thành", "History", "历史沿革", "역사"), desc: L("Nguồn gốc và các mốc thời gian", "Origins and key dates", "起源与重要年代", "기원과 주요 연대") },
  { id: "heritage", icon: "⌂", color: "#c8553d", name: L("Di sản", "Heritage", "遗产", "유산"), desc: L("Công trình, di tích tiêu biểu", "Landmark monuments and sites", "代表性建筑与遗迹", "대표 건축과 유적") },
  { id: "culture", icon: "♬", color: "#8a63c9", name: L("Văn hóa", "Culture", "文化", "문화"), desc: L("Nghệ thuật, phong tục, đời sống", "Arts, customs and daily life", "艺术、习俗与生活", "예술, 풍습, 생활") },
  { id: "food", icon: "○", color: "#d98a1f", name: L("Ẩm thực", "Cuisine", "美食", "음식"), desc: L("Món ăn đặc trưng nên thử", "Signature dishes to try", "值得一试的特色美食", "꼭 맛봐야 할 대표 음식") },
  { id: "tourism", icon: "⚑", color: "#2f8f83", name: L("Du lịch", "Travel", "旅游", "여행"), desc: L("Nơi nên đến và cách trải nghiệm", "Where to go and what to do", "必去之处与体验方式", "가볼 곳과 즐기는 법") },
  { id: "story", icon: "◈", color: "#3f86b8", name: L("Câu chuyện đặc trưng", "Signature stories", "特色故事", "대표 이야기"), desc: L("Truyền thuyết, giai thoại, chuyện xưa", "Legends and tales", "传说与轶事", "전설과 일화") },
];

export const REGIONS = {
  north: { name: L("Miền Bắc", "Northern Vietnam", "北部", "북부"), color: "#e8604c" },
  central: { name: L("Miền Trung", "Central Vietnam", "中部", "중부"), color: "#8a63c9" },
  south: { name: L("Miền Nam", "Southern Vietnam", "南部", "남부"), color: "#2f8f83" },
};

export const DESTINATIONS = [
  // ------------------------------------------------------------------ HÀ NỘI
  {
    id: "ha-noi",
    region: "north",
    coords: [21.0285, 105.8542],
    hero: ["Hoàn Kiếm Lake", "Hanoi"],
    name: L("Hà Nội", "Hanoi", "河内", "하노이"),
    tagline: L("Nghìn năm Thăng Long, nơi quá khứ vẫn thở giữa phố", "A thousand years of Thăng Long, where the past still breathes in the streets", "千年升龙，古老的记忆仍在街巷间呼吸", "천 년 탕롱의 도시, 과거가 거리 곳곳에 살아 숨 쉬는 곳"),
    intro: L(
      "Thủ đô của Việt Nam bên sông Hồng, nơi hội tụ lịch sử ngàn năm, phố cổ, hồ nước và ẩm thực tinh tế.",
      "Việt Nam’s capital on the Red River, where a thousand years of history, the Old Quarter, lakes and refined cuisine come together.",
      "越南首都，坐落在红河畔，汇集千年历史、老城区、湖泊与精致美食。",
      "홍강변의 베트남 수도로, 천 년의 역사와 구시가지, 호수, 섬세한 음식이 한데 어우러진 곳입니다."
    ),
    bestMonths: [2, 2, 3, 3, 2, 1, 1, 1, 3, 3, 3, 2],
    bestNote: L(
      "Đẹp nhất vào tháng 9–11 (thu mát, hoa sữa) và tháng 3–4 (xuân dịu). Tháng 6–8 nóng và nhiều mưa; tháng 12–2 se lạnh, hay có mưa phùn.",
      "Best in September–November (cool autumn) and March–April (mild spring). June–August is hot and rainy; December–February is chilly with frequent drizzle.",
      "9月至11月（凉爽的秋天）和3月至4月（温和的春天）最佳。6月至8月炎热多雨；12月至2月偏冷，常有细雨。",
      "9~11월(선선한 가을)과 3~4월(온화한 봄)이 가장 좋습니다. 6~8월은 덥고 비가 많고, 12~2월은 쌀쌀하며 이슬비가 잦습니다."
    ),
    suggestedDays: 3,
    daysRange: [3, 4],
    sources: [
      { label: "UNESCO – Thăng Long Imperial Citadel", url: "https://whc.unesco.org/en/list/1328" },
      { label: "Wikipedia – Imperial Citadel of Thăng Long", url: "https://en.wikipedia.org/wiki/Imperial_Citadel_of_Th%C4%83ng_Long" },
      { label: "Hoàng thành Thăng Long", url: "https://hoangthanhthanglong.vn/en/4281-2/" },
      { label: "Wikipedia – Hà Nội", url: "https://vi.wikipedia.org/wiki/H%C3%A0_N%E1%BB%99i" },
    ],
    entries: [
      {
        id: "hn-h1", layer: "history", wiki: ["Lý Thái Tổ", "Ly Thai To"],
        title: L("Từ Đại La đến Thăng Long (1010)", "From Đại La to Thăng Long (1010)", "从大罗到升龙（1010年）", "다라에서 탕롱으로 (1010년)"),
        body: L(
          "Năm 1010, vua Lý Thái Tổ dời đô từ Hoa Lư về thành Đại La và đặt tên là Thăng Long, nghĩa là “rồng bay lên”. Trong nhiều thế kỷ, nơi đây là trung tâm chính trị của Đại Việt.",
          "In 1010, Emperor Lý Thái Tổ moved the capital from Hoa Lư to the Đại La citadel and renamed it Thăng Long, “the ascending dragon”. For centuries it remained the political heart of Đại Việt.",
          "1010年，李太祖将都城从华闾迁至大罗城，并改名“升龙”，意为“腾飞的龙”。此后数百年间，升龙一直是大越的政治中心。",
          "1010년 리 타이또 왕은 수도를 호아르에서 다라 성으로 옮기고 ‘탕롱(昇龍)’, 곧 ‘날아오르는 용’이라 이름 붙였습니다. 이후 탕롱은 오랫동안 다이비엣의 정치 중심지였습니다."
        ),
      },
      {
        id: "hn-h2", layer: "history", wiki: ["Hanoi"],
        title: L("Hà Nội qua các thời kỳ", "Hanoi through the ages", "河内的历史变迁", "시대별 하노이"),
        body: L(
          "Tên gọi Hà Nội có từ năm 1831 dưới thời vua Minh Mạng. Thời Pháp thuộc, thành phố được quy hoạch lại với nhiều công trình kiểu châu Âu. Từ năm 1976, Hà Nội là thủ đô của nước Việt Nam thống nhất.",
          "The name Hà Nội dates from 1831, under Emperor Minh Mạng. During the French period the city was replanned with many European-style buildings. Since 1976 Hà Nội has been the capital of unified Việt Nam.",
          "“河内”之名始于1831年明命帝时期。法属时期，城市被重新规划，出现许多欧式建筑。自1976年起，河内成为统一后越南的首都。",
          "‘하노이’라는 이름은 1831년 민망 황제 때 생겼습니다. 프랑스 식민지 시기에 도시가 재정비되며 유럽풍 건물이 많이 들어섰고, 1976년부터 통일 베트남의 수도가 되었습니다."
        ),
      },
      {
        id: "hn-d1", layer: "heritage", wiki: ["Imperial Citadel of Thăng Long"],
        title: L("Hoàng thành Thăng Long", "Thăng Long Imperial Citadel", "升龙皇城", "탕롱 황성"),
        body: L(
          "Khu trung tâm Hoàng thành Thăng Long được UNESCO ghi danh Di sản thế giới năm 2010. Di tích do triều Lý xây dựng từ thế kỷ 11 và lưu giữ nhiều tầng văn hóa nối tiếp qua các triều đại Lý, Trần, Lê đến Nguyễn.",
          "The central sector of the Thăng Long Imperial Citadel was inscribed as a UNESCO World Heritage Site in 2010. Begun by the Lý dynasty in the 11th century, it preserves cultural layers from the Lý, Trần, Lê and Nguyễn eras.",
          "升龙皇城中心区于2010年被联合国教科文组织列入世界遗产名录。遗址始建于11世纪李朝，保存着李、陈、黎直至阮朝各个时期的文化层。",
          "탕롱 황성 중심 구역은 2010년 유네스코 세계유산으로 등재되었습니다. 11세기 리 왕조 때 조성되어 리·쩐·레·응우옌 왕조에 이르는 여러 문화층이 남아 있습니다."
        ),
      },
      {
        id: "hn-d2", layer: "heritage", wiki: ["Temple of Literature, Hanoi"],
        title: L("Văn Miếu – Quốc Tử Giám", "Temple of Literature", "文庙–国子监", "문묘–국자감"),
        body: L(
          "Văn Miếu được xây năm 1070 dưới thời vua Lý Thánh Tông để thờ Khổng Tử, và Quốc Tử Giám lập năm 1076 được xem là trường đại học đầu tiên của Việt Nam. Khu vườn bia có 82 bia tiến sĩ ghi tên những người đỗ đạt các khoa thi từ 1442 đến 1779.",
          "The Temple of Literature was built in 1070 under Emperor Lý Thánh Tông to honour Confucius, and the Imperial Academy founded in 1076 is regarded as Việt Nam’s first university. Its stelae garden holds 82 doctoral stelae recording exam graduates from 1442 to 1779.",
          "文庙建于1070年李圣宗时期，用于祭祀孔子；1076年设立的国子监被视为越南第一所大学。碑林中的82块进士题名碑，记录了1442年至1779年历科考试的及第者。",
          "문묘는 1070년 리 타인똥 황제 때 공자를 모시기 위해 세워졌고, 1076년 설립된 국자감은 베트남 최초의 대학으로 여겨집니다. 비석 정원에는 1442~1779년 과거 급제자를 새긴 진사비 82기가 있습니다."
        ),
      },
      {
        id: "hn-c1", layer: "culture", wiki: ["Ca trù"],
        title: L("Ca trù – hát nói của người Hà thành", "Ca trù, the sung poetry of old Hanoi", "歌筹——河内的说唱艺术", "까쭈—하노이의 노래 시"),
        body: L(
          "Ca trù là lối hát nói kết hợp thơ, nhạc và nhịp phách, thường có đàn đáy, phách và trống chầu đi kèm. Năm 2009, UNESCO ghi danh ca trù vào Danh sách Di sản văn hóa phi vật thể cần bảo vệ khẩn cấp.",
          "Ca trù is a sung-poetry art accompanied by the đàn đáy lute, a bamboo clapper and a praise drum. In 2009 UNESCO placed it on the List of Intangible Cultural Heritage in Need of Urgent Safeguarding.",
          "歌筹是一种以诗歌、音乐和节拍相结合的说唱艺术，常以底琴、竹板和赞鼓伴奏。2009年，联合国教科文组织将其列入急需保护的非物质文化遗产名录。",
          "까쭈는 시와 음악, 박자가 어우러진 노래 예술로, 보통 닷 기타(đàn đáy)와 대나무 딱따기, 북이 함께합니다. 2009년 유네스코 긴급 보호가 필요한 무형문화유산 목록에 올랐습니다."
        ),
      },
      {
        id: "hn-c2", layer: "culture", wiki: ["Water puppetry"],
        title: L("Múa rối nước", "Water puppetry", "水上木偶戏", "수상 인형극"),
        body: L(
          "Múa rối nước ra đời từ đời sống lúa nước ở đồng bằng Bắc Bộ: nghệ nhân đứng sau tấm mành, điều khiển con rối trên mặt nước. Du khách có thể xem tại nhà hát Múa rối Thăng Long gần Hồ Gươm.",
          "Water puppetry grew out of rice-farming life in the Red River Delta: puppeteers stand behind a screen and move the puppets across the water. Visitors can watch it at the Thăng Long Water Puppet Theatre near Hoàn Kiếm Lake.",
          "水上木偶戏源于红河三角洲的稻作生活：艺人躲在幕后，在水面上操纵木偶。游客可在还剑湖附近的升龙水上木偶剧院观看。",
          "수상 인형극은 홍강 삼각주의 벼농사 생활에서 나왔으며, 연희자가 막 뒤에서 물 위의 인형을 조종합니다. 호안끼엠 호수 근처 탕롱 수상 인형극장에서 볼 수 있습니다."
        ),
      },
      {
        id: "hn-f1", layer: "food", wiki: ["Phở"],
        title: L("Phở Hà Nội", "Hanoi phở", "河内河粉", "하노이 쌀국수(포)"),
        body: L(
          "Phở Hà Nội nổi tiếng với nước dùng hầm xương trong, thơm mùi quế, hồi và gừng nướng, bánh phở mềm cùng thịt bò tái hoặc gà. Món ăn hình thành ở miền Bắc vào đầu thế kỷ 20 và nay là biểu tượng ẩm thực của Việt Nam.",
          "Hanoi phở is known for a clear bone broth scented with cinnamon, star anise and grilled ginger, soft rice noodles, and rare beef or chicken. It took shape in northern Việt Nam in the early 20th century and is now a symbol of Vietnamese cuisine.",
          "河内河粉以清澈的骨头汤底闻名，带有肉桂、八角和烤姜的香气，配软滑的米粉和嫩牛肉或鸡肉。它于20世纪初形成于越南北部，如今是越南美食的象征。",
          "하노이 쌀국수 ‘포’는 계피·팔각·구운 생강 향이 나는 맑은 사골 육수, 부드러운 쌀국수, 살짝 익힌 소고기나 닭고기가 특징입니다. 20세기 초 북부에서 자리 잡아 지금은 베트남 음식의 상징이 되었습니다."
        ),
      },
      {
        id: "hn-f2", layer: "food", wiki: ["Bún chả"],
        title: L("Bún chả và chả cá", "Bún chả and chả cá", "烤肉米线与煎鱼", "분짜와 짜까"),
        body: L(
          "Bún chả gồm chả thịt nướng than hoa ăn cùng bún, nước chấm chua ngọt và rau sống, là món quen thuộc của bữa trưa Hà Nội. Chả cá nướng với nghệ và thì là, ăn kèm bún và mắm tôm, là một đặc sản khác.",
          "Bún chả is charcoal-grilled pork served with rice vermicelli, sweet-sour dipping sauce and fresh herbs, a Hanoi lunch favourite. Chả cá, fish grilled with turmeric and dill and eaten with noodles and shrimp paste, is another local speciality.",
          "烤肉米线（Bún chả）是炭烤肉配米线、酸甜蘸汁和生菜，是河内人常吃的午餐。姜黄莳萝煎烤鱼（Chả cá）配米线和虾酱，是另一道特色美食。",
          "분짜는 숯불에 구운 고기를 쌀국수, 새콤달콤한 소스, 생채소와 함께 먹는 하노이 점심의 대표 메뉴입니다. 강황과 딜을 넣어 구운 생선 ‘짜까’는 국수와 새우젓을 곁들이는 또 다른 명물입니다."
        ),
      },
      {
        id: "hn-t1", layer: "tourism", wiki: ["Hoàn Kiếm Lake"],
        title: L("Hồ Hoàn Kiếm và Phố cổ", "Hoàn Kiếm Lake and the Old Quarter", "还剑湖与老城区", "호안끼엠 호수와 구시가지"),
        body: L(
          "Hồ Hoàn Kiếm là trái tim Hà Nội, với tháp Rùa và đền Ngọc Sơn. Từ hồ đi bộ vài phút là khu Phố cổ với 36 phố phường, nơi mỗi con phố xưa gắn với một nghề thủ công.",
          "Hoàn Kiếm Lake is the heart of Hà Nội, with Turtle Tower and Ngọc Sơn Temple. A few minutes’ walk away lies the Old Quarter and its “36 streets”, each once tied to a particular craft.",
          "还剑湖是河内的心脏，湖中有龟塔和玉山祠。从湖边步行几分钟就到老城区的“三十六行街”，每条街过去都对应一种手工行业。",
          "호안끼엠 호수는 거북탑과 응옥썬 사당이 있는 하노이의 중심입니다. 걸어서 몇 분이면 ‘36거리’로 불리는 구시가지가 나오며, 거리마다 예전에 특정 수공업이 모여 있었습니다."
        ),
      },
      {
        id: "hn-t2", layer: "tourism", wiki: ["West Lake (Hanoi)", "Trấn Quốc Pagoda"],
        title: L("Hồ Tây và chùa Trấn Quốc", "West Lake and Trấn Quốc Pagoda", "西湖与镇国寺", "서호와 쩐꾸옥 사원"),
        body: L(
          "Hồ Tây là hồ nước ngọt lớn nhất nội thành, nổi tiếng với hoàng hôn và các quán ven hồ. Chùa Trấn Quốc nằm trên một bán đảo nhỏ, được coi là một trong những ngôi chùa lâu đời nhất Hà Nội.",
          "West Lake is the largest freshwater lake in the city, known for its sunsets and lakeside cafés. Trấn Quốc Pagoda sits on a small peninsula and is regarded as one of Hà Nội’s oldest pagodas.",
          "西湖是市区最大的淡水湖，以日落和湖畔咖啡馆闻名。镇国寺坐落在湖中小半岛上，被认为是河内最古老的寺庙之一。",
          "서호는 시내에서 가장 큰 담수호로 석양과 호숫가 카페로 유명합니다. 쩐꾸옥 사원은 작은 반도 위에 있으며 하노이에서 가장 오래된 사원 중 하나로 꼽힙니다."
        ),
      },
      {
        id: "hn-s1", layer: "story", wiki: ["Turtle Tower", "Hoàn Kiếm Lake"],
        title: L("Truyền thuyết Hồ Gươm", "The legend of the Returned Sword", "还剑湖的传说", "호안끼엠 호수의 전설"),
        body: L(
          "Theo truyền thuyết, Lê Lợi được Long Quân cho mượn gươm thần để đánh giặc Minh. Thắng trận, ông dạo thuyền trên hồ thì Rùa Vàng nổi lên đòi lại gươm, nên hồ có tên Hoàn Kiếm, nghĩa là hồ “trả gươm”.",
          "Legend says Lê Lợi was lent a magic sword by the Dragon King to fight the Ming army. After victory, a Golden Turtle surfaced on the lake to claim it back, hence the name Hoàn Kiếm, “Lake of the Returned Sword”.",
          "传说黎利得到龙王借出的神剑，用来抗击明军。胜利后他在湖上泛舟，金龟浮出水面索回宝剑，湖因此得名“还剑湖”。",
          "전설에 따르면 레러이는 용왕에게 신검을 빌려 명나라 군대와 싸웠습니다. 승리 후 호수에서 배를 타자 금빛 거북이 나타나 검을 돌려받아 갔고, 그래서 ‘검을 돌려준 호수’라는 뜻의 호안끼엠이라 불리게 되었습니다."
        ),
      },
      {
        id: "hn-s2", layer: "story", wiki: ["Red River (Asia)"],
        title: L("Rồng vàng trên sông Hồng", "The golden dragon over the Red River", "红河上空的金龙", "홍강 위의 금빛 용"),
        body: L(
          "Sử sách chép rằng khi thuyền vua đến đậu dưới thành Đại La, có rồng vàng bay lên. Lý Thái Tổ coi đó là điềm lành nên đặt tên kinh đô mới là Thăng Long.",
          "Chronicles tell that as the royal boat anchored beneath the Đại La citadel, a golden dragon rose into the sky. Lý Thái Tổ took it as a good omen and named his new capital Thăng Long.",
          "史书记载，御舟停靠在大罗城下时，有金龙腾空而起。李太祖视为吉兆，便将新都命名为升龙。",
          "사서에는 왕의 배가 다라 성 아래에 닿을 때 금빛 용이 날아올랐다고 전합니다. 리 타이또 왕은 이를 길조로 여겨 새 수도를 탕롱이라 이름 지었습니다."
        ),
      },
    ],
    places: [
      { id: "hn-vm", kind: "heritage", hours: 1.5, slot: "morning", zone: 1, must: true, name: L("Văn Miếu – Quốc Tử Giám", "Temple of Literature", "文庙–国子监", "문묘–국자감"), note: L("Trường đại học đầu tiên của Việt Nam", "Việt Nam’s first university", "越南第一所大学", "베트남 최초의 대학") },
      { id: "hn-ht", kind: "heritage", hours: 2, slot: "morning", zone: 1, must: true, name: L("Hoàng thành Thăng Long", "Thăng Long Imperial Citadel", "升龙皇城", "탕롱 황성"), note: L("Di sản thế giới UNESCO", "UNESCO World Heritage", "世界遗产", "유네스코 세계유산") },
      { id: "hn-lb", kind: "heritage", hours: 1.5, slot: "morning", zone: 1, must: false, name: L("Quảng trường Ba Đình và Lăng Bác", "Ba Đình Square & Hồ Chí Minh Mausoleum", "巴亭广场与胡志明陵", "바딘 광장과 호찌민 묘"), note: L("Nên kiểm tra lịch mở cửa trước khi đi", "Check opening days beforehand", "出发前请确认开放时间", "방문 전 개방일 확인") },
      { id: "hn-hg", kind: "fun", hours: 1.5, slot: "evening", zone: 2, must: true, name: L("Hồ Hoàn Kiếm và đền Ngọc Sơn", "Hoàn Kiếm Lake & Ngọc Sơn Temple", "还剑湖与玉山祠", "호안끼엠 호수와 응옥썬 사당"), note: L("Dạo bộ, đẹp nhất lúc sáng sớm hoặc chiều tối", "A walk, best early or at dusk", "适合散步，清晨或傍晚最佳", "산책하기 좋음, 이른 아침·해질녘 추천") },
      { id: "hn-pc", kind: "culture", hours: 2.5, slot: "afternoon", zone: 2, must: true, name: L("Phố cổ 36 phố phường", "Old Quarter (36 streets)", "三十六行街老城区", "36거리 구시가지"), note: L("Mua sắm, ăn vặt, ngắm nhà cổ", "Shops, snacks, old houses", "购物、小吃、老宅", "쇼핑, 간식, 옛 가옥") },
      { id: "hn-ph", kind: "food", hours: 1, slot: "morning", zone: 2, must: true, name: L("Phở buổi sáng", "Morning phở", "早餐河粉", "아침 쌀국수(포)"), note: L("Đi sớm khi nước dùng còn tươi", "Go early for the freshest broth", "趁早去，汤底最新鲜", "이른 시간이 육수가 가장 좋음") },
      { id: "hn-bc", kind: "food", hours: 1, slot: "afternoon", zone: 2, must: false, name: L("Bún chả và chả cá", "Bún chả & chả cá", "烤肉米线与煎鱼", "분짜와 짜까"), note: L("Bữa trưa đặc trưng của Hà Nội", "A classic Hanoi lunch", "河内经典午餐", "하노이의 대표 점심") },
      { id: "hn-mr", kind: "culture", hours: 1, slot: "evening", zone: 2, must: false, name: L("Múa rối nước Thăng Long", "Water puppet show", "升龙水上木偶戏", "수상 인형극"), note: L("Suất diễn khoảng 1 giờ, nên đặt vé trước", "About 1 hour; book ahead", "约1小时，建议提前订票", "약 1시간, 사전 예매 권장") },
      { id: "hn-ht2", kind: "fun", hours: 2, slot: "afternoon", zone: 3, must: false, name: L("Hồ Tây và chùa Trấn Quốc", "West Lake & Trấn Quốc Pagoda", "西湖与镇国寺", "서호와 쩐꾸옥 사원"), note: L("Ngắm hoàng hôn bên hồ", "Sunset by the lake", "湖畔看日落", "호숫가 석양") },
    ],
  },

  // ------------------------------------------------------------------ HUẾ
  {
    id: "hue",
    region: "central",
    coords: [16.4637, 107.5909],
    hero: ["Imperial City, Huế", "Huế"],
    name: L("Huế", "Huế", "顺化", "후에"),
    tagline: L("Cố đô thanh nhã bên dòng Hương", "The graceful old capital on the Perfume River", "香江畔典雅的古都", "향강 변의 우아한 옛 수도"),
    intro: L(
      "Kinh đô của triều Nguyễn gần 150 năm (1802–1945), Huế lưu giữ cung điện, lăng tẩm, Nhã nhạc và nếp sống thanh nhã.",
      "Capital of the Nguyễn dynasty for nearly 150 years (1802–1945), Huế keeps its palaces, royal tombs, court music and a refined way of life.",
      "作为阮朝近150年（1802—1945）的都城，顺化保存着宫殿、帝陵、宫廷雅乐和典雅的生活方式。",
      "1802~1945년, 거의 150년간 응우옌 왕조의 수도였던 후에는 궁궐과 능, 궁중음악, 우아한 생활문화를 간직하고 있습니다."
    ),
    bestMonths: [2, 3, 3, 3, 2, 1, 1, 1, 1, 1, 1, 1],
    bestNote: L(
      "Đẹp nhất vào tháng 2–4: trời dịu, ít mưa. Tháng 5–8 khá nóng; tháng 9–12 mưa nhiều, dễ có bão và lũ.",
      "Best in February–April: mild and fairly dry. May–August is hot; September–December is rainy with a higher risk of storms and floods.",
      "2月至4月最佳：天气温和、雨量较少。5月至8月较热；9月至12月多雨，易有风暴和洪水。",
      "2~4월이 가장 좋습니다. 날씨가 온화하고 비가 적습니다. 5~8월은 덥고, 9~12월은 비가 많아 태풍과 홍수 위험이 큽니다."
    ),
    suggestedDays: 3,
    daysRange: [2, 3],
    sources: [
      { label: "UNESCO – Complex of Huế Monuments", url: "https://whc.unesco.org/en/list/678" },
      { label: "Báo Văn hóa – Di sản Cố đô: trao truyền và hội tụ", url: "https://baovanhoa.vn/di-san/di-san-co-do-trao-truyen-va-hoi-tu-3748.html" },
      { label: "Nhà đầu tư – 8 di sản thế giới tại Huế", url: "https://nhadautu.vn/kham-pha-8-di-san-the-gioi-tai-hue-d92163.html" },
      { label: "Báo Pháp luật – Nhã nhạc cung đình Huế", url: "https://baophapluat.vn/nha-nhac-cung-dinh-hue-di-san-van-hoa-nhan-loai-post23170.html" },
    ],
    entries: [
      {
        id: "hue-h1", layer: "history", wiki: ["Nguyễn dynasty"],
        title: L("Từ Thuận Hóa đến kinh đô Huế", "From Thuận Hóa to the imperial capital", "从顺化到帝都", "투언호아에서 제국의 수도로"),
        body: L(
          "Từ giữa thế kỷ 16, Thuận Hóa là nơi các chúa Nguyễn gây dựng cơ nghiệp, và Phú Xuân sau đó trở thành thủ phủ Đàng Trong. Năm 1802, Nguyễn Ánh lên ngôi, lấy niên hiệu Gia Long, lập triều Nguyễn và chọn Huế làm kinh đô.",
          "From the mid-16th century Thuận Hóa was the base of the Nguyễn lords, and Phú Xuân later became the capital of Đàng Trong. In 1802 Nguyễn Ánh took the throne as Gia Long, founded the Nguyễn dynasty and chose Huế as its capital.",
          "自16世纪中叶起，顺化是阮主经营基业之地，富春后来成为南河（广南国）的都城。1802年，阮映登基，年号嘉隆，建立阮朝并定都顺化。",
          "16세기 중반부터 투언호아는 응우옌 영주들이 세력을 일군 곳이었고, 푸쑤언은 이후 당쫑(남부 정권)의 수도가 되었습니다. 1802년 응우옌 아인이 자롱 황제로 즉위해 응우옌 왕조를 세우고 후에를 수도로 삼았습니다."
        ),
      },
      {
        id: "hue-h2", layer: "history", wiki: ["Huế Citadel", "Huế"],
        title: L("Kinh thành Huế và triều Nguyễn", "The Huế Citadel and the Nguyễn dynasty", "顺化京城与阮朝", "후에 황성과 응우옌 왕조"),
        body: L(
          "Kinh thành Huế được xây dựng từ năm 1805 dưới thời vua Gia Long, kết hợp kiến trúc phương Đông với kỹ thuật thành lũy phương Tây, tận dụng núi Ngự Bình và sông Hương. Triều Nguyễn đóng đô tại đây đến khi vua Bảo Đại thoái vị năm 1945.",
          "Construction of the Huế Citadel began in 1805 under Gia Long, blending Eastern design with Western fortification techniques and using Ngự Bình Mountain and the Perfume River as part of its layout. The Nguyễn court stayed here until Emperor Bảo Đại abdicated in 1945.",
          "顺化京城自1805年嘉隆帝时期开始营建，将东方建筑理念与西方城堡技术相结合，并借用御屏山与香江的地势。阮朝在此定都，直至1945年保大帝退位。",
          "후에 황성은 1805년 자롱 황제 때 짓기 시작해 동양 건축과 서양식 성채 기술을 결합했고, 응우벵 산과 흐엉강의 지형을 활용했습니다. 응우옌 왕실은 1945년 바오다이 황제가 퇴위할 때까지 이곳에 도읍했습니다."
        ),
      },
      {
        id: "hue-d1", layer: "heritage", wiki: ["Complex of Huế Monuments"],
        title: L("Quần thể di tích Cố đô Huế", "Complex of Huế Monuments", "顺化古都建筑群", "후에 고도 유적군"),
        body: L(
          "Ngày 11/12/1993, UNESCO công nhận Quần thể di tích Cố đô Huế là Di sản văn hóa thế giới, di sản đầu tiên của Việt Nam. Quần thể gồm Kinh thành, Hoàng thành, Tử Cấm thành và hệ thống lăng tẩm các vua Nguyễn.",
          "On 11 December 1993 UNESCO inscribed the Complex of Huế Monuments as a World Heritage Site, the first in Việt Nam. It includes the Citadel, the Imperial City, the Forbidden Purple City and the tombs of the Nguyễn emperors.",
          "1993年12月11日，联合国教科文组织将顺化古都建筑群列为世界文化遗产，这是越南的第一处世界遗产。建筑群包括京城、皇城、紫禁城和阮朝历代帝陵。",
          "1993년 12월 11일 유네스코는 후에 고도 유적군을 세계문화유산으로 등재했으며, 이는 베트남 최초의 세계유산입니다. 성채, 황궁, 자금성(紫禁城)과 응우옌 황제들의 능이 포함됩니다."
        ),
      },
      {
        id: "hue-d2", layer: "heritage", wiki: ["Thiên Mụ Pagoda"],
        title: L("Chùa Thiên Mụ", "Thiên Mụ Pagoda", "天姥寺", "티엔무 사원"),
        body: L(
          "Chùa Thiên Mụ nằm trên đồi Hà Khê bên sông Hương, do chúa Nguyễn Hoàng cho dựng năm 1601. Tháp Phước Duyên bảy tầng là biểu tượng của chùa và của cả thành phố.",
          "Thiên Mụ Pagoda stands on Hà Khê Hill beside the Perfume River; Lord Nguyễn Hoàng had it built in 1601. The seven-storey Phước Duyên Tower is the symbol of the pagoda and the city.",
          "天姥寺坐落在香江畔的河溪山丘上，由阮潢于1601年下令修建。七层的福缘塔是寺庙乃至整座城市的象征。",
          "티엔무 사원은 흐엉강변 하카이 언덕에 있으며 1601년 응우옌호앙 영주가 세웠습니다. 7층의 푹주옌 탑은 이 사원과 도시의 상징입니다."
        ),
      },
      {
        id: "hue-c1", layer: "culture", wiki: ["Nhã nhạc"],
        title: L("Nhã nhạc cung đình Huế", "Huế court music (Nhã nhạc)", "顺化宫廷雅乐", "후에 궁중음악 냐냑"),
        body: L(
          "Nhã nhạc là âm nhạc dùng trong các đại lễ và lễ tế của triều đình. Ngày 7/11/2003, UNESCO công bố Nhã nhạc, âm nhạc cung đình Việt Nam, là Kiệt tác truyền khẩu và phi vật thể của nhân loại; ngày nay vẫn được biểu diễn tại các di tích ở Huế.",
          "Nhã nhạc is the music of the court’s great ceremonies and rituals. On 7 November 2003 UNESCO proclaimed Nhã nhạc, Vietnamese court music, a Masterpiece of the Oral and Intangible Heritage of Humanity; it is still performed at Huế’s monuments today.",
          "雅乐是宫廷大典和祭礼所用的音乐。2003年11月7日，联合国教科文组织宣布越南宫廷雅乐为“人类口头和非物质遗产代表作”，如今仍在顺化的古迹中演出。",
          "냐냑(아악)은 궁중 대례와 제례에서 연주된 음악입니다. 2003년 11월 7일 유네스코는 베트남 궁중음악 냐냑을 ‘인류 구전 및 무형유산 걸작’으로 선포했으며, 지금도 후에의 유적에서 공연됩니다."
        ),
      },
      {
        id: "hue-c2", layer: "culture", wiki: ["Ca Huế", "Áo dài"],
        title: L("Ca Huế, áo dài và nón lá", "Ca Huế, áo dài and the conical hat", "顺化歌、奥黛与斗笠", "까후에, 아오자이, 논라"),
        body: L(
          "Ca Huế là lối hát thính phòng với các điệu Nam ai, Nam bình, hò, lý, thường được thưởng thức trên thuyền sông Hương. Tà áo dài tím và chiếc nón lá mỏng nhẹ gắn với hình ảnh người con gái Huế.",
          "Ca Huế is a chamber-style singing tradition with melodies such as Nam ai and Nam bình, hò and lý, often enjoyed on boats on the Perfume River. The purple áo dài and the thin, light conical hat are tied to the image of Huế women.",
          "顺化歌（Ca Huế）是一种室内乐式的演唱，包含南哀、南平、号和俚等曲调，常在香江的游船上欣赏。紫色的奥黛和轻薄的斗笠，与顺化女子的形象紧密相连。",
          "까후에는 남아이, 남빈, 호, 리 같은 곡조로 부르는 실내악풍의 노래로, 흐엉강 위 배에서 즐기는 경우가 많습니다. 보랏빛 아오자이와 얇고 가벼운 논라는 후에 여성의 이미지와 연결됩니다."
        ),
      },
      {
        id: "hue-f1", layer: "food", wiki: ["Bún bò Huế"],
        title: L("Bún bò Huế", "Bún bò Huế", "顺化牛肉粉", "분보후에"),
        body: L(
          "Bún bò Huế có nước dùng đậm đà từ xương bò, sả và mắm ruốc, vị cay nhẹ, ăn kèm giò heo, chả cua, tiết và rau sống.",
          "Bún bò Huế has a rich broth of beef bones, lemongrass and fermented shrimp paste with a mild heat, served with pork knuckle, crab patties, blood cubes and fresh herbs.",
          "顺化牛肉粉的汤底浓郁，由牛骨、香茅和虾酱熬成，微辣，配猪蹄、蟹肉饼、血块和生菜。",
          "분보후에는 소뼈, 레몬그라스, 새우젓으로 낸 진한 육수에 은은한 매운맛이 나며 돼지족, 게살 완자, 선지와 생채소를 곁들입니다."
        ),
      },
      {
        id: "hue-f2", layer: "food", wiki: ["Bánh bèo"],
        title: L("Ẩm thực cung đình và bánh Huế", "Court cuisine and Huế cakes", "宫廷美食与顺化小吃", "궁중 요리와 후에 떡·전병"),
        body: L(
          "Ẩm thực Huế nổi tiếng với những món nhỏ xinh, nhiều màu sắc, chịu ảnh hưởng của lối ăn cung đình. Bánh bèo, bánh nậm, bánh lọc, cơm hến và chè Huế là những món nên thử.",
          "Huế cuisine is known for small, colourful dishes shaped by court dining. Bánh bèo, bánh nậm, bánh lọc, cơm hến and Huế sweet soups are all worth trying.",
          "顺化菜以小巧、色彩丰富的菜肴闻名，受宫廷饮食影响。水蕨饼、扁蒸饼、透明虾饺、蚬饭和顺化甜汤都值得品尝。",
          "후에 요리는 궁중 식문화의 영향을 받은 작고 알록달록한 음식으로 유명합니다. 반베오, 반남, 반록, 껌헨, 후에식 디저트 ‘째’를 꼭 맛보세요."
        ),
      },
      {
        id: "hue-t1", layer: "tourism", wiki: ["Perfume River"],
        title: L("Dòng sông Hương", "The Perfume River", "香江", "흐엉강(향강)"),
        body: L(
          "Sông Hương chảy chậm qua trung tâm thành phố, rất hợp để đi thuyền ngắm cảnh và nghe ca Huế buổi tối. Hai bên bờ có cầu Trường Tiền, Phu Văn Lâu và nhiều nhà vườn xanh mát.",
          "The Perfume River flows slowly through the city, ideal for a boat ride and an evening of Huế folk song. Along its banks are Trường Tiền Bridge, Phu Văn Lâu pavilion and many green garden houses.",
          "香江缓缓流过市区，适合乘船观景并在晚上聆听顺化歌。两岸有长钱桥、富文楼和许多绿意盎然的花园住宅。",
          "흐엉강은 도심을 천천히 흐르며, 배를 타고 경치를 즐기거나 저녁에 후에 전통 노래를 듣기에 좋습니다. 강변에는 쯔엉띠엔 다리, 푸반러우 누각과 푸른 정원 주택이 이어집니다."
        ),
      },
      {
        id: "hue-t2", layer: "tourism", wiki: ["Bạch Mã National Park"],
        title: L("Bạch Mã và biển Lăng Cô", "Bạch Mã and Lăng Cô Bay", "白马山与朗柯湾", "바크마 산과 랑꼬 해변"),
        body: L(
          "Cách Huế khoảng 1–1,5 giờ đi xe về phía nam, vườn quốc gia Bạch Mã có rừng mát và thác nước, còn vịnh Lăng Cô là bãi biển đẹp dưới chân đèo Hải Vân.",
          "About 1 to 1.5 hours’ drive south of Huế, Bạch Mã National Park offers cool forest and waterfalls, while Lăng Cô Bay is a lovely beach at the foot of Hải Vân Pass.",
          "从顺化向南驱车约1至1.5小时，白马国家公园有清凉的森林和瀑布，而朗柯湾是海云关山脚下的美丽海滩。",
          "후에에서 남쪽으로 차로 1~1.5시간 거리에 있는 바크마 국립공원에는 시원한 숲과 폭포가 있고, 랑꼬 만은 하이번 고개 아래의 아름다운 해변입니다."
        ),
      },
      {
        id: "hue-s1", layer: "story", wiki: ["Nguyễn Hoàng"],
        title: L("Bà lão áo đỏ và chùa Thiên Mụ", "The old woman in red and Thiên Mụ", "红衣老妇与天姥寺", "붉은 옷 노파와 티엔무 사원"),
        body: L(
          "Người dân kể rằng trên đồi Hà Khê từng xuất hiện một bà lão áo đỏ quần lục, nói rằng sẽ có vị chân chúa đến lập chùa để tụ linh khí. Nghe chuyện, chúa Nguyễn Hoàng cho dựng chùa năm 1601 và đặt tên là Thiên Mụ.",
          "Locals say an old woman in a red tunic and green trousers once appeared on Hà Khê Hill and foretold that a true lord would build a pagoda to gather spiritual energy. Hearing this, Lord Nguyễn Hoàng built the temple in 1601 and named it Thiên Mụ.",
          "当地人讲述，河溪山丘上曾出现一位红衣绿裤的老妇人，预言将有真主在此建寺以聚灵气。阮潢听闻后于1601年建寺，取名“天姥”。",
          "마을 사람들은 하카이 언덕에 붉은 윗도리와 초록 바지를 입은 노파가 나타나 참된 군주가 절을 세워 영기를 모을 것이라 말했다고 전합니다. 이를 들은 응우옌호앙은 1601년 절을 짓고 ‘티엔무’라 이름 붙였습니다."
        ),
      },
      {
        id: "hue-s2", layer: "story", wiki: ["Thanh Toàn Bridge", "Thanh Toan Bridge"],
        title: L("Cầu ngói Thanh Toàn", "Thanh Toàn Tile-Roofed Bridge", "清全瓦桥", "타인토안 지붕 다리"),
        body: L(
          "Cầu ngói Thanh Toàn là chiếc cầu mái ngói cổ ở làng Thanh Toàn, tương truyền do bà Trần Thị Đạo bỏ tiền xây năm 1776 để dân làng đi lại. Cầu vừa là lối đi vừa là nơi ngồi nghỉ của người làng.",
          "The Thanh Toàn tile-roofed bridge is an old covered bridge in Thanh Toàn village, said to have been funded in 1776 by Mrs Trần Thị Đạo so villagers could cross. It is both a crossing and a place for villagers to rest.",
          "清全瓦桥是清全村的古廊桥，相传由陈氏道于1776年出资修建，方便村民往来。这里既是通道，也是村民歇息的地方。",
          "타인토안 지붕 다리는 타인토안 마을의 오래된 덮개 다리로, 1776년 쩐티다오 부인이 마을 사람들의 통행을 위해 사비를 들여 지었다고 전해집니다. 길이자 마을 사람들의 쉼터이기도 합니다."
        ),
      },
    ],
    places: [
      { id: "hue-dn", kind: "heritage", hours: 3, slot: "morning", zone: 1, must: true, name: L("Đại Nội – Hoàng thành Huế", "Imperial City of Huế", "顺化皇城（大内）", "후에 황성(대내)"), note: L("Trung tâm quyền lực của triều Nguyễn", "Seat of Nguyễn power", "阮朝权力中心", "응우옌 왕조의 권력 중심") },
      { id: "hue-tm", kind: "heritage", hours: 1.5, slot: "morning", zone: 2, must: true, name: L("Chùa Thiên Mụ", "Thiên Mụ Pagoda", "天姥寺", "티엔무 사원"), note: L("Ngôi chùa biểu tượng bên sông Hương", "The riverside icon", "香江畔的标志性寺庙", "흐엉강변의 상징적 사원") },
      { id: "hue-kd", kind: "heritage", hours: 1.5, slot: "morning", zone: 3, must: true, name: L("Lăng Khải Định", "Tomb of Khải Định", "启定帝陵", "카이딘 황제릉"), note: L("Kiến trúc pha trộn Đông – Tây", "East–West blended architecture", "融合东西方风格", "동서양이 섞인 건축") },
      { id: "hue-td", kind: "heritage", hours: 1.5, slot: "afternoon", zone: 3, must: false, name: L("Lăng Tự Đức", "Tomb of Tự Đức", "嗣德帝陵", "뜨득 황제릉"), note: L("Khu lăng yên tĩnh bên hồ, nhiều cây xanh", "A serene lakeside tomb among trees", "湖畔幽静的陵墓，绿树成荫", "호숫가의 고요한 능, 숲이 우거짐") },
      { id: "hue-ts", kind: "culture", hours: 1.5, slot: "evening", zone: 1, must: true, name: L("Du thuyền sông Hương và ca Huế", "Perfume River cruise & Huế folk song", "香江夜游与顺化歌", "흐엉강 유람과 까후에"), note: L("Buổi tối, thường đi thuyền rồng", "Evening, usually by dragon boat", "傍晚，常乘龙船", "저녁, 보통 용선으로") },
      { id: "hue-bb", kind: "food", hours: 1, slot: "morning", zone: 1, must: true, name: L("Bún bò Huế", "Bún bò Huế", "顺化牛肉粉", "분보후에"), note: L("Món sáng đặc trưng của Huế", "Huế’s signature breakfast", "顺化的招牌早餐", "후에의 대표 아침 메뉴") },
      { id: "hue-ch", kind: "food", hours: 1.5, slot: "afternoon", zone: 1, must: false, name: L("Chợ Đông Ba và bánh Huế", "Đông Ba Market & Huế cakes", "东波市场与顺化小吃", "동바 시장과 후에 간식"), note: L("Thử bánh bèo, nậm, lọc, cơm hến", "Try bánh bèo, nậm, lọc, cơm hến", "尝尝水蕨饼、扁蒸饼、蚬饭", "반베오, 반남, 반록, 껌헨 맛보기") },
      { id: "hue-tt", kind: "culture", hours: 2, slot: "afternoon", zone: 4, must: false, name: L("Làng Thanh Toàn và cầu ngói", "Thanh Toàn village & covered bridge", "清全村与瓦桥", "타인토안 마을과 지붕 다리"), note: L("Làng quê yên bình ngoài thành phố", "Peaceful countryside outside the city", "城外宁静的乡村", "도시 외곽의 평화로운 시골") },
      { id: "hue-vc", kind: "fun", hours: 1, slot: "evening", zone: 3, must: false, name: L("Đồi Vọng Cảnh ngắm hoàng hôn", "Vọng Cảnh Hill at sunset", "望景山看日落", "방깐 언덕 석양"), note: L("Nhìn xuống khúc sông Hương uốn lượn", "Overlooks a bend of the river", "俯瞰蜿蜒的香江", "굽이치는 강을 내려다봄") },
    ],
  },

  // ------------------------------------------------------------------ TP. HỒ CHÍ MINH
  {
    id: "tp-hcm",
    region: "south",
    coords: [10.7769, 106.7009],
    hero: ["Notre-Dame Cathedral Basilica of Saigon", "Ho Chi Minh City"],
    name: L("TP. Hồ Chí Minh", "Ho Chi Minh City", "胡志明市", "호찌민"),
    tagline: L("Sài Gòn năng động, nơi Đông – Tây và xưa – nay gặp gỡ", "Dynamic Saigon, where East meets West and past meets present", "活力西贡，东西方与古今交汇之地", "역동적인 사이공, 동서양과 과거·현재가 만나는 곳"),
    intro: L(
      "Thành phố lớn nhất Việt Nam, nơi hơn ba thế kỷ lịch sử Sài Gòn – Gia Định hòa vào nhịp sống hiện đại và ẩm thực đường phố nổi tiếng.",
      "Việt Nam’s largest city, where more than three centuries of Saigon–Gia Định history blend with modern life and famous street food.",
      "越南最大的城市，西贡—嘉定三百多年的历史与现代生活及著名街头美食交融在一起。",
      "베트남 최대 도시로, 3백 년이 넘는 사이공–자딘의 역사가 현대적인 삶과 유명한 길거리 음식과 어우러집니다."
    ),
    bestMonths: [3, 3, 3, 2, 2, 2, 2, 2, 1, 1, 2, 3],
    bestNote: L(
      "Đẹp nhất vào tháng 12–3 (mùa khô, trời ráo). Mùa mưa kéo dài từ tháng 5 đến tháng 11, thường mưa rào vào chiều muộn nên hãy đi tham quan buổi sáng.",
      "Best from December to March (dry season). The rainy season runs from May to November with showers mostly in the late afternoon, so sightsee in the morning.",
      "12月至3月（旱季）最佳。雨季从5月持续到11月，多为傍晚阵雨，建议上午参观。",
      "12~3월(건기)이 가장 좋습니다. 우기는 5~11월이며 늦은 오후에 소나기가 잦으므로 오전에 관광하세요."
    ),
    suggestedDays: 3,
    daysRange: [3, 4],
    sources: [
      { label: "Wikipedia – Nguyễn Hữu Cảnh", url: "https://en.wikipedia.org/wiki/Nguy%E1%BB%85n_H%E1%BB%AFu_C%E1%BA%A3nh" },
      { label: "VnExpress – Địa đạo Củ Chi", url: "https://vnexpress.net/mang-nhen-duoi-long-dat-thep-cu-chi-2161369.html" },
      { label: "Báo Lào Cai – Địa đạo Củ Chi", url: "https://baolaocai.vn/dia-dao-cu-chi-mot-huyen-thoai-cua-viet-nam-trong-the-ky-20-post399825.html" },
      { label: "Wikipedia – Ho Chi Minh City", url: "https://en.wikipedia.org/wiki/Ho_Chi_Minh_City" },
    ],
    entries: [
      {
        id: "hcm-h1", layer: "history", wiki: ["Nguyễn Hữu Cảnh"],
        title: L("Phủ Gia Định năm 1698", "Gia Định Prefecture, 1698", "1698年嘉定府", "1698년 자딘 부 설치"),
        body: L(
          "Vùng đất này vốn có người Khmer và người Việt cùng sinh sống. Năm 1698, chúa Nguyễn sai Nguyễn Hữu Cảnh vào kinh lược, lập phủ Gia Định, đặt nền móng hành chính cho Sài Gòn – Gia Định.",
          "This land was home to both Khmer and Vietnamese settlers. In 1698 the Nguyễn lords sent Nguyễn Hữu Cảnh south to organise the region and set up Gia Định prefecture, laying the administrative foundation for Saigon–Gia Định.",
          "这片土地原本就有高棉人和越南人共同生活。1698年，阮主派阮有镜南下经略，设立嘉定府，奠定了西贡—嘉定的行政基础。",
          "이 땅에는 크메르인과 베트남인이 함께 살고 있었습니다. 1698년 응우옌 영주는 응우옌흐우카인을 남쪽으로 보내 자딘 부(府)를 설치하게 했고, 이것이 사이공–자딘의 행정적 기초가 되었습니다."
        ),
      },
      {
        id: "hcm-h2", layer: "history", wiki: ["Ho Chi Minh City"],
        title: L("Từ Sài Gòn đến TP. Hồ Chí Minh", "From Saigon to Ho Chi Minh City", "从西贡到胡志明市", "사이공에서 호찌민 시로"),
        body: L(
          "Năm 1859, quân Pháp đánh chiếm Sài Gòn; thành phố sau đó phát triển thành trung tâm thương mại và hành chính của Nam Kỳ. Sau ngày thống nhất, Sài Gòn – Gia Định được đổi tên thành Thành phố Hồ Chí Minh vào năm 1976.",
          "French forces seized Saigon in 1859, and the city grew into the commercial and administrative centre of Cochinchina. After reunification, Saigon–Gia Định was renamed Ho Chi Minh City in 1976.",
          "1859年法军攻占西贡，此后这里发展为交趾支那的商业和行政中心。统一后，西贡—嘉定于1976年改名为胡志明市。",
          "1859년 프랑스군이 사이공을 점령했고, 이후 도시는 코친차이나의 상업·행정 중심지로 성장했습니다. 통일 이후인 1976년 사이공–자딘은 호찌민 시로 이름이 바뀌었습니다."
        ),
      },
      {
        id: "hcm-d1", layer: "heritage", wiki: ["Independence Palace"],
        title: L("Dinh Độc Lập", "Independence Palace", "独立宫（统一宫）", "독립궁(통일궁)"),
        body: L(
          "Dinh Độc Lập (Dinh Thống Nhất) do kiến trúc sư Ngô Viết Thụ thiết kế, hoàn thành năm 1966 trên nền Dinh Norodom cũ. Ngày 30/4/1975, xe tăng tiến vào cổng dinh, đánh dấu thời khắc kết thúc chiến tranh.",
          "Independence Palace (Reunification Palace) was designed by architect Ngô Viết Thụ and completed in 1966 on the site of the old Norodom Palace. On 30 April 1975 tanks rolled through its gates, marking the end of the war.",
          "独立宫（统一宫）由建筑师吴越树设计，1966年建成，位于旧诺罗敦宫的原址上。1975年4月30日，坦克驶入宫门，标志着战争的结束。",
          "독립궁(통일궁)은 건축가 응오비엣트가 설계해 1966년 옛 노로돔 궁 터에 완공되었습니다. 1975년 4월 30일 탱크가 궁의 정문으로 진입하며 전쟁의 끝을 알렸습니다."
        ),
      },
      {
        id: "hcm-d2", layer: "heritage", wiki: ["Notre-Dame Cathedral Basilica of Saigon"],
        title: L("Nhà thờ Đức Bà và Bưu điện Trung tâm", "Notre-Dame Cathedral & Central Post Office", "圣母大教堂与中央邮局", "노트르담 대성당과 중앙우체국"),
        body: L(
          "Nhà thờ Đức Bà xây bằng gạch đỏ nhập từ Pháp, hoàn thành năm 1880 với hai tháp chuông cao. Đối diện là Bưu điện Trung tâm Sài Gòn do Alfred Foulhoux thiết kế, hoàn thành năm 1891.",
          "Notre-Dame Cathedral was built with red bricks imported from France and completed in 1880 with two tall bell towers. Opposite stands the Saigon Central Post Office, designed by Alfred Foulhoux and completed in 1891.",
          "西贡圣母大教堂以从法国进口的红砖建成，1880年竣工，拥有两座高耸的钟楼。对面的西贡中央邮局由阿尔弗雷德·福尔乌设计，1891年建成。",
          "노트르담 대성당은 프랑스에서 들여온 붉은 벽돌로 지어 1880년 두 개의 높은 종탑과 함께 완공되었습니다. 맞은편의 사이공 중앙우체국은 알프레드 풀우가 설계해 1891년 완공되었습니다."
        ),
      },
      {
        id: "hcm-c1", layer: "culture", wiki: ["Đờn ca tài tử"],
        title: L("Đờn ca tài tử Nam Bộ", "Southern Đờn ca tài tử music", "南部才子弹唱", "남부 던까따이뜨 음악"),
        body: L(
          "Đờn ca tài tử là nghệ thuật đờn và ca của người Nam Bộ, do những người yêu nhạc chơi theo hứng, thường với đàn kìm, đàn tranh, đàn cò. Năm 2013, UNESCO ghi danh vào Danh sách Di sản văn hóa phi vật thể đại diện của nhân loại.",
          "Đờn ca tài tử is the amateur chamber music of southern Việt Nam, played for the love of it on instruments such as the đàn kìm, đàn tranh and đàn cò. UNESCO inscribed it on the Representative List of the Intangible Cultural Heritage of Humanity in 2013.",
          "才子弹唱是越南南部的业余室内乐，爱好者凭兴致演奏，常用月琴、古筝和二胡类乐器。2013年被列入联合国教科文组织人类非物质文化遗产代表作名录。",
          "던까따이뜨는 남부 지방 사람들이 흥에 따라 즐기는 아마추어 실내악으로, 단낌, 단짱, 단꼬 같은 악기가 쓰입니다. 2013년 유네스코 인류무형문화유산 대표목록에 등재되었습니다."
        ),
      },
      {
        id: "hcm-c2", layer: "culture", wiki: ["Cholon", "Chợ Lớn"],
        title: L("Chợ Lớn và văn hóa người Hoa", "Chợ Lớn and Hoa culture", "堤岸与华人文化", "쩌런과 화교 문화"),
        body: L(
          "Chợ Lớn là khu thương mại lâu đời của cộng đồng người Hoa, với các hội quán, chùa miếu như chùa Bà Thiên Hậu cùng nhiều tiệm thuốc bắc, bánh truyền thống. Cộng đồng này góp phần định hình văn hóa và ẩm thực Sài Gòn.",
          "Chợ Lớn is the long-established trading district of the Hoa (Chinese-Vietnamese) community, with assembly halls, temples such as Thiên Hậu Temple, herbal medicine shops and traditional bakeries. The community has helped shape Saigon’s culture and food.",
          "堤岸（Chợ Lớn）是华人社群历史悠久的商业区，有会馆、天后宫等庙宇，以及中药铺和传统糕饼店。华人社群对西贡的文化与饮食影响深远。",
          "쩌런은 화교(호아) 공동체의 오랜 상업 지구로, 회관과 티엔허우 사원 같은 사찰, 한약방과 전통 제과점이 많습니다. 이 공동체는 사이공의 문화와 음식에 큰 영향을 주었습니다."
        ),
      },
      {
        id: "hcm-f1", layer: "food", wiki: ["Cơm tấm"],
        title: L("Cơm tấm Sài Gòn", "Saigon broken rice (cơm tấm)", "西贡碎米饭", "사이공 껌땀"),
        body: L(
          "Cơm tấm làm từ gạo tấm, ăn kèm sườn nướng, bì, chả trứng và nước mắm chua ngọt, là món ăn sáng và trưa quen thuộc của người Sài Gòn.",
          "Cơm tấm is broken rice served with grilled pork chop, shredded pork skin, steamed egg meatloaf and sweet-sour fish sauce, a familiar breakfast and lunch for Saigon locals.",
          "碎米饭以碎米煮成，配烤猪排、猪皮丝、蒸蛋肉饼和酸甜鱼露，是西贡人熟悉的早餐和午餐。",
          "껌땀은 부서진 쌀로 지은 밥에 구운 돼지갈비, 돼지껍질 무침, 달걀 미트로프, 새콤달콤한 느억맘 소스를 곁들이는 사이공 사람들의 익숙한 아침·점심 메뉴입니다."
        ),
      },
      {
        id: "hcm-f2", layer: "food", wiki: ["Bánh mì"],
        title: L("Bánh mì", "Bánh mì", "越南面包（Bánh mì）", "반미"),
        body: L(
          "Bánh mì Sài Gòn có vỏ giòn, ruột rỗng, kẹp pa-tê, thịt nguội, chả, đồ chua và rau thơm. Món bánh kết hợp kỹ thuật làm bánh Pháp với khẩu vị Việt, nay là món ăn đường phố nổi tiếng thế giới.",
          "Saigon bánh mì has a crisp crust and airy crumb, filled with pâté, cold cuts, pork roll, pickles and herbs. It blends French baking with Vietnamese taste and is now a world-famous street food.",
          "西贡越式面包外皮酥脆、内里松软，夹有肝酱、冷切肉、肉卷、腌菜和香草。它融合法式烘焙与越南口味，如今已是闻名世界的街头美食。",
          "사이공 반미는 바삭한 껍질과 속이 비어 있는 빵에 파테, 햄, 소시지, 절임 채소, 허브를 넣습니다. 프랑스 제빵 기술과 베트남 입맛이 만나 지금은 세계적인 길거리 음식이 되었습니다."
        ),
      },
      {
        id: "hcm-t1", layer: "tourism", wiki: ["Bến Thành Market"],
        title: L("Chợ Bến Thành và khu trung tâm", "Bến Thành Market & the city centre", "滨城市场与市中心", "벤탄 시장과 도심"),
        body: L(
          "Chợ Bến Thành là biểu tượng của thành phố với tháp đồng hồ ở cổng chính, bán từ quà lưu niệm đến món ăn. Từ chợ đi bộ ra phố Nguyễn Huệ và bến Bạch Đằng để ngắm sông Sài Gòn vào buổi tối.",
          "Bến Thành Market, with its clock tower over the main gate, is a symbol of the city and sells everything from souvenirs to snacks. From there it’s a walk to Nguyễn Huệ Street and Bạch Đằng quay for views of the Saigon River in the evening.",
          "滨城市场以正门上方的钟楼为标志，是城市的象征，从纪念品到小吃应有尽有。从市场步行即可到阮惠街和白藤码头，傍晚欣赏西贡河景。",
          "벤탄 시장은 정문 위 시계탑으로 유명한 도시의 상징으로, 기념품부터 먹거리까지 다양합니다. 시장에서 걸어서 응우옌후에 거리와 박당 부두로 가 저녁 사이공강 풍경을 즐길 수 있습니다."
        ),
      },
      {
        id: "hcm-t2", layer: "tourism", wiki: ["Cần Giờ Mangrove Forest"],
        title: L("Rừng ngập mặn Cần Giờ", "Cần Giờ Mangrove Forest", "芹椰红树林", "껀저 맹그로브 숲"),
        body: L(
          "Cần Giờ là khu dự trữ sinh quyển thế giới được UNESCO công nhận năm 2000, cách trung tâm khoảng 50 km. Hệ rừng ngập mặn rộng lớn là nơi sinh sống của nhiều loài chim, khỉ và cá sấu.",
          "Cần Giờ is a UNESCO-recognised biosphere reserve (2000), about 50 km from the city centre. Its extensive mangrove forest shelters many birds, monkeys and crocodiles.",
          "芹椰（Cần Giờ）是2000年被联合国教科文组织认定的世界生物圈保护区，距市中心约50公里。广阔的红树林是众多鸟类、猴子和鳄鱼的栖息地。",
          "껀저는 2000년 유네스코 생물권보전지역으로 지정된 곳으로 도심에서 약 50km 거리에 있습니다. 넓은 맹그로브 숲에는 다양한 새와 원숭이, 악어가 살고 있습니다."
        ),
      },
      {
        id: "hcm-s1", layer: "story", wiki: ["Củ Chi tunnels"],
        title: L("Địa đạo Củ Chi, vùng “đất thép”", "The Củ Chi tunnels", "古芝地道", "구찌 터널"),
        body: L(
          "Cách trung tâm khoảng 70 km, hệ thống địa đạo Củ Chi dài khoảng 250 km, chia ba tầng, do người dân và lực lượng kháng chiến đào bằng dụng cụ thủ công. Nơi đây kể câu chuyện về sự bền bỉ và sáng tạo của vùng “đất thép”.",
          "About 70 km from the city centre, the Củ Chi tunnel network stretches roughly 250 km over three levels, dug by villagers and resistance fighters with hand tools. It tells a story of resilience and ingenuity in the “land of steel”.",
          "古芝地道距市中心约70公里，全长约250公里，分为三层，由村民和抗战人员用手工工具挖成。它讲述了“钢铁之地”的坚韧与智慧。",
          "도심에서 약 70km 떨어진 구찌 터널은 총길이가 약 250km에 이르고 3층으로 이뤄져 있으며, 주민과 저항군이 손도구로 팠습니다. ‘강철의 땅’이 지닌 끈기와 창의성을 보여 줍니다."
        ),
      },
      {
        id: "hcm-s2", layer: "story", wiki: ["Ho Chi Minh Museum", "Nhà Rồng Wharf"],
        title: L("Bến Nhà Rồng, ngày ra đi", "Nhà Rồng Wharf: the departure", "龙屋码头——启程之日", "냐롱 부두—출발의 날"),
        body: L(
          "Ngày 5/6/1911, người thanh niên Nguyễn Tất Thành xuống tàu từ bến Nhà Rồng để ra nước ngoài tìm đường cứu nước. Nay nơi đây là Bảo tàng Hồ Chí Minh – Chi nhánh TP. Hồ Chí Minh.",
          "On 5 June 1911 the young Nguyễn Tất Thành boarded a ship at Nhà Rồng wharf to go abroad in search of a way to save the nation. Today the site houses the Hồ Chí Minh Museum, Ho Chi Minh City branch.",
          "1911年6月5日，青年阮必成从龙屋码头登船出国，寻求救国之路。如今这里是胡志明博物馆胡志明市分馆。",
          "1911년 6월 5일, 청년 응우옌땃타인은 냐롱 부두에서 배에 올라 나라를 구할 길을 찾아 해외로 떠났습니다. 지금 이곳은 호찌민 박물관 호찌민시 분관입니다."
        ),
      },
    ],
    places: [
      { id: "hcm-dl", kind: "heritage", hours: 1.5, slot: "morning", zone: 1, must: true, name: L("Dinh Độc Lập", "Independence Palace", "独立宫（统一宫）", "독립궁(통일궁)"), note: L("Nơi diễn ra sự kiện 30/4/1975", "Site of 30 April 1975", "1975年4月30日的历史现场", "1975년 4월 30일의 현장") },
      { id: "hcm-nd", kind: "heritage", hours: 1.5, slot: "morning", zone: 1, must: true, name: L("Nhà thờ Đức Bà và Bưu điện Trung tâm", "Notre-Dame Cathedral & Central Post Office", "圣母大教堂与中央邮局", "노트르담 대성당과 중앙우체국"), note: L("Hai công trình kiến trúc Pháp cạnh nhau", "Two French-era landmarks side by side", "两座法式建筑并肩而立", "프랑스풍 건축물 두 곳이 나란히") },
      { id: "hcm-ct", kind: "heritage", hours: 2, slot: "afternoon", zone: 1, must: false, name: L("Bảo tàng Chứng tích Chiến tranh", "War Remnants Museum", "战争遗迹博物馆", "전쟁증적박물관"), note: L("Nội dung nặng nề, nên dành khoảng 2 giờ", "Heavy content; allow about 2 hours", "内容沉重，建议预留约2小时", "무거운 주제, 약 2시간 권장") },
      { id: "hcm-bt", kind: "culture", hours: 1.5, slot: "afternoon", zone: 1, must: true, name: L("Chợ Bến Thành", "Bến Thành Market", "滨城市场", "벤탄 시장"), note: L("Mua quà, ăn vặt, trả giá", "Souvenirs, snacks, bargaining", "买纪念品、尝小吃、讨价还价", "기념품·간식·흥정") },
      { id: "hcm-nh", kind: "fun", hours: 1.5, slot: "evening", zone: 1, must: true, name: L("Phố đi bộ Nguyễn Huệ và bến Bạch Đằng", "Nguyễn Huệ Walking Street & Bạch Đằng quay", "阮惠步行街与白藤码头", "응우옌후에 보행자 거리와 박당 부두"), note: L("Dạo bộ buổi tối bên sông", "An evening stroll by the river", "傍晚河边漫步", "저녁 강변 산책") },
      { id: "hcm-cl", kind: "culture", hours: 2, slot: "afternoon", zone: 2, must: false, name: L("Chợ Lớn và chùa Bà Thiên Hậu", "Chợ Lớn & Thiên Hậu Temple", "堤岸与天后宫", "쩌런과 티엔허우 사원"), note: L("Khu người Hoa lâu đời", "The old Chinese-Vietnamese quarter", "历史悠久的华人聚居区", "오랜 화교 지구") },
      { id: "hcm-bk", kind: "food", hours: 1, slot: "morning", zone: 1, must: true, name: L("Cơm tấm và bánh mì bữa sáng", "Breakfast: cơm tấm & bánh mì", "早餐：碎米饭与越式面包", "아침: 껌땀과 반미"), note: L("Bữa sáng kiểu Sài Gòn", "A Saigon-style breakfast", "西贡式早餐", "사이공식 아침 식사") },
      { id: "hcm-st", kind: "food", hours: 2, slot: "evening", zone: 1, must: false, name: L("Ẩm thực đường phố buổi tối", "Evening street food", "夜间街头美食", "저녁 길거리 음식"), note: L("Hủ tiếu, ốc, bánh xèo và nhiều món khác", "Hủ tiếu, snails, bánh xèo and more", "粿条、田螺、煎饼等", "후띠우, 달팽이 요리, 반쎄오 등") },
      { id: "hcm-cc", kind: "heritage", hours: 4.5, slot: "morning", zone: 3, must: true, name: L("Địa đạo Củ Chi", "Củ Chi Tunnels", "古芝地道", "구찌 터널"), note: L("Khoảng nửa ngày, cách trung tâm khoảng 70 km", "About half a day; around 70 km out", "约需半天，距市中心约70公里", "반나절 소요, 도심에서 약 70km") },
      { id: "hcm-cg", kind: "fun", hours: 7, slot: "morning", zone: 4, must: false, name: L("Rừng ngập mặn Cần Giờ", "Cần Giờ Mangrove Forest", "芹椰红树林", "껀저 맹그로브 숲"), note: L("Chuyến đi cả ngày, nên xuất phát sớm", "A full-day trip; start early", "需要一整天，建议早点出发", "하루 일정, 일찍 출발 권장") },
    ],
  },
];

export const KIND_ORDER = ["heritage", "culture", "food", "fun"];
