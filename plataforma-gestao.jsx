import React, { useState, useEffect, useCallback, useRef } from 'react';

/* ─── Google Font ─────────────────────────────────────────── */
const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
    rel="stylesheet"
  />
);

/* ─── Design tokens ───────────────────────────────────────── */
const C = {
  bg: '#F7F8FA',
  white: '#FFFFFF',
  border: '#E5E7EB',
  primary: '#4F6EF7',
  success: '#22C55E',
  warning: '#EAB308',
  danger: '#EF4444',
  text: '#111827',
  sub: '#6B7280',
  muted: '#9CA3AF',
  hoverBg: '#F3F4F6',
  sidebarBg: '#FAFBFC',
};

/* ─── DATA ────────────────────────────────────────────────── */
const OWNERS = {
  pedro:    { label: 'Pedro',    role: 'Design & Criativos',                  color: '#4F6EF7' },
  marcos:   { label: 'Marcos',   role: 'Operações & Ads',                     color: '#F59E0B' },
  priscilla:{ label: 'Priscilla',role: 'Influenciadores & Comunicação',       color: '#EC4899' },
  todos:    { label: 'Todos',    role: '',                                     color: '#8B5CF6' },
};

const PHASES = [
  {
    id:'p1', title:'Fundação & Pesquisa', timeline:'Sem 1–2 · Mar 18 — Mar 31',
    tasks:[
      { id:'t1', title:'Pesquisa e definição de fornecedores', owner:'marcos',
        tags:['BLOQUEANTE','ENTREGÁVEL: PLANILHA'], parallel:true, dependsOn:[],
        subtasks:['Criar planilha comparativa de fornecedores (custo, prazo, frete, qualidade)','Solicitar amostras físicas dos 2 melhores candidatos','Avaliar dropshipping puro vs estoque mínimo para kits','Verificar integração do fornecedor com Shopify','Mapear produtos disponíveis por fornecedor (camiseta, caneca, copo, boné, adesivo)'] },
      { id:'t2', title:'Definição do catálogo de produtos', owner:'todos',
        tags:['BLOQUEANTE','ENTREGÁVEL: CATÁLOGO'], parallel:false, dependsOn:['t1'],
        subtasks:['Definir 3–4 produtos iniciais por loja com base no fornecedor','Calcular preço de custo + frete + margem para cada produto','Definir preços finais de venda (margem mínima 40%)','Montar pelo menos 2 kits combinados por loja (ex: camiseta + adesivo + caneca)'] },
      { id:'t3', title:'Criação dos nomes e domínios das marcas', owner:'pedro',
        tags:['ENTREGÁVEL: NOMES + DOMÍNIOS'], parallel:true, dependsOn:[],
        subtasks:['Brainstorm de 10 nomes para cada loja com os sócios','Verificar disponibilidade de domínio .com.br','Verificar disponibilidade de @ no Instagram e TikTok','Registrar os domínios escolhidos','Definir tom de voz e personalidade de cada marca'] },
      { id:'t4', title:'Análise de concorrência e referências', owner:'priscilla',
        tags:['ENTREGÁVEL: BENCHMARK'], parallel:true, dependsOn:[],
        subtasks:['Listar pelo menos 10 concorrentes (Shopee, Mercado Livre, Instagram)','Analisar faixas de preço praticadas no mercado','Salvar prints das estampas mais vendidas e comentários','Identificar influenciadores que já promovem produtos políticos','Documentar tudo em relatório visual'] },
    ],
  },
  {
    id:'p2', title:'Identidade Visual & Setup', timeline:'Sem 3–4 · Abr 1 — Abr 14',
    tasks:[
      { id:'t5', title:'Identidade visual das duas marcas', owner:'pedro',
        tags:['BLOQUEANTE','ENTREGÁVEL: 2x BRAND GUIDE'], parallel:true, dependsOn:[],
        subtasks:['Logo + paleta + tipografia — Loja Esquerda (tom: cores vivas, urbano, resistência)','Logo + paleta + tipografia — Loja Direita (tom: verde/amarelo, patriótico, clean)','Templates de mockup para cada produto com identidade','Manual de marca resumido (1 página) por loja','Assets para redes sociais (perfil, capa, templates stories/feed)'] },
      { id:'t6', title:'Configuração das lojas Shopify', owner:'marcos',
        tags:['BLOQUEANTE','ENTREGÁVEL: 2x LOJAS LIVE'], parallel:true, dependsOn:[],
        subtasks:['Criar conta Shopify para cada loja','Configurar domínio personalizado','Instalar e customizar tema (Dawn ou Sense)','Configurar gateway de pagamento (PIX obrigatório)','Criar páginas institucionais (Sobre, FAQ, Política de Troca, Termos)','Configurar integração com fornecedor de print-on-demand','Cadastrar todos os produtos com fotos, descrição e variações','Configurar frete (Correios / Melhor Envio)'] },
      { id:'t7', title:'Criação das primeiras estampas', owner:'pedro',
        tags:['ENTREGÁVEL: 16–20 ESTAMPAS'], parallel:false, dependsOn:['t5'],
        subtasks:['8–10 estampas Loja Esquerda — Copa + política','8–10 estampas Loja Direita — Copa + política','Mockups profissionais de cada estampa em cada produto','Testar legibilidade e impacto visual em tamanho real'] },
      { id:'t8', title:'Montagem das redes sociais', owner:'pedro',
        tags:['ENTREGÁVEL: 4x PERFIS'], parallel:false, dependsOn:['t5'],
        subtasks:['Criar contas IG + TikTok + Facebook por loja','Configurar bio, link e foto de perfil','Publicar grid inicial (9 posts) no Instagram de cada loja','Gravar 2–3 TikToks de teaser por marca','Definir calendário editorial semanal (mín 4 posts/semana)'] },
    ],
  },
  {
    id:'p3', title:'Influenciadores', timeline:'Sem 5–6 · Abr 15 — Abr 28',
    tasks:[
      { id:'t9', title:'Prospecção de micro influenciadores', owner:'priscilla',
        tags:['BLOQUEANTE','ENTREGÁVEL: CRM INFLUENCIADORES'], parallel:true, dependsOn:[],
        subtasks:['Listar 30–50 perfis alinhados — Loja Esquerda (ativistas, artistas, humoristas)','Listar 30–50 perfis alinhados — Loja Direita (conservadores, coaches, empreendedores)','Anotar seguidores, taxa de engajamento, tipo de conteúdo, contato','Classificar por prioridade (A / B / C)','Criar planilha CRM de influenciadores com status'] },
      { id:'t10', title:'Estratégia de abordagem', owner:'priscilla',
        tags:['ENTREGÁVEL: KIT + PITCH'], parallel:true, dependsOn:[],
        subtasks:['Criar template de DM de primeiro contato personalizado','Criar template de email de apresentação da marca','Definir composição do kit por loja (produtos + embalagem + cartão)','Definir contrapartida esperada (mín 1 story + 1 post ou 1 reels)','Criar briefing criativo para o influenciador'] },
      { id:'t11', title:'Montagem e envio dos kits', owner:'marcos',
        tags:['ENTREGÁVEL: KITS ENVIADOS','CUSTO DIRETO'], parallel:false, dependsOn:['t9','t10'],
        subtasks:['Encomendar produtos para os kits (estoque mínimo)','Criar embalagem diferenciada com QR code para a loja','Montar os kits','Enviar com rastreamento para influenciadores confirmados','Acompanhar recebimento e cobrar contrapartida'] },
      { id:'t12', title:'Estratégia de lançamento coordenada', owner:'todos',
        tags:['DECISÃO ESTRATÉGICA'], parallel:false, dependsOn:['t9','t10','t11'],
        subtasks:['Decidir: lançamento big bang (1 dia) vs gradual (1 semana)','Alinhar data com todos influenciadores confirmados','Preparar campanha de ads para rodar no mesmo dia','Criar cupom de desconto exclusivo por influenciador','Confirmar capacidade do fornecedor para pico de demanda'] },
    ],
  },
  {
    id:'p4', title:'Tráfego Pago & Lançamento', timeline:'Sem 7–8 · Abr 29 — Mai 12',
    tasks:[
      { id:'t13', title:'Setup da estrutura de ads', owner:'marcos',
        tags:['BLOQUEANTE','ENTREGÁVEL: ADS SETUP'], parallel:true, dependsOn:[],
        subtasks:['Criar 2 Business Managers (1 por loja)','Instalar Pixel + API de conversão em cada Shopify','Configurar Google Ads + GTM por loja','Criar conta TikTok Ads + pixel por loja','Configurar catálogo dinâmico em cada plataforma'] },
      { id:'t14', title:'Produção de criativos para ads', owner:'pedro',
        tags:['ENTREGÁVEL: BANCO DE CRIATIVOS'], parallel:true, dependsOn:[],
        subtasks:['3–4 imagens estáticas por loja (mockup em contexto)','2–3 vídeos curtos por loja (UGC style, 15–30s, vertical)','1–2 carrosséis por loja mostrando catálogo','Escrever copies (3 variações por criativo)','Adaptar formatos por plataforma (Feed, Stories, Reels, TikTok)'] },
      { id:'t15', title:'Lançamento das campanhas de ads', owner:'marcos',
        tags:['CUSTO: R$40–60/DIA'], parallel:false, dependsOn:['t13','t14'],
        subtasks:['Semana 1: teste com R$20–30/dia por loja (Meta Ads)','Testar 2–3 públicos por loja (interesse, lookalike, comportamento)','Analisar e cortar o que não performa (3–5 dias)','Semana 2: escalar vencedores + Google + TikTok','Implementar retargeting para visitantes que não compraram'] },
      { id:'t16', title:'Lançamento oficial das lojas', owner:'todos',
        tags:['MARCO: LANÇAMENTO'], parallel:false, dependsOn:['t13','t14','t15'],
        subtasks:['Checar lojas: checkout, frete, estoque tudo funcionando','Ativar campanhas de ads nos horários definidos','Confirmar postagens dos influenciadores','Publicar conteúdo de lançamento em todas as redes','Monitorar pedidos e problemas em tempo real'] },
    ],
  },
  {
    id:'p5', title:'Otimização & Escala', timeline:'Sem 9–12 · Mai 13 — Jun 8',
    tasks:[
      { id:'t17', title:'Análise de performance e otimização', owner:'marcos',
        tags:['ENTREGÁVEL: RELATÓRIO SEMANAL'], parallel:true, dependsOn:[],
        subtasks:['Analisar funil: impressão > clique > visita > add to cart > compra','Identificar taxa de conversão por produto/plataforma/público','Cortar produtos fracos, dobrar aposta nos vencedores','A/B testar novos criativos e copies semanalmente'] },
      { id:'t18', title:'Novas estampas baseadas em dados', owner:'pedro',
        tags:['CONTÍNUO'], parallel:true, dependsOn:[],
        subtasks:['Analisar quais estampas venderam mais e por quê','Monitorar trending topics para estampas oportunistas','Criar 5–8 novas estampas por loja a cada 2 semanas','Testar novos produtos se margem permitir'] },
      { id:'t19', title:'Segunda onda de influenciadores', owner:'priscilla',
        tags:['ESCALA'], parallel:true, dependsOn:[],
        subtasks:['Usar resultados como prova social na abordagem','Prospectar influenciadores maiores (30k–100k) com comissão','Implementar programa de afiliados (cupom + % por venda)','Avaliar parceria com criadores de memes políticos'] },
    ],
  },
  {
    id:'p6', title:'Copa do Mundo — Modo Máximo', timeline:'Jun 9 — Jul 19 · Copa 2026',
    tasks:[
      { id:'t20', title:'Campanhas especiais de Copa', owner:'pedro',
        tags:['TEMPO REAL'], parallel:true, dependsOn:[],
        subtasks:['Banco de estampas pré-prontas para cenários (vitória, derrota, gol, eliminação)','Templates prontos para inserir frases/resultados rapidamente','Publicar estampas reativas em até 4h após cada jogo do Brasil','Criar ofertas relâmpago durante e após jogos (frete grátis, desconto por gol)'] },
      { id:'t21', title:'Escala máxima de tráfego pago', owner:'marcos',
        tags:['CUSTO: BUDGET MÁXIMO'], parallel:true, dependsOn:[],
        subtasks:['Aumentar budget 3–5x durante Copa','Campanhas específicas para dias de jogo do Brasil','Retargeting agressivo (visitantes últimos 7 dias)','Monitorar ROAS diariamente e ajustar em tempo real'] },
      { id:'t22', title:'Planejamento pós-Copa', owner:'todos',
        tags:['DECISÃO ESTRATÉGICA'], parallel:false, dependsOn:['t20','t21'],
        subtasks:['Analisar: receita Copa vs produtos políticos puros','Decidir: rebranding, manter, ou encerrar operação','Avaliar próximo pico de vendas (eleições)'] },
    ],
  },
];

