export const KNOWLEDGE_RELATIONS = {
  "ha-noi": [
    {id:"thang-long",icon:"🏛️",type:{vi:"Di sản",en:"Heritage",zh:"遗产"},title:{vi:"Hoàng thành Thăng Long",en:"Imperial Citadel of Thang Long",zh:"升龙皇城"},note:{vi:"Từ không gian kinh đô đến lớp lịch sử nghìn năm của Hà Nội.",en:"From the imperial capital to Hanoi's thousand-year historical layers.",zh:"从古都空间延伸到河内千年的历史脉络。"}},
    {id:"ca-tru",icon:"🎵",type:{vi:"Văn hóa",en:"Culture",zh:"文化"},title:{vi:"Ca trù",en:"Ca tru ceremonial singing",zh:"歌筹"},note:{vi:"Một lát cắt nghệ thuật biểu diễn gắn với đời sống văn hóa Bắc Bộ.",en:"A performing-art tradition connected to northern Vietnamese cultural life.",zh:"与越南北部文化生活相连的传统表演艺术。"}},
    {id:"pho-ha-noi",icon:"🍜",type:{vi:"Ẩm thực",en:"Cuisine",zh:"美食"},title:{vi:"Phở Hà Nội",en:"Hanoi pho",zh:"河内河粉"},note:{vi:"Từ ký ức phố thị đến một biểu tượng ẩm thực quen thuộc của Hà Nội.",en:"From urban memory to one of Hanoi's best-known culinary symbols.",zh:"从城市记忆到河内最具代表性的饮食符号之一。"}}
  ],
  "hue": [
    {id:"dai-noi",icon:"🏯",type:{vi:"Di sản",en:"Heritage",zh:"遗产"},title:{vi:"Đại Nội Huế",en:"Hue Imperial City",zh:"顺化皇城"},note:{vi:"Không gian trung tâm để hiểu đời sống và nghi lễ của triều Nguyễn.",en:"A central place for understanding Nguyen-dynasty court life and rituals.",zh:"理解阮朝宫廷生活与礼仪的重要空间。"}},
    {id:"nha-nhac",icon:"🎼",type:{vi:"Văn hóa",en:"Culture",zh:"文化"},title:{vi:"Nhã nhạc cung đình",en:"Hue royal court music",zh:"顺化宫廷雅乐"},note:{vi:"Từ kiến trúc cung đình sang âm thanh và nghi lễ của chốn hoàng cung.",en:"From imperial architecture to the sound and rituals of the royal court.",zh:"从宫廷建筑延伸到皇室的音乐与礼仪。"}},
    {id:"am-thuc-cung-dinh",icon:"🍱",type:{vi:"Ẩm thực",en:"Cuisine",zh:"美食"},title:{vi:"Ẩm thực cung đình Huế",en:"Hue royal cuisine",zh:"顺化宫廷料理"},note:{vi:"Từ đời sống hoàng cung đến cách trình bày và thưởng thức món ăn.",en:"From court life to the presentation and enjoyment of royal cuisine.",zh:"从宫廷生活延伸到菜肴的制作、呈现与品味方式。"}}
  ],
  "tp-hcm": [
    {id:"ben-thanh",icon:"🏙️",type:{vi:"Đô thị",en:"Urban life",zh:"城市"},title:{vi:"Chợ Bến Thành",en:"Ben Thanh Market",zh:"滨城市场"},note:{vi:"Một điểm nối giữa lịch sử thương mại và nhịp sống đô thị Sài Gòn.",en:"A bridge between commercial history and the rhythm of Saigon urban life.",zh:"连接商业历史与西贡城市生活节奏的重要节点。"}},
    {id:"kien-truc-sai-gon",icon:"🏛️",type:{vi:"Kiến trúc",en:"Architecture",zh:"建筑"},title:{vi:"Kiến trúc Sài Gòn",en:"Saigon architecture",zh:"西贡建筑"},note:{vi:"Khám phá các lớp kiến trúc góp phần tạo nên diện mạo trung tâm thành phố.",en:"Explore architectural layers that shaped the city centre.",zh:"探索塑造城市中心面貌的多层建筑脉络。"}},
    {id:"ca-phe-sai-gon",icon:"☕",type:{vi:"Đời sống",en:"Local life",zh:"生活"},title:{vi:"Văn hóa cà phê Sài Gòn",en:"Saigon coffee culture",zh:"西贡咖啡文化"},note:{vi:"Từ không gian đường phố đến thói quen gặp gỡ của người thành thị.",en:"From street spaces to the social habits of city residents.",zh:"从街头空间延伸到城市居民的社交与日常习惯。"}}
  ]
};
export const relatedKnowledge = (destId) => KNOWLEDGE_RELATIONS[destId] || [];
