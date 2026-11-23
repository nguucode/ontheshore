// Chuyển động và biểu cảm của avatar ở rail trái. Markup: src/components/Avatar.astro (các data-* là điểm bám của file này).
// Quyết định thiết kế: vault 10-projects/ontheshore/avatar-look-at.md.
  (() => {
  // Mỗi lớp trượt theo hướng nhìn với một hệ số riêng (nhân với STRENGTH). x, y trong [-1, 1].
  const STRENGTH = 120, EASE = 0.16; // biên độ xoay (đơn vị viewBox) và độ trễ, sếp chốt 2026-11-23 (biên độ: 85 rồi nâng lên 120)
  const HAIR = 0.25; // cả khối tóc đi theo hướng nhìn ít nhất chừng này; tóc sau dùng đúng số này để dính liền tóc trước
  const DEPTH = { ears: [-0.08, -0.04], back: [HAIR, HAIR * 0.8], feat: [1, 0.8] };
  // Mắt: liếc tới đích trước (lead), đầu theo sau thì trả về gần giữa (hold). x/up/down: tầm đi của con ngươi.
  // lid*: mí trên theo ánh nhìn dọc. drop: mí sập khi chớp. roll: con ngươi đảo lên khi mắt khép. verge: chụm khi nhìn gần.
  const EYE = { lead: 1.2, hold: 0.55, x: 26, up: 13, down: 15, lidUp: 14, lidDown: 10, lidSmile: 5, drop: 24, roll: 30, verge: 7, speed: 2.5 };
  // Đường mí trên: [x đầu, y đầu, x uốn, y uốn, x cuối, y cuối] dạng [mở, cười tít], rồi y uốn của mí dưới.
  const LID = {
    "-1": [[706, 716], [1002, 1012], [785, 786], [985, 960], [866, 856], [996, 1010], 1095],
    "1": [[996, 1006], [996, 1006], [1075, 1076], [980, 954], [1152, 1146], [990, 1004], 1090],
  };
  const BROW = { up: 14, down: 5 };
  const IDLE = 900; // ms con trỏ đứng yên thì hết mỉm cười
  const FAST = 3; // px/ms: chuột nhanh hơn thế này thì ngạc nhiên
  const SLEEP_AFTER = 30000; // ms đứng yên thì ngáp rồi ngủ

  const c01 = (v) => Math.max(0, Math.min(1, v));
  const clamp1 = (v) => Math.max(-1, Math.min(1, v));
  const mix = (n, s, k) => n + (s - n) * k;
  const f = (v) => v.toFixed(1);
  // Đường bao: lên trong a ms, giữ h ms, xuống trong r ms.
  const env = (t, [a, h, r]) => (t < 0 || t > a + h + r ? 0 : t < a ? t / a : t < a + h ? 1 : 1 - (t - a - h) / r);
  // Ngạc nhiên bật lên nhanh, tan chậm trong 2 giây. busy: đường bao còn đang chạy (cộng một khung hình để vẽ nốt giá trị 0).
  const ENV = { blink: [80, 40, 130], wink: [80, 200, 140], yawn: [400, 900, 500], surprise: [120, 600, 2000] };
  const busy = (t, [a, h, r]) => t < a + h + r + 20;

  // Các lớp "uốn": từng điểm của path bị đẩy theo độ nhô z của nó trên mặt cầu đầu (tâm, bán kính theo viewBox).
  const HEAD = [985, 960, 590];
  // tip: 0 ở chân tóc, 1 ở ngọn. mid: 1 trong dải lọn mái giữa trán. free: 0 ở mép tóc ghim vào viền đầu bên trái.
  const tip = (y) => c01((y - 700) / 250), mid = (x) => c01((x - 700) / 100) * c01((1180 - x) / 100), free = (x) => c01((x - 560) / 90);
  // side: 1 ở trán, giảm dần về 0 ở hai tóc mai (x gần mép mặt, y dưới chân mày).
  const side = (x, y) => mix(1, c01((x - 600) / 260) * c01((1400 - x) / 260), c01((y - 780) / 120));
  const BULGE = {
    // Ngọn lọn mái giữa nhô trước trán nên đi xa hơn nét mặt; mép trái ghim để không hở mặt giữa tóc trước và tóc sau.
    // Tóc mai nằm ở bên hông đầu nên đi ít hơn hẳn phần trán (side); không có nó, ở biên độ lớn tóc mai trượt thành khối vuông
    // và lọn bên phải thò qua tai.
    hair: (x, y, s) => HAIR + (Math.max(s * side(x, y) * (1 + 0.5 * tip(y) * mid(x)), HAIR) - HAIR) * free(x),
    // Chóp mũi nhô nhất nên sống mũi đổi độ cong khi quay đầu.
    nose: (x, y, s) => s * (1 + 0.5 * Math.sin(Math.PI * c01((y - 1109) / 99))),
    // Nửa trên khuôn mặt đứng yên, càng xuống cằm càng lệch theo hướng nhìn.
    face: (x, y) => 0.5 * c01((y - 1000) / 535),
  };
  // Ngọn lọn mái có quán tính: đi theo vị trí đầu bị trễ (lx, ly).
  BULGE.hair.lag = (x, y) => tip(y) * mid(x);
  function warp(tok, ox, oy, bulge, lx, ly) {
    let d = "";
    for (let i = 0; i < tok.length; i++) {
      if (isNaN(tok[i])) { d += tok[i]; continue; }
      const x = +tok[i], y = +tok[++i];
      const z = bulge(x, y, Math.sqrt(Math.max(0, 1 - ((x - HEAD[0]) ** 2 + (y - HEAD[1]) ** 2) / HEAD[2] ** 2)));
      const e = bulge.lag ? bulge.lag(x, y) : 0;
      d += f(x + (ox + (lx - ox) * e) * z) + " " + f(y + (oy + (ly - oy) * e) * z) + " ";
    }
    return d;
  }

  const el = document.querySelector("[data-avatar]");
  // Tắt chuyển động, hoặc màn cảm ứng không có con trỏ để nhìn theo: giữ nguyên mặt cười tĩnh trong markup, không gắn gì cả.
  // (Đọc một lần lúc tải trang; đổi cài đặt giữa chừng thì phải tải lại.)
  if (el && !matchMedia("(prefers-reduced-motion: reduce), (hover: none)").matches) {
    const q = (s) => el.querySelector(s);
    const layers = [...el.querySelectorAll("[data-l]")].map((n) => [n, DEPTH[n.dataset.l]]);
    const warps = [...el.querySelectorAll("[data-warp]")].map((n) => [n, n.getAttribute("d").match(/[A-Za-z]|-?[\d.]+/g), BULGE[n.dataset.warp]]);
    const eyes = [-1, 1].map((s) => ({ s, pupil: q(`[data-eye="${s}"]`), lid: q(`[data-lid="${s}"]`), clip: q(`#av-eye${s} path`) }));
    const brow = q("[data-brow]"), mouth = q("[data-mouth]"), o = q("[data-o]");

    // Vị trí: t* đích, x/y đầu (chậm), g* ánh nhìn (nhanh), h* ngọn tóc (trễ). verg: mức chụm mắt.
    let x = 0, y = 0, tx = 0, ty = 0, gx = 0, gy = 0, hx = 0, hy = 0, verg = 0;
    // Biểu cảm, đều trong [0, 1]. mood: mỉm cười (bắt đầu từ mặt cười của markup rồi dịu về vô cảm).
    // grin: cười tít (grinT khi con trỏ trên avatar, grinRT gieo ngẫu nhiên lúc di chuột). curious: con trỏ trên link/nút.
    let mood = 1, grin = 0, grinT = 0, grinR = 0, grinRT = 0, curious = 0, curiousT = 0, sleep = 0, sleepT = 0;
    let blinkV = 0, winkV = 0, surprise = 0, yawn = 0;
    let lastMove = -1e9, blinkAt = -1e9, winkAt = -1e9, surpriseAt = -1e9, yawnAt = -1e9, nextRoll = 0;
    let idleTimer = 0, sleepTimer = 0, lastPt = null, raf = 0, box = null;

    function draw() {
      for (const [n, [dx, dy]] of layers) n.setAttribute("transform", `translate(${f(x * dx * STRENGTH)} ${f(y * dy * STRENGTH)})`);
      const ex = clamp1(gx * EYE.hold + (gx - x) * EYE.lead), ey = clamp1(gy * EYE.hold + (gy - y) * EYE.lead);
      const py = ey * (ey < 0 ? EYE.up : EYE.down);
      // Ngạc nhiên, ngáp và ngủ đè lên cười tít; ngủ đè lên mỉm cười.
      const calm = (1 - surprise) * (1 - yawn) * (1 - sleep);
      const g = Math.max(grin, grinR) * calm;
      const m = Math.max(mood * (1 - sleep), g, winkV, surprise, yawn * 0.6);

      // Mày: thẳng và thấp khi vô cảm, cong vòm khi cười; theo ánh nhìn dọc; mày trái nhướn khi tò mò; cả hai nhấc khi ngạc nhiên.
      const up = surprise * 30 + yawn * 14 - sleep * 6, cl = -curious * 24 - up, cr = curious * 5 - up;
      const L = (n, s) => mix(n, s, m);
      brow.setAttribute("transform", `translate(0 ${f(ey * (ey < 0 ? BROW.up : BROW.down))})`);
      brow.setAttribute("d", `M${f(L(735, 730))} ${f(L(892, 872) + cl)}Q${f(L(792, 790))} ${f(L(888, 828) + cl * 1.4)} ${f(L(850, 854))} ${f(L(890, 858) + cl)}M${f(L(1050, 1046))} ${f(L(884, 856) + cr)}Q${f(L(1108, 1106))} ${f(L(880, 814) + cr)} ${f(L(1166, 1170))} ${f(L(884, 850) + cr)}`);

      // Miệng đổi hình liên tục: ngang -> nhếch -> cười rộng. Với chữ O (ngạc nhiên, ngáp): nét miệng thu về một điểm
      // (ov 0 -> .5) rồi chữ O nở ra từ điểm đó (ov .5 -> 1), và ngược lại.
      const ov = Math.max(surprise, yawn), oK = c01(ov * 2 - 1), w = 1 - c01(ov * 2), oS = oK / Math.max(ov, 0.001);
      const M = (n, s, t) => mix(mix(n, s, m), t, g), X = (v) => f(975 + (v - 975) * w), Y = (v) => f(1342 + (v - 1342) * w);
      mouth.setAttribute("d", `M${X(M(915, 905, 895))} ${Y(M(1335, 1342, 1322))}Q975 ${Y(M(1340, 1362, 1400))} ${X(M(1035, 1040, 1055))} ${Y(M(1332, 1306, 1318))}`);
      mouth.setAttribute("opacity", w > 0 ? 1 : 0); // nét đã thu về một điểm thì ẩn, kẻo nó nằm giữa lòng chữ O
      o.setAttribute("rx", f((24 * surprise + 40 * yawn) * oS));
      o.setAttribute("ry", f((28 * surprise + 56 * yawn) * oS));
      o.setAttribute("opacity", oK > 0 ? 1 : 0);

      // Mắt. cb: mí trên sập và võng dần (chớp, nháy mắt trái, ngáp, ngủ). g: mí cong thành vòm (cười tít).
      const lidY = ((ey < 0 ? ey * EYE.lidUp : ey * EYE.lidDown) - m * EYE.lidSmile) * (1 - g) - surprise * 14;
      const lc = Math.min(0, lidY) * 0.6;
      for (const e of eyes) {
        const cb = Math.max(blinkV, e.s < 0 ? winkV : 0, yawn, sleep) * (1 - g), c = Math.max(cb, g), t = lidY + cb * EYE.drop;
        const [x0, y0, cx, cy, x1, y1, bot] = LID[e.s];
        const X0 = mix(...x0, g), Y0 = mix(...y0, g), CX = mix(...cx, g), CY = mix(...cy, g) + lc + cb * 34, X1 = mix(...x1, g), Y1 = mix(...y1, g);
        e.lid.setAttribute("transform", `translate(0 ${f(t)})`);
        e.lid.setAttribute("d", `M${f(X0)} ${f(Y0)}Q${f(CX)} ${f(CY)} ${f(X1)} ${f(Y1)}`);
        // Khe mắt: cạnh trên bám đúng đường mí, nên mí che con ngươi dần từ trên xuống; mí dưới nhích lên khi gần khép hẳn.
        e.clip.setAttribute("d", `M${f(X0 - 8)} ${f(Y0 + t)}Q${f(CX)} ${f(CY + t)} ${f(X1 + 8)} ${f(Y1 + t)}Q${f(CX)} ${f(mix(bot, CY + t, c * c))} ${f(X0 - 8)} ${f(Y0 + t)}Z`);
        // Con ngươi theo ánh nhìn, và đảo lên khi mắt khép nên nó đi lên gặp mí đang đi xuống.
        e.pupil.setAttribute("transform", `translate(${f(ex * EYE.x - e.s * verg * EYE.verge)} ${f(py - c * EYE.roll)})`);
      }
      for (const [n, tok, bulge] of warps) n.setAttribute("d", warp(tok, x * STRENGTH, y * 0.8 * STRENGTH, bulge, hx * STRENGTH, hy * 0.8 * STRENGTH));
    }

    const far = (a, b) => Math.abs(a - b) > 0.004;
    function tick() {
      raf = 0;
      const now = performance.now(), want = now - lastMove < IDLE ? 1 : 0;
      if (!want) grinRT = 0;
      mood += (want - mood) * 0.1; curious += (curiousT - curious) * 0.15;
      grin += (grinT - grin) * 0.15; grinR += (grinRT - grinR) * 0.15; sleep += (sleepT - sleep) * 0.05;
      blinkV = env(now - blinkAt, ENV.blink); winkV = env(now - winkAt, ENV.wink); yawn = env(now - yawnAt, ENV.yawn);
      const s0 = env(now - surpriseAt, ENV.surprise); surprise = s0 * s0 * (3 - 2 * s0); // làm mượt hai đầu
      const fast = Math.min(1, EASE * EYE.speed);
      gx += (tx - gx) * fast; gy += (ty - gy) * fast;
      x += (tx - x) * EASE; y += (ty - y) * EASE;
      hx += (x - hx) * EASE * 0.6; hy += (y - hy) * EASE * 0.6;
      draw();
      // Còn thứ gì chưa tới đích hoặc còn đường bao đang chạy thì vẽ tiếp, không thì dừng hẳn vòng lặp.
      if (far(want, mood) || far(curiousT, curious) || far(grinT, grin) || far(grinRT, grinR) || far(sleepT, sleep) ||
        busy(now - blinkAt, ENV.blink) || busy(now - winkAt, ENV.wink) || busy(now - yawnAt, ENV.yawn) || busy(now - surpriseAt, ENV.surprise) ||
        Math.abs(tx - x) + Math.abs(ty - y) + Math.abs(x - hx) + Math.abs(y - hy) > 0.002) kick();
    }
    const kick = () => { raf ||= requestAnimationFrame(tick); };

    // Không có hoạt động (con trỏ, cuộn, phím) đủ lâu: ngáp một cái, rồi nhắm mắt, đầu gục nhẹ.
    // Có hoạt động trở lại khi đang ngủ: giật mình tỉnh.
    function awake() {
      if (sleepT) { sleepT = 0; surpriseAt = performance.now(); kick(); }
      clearTimeout(sleepTimer);
      sleepTimer = setTimeout(() => {
        yawnAt = performance.now(); kick();
        sleepTimer = setTimeout(() => { sleepT = 1; tx = 0; ty = 0.3; kick(); }, 1900);
      }, SLEEP_AFTER);
    }

    // Chuẩn hoá theo khoảng cách tới mép viewport ở mỗi phía, để avatar nằm sát góc vẫn dùng hết biên độ.
    const norm = (d, c, size) => { const n = clamp1(d > 0 ? d / (size - c) : d / c); return Math.sign(n) * Math.abs(n) ** 0.6; };
    addEventListener("pointermove", (e) => {
      const now = (lastMove = performance.now());
      clearTimeout(idleTimer); idleTimer = setTimeout(kick, IDLE + 20);
      if (lastPt) {
        const dt = now - lastPt.t, v = Math.hypot(e.clientX - lastPt.x, e.clientY - lastPt.y) / dt;
        if (dt > 4 && dt < 80 && v > FAST && now - surpriseAt > 3000) surpriseAt = now;
      }
      lastPt = { x: e.clientX, y: e.clientY, t: now };
      if (now > nextRoll) {
        // Lúc di chuột: phần lớn mỉm cười, khoảng 30% cười tít, khoảng 25% chớp thêm một cái.
        nextRoll = now + 1800 + Math.random() * 1500;
        const r = Math.random(); grinRT = r < 0.3 ? 1 : 0; if (r > 0.75) blinkAt = now;
      }
      awake();
      box ||= el.getBoundingClientRect();
      const cx = box.left + box.width / 2, cy = box.top + box.height / 2;
      tx = norm(e.clientX - cx, cx, innerWidth); ty = norm(e.clientY - cy, cy, innerHeight);
      verg = Math.max(0, 1 - Math.hypot(e.clientX - cx, e.clientY - cy) / (box.width * 2.5));
      kick();
    }, { passive: true });
    document.documentElement.addEventListener("pointerleave", () => { lastMove = -1e9; curiousT = grinT = tx = ty = verg = 0; kick(); });
    addEventListener("pointerover", (e) => {
      grinT = el.contains(e.target) ? 1 : 0;
      curiousT = !grinT && e.target.closest?.("a,button,input,label,[role=button]") ? 1 : 0;
      kick();
    });
    addEventListener("pointerdown", () => { winkAt = performance.now(); kick(); });
    (function blink() { setTimeout(() => { if (!sleepT && !yawn) { blinkAt = performance.now(); kick(); } blink(); }, 4000 + Math.random() * 3500); })();
    // Rail dính cố định nên vị trí avatar chỉ đổi khi đổi cỡ cửa sổ: đo một lần rồi nhớ.
    addEventListener("resize", () => { box = null; });
    addEventListener("scroll", awake, { passive: true });
    addEventListener("keydown", awake);
    awake();
    // Chuyển trang (site là MPA): trang cũ ghi lại hướng nhìn và mức cười, trang mới dựng lại y như vậy.
    // Mới vào site hoặc tải lại trang thì chào: cười tít GREET ms, rồi về mỉm cười, sau đó theo luật thường.
    let restored = false;
    try {
      const s = JSON.parse(sessionStorage.getItem("avatar"));
      // isFinite: bản ghi hỏng hoặc từ phiên bản script cũ thì bỏ qua, kẻo NaN lọt vào mọi toạ độ.
      if (s && Number.isFinite(s.x + s.y + s.m) && Date.now() - s.t < 4000 && performance.getEntriesByType("navigation")[0]?.type !== "reload") {
        restored = true;
        x = gx = hx = tx = s.x; y = gy = hy = ty = s.y; mood = s.m; grinR = grinRT = s.g ? 1 : 0; nextRoll = performance.now() + 1500;
        if (s.m > 0.5) { lastMove = performance.now(); idleTimer = setTimeout(kick, IDLE + 20); }
      }
    } catch {}
    if (!restored) {
      const GREET = 1400, SMILE = 1500, now = performance.now();
      grinR = grinRT = 1;
      lastMove = now + GREET + SMILE - IDLE; // mỉm cười SMILE ms sau khi hết cười tít, rồi mới về vô cảm
      nextRoll = now + GREET + SMILE; // di chuột trong lúc chào không gieo lại biểu cảm
      setTimeout(() => { grinRT = 0; kick(); }, GREET);
      idleTimer = setTimeout(kick, GREET + SMILE + 20);
    }
    addEventListener("pagehide", () => {
      try { sessionStorage.setItem("avatar", JSON.stringify({ x: tx, y: ty, m: mood, g: grinRT, t: Date.now() })); } catch {}
    });
    draw();
    kick();
  }
  })();
