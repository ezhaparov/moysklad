import { useState, type ReactNode } from 'react';
import { contacts, site, sectionOrder, menu, hero, pains, aboutMs, process, results, cases, pricing, about, faq, contact, footer } from './content';

// Ссылки на мессенджеры собираются из contacts в content.ts
const waLink = (text = contacts.whatsappMessage) => contacts.whatsapp ? `https://wa.me/${contacts.whatsapp}?text=${encodeURIComponent(text)}` : '#contact';
const tgLink = contacts.telegram ? `https://t.me/${contacts.telegram}` : '#contact';
const igLink = contacts.instagram ? `https://instagram.com/${contacts.instagram}` : '';
const external = (href: string) => href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {};

function Icon({ name = 'arrow', size = 22 }: { name?: string; size?: number }) {
  const paths: Record<string, ReactNode> = {
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    check: <path d="m5 12 4 4L19 6" />,
    box: <><path d="m12 3 9 5v9l-9 5-9-5V8l9-5Zm0 9 9-4M3 8l9 4v10M7.5 5.5l9 5" /></>,
    chart: <><path d="M4 3v17h17M8 15l4-5 4 2 5-7" /></>,
    bag: <><path d="M5 7h14l2 14H3L5 7Zm3 0V5a4 4 0 0 1 8 0v2" /></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    chat: <path d="M21 11.5a9 9 0 0 1-13 8L3 21l1.5-5A9 9 0 1 1 21 11.5Z" />,
    plane: <path d="m3 10 18-7-5 18-5-7-8-4Zm8 4L21 3" />,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    person: <><circle cx="12" cy="8" r="4"/><path d="M4 22v-3a8 8 0 0 1 16 0v3"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.box}</svg>;
}
function Lines({ lines }: { lines: string[] }) {
  return <>{lines.map((l, i) => <span key={i}>{i > 0 && <br/>}{l}</span>)}</>;
}
function Button({ children, secondary = false, channel = 'whatsapp' }: { children: ReactNode; secondary?: boolean; channel?: string }) {
  const href = channel === 'telegram' ? tgLink : waLink();
  return <a className={`button ${secondary ? 'secondary' : ''}`} href={href} {...external(href)} data-channel={channel}>{children}<Icon name={channel === 'telegram' ? 'plane' : 'arrow'} size={18}/></a>;
}
function Section({ id, label, title, description, children, className = '' }: { id?: string; label: string; title: string; description?: string; children: ReactNode; className?: string }) {
  return <section id={id} className={`section ${className}`}><div className="container"><div className="section-heading"><span className="eyebrow">{label}</span><h2>{title}</h2>{description && <p>{description}</p>}</div>{children}</div></section>;
}
function Brand() {
  return <a href="#" className="brand"><span className="brand-icon"><Icon name="box"/></span><span>{site.name}<small>{site.tagline}</small></span></a>;
}