/* ─── Helpers ─────────────────────────────────────────────── */
function getTaskById(id) {
  for (const ph of PHASES) for (const t of ph.tasks) if (t.id === id) return t;
  return null;
}

function calcTask(task, checked) {
  const total = task.subtasks.length;
  const done  = task.subtasks.filter((_, i) => checked[`${task.id}_${i}`]).length;
  return { total, done, pct: total ? Math.round(done / total * 100) : 0 };
}

function calcPhase(phase, checked) {
  let total = 0, done = 0;
  phase.tasks.forEach(t => { const p = calcTask(t, checked); total += p.total; done += p.done; });
  return { total, done, pct: total ? Math.round(done / total * 100) : 0 };
}

function calcOwner(ownerKey, checked) {
  let total = 0, done = 0;
  PHASES.forEach(ph => ph.tasks.forEach(t => {
    if (t.owner === ownerKey || t.owner === 'todos') {
      const p = calcTask(t, checked); total += p.total; done += p.done;
    }
  }));
  return { total, done, pct: total ? Math.round(done / total * 100) : 0 };
}

function calcOverall(checked) {
  let total = 0, done = 0;
  PHASES.forEach(ph => ph.tasks.forEach(t => { const p = calcTask(t, checked); total += p.total; done += p.done; }));
  return { total, done, pct: total ? Math.round(done / total * 100) : 0 };
}

