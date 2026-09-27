(() => {
  "use strict";

  /* ============================================================
     DATA
     ============================================================ */
  const PRODUCTS = [
    { id: "cow-milk",    name: "Cow Milk",          cat: "milk",   unit: "1 litre", price: 90,  desc: "Fresh, unadulterated cow milk collected daily at 4 AM." , icon:"🥛", img:"https://commons.wikimedia.org/wiki/Special:FilePath/Milk_glass.jpg" },
    { id: "buffalo-milk",name: "Buffalo Milk",      cat: "milk",   unit: "1 litre", price: 110, desc: "Rich, creamy buffalo milk — a favourite for tea and sweets.", icon:"🥛", img:"https://commons.wikimedia.org/wiki/Special:FilePath/Milk_glass.jpg" },
    { id: "toned-milk",  name: "Toned Milk",        cat: "milk",   unit: "1 litre", price: 80,  desc: "Lighter, lower-fat option for everyday drinking.", icon:"🥛", img:"https://commons.wikimedia.org/wiki/Special:FilePath/Milk_glass.jpg" },
    { id: "cow-ghee",    name: "Cow Ghee",          cat: "ghee",   unit: "500 g",   price: 850, desc: "Slow-simmered, hand-churned from cultured cow cream.", icon:"🧈", img:"https://commons.wikimedia.org/wiki/Special:FilePath/Desi%20ghee.JPG" },
    { id: "buffalo-ghee",name: "Buffalo Ghee",      cat: "ghee",   unit: "500 g",   price: 780, desc: "Deep, nutty aroma — perfect for festival cooking.", icon:"🧈", img:"https://commons.wikimedia.org/wiki/Special:FilePath/Desi%20ghee1.JPG" },
    { id: "plain-curd",  name: "Plain Curd (Dahi)", cat: "curd",   unit: "400 g",   price: 70,  desc: "Set thick the traditional way, mildly tangy.", icon:"🫙", svg:"curd" },
    { id: "lassi",       name: "Sweet Lassi",       cat: "curd",   unit: "300 ml",  price: 60,  desc: "Chilled, lightly sweetened — no artificial flavour.", icon:"🫙", svg:"lassi" },
    { id: "buttermilk",  name: "Spiced Buttermilk", cat: "curd",   unit: "300 ml",  price: 40,  desc: "Cumin and curry-leaf tempered, straight from the churn.", icon:"🫙", svg:"buttermilk" },
    { id: "paneer",      name: "Fresh Paneer",      cat: "paneer", unit: "250 g",   price: 220, desc: "Pressed same morning, soft enough to crumble by hand.", icon:"🧀", svg:"paneer" },
    { id: "cheese",      name: "Farm Cheese Block", cat: "paneer", unit: "200 g",   price: 260, desc: "Mild, semi-hard block made in small batches.", icon:"🧀", svg:"cheese" },
    { id: "khoya",       name: "Khoya (Mawa)",      cat: "sweets", unit: "250 g",   price: 300, desc: "Reduced milk solids, the base for most Nepali sweets.", icon:"🍮", svg:"khoya" },
    { id: "peda",        name: "Peda",              cat: "sweets", unit: "6 pcs",   price: 180, desc: "Soft cardamom-scented milk fudge, made to order.", icon:"🍮", svg:"peda" },
  ];

  /* ============================================================
     CUSTOM PRODUCT ILLUSTRATIONS (flat, brand-coloured SVGs)
     ============================================================ */
  const SVG_ICONS = {
    curd: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" fill="#F1EBDC"/>
      <path d="M16 30c0-2 1-3 2-3h28c1 0 2 1 2 3l-2 16c-.4 3-3 5-6 5H24c-3 0-5.6-2-6-5l-2-16Z" fill="#B85C2E"/>
      <path d="M18 30h28l-1 5H19l-1-5Z" fill="#E8A93B"/>
      <ellipse cx="32" cy="29" rx="16" ry="5" fill="#FBF7EE"/>
      <ellipse cx="32" cy="28" rx="12" ry="3.4" fill="#fff"/>
      <path d="M40 20c1-3 4-5 6-4-1 3-3 5-6 4Z" fill="#2C5443"/>
    </svg>`,
    lassi: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" fill="#F1EBDC"/>
      <path d="M22 20h20l-3 30c-.2 2-2 4-4 4h-6c-2 0-3.8-2-4-4l-3-30Z" fill="#FBF7EE" stroke="#E8A93B" stroke-width="2"/>
      <path d="M23 30h18l-2 20c-.2 2-2 4-4 4h-6c-2 0-3.8-2-4-4l-2-20Z" fill="#F6D9A8"/>
      <rect x="30" y="10" width="3" height="16" rx="1.5" fill="#2C5443"/>
      <circle cx="26" cy="26" r="2" fill="#B85C2E"/>
      <circle cx="34" cy="24" r="2" fill="#B85C2E"/>
    </svg>`,
    buttermilk: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" fill="#F1EBDC"/>
      <path d="M20 18h24l-2 8H22l-2-8Z" fill="#2C5443"/>
      <path d="M22 26h20l-2 22c-.2 2.4-2.2 4-4.6 4h-6.8c-2.4 0-4.4-1.6-4.6-4L22 26Z" fill="#FBF7EE" stroke="#E8A93B" stroke-width="2"/>
      <path d="M23.4 34h17.2l-1.4 16c-.2 1.8-1.6 3-3.4 3h-7.6c-1.8 0-3.2-1.2-3.4-3l-1.4-16Z" fill="#F6D9A8"/>
      <circle cx="27" cy="40" r="1.6" fill="#1B3B2F"/>
      <circle cx="33" cy="44" r="1.6" fill="#1B3B2F"/>
      <circle cx="30" cy="48" r="1.6" fill="#1B3B2F"/>
    </svg>`,
    paneer: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" fill="#F1EBDC"/>
      <rect x="14" y="24" width="16" height="16" rx="2" fill="#FBF7EE" stroke="#E8A93B" stroke-width="2"/>
      <rect x="32" y="24" width="16" height="16" rx="2" fill="#FBF7EE" stroke="#E8A93B" stroke-width="2"/>
      <rect x="23" y="36" width="16" height="16" rx="2" fill="#F6D9A8" stroke="#C88820" stroke-width="2"/>
    </svg>`,
    cheese: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" fill="#F1EBDC"/>
      <path d="M14 42 32 16l18 26H14Z" fill="#E8A93B"/>
      <path d="M14 42h36l3 6H11l3-6Z" fill="#C88820"/>
      <circle cx="28" cy="34" r="2.2" fill="#F1EBDC"/>
      <circle cx="37" cy="30" r="1.6" fill="#F1EBDC"/>
      <circle cx="32" cy="38" r="1.6" fill="#F1EBDC"/>
    </svg>`,
    khoya: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" fill="#F1EBDC"/>
      <path d="M16 34c0-2 1-3 2-3h28c1 0 2 1 2 3l-1.6 12c-.3 2.6-2.6 4.6-5.2 4.6H22.8c-2.6 0-4.9-2-5.2-4.6L16 34Z" fill="#2C5443"/>
      <ellipse cx="32" cy="32" rx="15" ry="7" fill="#F6D9A8"/>
      <ellipse cx="32" cy="31" rx="11" ry="4.6" fill="#EBC583"/>
    </svg>`,
    peda: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" fill="#F1EBDC"/>
      <ellipse cx="32" cy="46" rx="20" ry="4" fill="#E8A93B"/>
      <circle cx="24" cy="38" r="8" fill="#F6D9A8" stroke="#C88820" stroke-width="1.4"/>
      <circle cx="40" cy="38" r="8" fill="#F6D9A8" stroke="#C88820" stroke-width="1.4"/>
      <circle cx="32" cy="30" r="9" fill="#F9E3B8" stroke="#C88820" stroke-width="1.4"/>
      <path d="M29 27c2 1 4 1 6 0" stroke="#B85C2E" stroke-width="1.4" fill="none" stroke-linecap="round"/>
    </svg>`,
  };

  const CATEGORY_LABEL = { milk:"Milk", ghee:"Ghee", curd:"Curd", paneer:"Paneer", sweets:"Sweets" };

  const REVIEWS = [
    { name:"Sita Sharma",       area:"Lalitpur",  text:"Delivered every morning at 5 AM without fail — my kids won't drink any other milk now." },
    { name:"Ram Prasad Thapa",  area:"Bhaktapur", text:"Three years of buying ghee and paneer from them. Quality hasn't dropped once." },
    { name:"Sunita Gurung",     area:"Kathmandu", text:"Ordering on WhatsApp is genuinely easy. I message, they confirm, it arrives." },
    { name:"Priya Maharjan",    area:"Duwakot",   text:"The dahi tastes home-made — thick enough to hold a spoon upright." },
    { name:"Hari Bahadur KC",   area:"Kathmandu", text:"Buffalo milk here is the richest I've found for making proper chiya." },
    { name:"Anjali Rai",        area:"Lalitpur",  text:"Switched their subscription to mornings-only and they adjusted it same day." },
  ];

  const FAQS = [
    { q:"What areas do you deliver to?", a:"Kathmandu, Bhaktapur, Lalitpur and Duwakot. Message us on WhatsApp with your ward or landmark to confirm your exact area." },
    { q:"Can I mix products in one order?", a:"Yes — build a basket of milk, ghee, curd and paneer together below, and place it as a single order." },
    { q:"Is the milk really additive-free?", a:"Yes. It's collected each morning, chilled within the hour, and packed with no added water or preservatives." },
    { q:"What are the delivery windows?", a:"Morning (5–8 AM), afternoon (12–2 PM) and evening (5–7 PM). Order by 8 PM the night before for morning delivery." },
    { q:"How do I pay?", a:"Cash on delivery, or digitally through eSewa, Khalti or bank transfer. No advance payment needed once you're a regular customer." },
    { q:"Do you offer monthly subscriptions?", a:"Yes, with a small discount over one-off orders. Ask on WhatsApp and we'll set a recurring schedule around your routine." },
  ];

  const WHATSAPP_NUMBER = "9779815750117";

  /* ============================================================
     STATE
     ============================================================ */
  const cart = new Map(); // id -> qty

  /* ============================================================
     HELPERS
     ============================================================ */
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const fmtNPR = (n) => `Rs. ${n.toLocaleString("en-IN")}`;
  const productById = (id) => PRODUCTS.find((p) => p.id === id);

  function showToast(msg) {
    const toast = $("#toast");
    toast.textContent = msg;
    toast.classList.add("is-visible");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove("is-visible"), 2200);
  }
  window.showToast = showToast;

  /* ============================================================
     RENDER: PRODUCT GRID
     ============================================================ */
  function renderProducts() {
    const grid = $("#productGrid");
    grid.innerHTML = PRODUCTS.map((p) => `
      <article class="product-card" data-cat="${p.cat}">
        ${p.svg
          ? `<span class="p-illustration" aria-hidden="true">${SVG_ICONS[p.svg]}</span>`
          : p.img
          ? `<img class="p-photo" src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'p-icon',textContent:'${p.icon}'}))">`
          : `<span class="p-icon" aria-hidden="true">${p.icon}</span>`}
        <h3>${p.name}</h3>
        <p class="p-desc">${p.desc}</p>
        <div class="p-price">${fmtNPR(p.price)} <span style="color:var(--charcoal-45);font-weight:400;">/ ${p.unit}</span></div>
        <button class="btn btn-ghost btn-small" data-add="${p.id}" type="button">Add to basket</button>
      </article>
    `).join("");

    grid.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-add]");
      if (!btn) return;
      addToCart(btn.dataset.add, 1);
    });
  }

  function initFilters() {
    const chips = $$(".filter-chip");
    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        chips.forEach((c) => c.classList.remove("is-active"));
        chip.classList.add("is-active");
        const filter = chip.dataset.filter;
        $$(".product-card").forEach((card) => {
          card.classList.toggle("is-hidden", filter !== "all" && card.dataset.cat !== filter);
        });
      });
    });
  }

  /* ============================================================
     RENDER: PRICE TABLE
     ============================================================ */
  function renderPriceTable() {
    const body = $("#priceTableBody");
    body.innerHTML = PRODUCTS.map((p) => `
      <tr>
        <td>${p.icon} ${p.name}</td>
        <td>${p.unit}</td>
        <td class="price-cell">${fmtNPR(p.price)}</td>
        <td class="add-cell"><button data-add="${p.id}" type="button">Add</button></td>
      </tr>
    `).join("");

    body.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-add]");
      if (!btn) return;
      addToCart(btn.dataset.add, 1);
    });
  }

  /* ============================================================
     RENDER: QUICK-ADD SELECT
     ============================================================ */
  function renderQuickAdd() {
    const select = $("#quickAddSelect");
    select.innerHTML = PRODUCTS.map((p) => `<option value="${p.id}">${p.icon} ${p.name} — ${fmtNPR(p.price)}</option>`).join("");

    $("#quickAddBtn").addEventListener("click", () => {
      const qty = Math.max(1, parseInt($("#quickAddQty").value, 10) || 1);
      addToCart(select.value, qty);
    });
  }

  /* ============================================================
     CART LOGIC
     ============================================================ */
  function addToCart(id, qty) {
    cart.set(id, (cart.get(id) || 0) + qty);
    renderCart();
    showToast(`Added ${productById(id).name} to your basket`);
  }

  function removeFromCart(id) {
    cart.delete(id);
    renderCart();
  }

  function renderCart() {
    const list = $("#cartList");
    const empty = $("#cartEmpty");
    const items = Array.from(cart.entries());

    if (items.length === 0) {
      list.innerHTML = "";
      list.appendChild(empty);
      empty.style.display = "block";
    } else {
      list.innerHTML = items.map(([id, qty]) => {
        const p = productById(id);
        return `
          <li class="cart-item">
            <span class="ci-name">${p.icon} ${p.name}</span>
            <span class="ci-qty">× ${qty}</span>
            <span class="ci-qty">${fmtNPR(p.price * qty)}</span>
            <button class="ci-remove" data-remove="${id}" aria-label="Remove ${p.name}" type="button">✕</button>
          </li>`;
      }).join("");
    }

    const total = items.reduce((sum, [id, qty]) => sum + productById(id).price * qty, 0);
    const count = items.reduce((sum, [, qty]) => sum + qty, 0);

    $("#cartTotal").textContent = fmtNPR(total);
    $("#cartCount").textContent = `${count} item${count === 1 ? "" : "s"}`;

    const sendBtn = $("#sendOrderBtn");
    const note = $("#formNote");
    if (count === 0) {
      sendBtn.disabled = true;
      note.textContent = "Add at least one item to enable sending.";
    } else {
      sendBtn.disabled = false;
      note.textContent = "Review your basket, fill in your details, and click Place Order.";
    }
  }

  function initCartRemoval() {
    $("#cartList").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-remove]");
      if (!btn) return;
      removeFromCart(btn.dataset.remove);
    });
  }

  /* ============================================================
     ORDER FORM -> WHATSAPP (zero setup — opens WhatsApp with the
     order pre-filled, sent straight to WHATSAPP_NUMBER above)
     This is more reliable than email: it doesn't need any app
     pre-configured on the customer's device — WhatsApp handles it.
     ============================================================ */
  function buildOrderPayload() {
    const name = $("#custName").value.trim();
    const phone = $("#custPhone").value.trim();
    const address = $("#custAddress").value.trim();
    const time = $("#custTime").value;
    const lat = $("#custLat").value;
    const lng = $("#custLng").value;

    const items = Array.from(cart.entries()).map(([id, qty]) => {
      const p = productById(id);
      return `${p.name} x ${qty} (${fmtNPR(p.price * qty)})`;
    });
    const total = Array.from(cart.entries()).reduce(
      (s, [id, qty]) => s + productById(id).price * qty, 0
    );

    return {
      name, phone, address, time,
      items, total,
      location: lat && lng ? `https://maps.google.com/?q=${lat},${lng}` : "Not shared",
      ordered_at: new Date().toLocaleString("en-US", { timeZone: "Asia/Kathmandu" }),
    };
  }

  function sendByWhatsApp(order) {
    const lines = [
      `Hi Krishna Dudh Dairy! I'd like to place an order:`,
      ``,
      ...order.items.map((line) => `• ${line}`),
      ``,
      `Total: ${fmtNPR(order.total)}`,
      ``,
      `Name: ${order.name}`,
      `Phone: ${order.phone}`,
      `Address: ${order.address}`,
      `Location pin: ${order.location}`,
      `Preferred time: ${order.time}`,
    ];
    const message = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank", "noopener");
  }

  /* ---------- Order history (saved on this device, newest first) ---------- */
  const ORDER_HISTORY_KEY = "krishnaDudhDairy_orders";

  function loadOrderHistory() {
    try {
      const raw = localStorage.getItem(ORDER_HISTORY_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      return [];
    }
  }

  function saveOrderToHistory(order) {
    const history = loadOrderHistory();
    history.unshift({ ...order, id: Date.now() });
    try {
      localStorage.setItem(ORDER_HISTORY_KEY, JSON.stringify(history.slice(0, 50)));
    } catch (err) { /* storage full or unavailable — skip silently */ }
    renderOrderHistory();
  }

  function removeOrderFromHistory(id) {
    const history = loadOrderHistory().filter((o) => o.id !== id);
    localStorage.setItem(ORDER_HISTORY_KEY, JSON.stringify(history));
    renderOrderHistory();
  }

  function renderOrderHistory() {
    const list = $("#orderHistoryList");
    const empty = $("#orderHistoryEmpty");
    if (!list) return;

    const history = loadOrderHistory();
    if (history.length === 0) {
      list.innerHTML = "";
      list.appendChild(empty);
      return;
    }

    list.innerHTML = history.map((o) => `
      <article class="order-history-card">
        <div class="oh-top">
          <span class="oh-total">${fmtNPR(o.total)}</span>
          <span class="oh-date">${o.ordered_at}</span>
        </div>
        <div class="oh-meta">${o.name} · ${o.phone} · ${o.time}</div>
        <div class="oh-meta">${o.address}</div>
        <ul class="oh-items">${o.items.map((line) => `<li>${line}</li>`).join("")}</ul>
        <button class="oh-remove" data-remove-order="${o.id}" type="button">Remove from list</button>
      </article>
    `).join("");

    list.querySelectorAll("[data-remove-order]").forEach((btn) => {
      btn.addEventListener("click", () => removeOrderFromHistory(Number(btn.dataset.removeOrder)));
    });
  }

  function initOrderForm() {
    const form = $("#orderForm");
    const sendBtn = $("#sendOrderBtn");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (cart.size === 0) return;

      const order = buildOrderPayload();

      sendBtn.disabled = true;
      sendBtn.textContent = "Placing order...";

      sendByWhatsApp(order);
      showToast("Opening WhatsApp — hit send to complete the order!");
      saveOrderToHistory(order);
      cart.clear();
      renderCart();
      form.reset();
      resetLocationPicker();

      sendBtn.disabled = false;
      sendBtn.textContent = "Place Order";
    });
  }

  /* ============================================================
     RENDER: REVIEWS
     ============================================================ */
  function renderReviews() {
    $("#reviewTrack").innerHTML = REVIEWS.map((r) => `
      <article class="review-card">
        <div class="review-stars" aria-label="5 out of 5 stars">★★★★★</div>
        <p class="review-quote">"${r.text}"</p>
        <div class="review-who">
          <span class="review-avatar" aria-hidden="true">${r.name.charAt(0)}</span>
          <span>${r.name} <span style="color:var(--charcoal-45);">· ${r.area}</span></span>
        </div>
      </article>
    `).join("");
  }

  /* ============================================================
     RENDER: FAQ ACCORDION
     ============================================================ */
  function renderFaq() {
    const list = $("#faqList");
    list.innerHTML = FAQS.map((f, i) => `
      <div class="faq-item" data-i="${i}">
        <button class="faq-q" aria-expanded="false">
          <span>${f.q}</span><span class="faq-plus" aria-hidden="true">+</span>
        </button>
        <div class="faq-a"><p>${f.a}</p></div>
      </div>
    `).join("");

    list.addEventListener("click", (e) => {
      const btn = e.target.closest(".faq-q");
      if (!btn) return;
      const item = btn.closest(".faq-item");
      const answer = item.querySelector(".faq-a");
      const isOpen = item.classList.contains("is-open");

      item.classList.toggle("is-open", !isOpen);
      btn.setAttribute("aria-expanded", String(!isOpen));
      answer.style.maxHeight = isOpen ? null : `${answer.scrollHeight}px`;
    });
  }

  /* ============================================================
     LOCATION PICKER: auto-detect + draggable map pin
     ============================================================ */
  let locationMap = null;
  let locationMarker = null;

  function resetLocationPicker() {
    $("#custLat").value = "";
    $("#custLng").value = "";
    $("#locateStatus").textContent = "";
    $("#locationMap").classList.remove("is-active");
    if (locationMap) {
      locationMap.remove();
      locationMap = null;
      locationMarker = null;
    }
  }

  async function reverseGeocode(lat, lng) {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        { headers: { Accept: "application/json" } }
      );
      if (!res.ok) return null;
      const data = await res.json();
      return data.display_name || null;
    } catch (err) {
      return null;
    }
  }

  function placePin(lat, lng, mapContainer) {
    if (!locationMap) {
      locationMap = L.map(mapContainer, { scrollWheelZoom: false }).setView([lat, lng], 16);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(locationMap);

      const pinIcon = L.divIcon({
        className: "pin-emoji",
        html: "📍",
        iconSize: [28, 28],
        iconAnchor: [14, 28],
      });

      locationMarker = L.marker([lat, lng], { icon: pinIcon, draggable: true }).addTo(locationMap);

      locationMarker.on("dragend", async () => {
        const pos = locationMarker.getLatLng();
        $("#custLat").value = pos.lat.toFixed(6);
        $("#custLng").value = pos.lng.toFixed(6);
        $("#locateStatus").textContent = "Looking up address...";
        const address = await reverseGeocode(pos.lat, pos.lng);
        if (address) $("#custAddress").value = address;
        $("#locateStatus").textContent = "Pin updated — drag to fine-tune.";
      });
    } else {
      locationMap.setView([lat, lng], 16);
      locationMarker.setLatLng([lat, lng]);
    }
    setTimeout(() => locationMap.invalidateSize(), 200);
  }

  function initLocationPicker() {
    const btn = $("#locateBtn");
    const status = $("#locateStatus");
    const mapContainer = $("#locationMap");

    btn.addEventListener("click", () => {
      if (!("geolocation" in navigator)) {
        status.textContent = "Location isn't supported on this browser.";
        return;
      }
      status.textContent = "Finding your location...";
      btn.disabled = true;

      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude: lat, longitude: lng } = pos.coords;
          $("#custLat").value = lat.toFixed(6);
          $("#custLng").value = lng.toFixed(6);

          mapContainer.classList.add("is-active");
          placePin(lat, lng, mapContainer);

          status.textContent = "Looking up address...";
          const address = await reverseGeocode(lat, lng);
          if (address) {
            $("#custAddress").value = address;
            status.textContent = "Location found — drag the pin if it's off.";
          } else {
            status.textContent = "Pin placed — drag it to your exact spot, address lookup failed.";
          }
          btn.disabled = false;
        },
        (err) => {
          status.textContent =
            err.code === err.PERMISSION_DENIED
              ? "Location permission denied — type your address instead."
              : "Couldn't get your location — type your address instead.";
          btn.disabled = false;
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });
  }

  /* ============================================================
     COUNTERS (animate on scroll into view)
     ============================================================ */
  function initCounters() {
    const counters = $$("[data-count]");
    if (!counters.length) return;

    const animate = (el) => {
      const target = parseInt(el.dataset.count, 10);
      const duration = 1200;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target).toLocaleString("en-IN") + (target >= 1000 ? "+" : "+");
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach((c) => io.observe(c));
  }

  /* ============================================================
     ROUTE LINE FILL (animate on scroll into view)
     ============================================================ */
  function initRouteAnimation() {
    const track = $(".route-track");
    const fill = $("#routeLineFill");
    const dot = $("#routeDot");
    if (!track || !fill) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fill.style.width = "100%";
          if (dot) dot.style.left = "100%";
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    io.observe(track);
  }

  /* ============================================================
     NAV: mobile toggle, sticky back-to-top
     ============================================================ */
  function initNav() {
    const toggle = $("#navToggle");
    const mobileNav = $("#mobileNav");
    toggle.addEventListener("click", () => {
      const open = mobileNav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    $$("#mobileNav a").forEach((a) => a.addEventListener("click", () => {
      mobileNav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }));
  }

  function initBackToTop() {
    const btn = $("#toTop");
    window.addEventListener("scroll", () => {
      btn.classList.toggle("is-visible", window.scrollY > 600);
    }, { passive: true });
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* ============================================================
     INIT
     ============================================================ */
  function init() {
    renderProducts();
    initFilters();
    renderPriceTable();
    renderQuickAdd();
    renderCart();
    initCartRemoval();
    initOrderForm();
    initLocationPicker();
    renderOrderHistory();
    renderReviews();
    renderFaq();
    initCounters();
    initRouteAnimation();
    initNav();
    initBackToTop();
    $("#year").textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", init);
})();