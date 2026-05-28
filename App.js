import React, { useMemo, useState } from 'react';
import {
  Alert,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Video, ResizeMode } from 'expo-av';
import {
  aiQuickQuestions,
  appInfo,
  legal,
  logo,
  products,
  videos,
} from './src/data/appData';

const NAV = [
  ['home', '首頁'],
  ['products', '產品'],
  ['videos', '教學'],
  ['ai', 'AI客服'],
  ['booking', '預約'],
];

export default function App() {
  const [entered, setEntered] = useState(false);
  const [tab, setTab] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState([
    {
      from: 'bot',
      text: '您好，我是統順 Tech Smart AI 客服助手。您可以詢問產品、預約、教學、客服或這個 App 的用途。',
    },
  ]);
  const [bookingProduct, setBookingProduct] = useState(products[0]?.id || '');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    line: '',
    date: '',
    note: '',
  });

  const activeColor = useMemo(() => {
    if (!selectedProduct) return null;
    return selectedProduct.colors[selectedColor] || selectedProduct.colors[0];
  }, [selectedProduct, selectedColor]);

  const resetDetail = () => {
    setSelectedProduct(null);
    setSelectedVideo(null);
    setSelectedColor(0);
  };

  const sendAiQuestion = (questionText) => {
    const question = questionText || aiInput.trim();
    if (!question) return;

    const matched = aiQuickQuestions.find(([q]) => question.includes(q.replace('？', '')));
    const answer = matched
      ? matched[1]
      : '這個問題我可以先提供初步協助。若涉及正式產品規格、價格、試戴、企業合作或售後服務，建議透過預約或真人客服確認。';

    setAiMessages((prev) => [
      ...prev,
      { from: 'user', text: question },
      { from: 'bot', text: answer },
    ]);
    setAiInput('');
  };

  const submitBooking = () => {
    if (!form.name || !form.phone || !form.date) {
      Alert.alert('資料尚未完整', '請填寫姓名、手機號碼與預約日期。');
      return;
    }

    if (!privacyAccepted) {
      Alert.alert('尚未同意隱私權政策', '請勾選同意隱私權政策後再送出。');
      return;
    }

    Alert.alert('確認送出預約？', `${form.name} 您好，是否確認送出預約資訊？`, [
      { text: '取消', style: 'cancel' },
      {
        text: '確認送出',
        onPress: () => {
          const body = `
【統順 Tech Smart AI 預約資訊】

姓名：${form.name}
手機：${form.phone}
LINE ID：${form.line || '未填寫'}
想了解產品：${bookingProduct}
預約日期：${form.date}
備註需求：
${form.note || '未填寫'}

隱私權政策同意：已同意
客服時間：${appInfo.serviceTime}
          `;

          const subject = encodeURIComponent('統順 Tech Smart AI 預約了解');
          const encodedBody = encodeURIComponent(body.trim());

          Linking.openURL(
            `mailto:${appInfo.email}?subject=${subject}&body=${encodedBody}`
          );
        },
      },
    ]);
  };

  if (!entered) {
    return <SplashScreen onEnter={() => setEntered(true)} />;
  }

  let content;

  if (selectedProduct && activeColor) {
    content = (
      <ProductDetail
        product={selectedProduct}
        colorData={activeColor}
        colorIndex={selectedColor}
        setColorIndex={setSelectedColor}
        onBack={resetDetail}
        goBooking={() => {
          setBookingProduct(selectedProduct.id);
          setTab('booking');
          resetDetail();
        }}
      />
    );
  } else if (selectedVideo) {
    content = <VideoDetail item={selectedVideo} onBack={resetDetail} goBooking={() => setTab('booking')} />;
  } else if (tab === 'home') {
    content = <HomeScreen openProduct={setSelectedProduct} goTab={setTab} />;
  } else if (tab === 'products') {
    content = <ProductsScreen openProduct={setSelectedProduct} />;
  } else if (tab === 'videos') {
    content = <VideosScreen openVideo={setSelectedVideo} goTab={setTab} />;
  } else if (tab === 'ai') {
    content = (
      <AIScreen
        activeQuestion={activeQuestion}
        setActiveQuestion={setActiveQuestion}
        aiInput={aiInput}
        setAiInput={setAiInput}
        aiMessages={aiMessages}
        sendAiQuestion={sendAiQuestion}
        goBooking={() => setTab('booking')}
      />
    );
  } else {
    content = (
      <BookingScreen
        form={form}
        setForm={setForm}
        bookingProduct={bookingProduct}
        setBookingProduct={setBookingProduct}
        privacyAccepted={privacyAccepted}
        setPrivacyAccepted={setPrivacyAccepted}
        submitBooking={submitBooking}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.app}>
        <Header />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {content}
        </ScrollView>
        {!selectedProduct && !selectedVideo && <BottomTabs tab={tab} setTab={setTab} />}
      </View>
    </SafeAreaView>
  );
}function SplashScreen({ onEnter }) {
  return (
    <TouchableOpacity activeOpacity={0.95} style={styles.splash} onPress={onEnter}>
      <StatusBar style="light" />
      <View style={styles.splashOrbOne} />
      <View style={styles.splashOrbTwo} />
      <View style={styles.splashPanel}>
        <Image source={logo} style={styles.splashLogo} resizeMode="contain" />
        <Text style={styles.splashTitle}>{appInfo.name}</Text>
        <Text style={styles.splashSlogan}>{appInfo.slogan}</Text>
        <View style={styles.splashDivider} />
        <Text style={styles.splashHint}>點一下進入智慧穿戴世界</Text>
      </View>
    </TouchableOpacity>
  );
}