/* ─── Tag styles ──────────────────────────────────────────── */
function tagStyle(tag) {
  if (tag.startsWith('BLOQUEANTE'))       return { bg:'#FEF2F2', color:'#EF4444', border:'#FECACA' };
  if (tag.startsWith('ENTREGÁVEL'))       return { bg:'#F0FDF4', color:'#22C55E', border:'#BBF7D0' };
  if (tag.startsWith('DECISÃO'))         return { bg:'#FFFBEB', color:'#D97706', border:'#FDE68A' };
  if (tag.startsWith('CUSTO') || tag.startsWith('MARCO')) return { bg:'#FFF7ED', color:'#EA580C', border:'#FED7AA' };
  return { bg:'#F3F4F6', color:'#6B7280', border:'#E5E7EB' };
}

/* ─── SVG Icons ───────────────────────────────────────────── */
const Icon = {
  dashboard: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor"/>
      <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor"/>
      <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor"/>
      <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor"/>
    </svg>
  ),
  phases: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="3" width="14" height="2.5" rx="1.25" fill="currentColor"/>
      <rect x="1" y="6.75" width="14" height="2.5" rx="1.25" fill="currentColor"/>
      <rect x="1" y="10.5" width="14" height="2.5" rx="1.25" fill="currentColor"/>
    </svg>
  ),
  person: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="5" r="3" fill="currentColor"/>
      <path d="M2 14c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  check: (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
      <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  chevronDown: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  chevronRight: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  notes: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1.5" y="1.5" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.3"/>
      <line x1="4" y1="5" x2="10" y2="5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="4" y1="7.5" x2="10" y2="7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="4" y1="10" x2="7.5" y2="10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  parallel: (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <line x1="2" y1="6" x2="10" y2="6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="2" y1="3" x2="10" y2="3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="2" y1="9" x2="10" y2="9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  link: (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M5 2H3a2 2 0 000 4h1m3 4h2a2 2 0 000-4H8M4 6h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  hamburger: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <line x1="3" y1="6" x2="17" y2="6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="3" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  close: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <line x1="4" y1="4" x2="14" y2="14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="14" y1="4" x2="4" y2="14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
};

/* ─── CircularProgress ────────────────────────────────────── */
function CircularProgress({ pct, size = 56, color = C.primary, trackColor = '#F1F5F9' }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={trackColor} strokeWidth="5"/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="5"
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 0.4s ease' }}/>
    </svg>
  );
}

/* ─── ProgressBar ─────────────────────────────────────────── */
function ProgressBar({ pct, height = 4, color = C.primary }) {
  return (
    <div style={{ height, background: '#F1F5F9', borderRadius: 4, overflow: 'hidden' }}>
      <div style={{ width: `${pct}%`, height: '100%', background: color,
        borderRadius: 4, transition: 'width 0.4s ease' }}/>
    </div>
  );
}

