import React, { useState } from 'react';
import {
  Alert,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const PRODUCTS = [
  {
    id: 'TBI1001',
    name: 'TBI1001 方形智慧音訊眼鏡',
    desc: '俐落方框搭配智慧音訊體驗，適合都會生活與長時間工作配戴。',
    tags: ['都會日常', '工作配戴', '智慧音訊'],
  },
  {
    id: 'TBI1002',
    name: 'TBI1002 圓形智慧音訊眼鏡',
    desc: '經典圓框結合智慧音訊功能，適合日常配戴與通勤使用。',
    tags: ['日常穿搭', '通勤使用', '圓框風格'],
  },
  {
    id: 'TBM1003',
    name: 'TBM1003 方形金屬智慧音訊眼鏡',
    desc: '方形金屬框搭配智慧音訊應用，適合專業辦公與正式商務場合。',
    tags: ['金屬框', '商務場合', '專業辦公'],
  },
  {
    id: 'TBM1004',
    name: 'TBM1004 圓形金屬智慧音訊眼鏡',
    desc: '輕巧金屬圓框融合智慧音訊功能，展現知性質感與輕商務風格。',
    tags: ['輕商務', '金屬圓框', '知性質感'],
  },
];

const FAQS = [
  ['目前主推哪些型號？', '目前第一版主推 TBI1001、TBI1002、TBM1003、TBM1004 四款智慧音訊眼鏡。'],
  ['產品頁會顯示售價嗎？', '第一版產品頁先不顯示售價，主要以產品介紹、功能理解與預約諮詢為主。'],
  ['可以預約了解嗎？', '可以，請留下姓名、手機、LINE、想了解的產品型號與方便時段，將由專人後續聯繫。'],
  ['後續可以增加其他品牌嗎？', '可以。統順 Tech Smart AI 是多品牌智慧眼鏡平台，TIM BRIGHT／添鉑徠為目前第一批品牌。'],
];

const VIDEOS = [
  ['開機與連線教學', '協助使用者快速完成首次設定與基本連線。'],
  ['日常功能使用', '介紹智慧音訊、通話與日常操作重點。'],
  ['充電與保養', '說明充電方式、續航使用與日常維護。'],
  ['配戴舒適調整', '協助使用者找到更適合自己的配戴方式。'],
  ['常見問題排除', '整理使用初期最常遇到的操作疑問。'],
];

export default function App() {
  const [tab, setTab] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0].id);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    line: '',
    date: '',
    time: '10:00 - 12:00',
    note: '',
  });

  const callPhone = () => Linking.openURL('tel:0966027516');
  const sendEmail = () => {
    const body = `姓名：${form.name}
手機：${form.phone}
LINE：${form.line}
想了解產品：${selectedProduct}
預約日期：${form.date}
預約時段：${form.time}
備註：${form.note}`;
    Linking.openURL(`mailto:tongshun634@gmail.com?subject=統順 Tech Smart AI 預約了解&body=${encodeURIComponent(body)}`);
  };
  const submitBooking = () => {
    if (!form.name || !form.phone || !form.date) {
      Alert.alert('資料尚未完整', '請填寫姓名、手機號碼與預約日期。');
      return;
    }
    sendEmail();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.app}>
        <Header />
        <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
          {tab === 'home' && <Home onBooking={() => setTab('booking')} />}
          {tab === 'products' && <Products onBooking={() => setTab('booking')} />}
          {tab === 'ai' && <AIHelp />}
          {tab === 'videos' && <Videos />}
          {tab === 'booking' && (
            <Booking
              form={form}
              setForm={setForm}
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
              submitBooking={submitBooking}
              callPhone={callPhone}
            />
          )}
        </ScrollView>
        <BottomTabs tab={tab} setTab={setTab} />
      </View>
    </SafeAreaView>
  );
}

function Header() {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.brandSmall}>統順 Tech Smart AI</Text>
        <Text style={styles.brandTitle}>TIM BRIGHT／添鉑徠</Text>
      </View>
      <View style={styles.statusPill}>
        <Text style={styles.statusText}>AI Glasses</Text>
      </View>
    </View>
  );
}