function Hero() {
  return <section className="hero"><div className="container hero-grid"><div className="hero-copy"><span className="availability"><span/> {hero.badge}</span><h1>{hero.titleLines.map((l, i) => <span key={i}>{l}<br/></span>)}<span>{hero.titleAccent}</span></h1><p className="hero-subtitle">{hero.subtitle}</p><p className="hero-description">{hero.description}</p><div className="button-row"><Button>{hero.buttonWhatsapp}</Button><Button secondary channel="telegram">{hero.buttonTelegram}</Button></div><div className="hero-note"><span className="tiny-avatar"><Icon name="person" size={16}/></span> {hero.note}</div></div><div className="hero-visual"><div className="visual-top"><span className="live-dot"/> ВСЁ ПОД КОНТРОЛЕМ <span className="visual-dots">···</span></div><div className="dashboard"><div className="dash-sidebar"><span className="dash-logo"><Icon name="box"/></span>{['grid','box','bag','chart'].map(n=><span key={n}><Icon name={n} size={18}/></span>)}</div><div className="dash-content"><div className="dash-title">Обзор бизнеса <span>Этот месяц⌄</span></div><div className="dash-metrics"><div><small>Продажи</small><b>— — — <em>сом</em></b><span className="metric-line"/></div><div><small>Прибыль</small><b>— — — <em>сом</em></b><span className="metric-line short"/></div></div><div className="chart-heading">Продажи под контролем <span>↗</span></div><div className="bar-chart">{[32,47,39,60,48,70,59,85,74,96,87,115].map((h,i)=><div key={i} style={{height:h}}/>)}</div><div className="chart-labels"><span>Начало месяца</span><span>Сегодня</span></div><div className="dash-table"><div><span>Товар</span><span>Остаток</span><span>Статус</span></div>{['Ваш товар 01','Ваш товар 02','Ваш товар 03'].map(t=><div key={t}><span><i/>{t}</span><span>— шт.</span><span className="in-stock">В наличии</span></div>)}</div></div></div><div className="floating-card"><span className="success-icon"><Icon name="check"/></span><div><b>Всё на своих местах</b><small>Товары, деньги и решения — в одной системе</small></div></div><span className="visual-caption">Иллюстрация системы · не реальные данные</span></div></div><div className="container"><div className="stats">{hero.stats.map(s => <div key={s.label}><b>{s.value}<span>{s.label}</span></b><p>{s.hint}</p></div>)}<div className="stats-caption">{hero.statsCaption[0]}<br/><strong>{hero.statsCaption[1]}</strong><Icon name="arrow"/></div></div></div></section>;
}
function Pains() {
  return <Section label={pains.label} title={pains.title} description={pains.description}><div className="grid four pain-grid">{pains.items.map(p => <article className="card pain-card" key={p.title}><span className="icon-tile"><Icon name={p.icon}/></span><h3>{p.title}</h3><p>{p.text}</p></article>)}</div><div className="calm-note"><span className="blue-dot"/>{pains.note}<Icon name="arrow" size={19}/></div></Section>;
}
function AboutMs() {
  return <Section id="services" label={aboutMs.label} title={aboutMs.title} description={aboutMs.description} className="tinted"><div className="grid four">{aboutMs.features.map(f => <article className="card feature-card" key={f.title}><span className="icon-tile"><Icon name={f.icon}/></span><h3>{f.title}</h3><p>{f.text}</p><span className="feature-arrow"><Icon name="arrow" size={18}/></span></article>)}</div><div className="businesses"><span>{aboutMs.businessesLabel}</span><div>{aboutMs.businesses.map(t => <span className="business-pill" key={t}>{t}</span>)}</div></div></Section>;
}
function Process() {
  return <Section id="process" label={process.label} title={process.title} description={process.description}><div className="steps">{process.steps.map((s, i) => <div className="step" key={s.title}><span className="step-number">0{i + 1}</span><h3>{s.title}</h3><p>{s.text}</p></div>)}</div></Section>;
}
function Results() {
  return <section className="results-section"><div className="container results"><div><span className="eyebrow">{results.label}</span><h2><Lines lines={results.titleLines}/></h2><p><Lines lines={results.textLines}/></p></div><div className="results-list">{results.list.map(t => <div key={t}><Icon name="check" size={18}/>{t}</div>)}<div className="support"><Icon name="chat"/><span><b>{results.supportTitle}</b><small>{results.supportText}</small></span></div></div></div></section>;
}
function Cases() {
  const icons = ['bag', 'box', 'grid'];
  return <Section label={cases.label} title={cases.title} description={cases.description}><div className="grid three">{cases.items.map((c, i) => <article className="case-card" key={i}>{c.image ? <img className="case-image" src={c.image} alt={c.name} style={{ objectFit: 'cover' }}/> : <div className={`case-image case-${i % 3}`}><Icon name={icons[i % 3]} size={46}/><span>Место для фото проекта</span></div>}<div className="case-body"><span className="eyebrow">{c.niche}</span><h3>{c.name}</h3><p><b>Задача:</b> {c.task}</p><p><b>Результат:</b> {c.result}</p></div></article>)}</div></Section>;
}
function Pricing() {
  return <Section id="pricing" label={pricing.label} title={pricing.title} description={pricing.description} className="tinted"><div className="grid three pricing">{pricing.plans.map(p => <article key={p.name} className={`price-card ${p.featured ? 'featured' : ''}`}>{p.featured && <span className="popular">{pricing.featuredBadge}</span>}<h3>{p.name}</h3><p>{p.desc}</p><div className="price">{p.price}<span>{pricing.currency}</span>{'priceNote' in p && p.priceNote && <em className="price-note">{p.priceNote}</em>}</div><div className="price-divider"/><ul>{p.items.map(t => <li key={t}><Icon name="check" size={17}/>{t}</li>)}</ul><Button secondary={!p.featured}>{pricing.button}</Button></article>)}</div><p className="pricing-note">{pricing.note}</p></Section>;
}
function About() {
  return <Section id="about" label={about.label} title={about.title}><div className="about-grid"><div className="portrait">{about.photo ? <img src={about.photo} alt={site.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }}/> : <><div className="portrait-outline"><Icon name="person" size={110}/></div><span>Место для вашего фото</span></>}<div className="portrait-tag"><span className="live-dot"/> {about.photoTag}</div></div><div className="about-copy"><h3>{about.heading}</h3>{about.paragraphs.map((t, i) => <p key={i}>{t}</p>)}<div className="values">{about.values.map(t => <span key={t}><Icon name="check" size={17}/>{t}</span>)}</div><a href="#contact" className="text-link">{about.link} <Icon name="arrow" size={18}/></a></div></div></Section>;
}
function Faq() {
  return <Section id="faq" label={faq.label} title={faq.title} className="faq-section"><div className="faq-list">{faq.items.map(f => <details key={f.q}><summary>{f.q}<span>+</span></summary><p>{f.a}</p></details>)}</div></Section>;
}
// Номер: после +996 нужно 9 цифр, первая — 2, 5, 7 или 9 (мобильные операторы КР)
const phoneValid = (d: string) => /^[2579]\d{8}$/.test(d);
const formatPhone = (d: string) => [d.slice(0, 3), d.slice(3, 6), d.slice(6, 9)].filter(Boolean).join(' ');
function Contact() {
  const [hint, setHint] = useState('');
  const [phone, setPhone] = useState(''); // только 9 цифр после +996
  const [phoneError, setPhoneError] = useState('');
  const onPhone = (v: string) => {
    let d = v.replace(/\D/g, '');
    if (d.startsWith('996')) d = d.slice(3);      // вставили номер целиком
    else if (d.startsWith('0')) d = d.slice(1);   // вставили 0505...
    setPhone(d.slice(0, 9)); setPhoneError('');
  };
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!phoneValid(phone)) { setPhoneError('Введите номер полностью: +996 и 9 цифр, например +996 505 252 525'); return; }
    if (!contacts.whatsapp) { setHint(contact.noContactsHint); return; }
    const d = new FormData(e.currentTarget);
    const text = `${contacts.whatsappMessage}\nИмя: ${d.get('name')}\nТелефон: +996${phone}\nТип бизнеса: ${d.get('business')}`;
    window.open(waLink(text), '_blank', 'noopener');
  };
  return <section id="contact" className="contact-section"><div className="container contact-grid"><div><span className="eyebrow">{contact.label}</span><h2><Lines lines={contact.titleLines}/><br/><span>{contact.titleAccent}</span></h2><p><Lines lines={contact.textLines}/></p><div className="contact-channels"><a href={tgLink} {...external(tgLink)}><Icon name="plane"/>Telegram<Icon name="arrow" size={18}/></a><a href={waLink()} {...external(waLink())}><Icon name="chat"/>WhatsApp<Icon name="arrow" size={18}/></a></div></div><form id="contact-form" onSubmit={submit}><h3>{contact.formTitle}</h3><p>{contact.formText}</p><label>Ваше имя<input required name="name" placeholder="Как к вам обращаться?"/></label><label>Номер телефона<span className={`phone-field ${phoneError ? 'invalid' : ''}`}><span className="phone-prefix">+996</span><input required name="phone" type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="505 252 525" value={formatPhone(phone)} onChange={e => onPhone(e.target.value)} aria-invalid={!!phoneError}/></span>{phoneError && <span className="field-error" role="alert">{phoneError}</span>}</label><label>Тип бизнеса<select required name="business" defaultValue=""><option value="" disabled>Выберите из списка</option>{contact.businessTypes.map(t => <option key={t}>{t}</option>)}</select></label><button className="button" type="submit">{contact.submit}<Icon name="arrow" size={18}/></button><small>{hint}</small></form></div></section>;
}

