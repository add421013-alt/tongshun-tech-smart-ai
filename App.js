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

const CONTACT_EMAIL = 'add421013@gmail.com';
const CONTACT_SUBJECT = 'TIM BRIGHT AI 智慧眼鏡合作諮詢';

const heroStats = [
  { value: '24/7', label: '智慧助理' },
  { value: '10+', label: '跨語系場景' },
  { value: '98%', label: '溝通滿意度' },
];

const featureCards = [
  {
    title: 'AI 智慧翻譯',
    subtitle: '即時語言轉換與字幕同步',
    detail:
      '支援多語系翻譯、語意理解與即時字幕，讓商務會議、旅行與日常溝通更流暢。',
  },
  {
    title: '智慧語音助手',
    subtitle: '自然語音操作，零學習成本',
    detail:
      '透過語音查詢、任務管理與情境提醒，讓你的雙手保持專注於當下。',
  },
];

const scenes = [
  {
    title: '商務會議',
    copy: '跨國洽談、會議紀錄與專業英文摘要同步完成。',
  },
  {
    title: '海外旅行',
    copy: '隨時取得即時導覽、翻譯與地點資訊，提升旅途效率。',
  },
  {
    title: '日常生活',
    copy: '語音提醒、資訊摘要與沉浸式音訊，打造更智能的生活節奏。',
  },
];

const benefits = [
  {
    title: '極簡機身',
    text: '纖薄輕量，具備高辨識度的未來科技外型。',
  },
  {
    title: '沉浸式音訊',
    text: '環境感知與音訊控制結合，保留安全感又不失流暢性。',
  },
  {
    title: '企業可擴充',
    text: '支援品牌、通路與商務整合方案，適合企業合作。',
  },
];

export default function App() {
  const openContact = async () => {
    const url = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      CONTACT_SUBJECT
    )}`;

    try {
      const canOpen = await Linking.canOpenURL(url);

      if (!canOpen) {
        Alert.alert('無法開啟郵件', '請確認裝置已安裝郵件應用。');
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

      <View style={styles.heroPanel}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>AI SMART GLASSES</Text>
        </View>

        <Text style={styles.title}>
          TIM BRIGHT{'\n'}智慧眼鏡
        </Text>

        <Text style={styles.subtitle}>
          結合 AI 翻譯、智慧語音與沉浸式穿戴體驗，
          打造新世代智慧生活與商務溝通方式。
        </Text>

        <TouchableOpacity style={styles.mainButton} onPress={openContact}>
          <Text style={styles.mainButtonText}>立即預約體驗</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>核心功能</Text>

        <FeatureCard
          title="AI 即時翻譯"
          text="支援跨語言即時翻譯與智慧字幕，提升國際溝通效率。"
        />

        <FeatureCard
          title="智慧語音助理"
          text="透過語音快速操作、查詢資訊與管理日常任務。"
        />

        <FeatureCard
          title="沉浸式音訊"
          text="提供開放式聆聽體驗，兼顧環境感知與音樂播放。"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>應用場景</Text>

        <SceneCard text="商務會議與跨國洽談" />
        <SceneCard text="海外旅遊與即時導覽" />
        <SceneCard text="語言學習與日常溝通" />
        <SceneCard text="門市接待與智慧展示" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>產品優勢</Text>

        <AdvantageCard
          number="01"
          title="極簡科技外觀"
          text="以未來感設計語言打造高辨識度穿戴裝置。"
        />

        <AdvantageCard
          number="02"
          title="全天候配戴"
          text="輕量化結構與長效續航，適合長時間使用。"
        />

        <AdvantageCard
          number="03"
          title="企業合作彈性"
          text="可擴充品牌、通路、AI 與商務應用整合。"
        />
      </View>

      <View style={styles.ctaBox}>
        <Text style={styles.ctaTitle}>開始體驗 AI 智慧穿戴</Text>

        <Text style={styles.ctaText}>
          歡迎品牌、企業與合作夥伴聯繫，
          我們將提供產品展示與合作方案。
        </Text>

        <TouchableOpacity style={styles.ctaButton} onPress={openContact}>
          <Text style={styles.ctaButtonText}>聯絡我們</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>
        © 2026 Tong Shun Tech Smart AI
      </Text>
    </ScrollView>
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

function SceneCard({ text }) {
  return (
    <View style={styles.sceneCard}>
      <Text style={styles.sceneText}>{text}</Text>
    </View>
  );
}

function AdvantageCard({ number, title, text }) {
  return (
    <View style={styles.advantageCard}>
      <Text style={styles.advantageNumber}>{number}</Text>
      <Text style={styles.advantageTitle}>{title}</Text>
      <Text style={styles.advantageText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050816',
  },

  hero: {
    paddingTop: 100,
    paddingHorizontal: 24,
    paddingBottom: 60,
  },

  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(139,92,246,0.16)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    marginBottom: 24,
  },

  badgeText: {
    color: '#C4B5FD',
    fontWeight: '700',
    fontSize: 13,
  },

  title: {
    color: '#fff',
    fontSize: 44,
    fontWeight: '900',
    lineHeight: 54,
  },

  subtitle: {
    color: '#A5B4C3',
    fontSize: 17,
    lineHeight: 28,
    marginTop: 20,
    marginBottom: 34,
  },

  mainButton: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: 'center',
  },

  mainButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },

  section: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },

  sectionTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 18,
  },

  card: {
    backgroundColor: '#111827',
    borderRadius: 24,
    padding: 22,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1F2937',
  },

  cardTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 10,
  },

  cardText: {
    color: '#AAB4C4',
    fontSize: 15.5,
    lineHeight: 25,
  },

  sceneCard: {
    backgroundColor: '#0B1120',
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1E293B',
  },

  sceneText: {
    color: '#E5E7EB',
    fontSize: 16,
    fontWeight: '700',
  },

  advantageCard: {
    backgroundColor: '#111827',
    borderRadius: 24,
    padding: 22,
    marginBottom: 18,
  },

  advantageNumber: {
    color: '#8B5CF6',
    fontSize: 34,
    fontWeight: '900',
    marginBottom: 12,
  },

  advantageTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 10,
  },

  advantageText: {
    color: '#9CA3AF',
    fontSize: 15.5,
    lineHeight: 24,
  },

  ctaBox: {
    marginHorizontal: 24,
    backgroundColor: '#1E1B4B',
    borderRadius: 28,
    padding: 28,
    marginBottom: 40,
  },

  ctaTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 14,
  },

  ctaText: {
    color: '#DDD6FE',
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 24,
  },

  ctaButton: {
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
  },

  ctaButtonText: {
    color: '#4C1D95',
    fontSize: 17,
    fontWeight: '900',
  },

  footer: {
    color: '#64748B',
    textAlign: 'center',
    paddingBottom: 40,
  },
});