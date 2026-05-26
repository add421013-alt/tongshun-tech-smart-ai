import { StatusBar } from 'expo-status-bar';
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const BOOKING_EMAIL = 'add421013@gmail.com';
const BOOKING_SUBJECT = '預約體驗 TIM BRIGHT AI 智慧眼鏡';
const BOOKING_BODY =
  '您好，我想預約體驗 TIM BRIGHT AI 智慧眼鏡。\n\n姓名：\n電話：\n公司/單位：\n方便聯絡時間：';

const featureCards = [
  {
    title: 'AI 即時翻譯',
    text: '支援多語言會議、旅遊與展會現場溝通，讓跨語境交流更順暢。',
  },
  {
    title: '智慧語音助理',
    text: '透過語音操控、快速查詢與情境提示，提升日常效率。',
  },
  {
    title: '開放式聆聽',
    text: '保留環境感知，兼顧通話、音訊播放與長時間配戴舒適度。',
  },
];

const scenarioCards = ['商務會議', '海外旅遊', '門市接待', '展會導覽', '語言學習', '企業採購'];

const processSteps = [
  '留下姓名、電話與公司/單位',
  '安排產品介紹、試戴與功能展示',
  '依需求提供商務、旅遊與通路方案',
];

const faqItems = [
  {
    q: '產品頁會顯示售價嗎？',
    a: '第一版以預約體驗與專人洽詢為主，避免過早將售價放進首屏，讓方案更適合企業導入。',
  },
  {
    q: '目前版本可以上架嗎？',
    a: '可以作為 MVP 版本上架，但正式送審前建議補齊隱私權政策、客服資訊與商店截圖。',
  },
  {
    q: '後續能接 AI 服務嗎？',
    a: '可以擴充後端代理服務，將 API Key 與敏感邏輯留在後端保護。',
  },
];

export default function App() {
  const openBooking = async () => {
    const url = `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(
      BOOKING_SUBJECT
    )}&body=${encodeURIComponent(BOOKING_BODY)}`;

    try {
      const canOpen = await Linking.canOpenURL(url);

      if (!canOpen) {
        Alert.alert('無法開啟郵件', '請確認你的裝置已設定預設郵件應用。');
        return;
      }

      await Linking.openURL(url);
    } catch (error) {
      Alert.alert('聯絡失敗', '目前無法開啟郵件，請稍後再試。');
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar style="light" />

      <View style={styles.heroBlock}>
        <View style={styles.heroCard}>
          <Text style={styles.eyebrow}>TIM BRIGHT AI GLASSES</Text>
          <Text style={styles.title}>看見未來，聽懂世界</Text>
          <Text style={styles.subtitle}>
            以高階科技感與 AI 互動能力，打造商務、旅遊與日常生活的全新穿戴入口。
          </Text>

          <View style={styles.metricRow}>
            <MetricChip value="24/7" label="智慧輔助" />
            <MetricChip value="10+" label="情境場景" />
            <MetricChip value="98%" label="溝通滿意" />
          </View>

          <View style={styles.deviceCard}>
            <View style={styles.lens} />
            <View style={styles.bridge} />
            <View style={styles.lens} />
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={openBooking}>
            <Text style={styles.primaryButtonText}>預約產品體驗</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Section
        title="核心能力"
        desc="品牌首屏著重在產品價值的快速理解，讓客戶能在幾秒內看見 AI 智慧眼鏡的核心優勢。"
      >
        {featureCards.map((item) => (
          <FeatureCard key={item.title} title={item.title} text={item.text} />
        ))}
      </Section>

      <Section
        title="應用場景"
        desc="無論是商務會議、海外旅遊、門市接待或企業採購，TIM BRIGHT 都能提供更自然的互動體驗。"
      >
        <View style={styles.scenarioGrid}>
          {scenarioCards.map((item) => (
            <View style={styles.scenarioPill} key={item}>
              <Text style={styles.scenarioText}>{item}</Text>
            </View>
          ))}
        </View>
      </Section>

      <Section
        title="預約流程"
        desc="以專人介紹與需求訪談為主，讓產品展示更符合對象需求，並提升合作成功率。"
      >
        {processSteps.map((step, index) => (
          <ProcessCard key={step} index={index + 1} text={step} />
        ))}
      </Section>

      <View style={styles.ctaCard}>
        <Text style={styles.ctaTitle}>準備好呈現完整品牌故事了嗎？</Text>
        <Text style={styles.ctaText}>
          這版可作為品牌展示、預約導流與上架前測試版本，並可後續擴充後台、會員與 AI 服務整合。
        </Text>
        <TouchableOpacity style={styles.secondaryButton} onPress={openBooking}>
          <Text style={styles.secondaryButtonText}>聯絡專人</Text>
        </TouchableOpacity>
      </View>

      <Section
        title="常見問題"
        desc="先把上架與合作疑慮處理清楚，讓品牌內容更穩定，也更容易被內部與外部接受。"
      >
        {faqItems.map((item) => (
          <FaqCard key={item.q} question={item.q} answer={item.a} />
        ))}
      </Section>

      <Text style={styles.footer}>© 2026 Tong Shun Tech Smart AI · TIM BRIGHT</Text>
    </ScrollView>
  );
}

function Section({ title, desc, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionDesc}>{desc}</Text>
      {children}
    </View>
  );
}