// id блока из sectionOrder (content.ts) -> компонент
const blocks: Record<string, () => ReactNode> = {
  pains: Pains, 'about-ms': AboutMs, process: Process, results: Results, cases: Cases,
  pricing: Pricing, about: About, faq: Faq, contact: Contact,
};

export default function App() {
  const [open, setOpen] = useState(false);
  return <>
    <header className="header"><div className="container header-inner"><Brand/><nav className={open ? 'open' : ''}>{menu.filter(m => sectionOrder.includes(m.id === 'services' ? 'about-ms' : m.id)).map(m => <a key={m.id} href={`#${m.id}`} onClick={() => setOpen(false)}>{m.text}</a>)}</nav><div className="header-actions"><a href={tgLink} {...external(tgLink)} className="telegram-link"><Icon name="plane" size={17}/>Telegram</a><a href={waLink()} {...external(waLink())} className="small-button"><Icon name="chat" size={17}/>WhatsApp</a></div><button className="menu-button" onClick={() => setOpen(!open)} aria-label="Открыть меню" aria-expanded={open}>☰</button></div></header>
    <main>
      <Hero/>
      {sectionOrder.map(id => { const B = blocks[id]; return B ? <B key={id}/> : null; })}
    </main>
    <footer><div className="container footer-inner"><Brand/><span className="footer-location">{footer.location}{(contacts.phone || contacts.email) && <><br/><small>{[contacts.phone].filter(Boolean).join(' · ')}</small></>}</span><div className="footer-socials">{igLink && <a href={igLink} {...external(igLink)}>Instagram<Icon name="arrow" size={14}/></a>}<a href={tgLink} {...external(tgLink)}>Telegram<Icon name="arrow" size={14}/></a><a href={waLink()} {...external(waLink())}>WhatsApp<Icon name="arrow" size={14}/></a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} {site.name}</span><span>{footer.bottom}</span></div></footer>
    <a className="floating-whatsapp" href={waLink()} {...external(waLink())} aria-label="Связаться в WhatsApp"><Icon name="chat" size={26}/></a>
  </>;
}