function Home({ onBooking }) {
  return (
    <View>
      <View style={styles.hero}>
        <Text style={styles.heroKicker}>科技驅動・智慧生活・AI視界</Text>
        <Text style={styles.heroTitle}>AI 隨行，讓溝通更高效</Text>
        <Text style={styles.heroText}>
          統順 Tech Smart AI 提供智慧眼鏡產品資訊、教學內容、AI 問答與聯絡導流，協助使用者快速了解產品特色與日常應用情境。
        </Text>

        <View style={styles.glassesCard}>
          <View style={styles.glasses}>
            <View style={styles.lens} />
            <View style={styles.bridge} />
            <View style={styles.lens} />
          </View>
          <Text style={styles.deviceText}>Smart Audio Glasses</Text>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={onBooking}>
          <Text style={styles.primaryButtonText}>立即預約了解</Text>
        </TouchableOpacity>
      </View>

      <Section title="日常配戴更自在的智慧體驗">
        <Highlight title="輕量舒適" text="久戴無負擔，適合工作、通勤與日常生活。" />
        <Highlight title="雙麥 AI 降噪" text="通話更清晰，降低周遭環境干擾。" />
        <Highlight title="開放聲場音訊" text="聆聽自然不封閉，保留環境感知。" />
      </Section>

      <Section title="第一版核心服務">
        <MiniGrid items={['產品目錄', 'AI 問答客服', '教學影片', 'LINE／電話導流']} />
      </Section>
    </View>
  );
}

