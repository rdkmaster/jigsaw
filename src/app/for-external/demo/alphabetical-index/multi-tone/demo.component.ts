import { Component, OnInit } from "@angular/core";
import { ArrayCollection, InternalUtils, PinyinDictionary } from 'jigsaw/public_api';
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: "alphabetical-index-multi-tone",
    templateUrl: "./demo.component.html",
})
export class AlphabeticalIndexMultiToneDemoComponent extends AsyncDescription implements OnInit {
    public demoPath = "demo/alphabetical-index/multi-tone";

    public pinyinDictionary: PinyinDictionary = {
        "乐": "Y", "乘": "S", "乾": "G", "仇": "Q", "会": "K", "传": "Z", "伺": "C", "佃": "D",
        "侗": "D", "侧": "Z", "便": "P", "冯": "P", "凹": "W", "刨": "B", "券": "X", "刹": "S",
        "剿": "C", "勺": "B", "匙": "C", "区": "O", "卒": "C", "单": "S", "卡": "Q", "厂": "A",
        "厕": "S", "厦": "S", "参": "S", "句": "G", "叨": "T", "召": "Z", "吁": "X", "合": "G",
        "吓": "H", "否": "P", "吭": "H", "呔": "D", "呲": "Z", "呵": "K", "咀": "Z", "咖": "G",
        "咯": "G", "哦": "E", "喏": "R", "喔": "O", "嗄": "A", "嗌": "A", "圈": "J", "坏": "P",
        "壳": "Q", "夹": "G", "奇": "J", "姥": "M", "宿": "X", "尿": "S", "峙": "S", "幢": "C"
    };
    public data: ArrayCollection<string>;

    changeDataType(type: string) {
        if (type == 'blank') {
            this.data = new ArrayCollection([]);
            return;
        }
        if (type == 'revise-data') {
            this.data = new ArrayCollection([]);
            for (let prop in this.pinyinDictionary) {
                this.data.push(`${prop} (${this.pinyinDictionary[prop]})`);
            }
            return;
        }

        let minEnLen = 5, maxEnLen = 15;
        let minZhLen = 2, maxZhLen = 6;
        switch (type) {
            case "en":
                minZhLen = 0;
                maxZhLen = 0;
                break;
            case "zh":
                minEnLen = 0;
                maxEnLen = 0;
                break;
        }
        const len = InternalUtils.randomNumber(100, 200);
        const source = [];
        for (let i = 0; i < len; i++) {
            source.push(this._getRandomString(minEnLen, maxEnLen, minZhLen, maxZhLen));
        }
        this.data = new ArrayCollection(source);
    }

    private _visibleAscChars = [];

    private _getRandomString(minEnLen, maxEnLen, minZhLen, maxZhLen): string {
        const enLen = InternalUtils.randomNumber(minEnLen, maxEnLen);
        let enStr = '';
        for (let i = 0; i < enLen; i++) {
            enStr += this._visibleAscChars[InternalUtils.randomNumber(0, this._visibleAscChars.length - 1)];
        }

        const zhLen = InternalUtils.randomNumber(minZhLen, maxZhLen);
        let zhStr = '';
        for (let i = 0; i < zhLen; i++) {
            zhStr += this._commonChineseChars[InternalUtils.randomNumber(0, this._commonChineseChars.length - 1)];
        }

        return InternalUtils.randomNumber(0, 1) ? enStr + zhStr : zhStr + enStr;
    }

    ngOnInit() {
        this.changeDataType('revise-data')
    }