/* ─── OwnerBadge ──────────────────────────────────────────── */
function OwnerBadge({ ownerKey }) {
  const o = OWNERS[ownerKey];
  const lightColor = o.color + '22';
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:5,
      background: lightColor, color: o.color,
      padding:'2px 8px', borderRadius:20, fontSize:11, fontWeight:600 }}>
      <span style={{ width:6, height:6, borderRadius:'50%', background: o.color, flexShrink:0 }}/>
      {o.label}
    </span>
  );
}

/* ─── Tag ─────────────────────────────────────────────────── */
function Tag({ label }) {
  const s = tagStyle(label);
  return (
    <span style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}`,
      padding:'1px 7px', borderRadius:4, fontSize:10, fontWeight:600,
      letterSpacing:'0.4px', textTransform:'uppercase' }}>
      {label}
    </span>
  );
}

/* ─── TaskCard ────────────────────────────────────────────── */
function TaskCard({ task, checked, onCheck, notes, onNote, showPhaseLabel, phaseTitle }) {
  const [expanded, setExpanded]     = useState(false);
  const [notesOpen, setNotesOpen]   = useState(false);
  const [noteVal, setNoteVal]       = useState(notes[task.id] || '');
  const prog = calcTask(task, checked);
  const progressColor = prog.pct === 100 ? C.success : C.primary;

  const deps = task.dependsOn.map(id => getTaskById(id)?.title).filter(Boolean);

  function handleNote(e) {
    const v = e.target.value;
    setNoteVal(v);
    onNote(task.id, v);
  }

  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`,
      borderRadius: 10, marginBottom: 8,
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      transition: 'box-shadow 0.15s ease',
      overflow: 'hidden' }}>

      {/* Card header row */}
      <div
        onClick={() => setExpanded(e => !e)}
        style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 16px',
          cursor:'pointer', userSelect:'none',
          background: expanded ? '#F9FAFB' : C.white,
          transition: 'background 0.15s ease' }}>

        {/* Expand chevron */}
        <span style={{ color: C.muted, flexShrink:0,
          transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)',
          transition: 'transform 0.2s ease' }}>
          {Icon.chevronDown}
        </span>

        {/* Title */}
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap', marginBottom:4 }}>
            {showPhaseLabel && phaseTitle && (
              <span style={{ fontSize:10, color: C.muted, fontWeight:600,
                background:'#F3F4F6', padding:'1px 6px', borderRadius:4, textTransform:'uppercase' }}>
                {phaseTitle}
              </span>
            )}
            <span style={{ fontSize:13, fontWeight:600, color: prog.pct===100 ? C.muted : C.text,
              textDecoration: prog.pct===100 ? 'line-through' : 'none' }}>
              {task.title}
            </span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ flex:1, maxWidth:180 }}>
              <ProgressBar pct={prog.pct} color={progressColor}/>
            </div>
            <span style={{ fontSize:11, color: C.muted, fontWeight:500, whiteSpace:'nowrap' }}>
              {prog.done}/{prog.total}
            </span>
          </div>
        </div>

        {/* Parallel / depends indicators */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:4, flexShrink:0 }}>
          {task.parallel && (
            <span style={{ display:'inline-flex', alignItems:'center', gap:3,
              fontSize:10, color:'#8B5CF6', fontWeight:600,
              background:'#F5F3FF', padding:'1px 6px', borderRadius:4 }}>
              {Icon.parallel} Paralela
            </span>
          )}
          <OwnerBadge ownerKey={task.owner}/>
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div style={{ borderTop: `1px solid ${C.border}` }}>

          {/* Dependencies */}
          {deps.length > 0 && (
            <div style={{ padding:'8px 16px 0', display:'flex', alignItems:'center', gap:5 }}>
              <span style={{ color: C.muted }}>{Icon.link}</span>
              <span style={{ fontSize:11, color: C.muted }}>
                Depende de: {deps.join(', ')}
              </span>
            </div>
          )}

          {/* Subtasks */}
          <div style={{ padding:'10px 16px' }}>
            {task.subtasks.map((sub, i) => {
              const key   = `${task.id}_${i}`;
              const done  = !!checked[key];
              return (
                <div key={key} onClick={() => onCheck(key, !done)}
                  style={{ display:'flex', alignItems:'flex-start', gap:10, padding:'6px 0',
                    cursor:'pointer', borderBottom: i < task.subtasks.length-1 ? `1px solid #F9FAFB` : 'none' }}>
                  {/* Checkbox */}
                  <span style={{ width:18, height:18, borderRadius:5, flexShrink:0, marginTop:1,
                    border: done ? 'none' : `2px solid #CBD5E1`,
                    background: done ? C.primary : 'transparent',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    transition: 'all 0.15s ease' }}>
                    {done && Icon.check}
                  </span>
                  <span style={{ fontSize:13, color: done ? C.muted : '#374151',
                    textDecoration: done ? 'line-through' : 'none',
                    lineHeight:1.5, transition: 'all 0.15s ease' }}>
                    {sub}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Tags + Notes toggle */}
          <div style={{ padding:'6px 16px 10px', display:'flex', alignItems:'center',
            justifyContent:'space-between', flexWrap:'wrap', gap:6 }}>
            <div style={{ display:'flex', flexWrap:'wrap', gap:4 }}>
              {task.tags.map(tag => <Tag key={tag} label={tag}/>)}
            </div>
            <button onClick={(e) => { e.stopPropagation(); setNotesOpen(n => !n); }}
              style={{ display:'flex', alignItems:'center', gap:5, background:'none',
                border: `1px solid ${C.border}`, borderRadius:6, padding:'3px 10px',
                fontSize:12, color: notesOpen ? C.primary : C.sub, cursor:'pointer',
                fontFamily:'inherit', transition: 'all 0.15s ease',
                fontWeight: notesOpen ? 600 : 500 }}>
              {Icon.notes}
              {noteVal ? 'Ver anotações' : 'Anotações'}
            </button>
          </div>

          {/* Notes textarea */}
          {notesOpen && (
            <div style={{ padding:'0 16px 14px' }}>
              <textarea
                value={noteVal}
                onChange={handleNote}
                placeholder="Escreva anotações sobre esta tarefa..."
                onClick={e => e.stopPropagation()}
                style={{ width:'100%', minHeight:80, background:'#F9FAFB',
                  border: `1px solid ${C.border}`, borderRadius:8, padding:'10px 12px',
                  fontSize:13, color: C.text, fontFamily:'Plus Jakarta Sans, sans-serif',
                  resize:'vertical', outline:'none', boxSizing:'border-box',
                  lineHeight:1.6 }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Dashboard View ──────────────────────────────────────── */
function DashboardView({ checked, onNavigatePhase }) {
  const overall  = calcOverall(checked);
  const ownerKeys = ['pedro','marcos','priscilla'];

  // Upcoming: next 3 incomplete tasks (from phases in order)
  const upcoming = [];
  for (const ph of PHASES) {
    for (const t of ph.tasks) {
      const p = calcTask(t, checked);
      if (p.pct < 100 && upcoming.length < 3) upcoming.push({ task:t, phase:ph });
    }
    if (upcoming.length >= 3) break;
  }

  // Blocking tasks not complete
  const blocking = [];
  for (const ph of PHASES) {
    for (const t of ph.tasks) {
      if (t.tags.some(tag => tag.startsWith('BLOQUEANTE'))) {
        const p = calcTask(t, checked);
        if (p.pct < 100) blocking.push({ task:t, phase:ph });
      }
    }
  }

  const cardStyle = {
    background: C.white, border: `1px solid ${C.border}`, borderRadius:12,
    padding:20, boxShadow:'0 1px 3px rgba(0,0,0,0.04)',
  };

  return (
    <div style={{ padding:'28px 32px', overflowY:'auto', height:'100%', boxSizing:'border-box' }}>

      {/* Row 1: 3 metric cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px,1fr))', gap:16, marginBottom:24 }}>

        {/* Overall progress */}
        <div style={cardStyle}>
          <div style={{ fontSize:11, fontWeight:700, color: C.muted, textTransform:'uppercase',
            letterSpacing:'0.8px', marginBottom:12 }}>Progresso Geral</div>
          <div style={{ fontSize:40, fontWeight:700, color: C.text, marginBottom:10 }}>{overall.pct}%</div>
          <ProgressBar pct={overall.pct} height={6}/>
          <div style={{ fontSize:12, color: C.muted, marginTop:8 }}>
            {overall.done} de {overall.total} sub-tarefas concluídas
          </div>
        </div>

        {/* Upcoming */}
        <div style={cardStyle}>
          <div style={{ fontSize:11, fontWeight:700, color: C.muted, textTransform:'uppercase',
            letterSpacing:'0.8px', marginBottom:12 }}>Próximas Entregas</div>
          {upcoming.length === 0
            ? <div style={{ fontSize:13, color: C.muted }}>Tudo concluído.</div>
            : upcoming.map(({ task, phase }) => (
              <div key={task.id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
                padding:'6px 0', borderBottom:`1px solid #F9FAFB` }}>
                <div>
                  <div style={{ fontSize:12, fontWeight:600, color: C.text, marginBottom:2 }}>{task.title}</div>
                  <div style={{ fontSize:11, color: C.muted }}>{phase.timeline}</div>
                </div>
                <OwnerBadge ownerKey={task.owner}/>
              </div>
            ))
          }
        </div>

        {/* Blocking */}
        <div style={{ ...cardStyle, borderTop: blocking.length > 0 ? `3px solid ${C.danger}` : `1px solid ${C.border}` }}>
          <div style={{ fontSize:11, fontWeight:700, color: blocking.length > 0 ? C.danger : C.muted,
            textTransform:'uppercase', letterSpacing:'0.8px', marginBottom:12 }}>
            Tarefas Bloqueantes
          </div>
          {blocking.length === 0
            ? <div style={{ fontSize:13, color: C.muted }}>Nenhuma pendente.</div>
            : blocking.map(({ task }) => (
              <div key={task.id} style={{ display:'flex', alignItems:'center', gap:8,
                padding:'6px 0', borderBottom:`1px solid #F9FAFB` }}>
                <span style={{ width:6, height:6, borderRadius:'50%', background: C.danger, flexShrink:0 }}/>
                <span style={{ fontSize:12, fontWeight:600, color: C.text }}>{task.title}</span>
              </div>
            ))
          }
        </div>
      </div>

      {/* Row 2: Phase cards */}
      <div style={{ fontSize:13, fontWeight:700, color: C.sub, textTransform:'uppercase',
        letterSpacing:'0.6px', marginBottom:12 }}>Fases</div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px,1fr))', gap:12, marginBottom:24 }}>
        {PHASES.map(ph => {
          const p = calcPhase(ph, checked);
          const isActive = p.pct > 0 && p.pct < 100;
          return (
            <div key={ph.id} onClick={() => onNavigatePhase(ph.id)}
              style={{ ...cardStyle, cursor:'pointer',
                background: isActive ? '#F5F7FF' : C.white,
                borderColor: isActive ? '#C7D2FE' : C.border,
                transition: 'all 0.15s ease' }}>
              <div style={{ fontSize:13, fontWeight:700, color: C.text, marginBottom:4 }}>{ph.title}</div>
              <div style={{ fontSize:11, color: C.muted, marginBottom:10 }}>{ph.timeline}</div>
              <ProgressBar pct={p.pct} color={isActive ? C.primary : p.pct===100 ? C.success : C.muted}/>
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:8 }}>
                <span style={{ fontSize:11, color: C.muted }}>{p.done}/{p.total} sub-tarefas</span>
                <span style={{ fontSize:12, fontWeight:700,
                  color: p.pct===100 ? C.success : isActive ? C.primary : C.muted }}>{p.pct}%</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Row 3: Owner progress */}
      <div style={{ fontSize:13, fontWeight:700, color: C.sub, textTransform:'uppercase',
        letterSpacing:'0.6px', marginBottom:12 }}>Progresso da Equipe</div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px,1fr))', gap:12 }}>
        {ownerKeys.map(key => {
          const o = OWNERS[key];
          const p = calcOwner(key, checked);
          return (
            <div key={key} style={cardStyle}>
              <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                <div style={{ position:'relative', flexShrink:0 }}>
                  <CircularProgress pct={p.pct} size={56} color={o.color}/>
                  <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center',
                    justifyContent:'center', fontSize:12, fontWeight:700, color: o.color }}>
                    {p.pct}%
                  </div>
                </div>
                <div>
                  <div style={{ fontSize:14, fontWeight:700, color: C.text }}>{o.label}</div>
                  <div style={{ fontSize:11, color: C.muted, marginTop:2 }}>{o.role}</div>
                  <div style={{ fontSize:12, color: C.muted, marginTop:4 }}>{p.done}/{p.total}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Phases View ─────────────────────────────────────────── */
function PhasesView({ checked, onCheck, notes, onNote, initialPhase }) {
  const [filterPhase,  setFilterPhase]  = useState(initialPhase || 'all');
  const [filterOwner,  setFilterOwner]  = useState('all');

  useEffect(() => { if (initialPhase) setFilterPhase(initialPhase); }, [initialPhase]);

  const ownerKeys = ['all','pedro','marcos','priscilla'];

  const pillBase = { padding:'4px 14px', borderRadius:20, fontSize:12, fontWeight:600,
    cursor:'pointer', border:'1px solid', transition:'all 0.15s ease', fontFamily:'Plus Jakarta Sans, sans-serif' };

  function pillStyle(active, color = C.primary) {
    return active
      ? { ...pillBase, background: color+'22', color, borderColor: color+'55' }
      : { ...pillBase, background: C.white, color: C.sub, borderColor: C.border };
  }

  const visiblePhases = filterPhase === 'all' ? PHASES : PHASES.filter(ph => ph.id === filterPhase);

  return (
    <div style={{ padding:'28px 32px', overflowY:'auto', height:'100%', boxSizing:'border-box' }}>
      {/* Filters */}
      <div style={{ marginBottom:20, display:'flex', flexWrap:'wrap', gap:8, alignItems:'center' }}>
        <span style={{ fontSize:11, fontWeight:700, color: C.muted, textTransform:'uppercase',
          letterSpacing:'0.8px', marginRight:4 }}>Fase</span>
        <button style={pillStyle(filterPhase==='all')} onClick={() => setFilterPhase('all')}>Todas</button>
        {PHASES.map(ph => (
          <button key={ph.id} style={pillStyle(filterPhase===ph.id)}
            onClick={() => setFilterPhase(ph.id)}>{ph.title}</button>
        ))}
      </div>
      <div style={{ marginBottom:24, display:'flex', flexWrap:'wrap', gap:8, alignItems:'center' }}>
        <span style={{ fontSize:11, fontWeight:700, color: C.muted, textTransform:'uppercase',
          letterSpacing:'0.8px', marginRight:4 }}>Responsável</span>
        {ownerKeys.map(k => (
          <button key={k} style={pillStyle(filterOwner===k, k==='all' ? C.primary : OWNERS[k]?.color)}
            onClick={() => setFilterOwner(k)}>
            {k === 'all' ? 'Todos' : OWNERS[k].label}
          </button>
        ))}
      </div>

      {/* Phase sections */}
      {visiblePhases.map(ph => {
        const filteredTasks = ph.tasks.filter(t =>
          filterOwner === 'all' || t.owner === filterOwner || t.owner === 'todos'
        );
        if (filteredTasks.length === 0) return null;
        const phProg = calcPhase(ph, checked);

        return (
          <div key={ph.id} style={{ marginBottom:32 }}>
            {/* Phase header */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
              marginBottom:12, flexWrap:'wrap', gap:8 }}>
              <div>
                <div style={{ fontSize:15, fontWeight:700, color: C.text }}>{ph.title}</div>
                <div style={{ fontSize:11, color: C.muted, marginTop:2 }}>{ph.timeline}</div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:120 }}>
                  <ProgressBar pct={phProg.pct} height={5}
                    color={phProg.pct===100 ? C.success : C.primary}/>
                </div>
                <span style={{ fontSize:13, fontWeight:700,
                  color: phProg.pct===100 ? C.success : C.primary }}>{phProg.pct}%</span>
              </div>
            </div>

            {filteredTasks.map(task => (
              <TaskCard key={task.id} task={task} checked={checked} onCheck={onCheck}
                notes={notes} onNote={onNote}/>
            ))}
          </div>
        );
      })}
    </div>
  );
}

/* ─── My View ─────────────────────────────────────────────── */
function MyView({ checked, onCheck, notes, onNote }) {
  const [active, setActive] = useState('pedro');
  const ownerKeys = ['pedro','marcos','priscilla'];

  const p = calcOwner(active, checked);
  const o = OWNERS[active];

  return (
    <div style={{ padding:'28px 32px', overflowY:'auto', height:'100%', boxSizing:'border-box' }}>
      {/* Tabs */}
      <div style={{ display:'flex', gap:4, marginBottom:24,
        background: C.white, border:`1px solid ${C.border}`, borderRadius:10,
        padding:4, width:'fit-content' }}>
        {ownerKeys.map(k => {
          const ow = OWNERS[k];
          const isActive = k === active;
          return (
            <button key={k} onClick={() => setActive(k)}
              style={{ padding:'7px 20px', borderRadius:8, border:'none', cursor:'pointer',
                fontFamily:'Plus Jakarta Sans, sans-serif', fontSize:13, fontWeight:600,
                background: isActive ? ow.color : 'transparent',
                color: isActive ? '#fff' : C.sub,
                transition: 'all 0.2s ease' }}>
              {ow.label}
            </button>
          );
        })}
      </div>

      {/* Summary card */}
      <div style={{ background: C.white, border:`1px solid ${C.border}`, borderRadius:12,
        padding:20, marginBottom:24, boxShadow:'0 1px 3px rgba(0,0,0,0.04)',
        display:'flex', alignItems:'center', gap:20 }}>
        <div style={{ position:'relative' }}>
          <CircularProgress pct={p.pct} size={70} color={o.color}/>
          <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center',
            justifyContent:'center', fontSize:14, fontWeight:700, color: o.color }}>
            {p.pct}%
          </div>
        </div>
        <div>
          <div style={{ fontSize:18, fontWeight:700, color: C.text }}>{o.label}</div>
          <div style={{ fontSize:12, color: C.muted, marginTop:2 }}>{o.role}</div>
          <div style={{ display:'flex', gap:16, marginTop:8 }}>
            <div style={{ textAlign:'center' }}>
              <div style={{ fontSize:22, fontWeight:700, color: C.success }}>{p.done}</div>
              <div style={{ fontSize:11, color: C.muted }}>concluídas</div>
            </div>
            <div style={{ textAlign:'center' }}>
              <div style={{ fontSize:22, fontWeight:700, color: C.sub }}>{p.total - p.done}</div>
              <div style={{ fontSize:11, color: C.muted }}>pendentes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks grouped by phase */}
      {PHASES.map(ph => {
        const tasks = ph.tasks.filter(t => t.owner === active || t.owner === 'todos');
        if (tasks.length === 0) return null;
        return (
          <div key={ph.id} style={{ marginBottom:28 }}>
            <div style={{ fontSize:11, fontWeight:700, color: C.muted, textTransform:'uppercase',
              letterSpacing:'0.8px', marginBottom:10 }}>{ph.title}</div>
            {tasks.map(task => (
              <TaskCard key={task.id} task={task} checked={checked} onCheck={onCheck}
                notes={notes} onNote={onNote} showPhaseLabel={false}/>
            ))}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Sidebar ─────────────────────────────────────────────── */
function Sidebar({ view, setView, checked, ownerFilter, setOwnerFilter, onClose }) {
  const overall = calcOverall(checked);
  const ownerKeys = ['pedro','marcos','priscilla'];

  const navItems = [
    { id:'dashboard', label:'Dashboard',   icon: Icon.dashboard },
    { id:'phases',    label:'Fases',        icon: Icon.phases    },
    { id:'myview',    label:'Minha Visão',  icon: Icon.person    },
  ];

  return (
    <div style={{ width:220, minWidth:220, background: C.sidebarBg,
      borderRight:`1px solid ${C.border}`, display:'flex', flexDirection:'column',
      height:'100%', boxSizing:'border-box', flexShrink:0 }}>

      {/* Logo / Title */}
      <div style={{ padding:'20px 20px 16px', borderBottom:`1px solid ${C.border}`,
        display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div>
          <div style={{ fontSize:14, fontWeight:700, color: C.text, lineHeight:1.3 }}>
            Projeto Copa 2026
          </div>
          <div style={{ fontSize:11, color: C.muted, marginTop:2 }}>Gestão de Projeto</div>
        </div>
        {onClose && (
          <button onClick={onClose}
            style={{ background:'none', border:'none', cursor:'pointer', color: C.muted, padding:4 }}>
            {Icon.close}
          </button>
        )}
      </div>

      {/* Nav */}
      <nav style={{ padding:'10px 12px' }}>
        {navItems.map(item => {
          const active = view === item.id;
          return (
            <button key={item.id} onClick={() => { setView(item.id); onClose?.(); }}
              style={{ display:'flex', alignItems:'center', gap:10, width:'100%',
                padding:'9px 12px', borderRadius:8, border:'none', cursor:'pointer',
                fontFamily:'Plus Jakarta Sans, sans-serif',
                fontSize:13, fontWeight: active ? 600 : 500,
                background: active ? '#F0F3FF' : 'transparent',
                color: active ? C.primary : C.sub,
                transition:'all 0.15s ease', marginBottom:2, textAlign:'left' }}>
              <span style={{ flexShrink:0 }}>{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Divider */}
      <div style={{ borderTop:`1px solid ${C.border}`, margin:'4px 12px 10px' }}/>

      {/* Team */}
      <div style={{ padding:'0 20px' }}>
        <div style={{ fontSize:10, fontWeight:700, color: C.muted, textTransform:'uppercase',
          letterSpacing:'1px', marginBottom:10 }}>Equipe</div>
        {ownerKeys.map(key => {
          const o = OWNERS[key];
          const p = calcOwner(key, checked);
          const isActive = ownerFilter === key;
          return (
            <button key={key} onClick={() => setOwnerFilter(isActive ? null : key)}
              style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
                width:'100%', padding:'7px 8px', borderRadius:8, border:'none', cursor:'pointer',
                background: isActive ? o.color+'18' : 'transparent',
                fontFamily:'Plus Jakarta Sans, sans-serif',
                marginBottom:2, transition:'all 0.15s ease' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ width:8, height:8, borderRadius:'50%', background: o.color, flexShrink:0 }}/>
                <span style={{ fontSize:13, fontWeight: isActive ? 600 : 500, color: isActive ? o.color : C.text }}>
                  {o.label}
                </span>
              </div>
              <span style={{ fontSize:11, fontWeight:600, color: C.muted }}>{p.pct}%</span>
            </button>
          );
        })}
      </div>

      {/* Spacer */}
      <div style={{ flex:1 }}/>

      {/* Overall progress */}
      <div style={{ padding:'16px 20px', borderTop:`1px solid ${C.border}` }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
          <span style={{ fontSize:11, color: C.muted, fontWeight:600 }}>Progresso geral</span>
          <span style={{ fontSize:12, fontWeight:700, color: C.primary }}>{overall.pct}%</span>
        </div>
        <ProgressBar pct={overall.pct} height={5}/>
      </div>
    </div>
  );
}

/* ─── Main App ────────────────────────────────────────────── */
export default function App() {
  const LS_KEY = 'copa2026_project_v1';

  const [stored, setStored] = useState(() => {
    try { return JSON.parse(localStorage.getItem(LS_KEY)) || {}; } catch { return {}; }
  });

  const checked  = stored.checked  || {};
  const notes    = stored.notes    || {};

  const save = useCallback(newData => {
    const merged = { ...stored, ...newData };
    setStored(merged);
    localStorage.setItem(LS_KEY, JSON.stringify(merged));
  }, [stored]);

  function handleCheck(key, value) {
    save({ checked: { ...checked, [key]: value } });
  }
  function handleNote(taskId, text) {
    save({ notes: { ...notes, [taskId]: text } });
  }

  const [view,         setView]         = useState('dashboard');
  const [initialPhase, setInitialPhase] = useState(null);
  const [ownerFilter,  setOwnerFilter]  = useState(null);
  const [sidebarOpen,  setSidebarOpen]  = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  function navigateToPhase(phaseId) {
    setInitialPhase(phaseId);
    setView('phases');
  }

  function handleReset() {
    if (!resetConfirm) { setResetConfirm(true); return; }
    const empty = { checked:{}, notes:{} };
    setStored(empty);
    localStorage.setItem(LS_KEY, JSON.stringify(empty));
    setResetConfirm(false);
  }

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <>
      <FontLink/>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: ${C.bg}; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 3px; }
        button:hover { opacity: 0.9; }
        @media (max-width: 768px) {
          .sidebar-overlay { display: block !important; }
        }
      `}</style>

      <div style={{ display:'flex', height:'100vh', overflow:'hidden',
        fontFamily:'Plus Jakarta Sans, sans-serif', background: C.bg }}>

        {/* Sidebar — desktop always visible */}
        <div style={{ display:'flex', height:'100%' }}>
          <div style={{ display: 'none' }} className="sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
            style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.3)',
              zIndex:99, display: sidebarOpen ? 'block' : 'none' }}
          />
          <div style={{
            position: 'relative',
            zIndex: 100,
            transform: `translateX(0)`,
            transition: 'transform 0.25s ease',
          }}>
            <Sidebar view={view} setView={setView} checked={checked}
              ownerFilter={ownerFilter} setOwnerFilter={setOwnerFilter}/>
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>

          {/* Top header */}
          <div style={{ height:56, background: C.white, borderBottom:`1px solid ${C.border}`,
            display:'flex', alignItems:'center', padding:'0 24px',
            justifyContent:'space-between', flexShrink:0 }}>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <div style={{ fontSize:16, fontWeight:700, color: C.text }}>
                { view === 'dashboard' ? 'Dashboard'
                : view === 'phases'    ? 'Fases do Projeto'
                :                        'Minha Visão' }
              </div>
              {ownerFilter && (
                <span style={{ display:'inline-flex', alignItems:'center', gap:5,
                  background: OWNERS[ownerFilter].color+'18',
                  color: OWNERS[ownerFilter].color,
                  fontSize:11, fontWeight:700, padding:'2px 10px', borderRadius:20,
                  border:`1px solid ${OWNERS[ownerFilter].color}44` }}>
                  <span style={{ width:6, height:6, borderRadius:'50%',
                    background: OWNERS[ownerFilter].color }}/>
                  {OWNERS[ownerFilter].label}
                  <button onClick={() => setOwnerFilter(null)}
                    style={{ background:'none', border:'none', cursor:'pointer', padding:0,
                      color: OWNERS[ownerFilter].color, marginLeft:2, lineHeight:1, fontFamily:'inherit' }}>
                    ×
                  </button>
                </span>
              )}
            </div>
            <button
              onClick={handleReset}
              onBlur={() => setResetConfirm(false)}
              style={{ fontSize:11, color: resetConfirm ? C.danger : C.muted,
                background: resetConfirm ? '#FEF2F2' : 'transparent',
                border:`1px solid ${resetConfirm ? '#FECACA' : C.border}`,
                borderRadius:6, padding:'4px 12px', cursor:'pointer',
                fontFamily:'Plus Jakarta Sans, sans-serif', fontWeight:600,
                transition:'all 0.15s ease' }}>
              {resetConfirm ? 'Confirmar reset' : 'Resetar progresso'}
            </button>
          </div>

          {/* View content */}
          <div style={{ flex:1, overflow:'hidden' }}>
            {view === 'dashboard' && (
              <DashboardView checked={checked} onNavigatePhase={navigateToPhase}/>
            )}
            {view === 'phases' && (
              <PhasesView checked={checked} onCheck={handleCheck}
                notes={notes} onNote={handleNote} initialPhase={initialPhase}/>
            )}
            {view === 'myview' && (
              <MyView checked={checked} onCheck={handleCheck}
                notes={notes} onNote={handleNote}/>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