function Products({ onBooking }) {
  return (
    <View>
      <PageTitle title="產品目錄" subtitle="第一版主推 TIM BRIGHT／添鉑徠智慧音訊眼鏡，不顯示售價，以預約與專人說明為主。" />
      {PRODUCTS.map((p) => (
        <View key={p.id} style={styles.productCard}>
          <View style={styles.productVisual}>
            <View style={styles.productLens} />
            <View style={styles.productBridge} />
            <View style={styles.productLens} />
          </View>
          <Text style={styles.productId}>{p.id}</Text>
          <Text style={styles.productName}>{p.name}</Text>
          <Text style={styles.productDesc}>{p.desc}</Text>
          <View style={styles.tagRow}>
            {p.tags.map((tag) => (
              <Text key={tag} style={styles.tag}>{tag}</Text>
            ))}
          </View>
          <TouchableOpacity style={styles.outlineButton} onPress={onBooking}>
            <Text style={styles.outlineButtonText}>預約了解此款</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

function AIHelp() {
  return (
    <View>
      <PageTitle title="AI 問答客服" subtitle="以常見問題、產品差異與使用支援為主，必要時導向真人客服。" />
      {FAQS.map(([q, a]) => (
        <View key={q} style={styles.chatCard}>
          <Text style={styles.question}>{q}</Text>
          <Text style={styles.answer}>{a}</Text>
        </View>
      ))}
      <View style={styles.noticeBox}>
        <Text style={styles.noticeTitle}>真人客服</Text>
        <Text style={styles.noticeText}>客服電話：0966027516</Text>
        <Text style={styles.noticeText}>LINE ID：yellow88cc</Text>
        <Text style={styles.noticeText}>客服時間：每日 10:00 - 18:00</Text>
      </View>
    </View>
  );
}

function Videos() {
  return (
    <View>
      <PageTitle title="教學影片" subtitle="協助使用者快速熟悉智慧眼鏡的基本操作、連線、保養與常見問題。" />
      {VIDEOS.map(([title, desc], index) => (
        <View key={title} style={styles.videoCard}>
          <View style={styles.playCircle}>
            <Text style={styles.playText}>▶</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.videoTitle}>{index + 1}. {title}</Text>
            <Text style={styles.videoDesc}>{desc}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

function Booking({ form, setForm, selectedProduct, setSelectedProduct, submitBooking, callPhone }) {
  return (
    <View>
      <PageTitle title="立即預約了解" subtitle="留下聯絡方式與想了解的產品資訊，我們將由專人盡快與您聯繫。" />

      <Input label="姓名" value={form.name} onChangeText={(v) => setForm({ ...form, name: v })} placeholder="請輸入姓名" />
      <Input label="手機號碼" value={form.phone} onChangeText={(v) => setForm({ ...form, phone: v })} placeholder="請輸入手機號碼" keyboardType="phone-pad" />
      <Input label="LINE 聯絡方式" value={form.line} onChangeText={(v) => setForm({ ...form, line: v })} placeholder="請輸入 LINE ID 或聯絡方式" />

      <Text style={styles.inputLabel}>想了解的產品型號</Text>
      <View style={styles.optionWrap}>
        {PRODUCTS.map((p) => (
          <TouchableOpacity
            key={p.id}
            style={[styles.option, selectedProduct === p.id && styles.optionActive]}
            onPress={() => setSelectedProduct(p.id)}
          >
            <Text style={[styles.optionText, selectedProduct === p.id && styles.optionTextActive]}>{p.id}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Input label="預約日期" value={form.date} onChangeText={(v) => setForm({ ...form, date: v })} placeholder="例如：2026/05/28" />

      <Text style={styles.inputLabel}>預約時段</Text>
      <View style={styles.optionWrap}>
        {['10:00 - 12:00', '12:00 - 14:00', '14:00 - 16:00', '16:00 - 18:00'].map((time) => (
          <TouchableOpacity
            key={time}
            style={[styles.option, form.time === time && styles.optionActive]}
            onPress={() => setForm({ ...form, time })}
          >
            <Text style={[styles.optionText, form.time === time && styles.optionTextActive]}>{time}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Input label="備註需求" value={form.note} onChangeText={(v) => setForm({ ...form, note: v })} placeholder="可填寫想了解的內容或補充需求" multiline />

      <Text style={styles.privacy}>我已閱讀並同意隱私權政策，並同意提供以上資料作為預約聯繫與產品諮詢使用。</Text>

      <TouchableOpacity style={styles.primaryButton} onPress={submitBooking}>
        <Text style={styles.primaryButtonText}>送出預約</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.phoneButton} onPress={callPhone}>
        <Text style={styles.phoneButtonText}>直接撥打客服 0966027516</Text>
      </TouchableOpacity>
    </View>
  );
}

function PageTitle({ title, subtitle }) {
  return (
    <View style={styles.pageTitleBox}>
      <Text style={styles.pageTitle}>{title}</Text>
      <Text style={styles.pageSubtitle}>{subtitle}</Text>
    </View>
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

function Highlight({ title, text }) {
  return (
    <View style={styles.highlight}>
      <Text style={styles.highlightTitle}>{title}</Text>
      <Text style={styles.highlightText}>{text}</Text>
    </View>
  );
}

function MiniGrid({ items }) {
  return (
    <View style={styles.miniGrid}>
      {items.map((item) => (
        <View style={styles.miniItem} key={item}>
          <Text style={styles.miniText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

function Input(props) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{props.label}</Text>
      <TextInput
        style={[styles.input, props.multiline && styles.textarea]}
        placeholderTextColor="#64748B"
        {...props}
      />
    </View>
  );
}

function BottomTabs({ tab, setTab }) {
  const tabs = [
    ['home', '首頁'],
    ['products', '產品'],
    ['ai', 'AI問答'],
    ['videos', '教學'],
    ['booking', '預約'],
  ];

  return (
    <View style={styles.tabs}>
      {tabs.map(([key, label]) => (
        <TouchableOpacity key={key} style={styles.tabItem} onPress={() => setTab(key)}>
          <Text style={[styles.tabText, tab === key && styles.tabTextActive]}>{label}</Text>
          {tab === key && <View style={styles.tabDot} />}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#050816' },
  app: { flex: 1, backgroundColor: '#050816' },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandSmall: { color: '#94A3B8', fontSize: 12, fontWeight: '700' },
  brandTitle: { color: '#FFFFFF', fontSize: 17, fontWeight: '900', marginTop: 3 },
  statusPill: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#334155',
  },
  statusText: { color: '#A78BFA', fontSize: 12, fontWeight: '900' },
  body: { flex: 1 },
  hero: { paddingHorizontal: 22, paddingTop: 18, paddingBottom: 28 },
  heroKicker: { color: '#A78BFA', fontWeight: '900', letterSpacing: 1.1, marginBottom: 12 },
  heroTitle: { color: '#FFFFFF', fontSize: 34, fontWeight: '900', lineHeight: 43, marginBottom: 12 },
  heroText: { color: '#CBD5E1', fontSize: 15.5, lineHeight: 25, marginBottom: 22 },
  glassesCard: {
    height: 160,
    borderRadius: 30,
    backgroundColor: '#0B1120',
    borderWidth: 1,
    borderColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },
  glasses: { flexDirection: 'row', alignItems: 'center' },
  lens: {
    width: 100,
    height: 58,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#8B5CF6',
    backgroundColor: '#111827',
  },
  bridge: { width: 34, height: 4, backgroundColor: '#8B5CF6' },
  deviceText: { color: '#64748B', marginTop: 14, fontWeight: '800' },
  primaryButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: { color: '#FFFFFF', fontSize: 17, fontWeight: '900' },
  section: { paddingHorizontal: 22, marginBottom: 28 },
  sectionTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: '900', marginBottom: 14 },
  highlight: {
    backgroundColor: '#0B1120',
    borderRadius: 22,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  highlightTitle: { color: '#FFFFFF', fontSize: 17, fontWeight: '900', marginBottom: 8 },
  highlightText: { color: '#AAB4C4', fontSize: 14.5, lineHeight: 22 },
  miniGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  miniItem: {
    width: '48%',
    backgroundColor: '#111827',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  miniText: { color: '#E5E7EB', textAlign: 'center', fontWeight: '900' },
  pageTitleBox: { paddingHorizontal: 22, paddingTop: 18, paddingBottom: 18 },
  pageTitle: { color: '#FFFFFF', fontSize: 30, fontWeight: '900', marginBottom: 8 },
  pageSubtitle: { color: '#94A3B8', fontSize: 15, lineHeight: 23 },
  productCard: {
    marginHorizontal: 22,
    marginBottom: 18,
    padding: 18,
    borderRadius: 26,
    backgroundColor: '#0B1120',
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  productVisual: {
    height: 96,
    borderRadius: 22,
    backgroundColor: '#111827',
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  productLens: {
    width: 62,
    height: 34,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#A78BFA',
  },
  productBridge: { width: 22, height: 3, backgroundColor: '#A78BFA' },
  productId: { color: '#A78BFA', fontWeight: '900', marginBottom: 5 },
  productName: { color: '#FFFFFF', fontSize: 18, fontWeight: '900', marginBottom: 8 },
  productDesc: { color: '#AAB4C4', fontSize: 14.5, lineHeight: 22 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14 },
  tag: {
    color: '#DDD6FE',
    backgroundColor: '#1E1B4B',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '800',
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: '#8B5CF6',
    borderRadius: 16,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 16,
  },
  outlineButtonText: { color: '#C4B5FD', fontWeight: '900' },
  chatCard: {
    marginHorizontal: 22,
    marginBottom: 14,
    padding: 18,
    borderRadius: 22,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#243044',
  },
  question: { color: '#FFFFFF', fontSize: 16, fontWeight: '900', marginBottom: 8 },
  answer: { color: '#AAB4C4', fontSize: 14.5, lineHeight: 22 },
  noticeBox: {
    marginHorizontal: 22,
    marginTop: 8,
    marginBottom: 28,
    padding: 18,
    borderRadius: 22,
    backgroundColor: '#1E1B4B',
  },
  noticeTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '900', marginBottom: 8 },
  noticeText: { color: '#DDD6FE', lineHeight: 23 },
  videoCard: {
    marginHorizontal: 22,
    marginBottom: 14,
    padding: 16,
    borderRadius: 22,
    backgroundColor: '#0B1120',
    borderWidth: 1,
    borderColor: '#1E293B',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  playCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playText: { color: '#FFFFFF', fontWeight: '900' },
  videoTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '900', marginBottom: 5 },
  videoDesc: { color: '#94A3B8', fontSize: 14, lineHeight: 20 },
  inputGroup: { marginHorizontal: 22, marginBottom: 14 },
  inputLabel: { color: '#E5E7EB', fontWeight: '900', marginBottom: 8, marginHorizontal: 22 },
  input: {
    backgroundColor: '#0B1120',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 16,
    color: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
  },
  textarea: { minHeight: 92, textAlignVertical: 'top' },
  optionWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginHorizontal: 22, marginBottom: 16 },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#334155',
  },
  optionActive: { backgroundColor: '#8B5CF6', borderColor: '#8B5CF6' },
  optionText: { color: '#CBD5E1', fontWeight: '800', fontSize: 12 },
  optionTextActive: { color: '#FFFFFF' },
  privacy: { color: '#94A3B8', fontSize: 12.5, lineHeight: 19, marginHorizontal: 22, marginTop: 4 },
  phoneButton: {
    marginHorizontal: 22,
    marginTop: 12,
    marginBottom: 34,
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#334155',
  },
  phoneButtonText: { color: '#E5E7EB', fontWeight: '900' },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#050816',
    borderTopWidth: 1,
    borderTopColor: '#172033',
    paddingTop: 10,
    paddingBottom: 10,
  },
  tabItem: { flex: 1, alignItems: 'center' },
  tabText: { color: '#64748B', fontSize: 12, fontWeight: '800' },
  tabTextActive: { color: '#FFFFFF' },
  tabDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: '#8B5CF6', marginTop: 5 },
});