function Header() {
  return (
    <View style={styles.header}>
      <Image source={logo} style={styles.headerLogo} resizeMode="contain" />
      <View style={styles.versionBadge}>
        <Text style={styles.versionBadgeText}>v{appInfo.version}</Text>
      </View>
    </View>
  );
}

function HomeScreen({ openProduct, goTab }) {
  const heroProduct = products[0];
  const heroColor = heroProduct.colors[0];

  return (
    <View>
      <View style={styles.heroCard}>
        <View style={styles.heroGlow} />
        <Text style={styles.eyebrow}>{appInfo.slogan}</Text>
        <Text style={styles.heroTitle}>AI 智慧眼鏡{'\n'}讓溝通更高效</Text>
        <Text style={styles.heroDesc}>
          以智慧音訊眼鏡為核心，整合 AI 客服、產品導覽、教學影片與專人預約，打造更專業的智慧生活入口。
        </Text>

        <Image source={heroColor.hero} style={styles.heroImage} resizeMode="contain" />

        <View style={styles.heroActions}>
          <TouchableOpacity style={styles.primaryButtonFlex} onPress={() => goTab('booking')}>
            <Text style={styles.primaryButtonText}>預約了解</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButtonFlex} onPress={() => goTab('products')}>
            <Text style={styles.secondaryButtonText}>查看產品</Text>
          </TouchableOpacity>
        </View>
      </View>

      <SectionTitle title="主推產品" sub="多款式、多色系智慧音訊眼鏡" />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productRail}>
        {products.map((item) => (
          <TouchableOpacity key={item.id} style={styles.homeProductCard} onPress={() => openProduct(item)}>
            <Image source={item.colors[0].images[0]} style={styles.homeProductImage} resizeMode="cover" />
            <Text style={styles.productCode}>{item.id}</Text>
            <Text style={styles.homeProductName}>{item.name}</Text>
            <Text style={styles.homeProductMeta}>{item.colors.map((c) => c.name).join(' / ')}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <SectionTitle title="智慧體驗" sub="從產品了解、使用教學到客服預約，一站完成" />

      <View style={styles.featureGrid}>
        {[
          ['AI 降噪通話', '降低環境干擾，讓通話更清晰。'],
          ['教學影片支援', '開機、連線、充電、配戴一次看懂。'],
          ['多色產品導覽', '依款式與顏色查看產品細節。'],
          ['預約專人服務', '留下資訊後由專人協助說明。'],
        ].map(([title, desc]) => (
          <View key={title} style={styles.featureCard}>
            <Text style={styles.featureTitle}>{title}</Text>
            <Text style={styles.featureDesc}>{desc}</Text>
          </View>
        ))}
      </View>

      <View style={styles.brandCard}>
        <Text style={styles.brandTitle}>品牌定位</Text>
        <Text style={styles.brandText}>
          統順 Tech Smart AI 是智慧眼鏡產品展示與服務平台，TIM BRIGHT／添鉑徠為第一波主推品牌，聚焦日常、商務與智慧穿戴情境。
        </Text>
      </View>

      <SupportCard />
    </View>
  );
}function ProductsScreen({ openProduct }) {
  return (
    <View>
      <PageHeader
        title="產品介紹"
        desc="不顯示售價，採預約了解與專人說明模式。"
      />

      {products.map((item) => (
        <TouchableOpacity key={item.id} style={styles.productCard} onPress={() => openProduct(item)}>
          <Image source={item.colors[0].hero} style={styles.productHero} resizeMode="cover" />

          <View style={styles.productBody}>
            <Text style={styles.productCode}>{item.id}</Text>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.seriesBadge}>{item.series}</Text>
            <Text style={styles.productDesc}>{item.desc}</Text>

            <View style={styles.chipWrap}>
              {item.colors.map((color) => (
                <View key={color.key} style={styles.colorChip}>
                  <Text style={styles.colorChipText}>{color.name}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.detailLink}>查看產品詳情 →</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function ProductDetail({ product, colorData, colorIndex, setColorIndex, onBack, goBooking }) {
  return (
    <View>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← 返回產品列表</Text>
      </TouchableOpacity>

      <Image source={colorData.hero} style={styles.detailHero} resizeMode="contain" />

      <View style={styles.detailPanel}>
        <Text style={styles.productCode}>{product.id}</Text>
        <Text style={styles.detailTitle}>{product.name}</Text>
        <Text style={styles.detailSub}>{product.series}｜{colorData.name}</Text>
        <Text style={styles.detailDesc}>{product.desc}</Text>

        <Text style={styles.blockTitle}>顏色選擇</Text>
        <View style={styles.colorSelectWrap}>
          {product.colors.map((color, index) => (
            <TouchableOpacity
              key={color.key}
              style={[styles.colorSelect, colorIndex === index && styles.colorSelectActive]}
              onPress={() => setColorIndex(index)}
            >
              <Text style={[styles.colorSelectText, colorIndex === index && styles.colorSelectTextActive]}>
                {color.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.blockTitle}>圖片展示</Text>
        <Text style={styles.helperText}>左右滑動查看產品本體、細節與情境照片</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {colorData.images.map((img, index) => (
            <Image key={index} source={img} style={styles.galleryImage} resizeMode="contain" />
          ))}
        </ScrollView>

        <View style={styles.dotRow}>
          {colorData.images.map((_, index) => (
            <View key={index} style={[styles.dot, index === 0 && styles.dotActive]} />
          ))}
        </View>

        <Text style={styles.blockTitle}>適合情境</Text>
        <View style={styles.chipWrap}>
          {product.scene.map((scene) => (
            <View key={scene} style={styles.sceneChip}>
              <Text style={styles.sceneChipText}>{scene}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.blockTitle}>功能亮點</Text>
        {product.points.map((point) => (
          <View key={point} style={styles.pointCard}>
            <Text style={styles.pointText}>{point}</Text>
          </View>
        ))}

        <View style={styles.positionCard}>
          <Text style={styles.positionTitle}>產品定位</Text>
          <Text style={styles.positionText}>
            經典全框系列適合日常通勤與生活配戴；商務金屬系列更適合正式場合、專業會議與展會接待。
          </Text>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={goBooking}>
          <Text style={styles.primaryButtonText}>預約了解此款</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}function VideosScreen({ openVideo, goTab }) {
  const categories = ['新手必看', '日常操作', '配戴調整'];
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <View>
      <PageHeader
        title="教學影片"
        desc="快速了解開機、連線、日常操作、充電與配戴調整。"
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickRail}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[styles.quickChip, activeCategory === category && styles.quickChipActive]}
            onPress={() => setActiveCategory(category)}
          >
            <Text style={[styles.quickChipText, activeCategory === category && styles.quickChipTextActive]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {videos
        .filter((item) => item.category === activeCategory)
        .map((item) => (
          <TouchableOpacity key={item.title} style={styles.videoCard} onPress={() => openVideo(item)}>
            <View>
              <Image source={item.cover} style={styles.videoCover} resizeMode="cover" />
              <View style={styles.playBadge}>
                <Text style={styles.playText}>▶</Text>
              </View>
            </View>
            <View style={styles.videoBody}>
              <Text style={styles.videoTitle}>{item.title}</Text>
              <Text style={styles.videoDesc}>{item.desc}</Text>
              <Text style={styles.detailLink}>播放影片 →</Text>
            </View>
          </TouchableOpacity>
        ))}

      <TouchableOpacity style={styles.primaryButton} onPress={() => goTab('booking')}>
        <Text style={styles.primaryButtonText}>看完教學，預約了解</Text>
      </TouchableOpacity>
    </View>
  );
}

function VideoDetail({ item, onBack, goBooking }) {
  return (
    <View>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← 返回教學影片</Text>
      </TouchableOpacity>

      <View style={styles.playerFrame}>
        <Video
          source={item.video}
          style={styles.player}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
        />
      </View>

      <View style={styles.detailPanel}>
        <Text style={styles.detailTitle}>{item.title}</Text>
        <Text style={styles.detailDesc}>{item.desc}</Text>

        <View style={styles.positionCard}>
          <Text style={styles.positionTitle}>教學補充說明</Text>
          <Text style={styles.positionText}>
            建議第一次使用時依照影片順序完成開機、連線、功能熟悉與配戴調整。
            若操作中遇到問題，可至 AI 客服或透過 LINE／電話聯繫客服。
          </Text>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={goBooking}>
          <Text style={styles.primaryButtonText}>前往預約了解</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function AIScreen({
  activeQuestion,
  setActiveQuestion,
  aiInput,
  setAiInput,
  aiMessages,
  sendAiQuestion,
  goBooking,
}) {
  return (
    <View>
      <PageHeader
        title="AI 客服"
        desc="可輸入問題，也可點選快捷問題快速了解產品與服務。"
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickRail}>
        {aiQuickQuestions.map(([q], index) => (
          <TouchableOpacity
            key={q}
            style={[styles.quickChip, activeQuestion === index && styles.quickChipActive]}
            onPress={() => {
              setActiveQuestion(index);
              sendAiQuestion(q);
            }}
          >
            <Text style={[styles.quickChipText, activeQuestion === index && styles.quickChipTextActive]}>
              {q}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.chatPanel} showsVerticalScrollIndicator={false}>
        {aiMessages.map((msg, index) => (
          <View key={index} style={msg.from === 'user' ? styles.userBubble : styles.botBubble}>
            {msg.from === 'bot' && <Text style={styles.botLabel}>Tech Smart AI</Text>}
            <Text style={msg.from === 'user' ? styles.userBubbleText : styles.botBubbleText}>
              {msg.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.aiInputBar}>
        <TextInput
          style={styles.aiInput}
          placeholder="輸入想詢問的問題..."
          placeholderTextColor="#68738F"
          value={aiInput}
          onChangeText={setAiInput}
        />
        <TouchableOpacity style={styles.aiSendButton} onPress={() => sendAiQuestion()}>
          <Text style={styles.aiSendText}>送出</Text>
        </TouchableOpacity>
      </View>

      <SupportCard />

      <TouchableOpacity style={styles.primaryButton} onPress={goBooking}>
        <Text style={styles.primaryButtonText}>前往預約了解</Text>
      </TouchableOpacity>
    </View>
  );
}function BookingScreen({
  form,
  setForm,
  bookingProduct,
  setBookingProduct,
  privacyAccepted,
  setPrivacyAccepted,
  submitBooking,
}) {
  return (
    <View>
      <PageHeader
        title="預約了解"
        desc="留下聯絡資訊與需求，專人將依客服時間協助回覆。"
      />

      <StepCard title="STEP 1｜填寫聯絡資訊" />

      <Input label="姓名" value={form.name} onChangeText={(v) => setForm({ ...form, name: v })} placeholder="請輸入姓名" />
      <Input label="手機號碼" value={form.phone} onChangeText={(v) => setForm({ ...form, phone: v })} placeholder="請輸入手機" keyboardType="phone-pad" />
      <Input label="LINE ID" value={form.line} onChangeText={(v) => setForm({ ...form, line: v })} placeholder="請輸入 LINE ID" />

      <StepCard title="STEP 2｜選擇想了解的產品" />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productSelectRail}>
        {products.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.productSelectCard, bookingProduct === item.id && styles.productSelectCardActive]}
            onPress={() => setBookingProduct(item.id)}
          >
            <Text style={[styles.productSelectCode, bookingProduct === item.id && styles.productSelectActiveText]}>
              {item.id}
            </Text>
            <Text style={[styles.productSelectName, bookingProduct === item.id && styles.productSelectActiveText]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Input label="預約日期" value={form.date} onChangeText={(v) => setForm({ ...form, date: v })} placeholder="例如：2026/05/28" />
      <Input label="備註需求" value={form.note} onChangeText={(v) => setForm({ ...form, note: v })} placeholder="想了解的顏色、用途或其他需求" multiline />

      <StepCard title="STEP 3｜確認與同意" />

      <TouchableOpacity style={styles.privacyRow} onPress={() => setPrivacyAccepted(!privacyAccepted)}>
        <View style={[styles.checkbox, privacyAccepted && styles.checkboxActive]}>
          {privacyAccepted && <Text style={styles.checkMark}>✓</Text>}
        </View>
        <Text style={styles.privacyText}>我已閱讀並同意隱私權政策與服務條款</Text>
      </TouchableOpacity>

      <View style={styles.legalPanel}>
        {legal.map(([title, content]) => (
          <View key={title} style={styles.legalItem}>
            <Text style={styles.legalTitle}>{title}</Text>
            <Text style={styles.legalText}>{content}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={submitBooking}>
        <Text style={styles.primaryButtonText}>確認預約內容</Text>
      </TouchableOpacity>

      <SupportCard />

      <Text style={styles.versionText}>{appInfo.name}｜Version {appInfo.version}</Text>
    </View>
  );
}

function PageHeader({ title, desc }) {
  return (
    <View style={styles.pageHeader}>
      <Text style={styles.pageTitle}>{title}</Text>
      <Text style={styles.pageDesc}>{desc}</Text>
    </View>
  );
}

function SectionTitle({ title, sub }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionSub}>{sub}</Text>
    </View>
  );
}

function StepCard({ title }) {
  return (
    <View style={styles.stepCard}>
      <Text style={styles.stepTitle}>{title}</Text>
    </View>
  );
}

function Input(props) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{props.label}</Text>
      <TextInput
        style={[styles.input, props.multiline && styles.textarea]}
        placeholderTextColor="#68738F"
        {...props}
      />
    </View>
  );
}

function SupportCard() {
  return (
    <View style={styles.supportCard}>
      <Text style={styles.supportTitle}>客服資訊</Text>
      <Text style={styles.supportText}>電話：{appInfo.phone}</Text>
      <Text style={styles.supportText}>LINE ID：{appInfo.line}</Text>
      <Text style={styles.supportText}>{appInfo.serviceTime}</Text>

      <TouchableOpacity style={styles.phoneButton} onPress={() => Linking.openURL(`tel:${appInfo.phone}`)}>
        <Text style={styles.phoneButtonText}>直接撥打客服</Text>
      </TouchableOpacity>
    </View>
  );
}

function BottomTabs({ tab, setTab }) {
  return (
    <View style={styles.tabs}>
      {NAV.map(([key, label]) => (
        <TouchableOpacity key={key} style={styles.tabItem} onPress={() => setTab(key)}>
          <Text style={[styles.tabIcon, tab === key && styles.tabIconActive]}>
            {key === 'home' ? '⌂' : key === 'products' ? '◇' : key === 'videos' ? '▶' : key === 'ai' ? 'AI' : '＋'}
          </Text>
          <Text style={[styles.tabText, tab === key && styles.tabTextActive]}>{label}</Text>
          {tab === key && <View style={styles.tabDot} />}
        </TouchableOpacity>
      ))}
    </View>
  );
}const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#06101F',
  },
  app: {
    flex: 1,
    backgroundColor: '#06101F',
  },
  scrollContent: {
    paddingBottom: 240,
  },

  splash: {
    flex: 1,
    backgroundColor: '#06101F',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 26,
    overflow: 'hidden',
  },
  splashOrbOne: {
    position: 'absolute',
    width: 360,
    height: 285,
    borderRadius: 180,
    backgroundColor: '#3B2BB8',
    opacity: 0.28,
    top: -80,
    right: -120,
  },
  splashOrbTwo: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#0EA5E9',
    opacity: 0.12,
    bottom: -60,
    left: -90,
  },
  splashPanel: {
    width: '100%',
    borderRadius: 36,
    padding: 30,
    backgroundColor: 'rgba(11,18,40,0.92)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
  },
  splashLogo: {
    width: 220,
    height: 96,
    marginBottom: 22,
  },
  splashTitle: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '900',
    marginBottom: 12,
    textAlign: 'center',
  },
  splashSlogan: {
    color: '#8CCBFF',
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 28,
  },
  splashDivider: {
    width: 70,
    height: 3,
    borderRadius: 999,
    backgroundColor: '#1E88FF',
    marginVertical: 24,
  },
  splashHint: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '700',
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 2,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  headerLogo: {
  width: 62,
  height: 62,
  borderRadius: 18,
},
  versionBadge: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: '#10213D',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  versionBadgeText: {
    color: '#8CCBFF',
    fontWeight: '900',
    fontSize: 12,
  },

  heroCard: {
    marginHorizontal: 18,
    marginTop: 8,
    padding: 24,
    borderRadius: 38,
    backgroundColor: '#071A33',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
  },
  heroGlow: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#5B35F5',
    opacity: 0.32,
    right: -80,
    top: -70,
  },
  eyebrow: {
    color: '#5DB7FF',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 14,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 38,
    lineHeight: 46,
    fontWeight: '900',
    marginBottom: 14,
  },
  heroDesc: {
    color: '#B7BED3',
    fontSize: 15.5,
    lineHeight: 25,
    marginBottom: 20,
  },
  heroImage: {
    width: '100%',
    height: 280,
    borderRadius: 32,
    backgroundColor: '#101935',
    marginBottom: 18,
  },
  heroActions: {
    flexDirection: 'row',
    gap: 12,
  },

  primaryButton: {
    backgroundColor: '#1E88FF',
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal: 22,
    marginTop: 16,
  },
  primaryButtonFlex: {
    flex: 1,
    backgroundColor: '#1E88FF',
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
  secondaryButtonFlex: {
    flex: 1,
    backgroundColor: '#10213D',
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16,
  },
  secondaryButtonText: {
    color: '#8CCBFF',
    fontWeight: '900',
    fontSize: 16,
  },

  sectionHeader: {
    paddingHorizontal: 22,
    marginTop: 34,
    marginBottom: 14,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
  },
  sectionSub: {
    color: '#8F97B2',
    fontSize: 14,
    marginTop: 7,
    lineHeight: 20,
  },

  productRail: {
    paddingLeft: 22,
    paddingRight: 8,
  },
  homeProductCard: {
    width: 188,
    marginRight: 14,
    padding: 12,
    borderRadius: 28,
    backgroundColor: '#0B1B35',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  homeProductImage: {
    width: '100%',
    height: 142,
    borderRadius: 22,
    backgroundColor: '#10213D',
    marginBottom: 12,
  },
  productCode: {
    color: '#45A3FF',
    fontSize: 13,
    fontWeight: '900',
    marginBottom: 5,
  },
  homeProductName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 22,
  },
  homeProductMeta: {
    color: '#8F97B2',
    fontSize: 12,
    marginTop: 6,
    lineHeight: 18,
  },

  featureGrid: {
    marginHorizontal: 22,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureCard: {
    width: '48%',
    padding: 18,
    borderRadius: 24,
    backgroundColor: '#0B1B35',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  featureTitle: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16,
    marginBottom: 8,
  },
  featureDesc: {
    color: '#94A3B8',
    fontSize: 13,
    lineHeight: 20,
  },

  brandCard: {
    marginHorizontal: 22,
    marginTop: 28,
    padding: 24,
    borderRadius: 30,
    backgroundColor: '#0B1B35',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  brandTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 12,
  },
  brandText: {
    color: '#C0C7DD',
    fontSize: 15,
    lineHeight: 25,
  },

  supportCard: {
    marginHorizontal: 22,
    marginTop: 22,
    padding: 24,
    borderRadius: 30,
    backgroundColor: '#0B2A4A',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  supportTitle: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 22,
    marginBottom: 12,
  },
  supportText: {
    color: '#CDEBFF',
    fontSize: 15,
    lineHeight: 25,
  },

  pageHeader: {
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 16,
  },
  pageTitle: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '900',
    marginBottom: 8,
  },
  pageDesc: {
    color: '#94A3B8',
    lineHeight: 22,
  },

  productCard: {
    marginHorizontal: 22,
    marginBottom: 22,
    borderRadius: 30,
    backgroundColor: '#0B1B35',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  productHero: {
    width: '100%',
    height: 230,
    backgroundColor: '#101935',
  },
  productBody: {
    padding: 20,
  },
  productName: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 29,
  },
  seriesBadge: {
    alignSelf: 'flex-start',
    marginTop: 12,
    color: '#CDEBFF',
    backgroundColor: '#0B2A4A',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '900',
  },
  productDesc: {
    color: '#CBD5E1',
    marginTop: 14,
    lineHeight: 23,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    gap: 8,
  },
  colorChip: {
    backgroundColor: '#10213D',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  colorChipText: {
    color: '#CBD5E1',
    fontWeight: '800',
    fontSize: 12,
  },
  detailLink: {
    color: '#8CCBFF',
    fontWeight: '900',
    marginTop: 16,
  },

  backButton: {
    marginHorizontal: 22,
    marginTop: 12,
    marginBottom: 10,
  },
  backText: {
    color: '#8CCBFF',
    fontWeight: '900',
  },
  detailHero: {
  width: '100%',
  height: 240,
  backgroundColor: '#101935',
}
  ,
  detailPanel: {
    padding: 22,
  },
  detailTitle: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '900',
    marginVertical: 8,
    lineHeight: 38,
  },
  detailSub: {
    color: '#45A3FF',
    marginBottom: 14,
    fontWeight: '900',
  },
  detailDesc: {
    color: '#CBD5E1',
    lineHeight: 24,
  },
  blockTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    marginTop: 24,
    marginBottom: 10,
  },
  helperText: {
    color: '#64748B',
    marginBottom: 12,
  },
  colorSelectWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  colorSelect: {
    paddingHorizontal: 15,
    paddingVertical: 11,
    borderRadius: 16,
    backgroundColor: '#10213D',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  colorSelectActive: {
    backgroundColor: '#1E88FF',
  },
  colorSelectText: {
    color: '#CBD5E1',
    fontWeight: '900',
  },
  colorSelectTextActive: {
    color: '#FFFFFF',
  },
  galleryImage: {
  width: 310,
  height: 285,
  borderRadius: 28,
  marginRight: 14,
  backgroundColor: '#10213D',
},
 

  mainGalleryFrame: {
    marginTop: 8,
    borderRadius: 30,
    backgroundColor: '#10213D',
    borderWidth: 1,
    borderColor: 'rgba(69,163,255,0.18)',
    overflow: 'hidden',
    height: 330,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainGalleryImage: {
    width: '100%',
    height: '100%',
  },
  imageLabel: {
    position: 'absolute',
    left: 14,
    top: 14,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: 'rgba(6,16,31,0.72)',
  },
  imageLabelText: {
    color: '#8CCBFF',
    fontWeight: '900',
    fontSize: 12,
  },
  thumbRail: {
    paddingTop: 14,
    paddingBottom: 4,
  },
  thumbBox: {
    width: 72,
    height: 72,
    borderRadius: 18,
    marginRight: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.06)',
    backgroundColor: '#10213D',
  },
  thumbBoxActive: {
    borderColor: '#1E88FF',
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },

  dotRow: {
    flexDirection: 'row',
    marginTop: 12,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#334155',
    marginRight: 6,
  },
  dotActive: {
    backgroundColor: '#45A3FF',
  },
  sceneChip: {
    backgroundColor: '#10213D',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  sceneChipText: {
    color: '#E5E7EB',
    fontWeight: '800',
  },
  pointCard: {
    backgroundColor: '#0B1B35',
    borderRadius: 18,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  pointText: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
  positionCard: {
    backgroundColor: '#0B2A4A',
    borderRadius: 24,
    padding: 18,
    marginTop: 18,
  },
  positionTitle: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 18,
    marginBottom: 8,
  },
  positionText: {
    color: '#CDEBFF',
    lineHeight: 23,
  },

  quickRail: {
    paddingLeft: 22,
    paddingRight: 10,
    paddingBottom: 8,
  },
  quickChip: {
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 999,
    backgroundColor: '#10213D',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  quickChipActive: {
    backgroundColor: '#1E88FF',
  },
  quickChipText: {
    color: '#CBD5E1',
    fontWeight: '800',
  },
  quickChipTextActive: {
    color: '#FFFFFF',
  },

  videoCard: {
    marginHorizontal: 22,
    marginBottom: 18,
    borderRadius: 28,
    backgroundColor: '#0B1B35',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  videoCover: {
    width: '100%',
    height: 190,
    backgroundColor: '#101935',
  },
  playBadge: {
    position: 'absolute',
    top: '39%',
    left: '43%',
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playText: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  videoBody: {
    padding: 18,
  },
  videoTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 6,
  },
  videoDesc: {
    color: '#94A3B8',
    lineHeight: 22,
  },
  playerFrame: {
    marginHorizontal: 22,
    borderRadius: 26,
    overflow: 'hidden',
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  player: {
    width: '100%',
    height: 260,
  },

  chatPanel: {
    maxHeight: 520,
    marginHorizontal: 16,
    paddingTop: 8,
  },
  userBubble: {
    alignSelf: 'flex-end',
    marginBottom: 12,
    backgroundColor: '#1E88FF',
    borderRadius: 22,
    padding: 16,
    maxWidth: '82%',
  },
  userBubbleText: {
    color: '#FFFFFF',
    fontWeight: '800',
    lineHeight: 22,
  },
  botBubble: {
    alignSelf: 'flex-start',
    marginBottom: 14,
    backgroundColor: '#10213D',
    borderRadius: 22,
    padding: 16,
    maxWidth: '88%',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  botLabel: {
    color: '#45A3FF',
    fontWeight: '900',
    marginBottom: 8,
  },
  botBubbleText: {
    color: '#CBD5E1',
    lineHeight: 23,
  },
  aiInputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 22,
    marginTop: 8,
    marginBottom: 18,
  },
  aiInput: {
    flex: 1,
    backgroundColor: '#10213D',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#FFFFFF',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  aiSendButton: {
    backgroundColor: '#1E88FF',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  aiSendText: {
    color: '#FFFFFF',
    fontWeight: '900',
  },

  stepCard: {
    marginHorizontal: 22,
    marginBottom: 12,
    padding: 14,
    borderRadius: 18,
    backgroundColor: '#0B1B35',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  stepTitle: {
    color: '#5DB7FF',
    fontWeight: '900',
  },
  inputGroup: {
    marginHorizontal: 22,
    marginBottom: 14,
  },
  inputLabel: {
    color: '#E5E7EB',
    fontWeight: '900',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#10213D',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  textarea: {
    minHeight: 105,
    textAlignVertical: 'top',
  },
  productSelectRail: {
    paddingLeft: 22,
    paddingRight: 10,
  },
  productSelectCard: {
    width: 178,
    padding: 16,
    borderRadius: 22,
    backgroundColor: '#10213D',
    marginRight: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  productSelectCardActive: {
    backgroundColor: '#1E88FF',
  },
  productSelectCode: {
    color: '#FFFFFF',
    fontWeight: '900',
    marginBottom: 6,
  },
  productSelectName: {
    color: '#CBD5E1',
    lineHeight: 20,
  },
  productSelectActiveText: {
    color: '#FFFFFF',
  },
  privacyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 22,
    marginBottom: 18,
  },
  checkbox: {
    width: 25,
    height: 25,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#1E88FF',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: '#1E88FF',
  },
  checkMark: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
  privacyText: {
    color: '#CBD5E1',
    flex: 1,
    lineHeight: 22,
  },
  legalPanel: {
    marginHorizontal: 22,
    padding: 20,
    borderRadius: 26,
    backgroundColor: '#10213D',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  legalItem: {
    marginBottom: 14,
  },
  legalTitle: {
    color: '#FFFFFF',
    fontWeight: '900',
    marginBottom: 6,
  },
  legalText: {
    color: '#CBD5E1',
    lineHeight: 22,
  },
  phoneButton: {
    marginTop: 16,
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: '#10213D',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  phoneButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
  versionText: {
    color: '#64748B',
    textAlign: 'center',
    marginTop: 26,
    marginBottom: 45,
  },

  tabs: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: '#060B1C',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
    paddingTop: 2,
    paddingBottom: 22,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabIcon: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '900',
    marginBottom: 3,
  },
  tabIconActive: {
    color: '#8CCBFF',
  },
  tabText: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '800',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  tabDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#45A3FF',
    marginTop: 5,
  },
});