    private _commonChineseChars = `
        的一是了不在有人上这大我国来们和个他中说
        到地为以子小就时全可下要十生会也出年得你
        主用那道学工多去发作自好过动对行里能二天
        三同成活太事面民日家方后都于之分经种还看
        产所起把进前着没而样部长又问法从本定见两
        新现如么力等电开五心只实社水外政很高月业
        当义些加老著四头因向理点合明无机意使第正
        度物想体此知关制然其表重化应各但者间百比
        什儿公做九相气命西话将内与由利今手平量员
        回情几最八级位结性代教次路党六便原军总走
        象口七先常题入给己队战果完反白建革立少文
        打论门东女放期真数展资通农名解叫提或山线
        条别万系已变形它边阶报官决她及争声北求世
        耍美再听才运必安取被南接华干区身济共计特
        改吃书马组界议车并海育思设件光强品直许造
        务流治领联金记任受极基质指帮目市快千导花
        科难深保住统管处认志图则研劳每场带亲至根
        更斗收信究且怎近非料何呢热术夫眼交布石达
        步拉众省风据奸增程火团字却油米委色式切望
        器办群观算调母土较请元爱持清广张连压觉识
        林际举即死专局类空单权毛师商孩装批府找往
        王校该未席约照易神克号京转须半习青早规验
        拿服节精树传备钱技讲告德参斯具织集病友谈
        示积亚复厂越支婚历兵胜选整铁势笑院板球河
        吗除准况影倒若格断甚速言采哪离县写台古远
        士感般呀低确晚害细标兴房游消够坐足史飞注
        紧食列失候周破推温英喜片苏首价双赛证木角
        族苦引始哥跟念故助容需落草项功送巴船罢鱼
        虽音试包洋怕似养满防红修田妇银城职止希查
        江站村曾黑段随费黄父续乐块买衣型状视愿投
        司欢效响刻存尽跑坚差滑武纪围阿层划企客底
        屋阳律妈派啊护施富像留让敌吧供皮维值既例
        急弟答严轮孔击款息扬叶轻朝率责营雨监忙称
        继固渐医良初刀星按坏帝负待姑夜属密简排均
        显旧啦谁尺云副男致适协靠艺脚换配宽迫洲久
        财免旅错姐归令余读创置益穿端抗独某判闻敢
        午冷材春守虫仅态圆岁预宣略源素矿充刚语左
        考仍恩烟构乡酒付画座君逐卖卫跳绝朋降李占
        汽药货救另获微伤奇减策句赶承州终娘案诉右
        依短察芬优杂波居爷限呼停互章纸封央脸普瓶
        演室背饭借顶肯乱班诸床乎善环您困吸假齐福
        慢血激毫担桥讨凭印钟鲜掉零童怪戏述汉尼含
        散杀恶斤肉肆牛模液罪评检范睛亦茶香访射烧
        灯兰沙针罗旁替脑输烈练境努径升钢哭突恐贵
        植粉酸削丝误野礼巷冲测麦露否登危搞歌亮欧
        痛唱玩肥超菜攻鼓退藏谢哈暗缺户迎堂训陈敬
        馆险妹移弹景顾课惊播挥熟票夺培棉夏灭抓味
        松掌架静曲粮束赞犯忽编异翻促套脱鼠祖尚尤
        嘴础伟骨潮载威阵闹园磨玉鸡侵竟概抵季执冬
        核补孙遇兄辨弄讯丰顺宝庄永毒托睡枝洞录港
        宗纳甲盖胡倍稳届附庭泥镇贫岛毕洗笔煤亿卡
        盘弱街损耳控狗晓铜末镜楼败航寻湖恼介宁招
        凤爸咱蒙混麻昨雷份索店探舞摇横凡岸莫龙沿
        临启盛操羊雄销伸鸟奶塞额吹幕途陆筑齿扩括
        缘阻阴拜猪旗绿氏私冰聪谋穷献沉抢灰践奋警
        秋召绩敞触休瓦征疑残析透欲壁狠剧牙幸苗氧
        妻怀喝荣篇订巨贸顿版剂瞧挂摆楚税厚抱握虎
        健卷胞刺忘炉逃缩偏隔聚窗庆寨追序喊软闭刘
        亩醒伯遍抽杆亡盾唯枪杯姓谷硬灵晨袋皆圈域
        鲁勇暴雪恨械惯寸津绍佛墙粒染井乙薄奖奴乃
        迅汗映猫彩蛋牌盐距桌股吨皇奏辛伐涉箱网盟
        振秩寒净博泪拆诗矛裂湿尊延彻幼番劝糠洁稻
        粗禁遣尾菌废裁燃伙愈丹瞒徒拍捉汇牧珠稿灾
        浪援怒堆避怜纯智丽雕铺驻拖康典妙岩浅抬坦
        瓜杨壮俗彼督耐勒赵剥虚钻乘繁勤殖贝贯脉兔
        纷尖缓圣遗祝迷洪库惜炮择竹忍览渡辆柱碎池
        旋川塔耕柴审辞插债湾震纵呆株宫遭签允扫累
        鞋螺奔贡宜擦暖趣润侧冒猛迹骂旱豆帽爬迟饮
        巧乌鬼释寄仪慌悟甘壤诚淡冠沈梦荷页丈伍懂
        祥爆厅碗滚授玻奉捕乏扎墨词夹摄仙艰秘泻倘
        婆唤垂愁喷炼糊涂叹丁壳泰鸣予倾贺舍虑秀朗
        售腿妄稍奥辈辟斜叔宪腐幅挑锦劲璃腰浓乒阀
        吉森荒邻泛蜂闪灌疗隶竞耗卵辩剩厘割添颜障
        臣吴扇亏拔珍黎胶绕仁偷伏仔暂荡欺违棒患贴
        骗貌潜浮赏锋晶拥殊唐赤宾默刑币鼻污泼祸刊
        胆衡纺沟悲纤扶撤揭泽渔孤呈巩申狐姻漏恰胸
        摸励仿戴盆妥融辉邮梁哲纱宋炭唉仗盗挖碰朱
        截符狂疾毁购邀肃饰恢骤贼顽扑磁袖肚耀纹牲
        栽龄鉴钢紫闷役阅燕坡咬刷拾肩缝储踏峰绳烂
        柳颗忠蒸挤覆乳匪租吐帐搬旨碍欠详瞎阔搭钉
        嫂弃兼蓄趁腾塑徐帖雅尘鹊芽陷蝇筒饼稀畜焦
        饿炸岂臂宿饲喂凉豪倡籍丢舒摩侮忧眉猴尝凶
        朵郎闯凝誉饱弯袭腹秤遵叙窝脂阁跌拆拒键秒
        瑞冻昼艇趋驾昌斑箭俱寿汤跃偶烦孟绪牵牢兽
        仰桑谅隐妨悄忆耻泉汪蚊慰递滴屈吓扰篮筹悉
        铃葡佩剑仇享犹悬蜜卧槽缸逼嫁劣罚丧漠柔宴
        锅歇抛昏羽滋梅庙铸拔戎蓝码剪敲闲译岭挺驱
        掘瘦匹蛇扣撞乞猜骑敏矮巡杜埋锻郑昆狼桃肝
        疮蚕鸦症苍轨伴隆赖惠陪返惨轰屡伪勿膜贪捐
        棋叛翁辽橡浙舌贷雀晴椅勉涨俩琴吊册棍弦鸭
        舅恭爹愧辱旬旦匠摘吵匀壶笼遮饥筋巾傅拼宅
        愤肤愚循链隙粘赔飘捧蓬哀孝漆穗乔侨辅躲渠
        丙锁狡拳脏谊眠宇墓梯芳崇涌衰蚀疆岗塘疯铅
        迈泡厌浆骄甜惑竭抚凯迁谨估绵逢栏秧赴恋慎
        扯厉仆慈冤穴嚷吞嫩杰携桂糕柜慕怨浇柏悔贤
        浸陶描胀偿掩鹿腊醉翼柄丑催丛昂薪浑纠棵跨
        咐尸睁咳萄晒酬肠腔钞龟惭熊劫戚猎鹅霉挽仓
        舰扭御溪蜡填虾胁爪霸牺串餐臭雾绣络漫妖堡
        赠狮鄙驴卜竿厨绸蚁锐洒弓燥婶狱暑姨佳炎颂
        畅驶嘱贞羞踢捷绘蔬煮廉挡鹰滤旺葛烛刮赌锡
        询汁弊砖枯矩殿桶坑傲辰顷膀峡轧熔滩魂撒逆
        颈溜漂梳慧躺茎吩疏盼舟淋郊欣恳堪杉誓裳罐
        晋仍驰抖粪驼棚爽谱枣嫌摇竖肺侍挨菊狸犬陕
        酱饶裕姿剖歪勾歼卸脾滨翅疼毅搁陵冶贩蛙皱
        僚怠躬宏颠蚂垫摊秆袍惹披泳蝶缠娃抹叨棕斥
        董档诱泊侦葬朴垦券疫恒碧骆浩堵脆鞠概丘酷
        茫疲砍绒渗胃蹲纽盈址痕糟匆溉搜拘轿宙诊叮
        稼拌贱膨狭押惰肿盲摔佣霞碑芦催钓脊痰堤艘
        框掠羡赚凑亭诞喘刃唇幻苹沃肌鞭窄裤抄夕钩
        霜谦叉肢撑盒锤娇坝捞懒驳锈罩遥怖尿晃莲窑
        鸽缎寺泄夸蔽葱炕筛兆垄坛逮跪毙烘掀攀扁哨
        凳拦杠畏咽衬惧缴屑颤掏厦蝴搅俊叠屿帅沸挣
        踪辣挪惩渴窃舱捏焰赢薯冈衔悠拣逝愉拢哄帘
        扮伞榜茂犁渣嘉膏茅孕梨傻锯姜铲屠哗洽枕涛
        翠闸傍谎禽囊帆砌乓艳沫芒蔑萝庸朽鸣蛮絮滥
        沾炒胖绑晌帜悦茧榴酿淘醋皂悼垒俭邪烛桐萍
        胳裹塌捆袜喉魔揉锄蹈膝趟钳嗓灿灶倦馅骡烤
        崖蕉僵撕袄桨俯咸荐杏盏坟萌蛾梢毯盯扛坊禾
        蒜滔橘浴蠢廊惕陡裙哑宰淹喇倚粱垮拐忌瓣逗
        脖伶斧踩膊屯搏蹄肾芝韵耽匙劈挠涝躁俘吼碌
        辫圾筐膛猾绞笛旷嚼扒乖秃垃糖诵甩窜粥斩僻
        煌熄锣眨樱丸蛛贿歉腥拴钥筝崭晕烫眯蜘虏雹
        笨嗽澡榨雁椒炊娱谜栗啄寇稠讽笋馒侄魄宵煎
        揪辜厕殃茄撇聋暮岔槐痒虹捎勺睬葵栋蹦绢搂
        柿趴榆镰删捡剃咏蜓疤蜻挎箩锹菠饺叼芹姥馋
        尔昵侯兜轴伊谓乾哩萨措溶爵犀邦俄埃彪柬琳
        频砂迂硫伦廷赫综函宦呵诺碳洛泵署焊菲咧姊
        嗡袁磷秦滞娶媳哎姆雇贾澳颇胎碱枚卢氢奈辑
        曼莱艾譬氯拟寂儒隅勃戈吏吁啥翔渤赐阐邓穆
        铝蝙锥弧仲瓷敦凌蟹舶祈缚凛怔铣履硅匈郭卑
        凸韩氨抑契贮甫昭卓梧谬磅魏钠霍谴芯氮蒋帕
        钙褐哼辐杭勘淀衷蒂徽俺菩涕癌勋敷刨兢钦坯
        鹏拱纬椿颁哟媒讼猿吱账酵暇晤诡肖钾粹蒲硝
        丐曹棱巢掷歧凹淮拓醇裸咨籽珊姚捂豫聘屏氛
        衍熙栈彭蜗稟逸凿潘蝗鸿瞪绅苇藤吕瘤驮郁湘
        崩棘觅粤涡卿衙靖腺舆罕逻辖枢诬趾幽缔赋锭
        锌冯寡斋涤婿浦玛谐萧刹溃嘿孵馏坎雌岳庞胚
        晰捣奠祭弥挫怯吟拧婴叭吻篷疟玫栓颖玄桩屁
        泣诈簇缆墩瞬蔗噪韧篡肪寓啼殷憾耸峻恕焚玲
        鼎甸兑饵稚鹤凄痴椭逊豺檐溢扳逛蝶沼踱鳄棺
        迄蛉嵌镀雏枉稽咒瑰沥喧彰庇泌砸搀灼茬萎鳞
        咕杉淑坠栖焕糙蝉僧邢嚣闺螟嘲镶葫汛筷苟铭
        忿骚昧潭昔礁梗畔梭懈讥乍厢豁澄囚矢栅蔓聊
        沪颊惶遂虐嗅鲸鞍尉撮恍喻耿仑鹉眷椎荆汰缅
        拙琼谭磕剿耙汞靴鲤藻蚜洼枫煞褂懊烹杖赦睦
        蕴窖夷瞻蕾苔魁渊锰钝熏翰楞宛矫菱啡薄捍蔫
        溅歹篱闽汹媚隧畦硕妆芭蚌埝腕揖堕薛聂哺亥
        伺寝捶秉箍氓磺壕廓蹬祷佑骇躯鳍淫毡竣舵眶
        囱翘揩椰碘钧咖蓉寞熬蛹赎阎橱膳驯遮窟瑟隘
        娜朦羔酌圃黍蟆呕巍畸擅柑钮畴彬缕屉砚楔腻
    `.replace(/\s/g, '').split('');
}