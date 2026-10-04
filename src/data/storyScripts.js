// Lời dẫn của "người kể chuyện": câu mở đầu, câu kết của từng địa danh và câu chuyển chương theo lớp tri thức.
// Phần thân của lời kể KHÔNG nằm ở đây: nó được ghép từ các mục `entries` đã có nguồn trong content.js,
// nên người kể không thêm dữ kiện nào ngoài dữ liệu của ứng dụng.
const L = (vi, en, zh, ko) => ({ vi, en, zh, ko });

export const SCRIPTS = {
  "ha-noi": {
    open: L(
      "Chào bạn, hãy dừng chân ở Hà Nội, nơi một nghìn năm Thăng Long vẫn còn thở giữa những con phố.",
      "Welcome to Hanoi, where a thousand years of Thăng Long still breathe along the streets.",
      "欢迎来到河内。这里千年的升龙历史，至今仍在街巷之间呼吸。",
      "하노이에 오신 것을 환영합니다. 천 년 탕롱의 역사가 지금도 골목마다 숨 쉬고 있습니다."
    ),
    close: L(
      "Hà Nội không chỉ để ngắm. Hãy đi chậm, ăn một bát phở sáng, và để thành phố tự kể phần còn lại.",
      "Hanoi is not only for looking at. Slow down, have a bowl of morning phở, and let the city tell the rest.",
      "河内不只是用来看的。放慢脚步，吃一碗早晨的河粉，让这座城市自己讲完剩下的故事。",
      "하노이는 눈으로만 보는 도시가 아닙니다. 천천히 걸으며 아침 쌀국수 한 그릇을 맛보고, 나머지 이야기는 도시가 들려주게 하세요."
    ),
  },
  hue: {
    open: L(
      "Xin chào, hãy theo dòng sông Hương về với Huế, cố đô của triều Nguyễn gần một trăm năm mươi năm.",
      "Let the Perfume River carry you to Huế, the capital of the Nguyễn dynasty for nearly 150 years.",
      "让香江带你来到顺化，这座曾为阮朝都城近一百五十年的古都。",
      "향강을 따라 후에로 가 볼까요. 이곳은 거의 150년 동안 응우옌 왕조의 수도였습니다."
    ),
    close: L(
      "Huế không vội. Hãy đi chậm, nghe một câu ca, và để nét thanh nhã của nơi này tự tìm đến bạn.",
      "Huế is never in a hurry. Walk slowly, listen to a folk song, and let its quiet elegance find you.",
      "顺化从不匆忙。慢慢走，听一曲顺化歌，让这里的典雅自己找上你。",
      "후에는 서두르지 않습니다. 천천히 걸으며 노래 한 곡을 듣고, 이곳의 우아함이 당신을 찾아오게 하세요."
    ),
  },
  "tp-hcm": {
    open: L(
      "Chào bạn, chúng ta đến Sài Gòn, thành phố của hơn ba thế kỷ lịch sử và một nhịp sống chưa bao giờ ngừng.",
      "Welcome to Saigon, a city of more than three centuries of history and a pulse that never stops.",
      "欢迎来到西贡，一座拥有三百多年历史、节奏从不停歇的城市。",
      "사이공에 오신 것을 환영합니다. 3백 년이 넘는 역사와 멈추지 않는 활기가 있는 도시입니다."
    ),
    close: L(
      "Sài Gòn cần thời gian để hiểu. Hãy bắt đầu bằng một ổ bánh mì buổi sáng, rồi cứ để thành phố dẫn đường.",
      "Saigon takes time to understand. Start with a morning bánh mì, then let the city lead the way.",
      "西贡需要慢慢读懂。先从一个早晨的越式面包开始，然后让这座城市带路。",
      "사이공은 시간을 들여야 이해되는 도시입니다. 아침 반미 한 개로 시작해, 나머지는 도시가 이끄는 대로 가 보세요."
    ),
  },
};

// Câu chuyển chương, chỉ đọc ở chế độ "Kể đầy đủ".
export const CONNECTORS = {
  history: L(
    "Hãy bắt đầu từ cội nguồn.",
    "Let's begin at the roots.",
    "先从它的起源说起。",
    "먼저 이곳의 뿌리부터 살펴볼까요."
  ),
  heritage: L(
    "Rồi đến những di sản vẫn còn đứng đó.",
    "Then, the heritage that still stands.",
    "接着，看看至今屹立的遗产。",
    "이어서 지금도 남아 있는 유산입니다."
  ),
  culture: L(
    "Còn hồn của nơi này nằm ở văn hóa.",
    "The soul of the place lives in its culture.",
    "这里的灵魂，藏在文化之中。",
    "이곳의 영혼은 문화에 깃들어 있습니다."
  ),
  food: L(
    "Và đừng quên hương vị.",
    "And don't forget the flavours.",
    "当然，别忘了味道。",
    "그리고 맛을 빼놓을 수 없지요."
  ),
  tourism: L(
    "Nếu bạn muốn đến tận nơi, đây là gợi ý.",
    "If you want to go there yourself, here is where to start.",
    "如果想亲自去看看，可以从这里开始。",
    "직접 가 보고 싶다면 여기서 시작해 보세요."
  ),
  story: L(
    "Cuối cùng, là những câu chuyện người ta vẫn kể lại.",
    "Finally, the stories people still pass on.",
    "最后，是人们代代相传的故事。",
    "마지막으로, 사람들이 전해 온 이야기입니다."
  ),
};

// Chế độ "Kể nhanh": mỗi lớp lấy mục đầu tiên, và cắt còn bao nhiêu câu đầu.
export const SHORT_SENTENCES = { history: 1, heritage: 1, culture: 1, food: 1, tourism: 1, story: 2 };
