import { StatusBar } from 'expo-status-bar';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const openEmail = () => {
    Linking.openURL('mailto:add421013@gmail.com?subject=預約體驗 TIM BRIGHT AI 智慧眼鏡');
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.hero}>
        <Text style={styles.badge}>Tong Shun Tech Smart AI</Text>
        <Text style={styles.title}>TIM BRIGHT{'\n'}AI 智慧眼鏡</Text>
        <Text style={styles.subtitle}>
          專為商務、旅遊、學習與日常溝通打造的 AI 智慧穿戴體驗。
        </Text>

        <TouchableOpacity style={styles.primaryButton} onPress={openEmail}>
          <Text style={styles.primaryButtonText}>立即預約體驗</Text>
        </TouchableOpacity>
      </View>

      <Section title="核心功能">
        <Feature title="AI 即時翻譯" text="支援跨語言溝通場景，協助商務洽談、旅遊與學習更順暢。" />
        <Feature title="智慧語音助理" text="透過語音互動快速查詢資訊、記錄重點與提升日常效率。" />
        <Feature title="開放式聆聽體驗" text="兼顧環境感知與音訊播放，適合長時間配戴。" />
      </Section>

      <Section title="適用場景">
        <Tag text="商務會議" />
        <Tag text="海外旅遊" />
        <Tag text="語言學習" />
        <Tag text="門市接待" />
        <Tag text="展會導覽" />
      </Section>

      <Section title="預約流程">
        <Step number="1" text="留下姓名與聯絡方式" />
        <Step number="2" text="安排產品介紹與體驗時間" />
        <Step number="3" text="依需求提供品牌、企業或通路合作方案" />
      </Section>

      <Section title="常見問題">
        <FAQ q="產品頁會顯示售價嗎？" a="第一版不顯示售價，改以預約體驗與專人洽詢為主。" />
        <FAQ q="可以給甲方展示嗎？" a="可以，這版已整理成品牌展示、產品介紹與預約導流的 MVP。" />
        <FAQ q="後續能擴充會員或後台嗎？" a="可以，後續可加入登入、內容管理、預約管理與 AI 服務串接。" />
      </Section>

      <View style={styles.contactBox}>
        <Text style={styles.contactTitle}>需要專人協助？</Text>
        <Text style={styles.contactText}>點擊下方按鈕寄出預約需求。</Text>
        <TouchableOpacity style={styles.secondaryButton} onPress={openEmail}>
          <Text style={styles.secondaryButtonText}>聯絡我們</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>© 2026 Tong Shun Tech Smart AI</Text>
    </ScrollView>
  );
}

function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function Feature({ title, text }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardText}>{text}</Text>
    </View>
  );
}

function Tag({ text }) {
  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{text}</Text>
    </View>
  );
}

function Step({ number, text }) {
  return (
    <View style={styles.step}>
      <Text style={styles.stepNumber}>{number}</Text>
      <Text style={styles.stepText}>{text}</Text>
    </View>
  );
}

function FAQ({ q, a }) {
  return (
    <View style={styles.faq}>
      <Text style={styles.faqQ}>{q}</Text>
      <Text style={styles.faqA}>{a}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050816' },
  hero: { paddingTop: 92, paddingHorizontal: 24, paddingBottom: 56 },
  badge: {
    color: '#C4B5FD',
    backgroundColor: 'rgba(139,92,246,0.14)',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    marginBottom: 20,
    fontWeight: '700',
  },
  title: { color: '#fff', fontSize: 42, fontWeight: '800', lineHeight: 52 },
  subtitle: { color: '#CBD5E1', fontSize: 17, lineHeight: 28, marginTop: 18, marginBottom: 30 },
  primaryButton: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
  },
  primaryButtonText: { color: '#fff', fontSize: 18, fontWeight: '800' },
  section: { paddingHorizontal: 24, marginBottom: 34 },
  sectionTitle: { color: '#fff', fontSize: 26, fontWeight: '800', marginBottom: 16 },
  card: {
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#243044',
    borderRadius: 22,
    padding: 20,
    marginBottom: 14,
  },
  cardTitle: { color: '#fff', fontSize: 19, fontWeight: '800', marginBottom: 8 },
  cardText: { color: '#AAB4C4', fontSize: 15.5, lineHeight: 24 },
  tag: {
    backgroundColor: '#111827',
    borderColor: '#334155',
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 10,
  },
  tagText: { color: '#E5E7EB', fontSize: 16, fontWeight: '700' },
  step: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  stepNumber: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#8B5CF6',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 34,
    fontWeight: '900',
    marginRight: 12,
  },
  stepText: { color: '#D1D5DB', fontSize: 16, flex: 1, lineHeight: 24 },
  faq: {
    backgroundColor: '#0B1120',
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  faqQ: { color: '#fff', fontSize: 16, fontWeight: '800', marginBottom: 8 },
  faqA: { color: '#AAB4C4', fontSize: 15, lineHeight: 23 },
  contactBox: {
    marginHorizontal: 24,
    marginBottom: 34,
    padding: 22,
    borderRadius: 24,
    backgroundColor: '#1E1B4B',
  },
  contactTitle: { color: '#fff', fontSize: 24, fontWeight: '900', marginBottom: 8 },
  contactText: { color: '#DDD6FE', fontSize: 16, marginBottom: 18 },
  secondaryButton: { backgroundColor: '#fff', borderRadius: 16, paddingVertical: 14, alignItems: 'center' },
  secondaryButtonText: { color: '#4C1D95', fontSize: 17, fontWeight: '900' },
  footer: { color: '#64748B', textAlign: 'center', paddingBottom: 40 },
});