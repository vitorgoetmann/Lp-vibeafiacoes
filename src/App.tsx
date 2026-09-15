import { useState, useEffect, useRef } from "react";
import { catalog } from "./data/catalog";
import { generateWhatsAppMessage, formatPhone } from "./utils/whatsapp";

type CartMap = Record<string, number>;

// ── Scroll reveal hook ─────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    // Small delay ensures DOM is ready
    const timer = setTimeout(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
    }, 100);
    return () => clearTimeout(timer);
  }, []);
}

// ── Logo SVG ──────────────────────────────────────────────────────────────
function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img src="/logo.svg" alt="Vibe Afiações" className="h-10 w-10 object-contain" />
      <div className="leading-tight">
        <div className="font-display font-bold text-lg text-vibe-navy leading-none">
          Vibe Afiações
        </div>
        <div className="text-xs text-vibe-accent font-medium tracking-widest uppercase">
          Qualidade e Confiança
        </div>
      </div>
    </div>
  );
}

// ── Header ─────────────────────────────────────────────────────────────────
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { href: "#inicio", label: "Início" },
    { href: "#sobre", label: "Sobre nós" },
    { href: "#servicos", label: "Serviços" },
    { href: "#catalogo", label: "Catálogo" },
    { href: "#como-funciona", label: "Como funciona" },
    { href: "#contato", label: "Contato" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#inicio">
            <Logo />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-vibe-accent ${
                  scrolled ? "text-gray-700" : "text-white/90"
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA button */}
          <div className="hidden md:block">
            <a
              href="#solicitar"
              className="btn-primary text-sm px-5 py-2.5"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Solicitar Afiação
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden hamburger flex flex-col gap-1.5 p-2 ${
              menuOpen ? "open" : ""
            } ${scrolled ? "text-vibe-navy" : "text-white"}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-white border-t border-gray-100 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 font-medium py-1 border-b border-gray-50 hover:text-vibe-accent transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#solicitar"
            onClick={() => setMenuOpen(false)}
            className="btn-primary justify-center mt-2 text-sm"
          >
            <WhatsAppIcon className="w-4 h-4" />
            Solicitar Afiação
          </a>
        </div>
      </div>
    </header>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/hero.jpg"
          alt="Profissional realizando afiação"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-vibe-navy/90 via-vibe-navy/70 to-vibe-blue/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block bg-vibe-accent/20 border border-vibe-accent/30 text-vibe-accent text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
            Desde 2008 · Qualidade e Confiança
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6">
            Afiação profissional para quem exige{" "}
            <span className="text-vibe-accent">qualidade.</span>
          </h1>
          <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-lg">
            Cuidamos das suas ferramentas com precisão, experiência e atenção
            aos detalhes. Desde 2008, levando qualidade e confiança para cada
            afiação.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#solicitar"
              className="btn-primary text-base px-8 py-4 justify-center"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Solicitar uma Afiação
            </a>
            <a
              href="#sobre"
              className="btn-outline text-base px-8 py-4 justify-center"
            >
              Conheça a Vibe
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 mt-10">
            {[
              { top: "Desde 2008", bottom: "Experiência e tradição" },
              { top: "Qualidade e Confiança", bottom: "Cuidado em cada ferramenta" },
              { top: "Atendimento Personalizado", bottom: "Atenção em cada pedido" },
            ].map((b) => (
              <div key={b.top} className="flex items-start gap-2">
                <div className="w-1 h-8 bg-vibe-accent rounded-full mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white font-semibold text-sm">{b.top}</div>
                  <div className="text-white/60 text-xs">{b.bottom}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-white/40" />
        <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="sobre" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="reveal">
            <span className="text-vibe-accent font-semibold text-sm tracking-widest uppercase">
              Sobre nós
            </span>
            <h2 className="section-title text-3xl sm:text-4xl mt-3 mb-6 leading-tight">
              Mais que afiar ferramentas, cuidamos do seu trabalho.
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              A Vibe Afiações atua desde{" "}
              <strong className="text-vibe-navy">2008</strong> oferecendo
              serviços de afiação com foco em qualidade, precisão e cuidado.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Nossa experiência foi construída ao longo dos anos, sempre
              buscando entregar ferramentas bem cuidadas e prontas para voltar
              ao trabalho.
            </p>

            <div className="flex flex-wrap gap-6">
              {[
                { number: "+18", label: "Anos de experiência" },
                { number: "2008", label: "Fundação da empresa" },
                { number: "100%", label: "Qualidade e confiança" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-vibe-light rounded-2xl px-6 py-4 text-center"
                >
                  <div className="font-display font-bold text-2xl text-vibe-blue">
                    {s.number}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="reveal reveal-delay-2 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img
                src="/tools.jpg"
                alt="Ferramentas da Vibe Afiações"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-vibe-navy/40 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-vibe-light rounded-full flex items-center justify-center">
                <span className="text-xl">✂️</span>
              </div>
              <div>
                <div className="font-bold text-vibe-navy text-sm">
                  Desde 2008
                </div>
                <div className="text-xs text-gray-500">Qualidade garantida</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Services ──────────────────────────────────────────────────────────────
function Services() {
  const services = [
    {
      icon: "💅",
      title: "Alicates",
      desc: "Afiação e ajuste de alicates de cutícula e unha para garantir corte preciso e seguro.",
    },
    {
      icon: "🔪",
      title: "Facas e Cutelos",
      desc: "Afiação profissional para diferentes tipos de facas domésticas, profissionais e cutelos.",
    },
    {
      icon: "✂️",
      title: "Tesouras",
      desc: "Afiação especializada para tesouras simples, fio navalha e fio a laser.",
    },
    {
      icon: "⚡",
      title: "Lâminas",
      desc: "Afiação de diferentes tipos de lâminas com precisão e cuidado.",
    },
    {
      icon: "🔧",
      title: "Espátulas",
      desc: "Afiação e acabamento de espátulas para uso profissional.",
    },
  ];

  return (
    <section id="servicos" className="py-24 bg-vibe-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <span className="text-vibe-accent font-semibold text-sm tracking-widest uppercase">
            O que afiamos
          </span>
          <h2 className="section-title text-3xl sm:text-4xl mt-3">
            Serviços especializados
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Trabalhamos com todo tipo de ferramenta de corte, trazendo de volta
            a nitidez e a precisão que você precisa.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`card group reveal reveal-delay-${i % 4}`}
            >
              <div className="w-12 h-12 bg-vibe-light rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {s.icon}
              </div>
              <h3 className="font-display font-semibold text-lg text-vibe-navy mb-2">
                {s.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Catalog ───────────────────────────────────────────────────────────────
function Catalog() {
  return (
    <section id="catalogo" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 reveal">
          <span className="text-vibe-accent font-semibold text-sm tracking-widest uppercase">
            Preços
          </span>
          <h2 className="section-title text-3xl sm:text-4xl mt-3">
            Catálogo de Afiações
          </h2>
          <p className="text-gray-500 mt-4">
            Confira os valores padrão para os principais serviços de afiação.
          </p>
        </div>

        {/* Desktop table */}
        <div className="hidden sm:block reveal">
          <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-vibe-navy text-white">
                  <th className="text-left px-6 py-4 font-semibold text-sm">
                    Ferramenta
                  </th>
                  <th className="text-right px-6 py-4 font-semibold text-sm">
                    Valor padrão
                  </th>
                </tr>
              </thead>
              <tbody>
                {catalog.map((item, i) => (
                  <tr
                    key={item.id}
                    className={`border-b border-gray-50 hover:bg-vibe-light transition-colors ${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                    }`}
                  >
                    <td className="px-6 py-4 text-gray-700 font-medium flex items-center gap-3">
                      <span className="text-lg">{item.icon}</span>
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-bold text-vibe-blue text-lg">
                        R$ {item.price.toFixed(2).replace(".", ",")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile cards */}
        <div className="sm:hidden grid gap-3 reveal">
          {catalog.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white rounded-xl border border-gray-100 px-4 py-3 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium text-gray-700">{item.name}</span>
              </div>
              <span className="font-bold text-vibe-blue">
                R$ {item.price.toFixed(2).replace(".", ",")}
              </span>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6 reveal">
          ⚠️ Os valores apresentados são referências padrão e podem variar
          conforme o estado ou necessidade da ferramenta.
        </p>
      </div>
    </section>
  );
}

// ── Request Builder ───────────────────────────────────────────────────────
function RequestBuilder() {
  const [cart, setCart] = useState<CartMap>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateQty = (id: string, delta: number) => {
    setCart((prev) => {
      const next = { ...prev };
      const current = next[id] || 0;
      const updated = Math.max(0, current + delta);
      if (updated === 0) delete next[id];
      else next[id] = updated;
      return next;
    });
  };

  const cartItems = catalog
    .filter((item) => cart[item.id] > 0)
    .map((item) => ({ ...item, qty: cart[item.id] }));

  const total = cartItems.reduce((s, i) => s + i.price * i.qty, 0);

  const validate = () => {
    const e: Record<string, string> = {};
    if (cartItems.length === 0)
      e.cart = "Selecione pelo menos um item para continuar.";
    if (!name.trim()) e.name = "Por favor, informe seu nome.";
    if (phone.replace(/\D/g, "").length < 10)
      e.phone = "Por favor, informe um telefone válido.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const send = () => {
    if (!validate()) return;
    const url = generateWhatsAppMessage(cartItems, { name, phone, note });
    window.open(url, "_blank");
  };

  return (
    <section id="solicitar" className="py-24 bg-vibe-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 reveal">
          <span className="text-vibe-accent font-semibold text-sm tracking-widest uppercase">
            Pré-atendimento
          </span>
          <h2 className="section-title text-3xl sm:text-4xl mt-3">
            Monte sua solicitação
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Selecione os itens, informe seus dados e envie tudo pronto pelo
            WhatsApp. Simples assim.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Item selector */}
          <div className="lg:col-span-2 reveal">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-vibe-navy px-6 py-4">
                <h3 className="text-white font-semibold text-lg">
                  Selecione os itens
                </h3>
              </div>
              <div className="divide-y divide-gray-50">
                {catalog.map((item) => {
                  const qty = cart[item.id] || 0;
                  return (
                    <div
                      key={item.id}
                      className={`flex items-center gap-4 px-5 py-4 transition-colors ${
                        qty > 0 ? "bg-vibe-light/60" : "hover:bg-gray-50/50"
                      }`}
                    >
                      <span className="text-2xl flex-shrink-0">{item.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-800 text-sm">
                          {item.name}
                        </div>
                        <div className="text-vibe-blue font-bold text-sm">
                          R$ {item.price.toFixed(2).replace(".", ",")}
                        </div>
                      </div>
                      {/* Quantity controls */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className={`qty-btn border-2 transition-all ${
                            qty > 0
                              ? "border-vibe-blue text-vibe-blue hover:bg-vibe-blue hover:text-white"
                              : "border-gray-200 text-gray-300 cursor-not-allowed"
                          }`}
                          disabled={qty === 0}
                          aria-label={`Remover ${item.name}`}
                        >
                          −
                        </button>
                        <span
                          className={`w-8 text-center font-bold text-sm ${
                            qty > 0 ? "text-vibe-navy" : "text-gray-300"
                          }`}
                        >
                          {qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="qty-btn bg-vibe-blue text-white hover:bg-vibe-navy"
                          aria-label={`Adicionar ${item.name}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {errors.cart && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span>⚠️</span> {errors.cart}
              </p>
            )}
          </div>

          {/* Summary + form */}
          <div className="flex flex-col gap-6 reveal reveal-delay-2">
            {/* Order summary */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-vibe-navy px-6 py-4">
                <h3 className="text-white font-semibold">Sua solicitação</h3>
              </div>
              <div className="p-5">
                {cartItems.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-4">
                    Selecione os itens que deseja enviar para afiação.
                  </p>
                ) : (
                  <>
                    <div className="space-y-2 mb-4">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-center text-sm"
                        >
                          <span className="text-gray-600">
                            {item.qty}x {item.name}
                          </span>
                          <span className="font-semibold text-vibe-navy">
                            R${" "}
                            {(item.price * item.qty)
                              .toFixed(2)
                              .replace(".", ",")}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gray-100 pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-xs">
                          Estimativa total
                        </span>
                        <span className="font-display font-bold text-xl text-vibe-blue">
                          R$ {total.toFixed(2).replace(".", ",")}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        Valor pode variar após avaliação
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Customer form */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4">
              <h3 className="font-semibold text-vibe-navy">Seus dados</h3>

              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">
                  Seu nome *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="João da Silva"
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-vibe-accent/50 transition-all ${
                    errors.name
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 focus:border-vibe-accent"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">
                  WhatsApp *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(formatPhone(e.target.value))
                  }
                  placeholder="(48) 99999-9999"
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-vibe-accent/50 transition-all ${
                    errors.phone
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 focus:border-vibe-accent"
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">
                  Observação (opcional)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Alguma informação sobre suas ferramentas?"
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-vibe-accent/50 focus:border-vibe-accent transition-all resize-none"
                />
              </div>

              <button
                onClick={send}
                className="w-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Enviar solicitação pelo WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── How It Works ──────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Escolha suas ferramentas",
      desc: "Selecione no catálogo os itens que deseja enviar para afiação.",
    },
    {
      n: "02",
      title: "Informe seus dados",
      desc: "Digite seu nome e WhatsApp para identificação.",
    },
    {
      n: "03",
      title: "Envie sua solicitação",
      desc: "Clique para enviar tudo diretamente pelo WhatsApp.",
    },
    {
      n: "04",
      title: "Combine a entrega",
      desc: "A equipe da Vibe entra em contato para orientar o atendimento.",
    },
  ];

  return (
    <section id="como-funciona" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <span className="text-vibe-accent font-semibold text-sm tracking-widest uppercase">
            Passo a passo
          </span>
          <h2 className="section-title text-3xl sm:text-4xl mt-3">
            Como funciona
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className={`reveal reveal-delay-${i} relative text-center`}
            >
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-1/2 w-full h-px bg-gradient-to-r from-vibe-blue/30 to-transparent" />
              )}
              <div className="inline-flex w-16 h-16 bg-vibe-navy rounded-2xl items-center justify-center mb-4 relative z-10">
                <span className="font-display font-bold text-vibe-accent text-lg">
                  {s.n}
                </span>
              </div>
              <h3 className="font-semibold text-vibe-navy mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Night Service ─────────────────────────────────────────────────────────
function NightService() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/night.jpg"
          alt="Atendimento noturno da Vibe Afiações"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-vibe-navy/85" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <span className="inline-block bg-yellow-400/20 border border-yellow-400/40 text-yellow-300 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
              🌙 Novo horário
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4 leading-tight">
              Agora também atendemos à noite!
            </h2>
            <p className="text-white/70 text-lg mb-6 leading-relaxed">
              Para atender à alta demanda e oferecer ainda mais comodidade, os
              atendimentos também acontecem em casa.
            </p>
            <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-2xl px-6 py-4 mb-8">
              <span className="text-3xl">🕖</span>
              <div>
                <div className="font-display font-bold text-2xl text-white">
                  19h às 22h
                </div>
                <div className="text-white/60 text-sm">
                  Atendimento domiciliar
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 reveal reveal-delay-2">
            {[
              {
                icon: "⚡",
                title: "Flexibilidade",
                desc: "Mais praticidade para sua rotina.",
              },
              {
                icon: "✅",
                title: "Qualidade",
                desc: "A mesma qualidade e cuidado que você já conhece.",
              },
              {
                icon: "🤝",
                title: "Compromisso",
                desc: "Compromisso com você e com o melhor resultado.",
              },
            ].map((b) => (
              <div
                key={b.title}
                className="flex items-start gap-4 bg-white/10 border border-white/10 rounded-2xl p-5 hover:bg-white/15 transition-colors"
              >
                <span className="text-2xl flex-shrink-0">{b.icon}</span>
                <div>
                  <div className="font-semibold text-white mb-1">{b.title}</div>
                  <div className="text-white/60 text-sm">{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Gallery ───────────────────────────────────────────────────────────────
function Gallery() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  const images = [
    { src: "/hero.jpg", alt: "Profissional afiando ferramentas" },
    { src: "/tools.jpg", alt: "Ferramentas da Vibe Afiações" },
    { src: "/night.jpg", alt: "Atendimento noturno Vibe Afiações" },
    { src: "/manicure.jpg", alt: "Afiação de alicates de cutícula" },
    { src: "/knife.jpg", alt: "Afiação de facas profissionais" },
    { src: "/scissors.jpg", alt: "Afiação de tesouras de barbeiro" },
  ];

  return (
    <section className="py-24 bg-vibe-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 reveal">
          <span className="text-vibe-accent font-semibold text-sm tracking-widest uppercase">
            Galeria
          </span>
          <h2 className="section-title text-3xl sm:text-4xl mt-3">
            Nosso trabalho em imagens
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 reveal">
          {images.map((img) => (
            <div
              key={img.src}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group shadow-sm"
              onClick={() => setLightbox(img.src)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-vibe-navy/0 group-hover:bg-vibe-navy/30 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-2">
                  <svg
                    className="w-5 h-5 text-vibe-navy"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt="Galeria"
            className="max-w-full max-h-[90vh] rounded-2xl object-contain shadow-2xl"
          />
          <button
            className="absolute top-4 right-4 text-white bg-white/20 hover:bg-white/30 rounded-full w-10 h-10 flex items-center justify-center text-xl transition-colors"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
        </div>
      )}
    </section>
  );
}

// ── Final CTA ─────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section id="contato" className="py-24 bg-vibe-navy">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal">
        <h2 className="font-display font-bold text-3xl sm:text-5xl text-white leading-tight mb-6">
          Suas ferramentas prontas para voltar ao trabalho.
        </h2>
        <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
          Selecione os itens que precisam de afiação e envie sua solicitação
          diretamente pelo WhatsApp.
        </p>
        <a
          href="#solicitar"
          className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-400 text-white font-bold px-10 py-5 rounded-full text-lg transition-all duration-300 shadow-2xl hover:shadow-green-500/30 hover:-translate-y-1"
        >
          <WhatsAppIcon className="w-6 h-6" />
          Solicitar Afiação pelo WhatsApp
        </a>
        <p className="text-white/40 text-sm mt-8">
          Vibe Afiações — Qualidade e Confiança desde 2008.
        </p>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-vibe-navy border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.svg" alt="Vibe Afiações" className="h-10 w-10 object-contain" />
              <div>
                <div className="font-display font-bold text-white text-lg leading-none">
                  Vibe Afiações
                </div>
                <div className="text-vibe-accent text-xs tracking-widest uppercase">
                  Qualidade e Confiança
                </div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Serviços especializados em afiação de ferramentas com qualidade e
              precisão desde 2008.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navegação</h4>
            <div className="flex flex-col gap-2">
              {["#inicio", "#sobre", "#servicos", "#catalogo", "#como-funciona", "#solicitar"].map(
                (href) => (
                  <a
                    key={href}
                    href={href}
                    className="text-white/50 hover:text-vibe-accent text-sm transition-colors"
                  >
                    {href.replace("#", "").replace("-", " ").charAt(0).toUpperCase() +
                      href.replace("#", "").replace("-", " ").slice(1)}
                  </a>
                )
              )}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contato</h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/5548998408153"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                  <WhatsAppIcon className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-sm">(48) 99840-8153</span>
              </a>
              <a
                href="https://instagram.com/vibe.afiacoes"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center group-hover:bg-pink-500/30 transition-colors">
                  <InstagramIcon className="w-4 h-4 text-pink-400" />
                </div>
                <span className="text-sm">@vibe.afiacoes</span>
              </a>
              <div className="flex items-center gap-3 text-white/40">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-xs">📅</span>
                </div>
                <span className="text-sm">Desde 2008</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-white/30 text-xs">
          © {new Date().getFullYear()} Vibe Afiações. Todos os direitos
          reservados.
        </div>
      </div>
    </footer>
  );
}

// ── WhatsApp Float ────────────────────────────────────────────────────────
function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <a
      href="https://wa.me/5548998408153"
      target="_blank"
      rel="noopener noreferrer"
      className={`whatsapp-float w-14 h-14 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-label="WhatsApp Vibe Afiações"
    >
      <WhatsAppIcon className="w-7 h-7 text-white" />
    </a>
  );
}

// ── SVG Icons ─────────────────────────────────────────────────────────────
function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

// ── App ───────────────────────────────────────────────────────────────────
export default function App() {
  useReveal();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Catalog />
        <RequestBuilder />
        <HowItWorks />
        <NightService />
        <Gallery />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