function MetricChip({ value, label }) {
  return (
    <View style={styles.metricChip}>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

function FeatureCard({ title, text }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardText}>{text}</Text>
    </View>
  );
}

function ProcessCard({ index, text }) {
  return (
    <View style={styles.processCard}>
      <Text style={styles.processIndex}>{`0${index}`}</Text>
      <Text style={styles.processText}>{text}</Text>
    </View>
  );
}

function FaqCard({ question, answer }) {
  return (
    <View style={styles.faqCard}>
      <Text style={styles.faqQuestion}>{question}</Text>
      <Text style={styles.faqAnswer}>{answer}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030712',
  },
  heroBlock: {
    paddingHorizontal: 20,
    paddingTop: 76,
    paddingBottom: 18,
  },
  heroCard: {
    backgroundColor: '#090F1F',
    borderRadius: 34,
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.24)',
    padding: 24,
    shadowColor: '#8B5CF6',
    shadowOpacity: 0.18,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 18 },
    elevation: 10,
  },
  eyebrow: {
    color: '#C4B5FD',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: '900',
    lineHeight: 50,
    marginBottom: 14,
  },
  subtitle: {
    color: '#D9E3F4',
    fontSize: 16.5,
    lineHeight: 28,
    marginBottom: 22,
  },
  metricRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 22,
  },
  metricChip: {
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.24)',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 14,
    minWidth: 92,
    alignItems: 'center',
  },
  metricValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  metricLabel: {
    color: '#A5B4FC',
    fontSize: 12,
    marginTop: 4,
  },
  deviceCard: {
    height: 136,
    borderRadius: 30,
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.22)',
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  lens: {
    width: 92,
    height: 54,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: '#C4B5FD',
    backgroundColor: '#111827',
  },
  bridge: {
    width: 34,
    height: 4,
    borderRadius: 999,
    backgroundColor: '#C4B5FD',
    marginHorizontal: 12,
  },
  primaryButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#8B5CF6',
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 14 },
    elevation: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 28,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 8,
  },
  sectionDesc: {
    color: '#94A3B8',
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 18,
  },
  card: {
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.22)',
    borderRadius: 28,
    padding: 20,
    marginBottom: 14,
    shadowColor: '#0F172A',
    shadowOpacity: 0.35,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 16 },
    elevation: 8,
  },
  cardTitle: {
    color: '#F8FAFC',
    fontSize: 19,
    fontWeight: '900',
    marginBottom: 8,
  },
  cardText: {
    color: '#CBD5E1',
    fontSize: 15.5,
    lineHeight: 24,
  },
  scenarioGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  scenarioPill: {
    width: '48%',
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: 'rgba(100, 116, 139, 0.28)',
    borderRadius: 22,
    paddingVertical: 18,
    paddingHorizontal: 14,
  },
  scenarioText: {
    color: '#E2E8F0',
    fontWeight: '800',
    textAlign: 'center',
  },
  processCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.22)',
    padding: 18,
    marginBottom: 12,
  },
  processIndex: {
    color: '#C4B5FD',
    fontSize: 18,
    fontWeight: '900',
    marginRight: 14,
  },
  processText: {
    color: '#E2E8F0',
    fontSize: 16,
    lineHeight: 24,
    flex: 1,
  },
  ctaCard: {
    marginHorizontal: 20,
    marginVertical: 16,
    padding: 24,
    borderRadius: 30,
    backgroundColor: '#1E1B4B',
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.22)',
  },
  ctaTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 10,
  },
  ctaText: {
    color: '#DDD6FE',
    fontSize: 15.5,
    lineHeight: 25,
    marginBottom: 22,
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#4C1D95',
    fontSize: 17,
    fontWeight: '900',
  },
  faqCard: {
    backgroundColor: '#0F172A',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(100, 116, 139, 0.28)',
    padding: 18,
    marginBottom: 12,
  },
  faqQuestion: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 8,
  },
  faqAnswer: {
    color: '#CBD5E1',
    fontSize: 15,
    lineHeight: 23,
  },
  footer: {
    color: '#64748B',
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 40,
  },
});
